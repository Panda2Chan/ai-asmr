import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import veo3Client from '@/lib/veo3';
import { VideoGenerationRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const body: VideoGenerationRequest = await request.json();
    const { prompt, duration, style, audioType, quality = 'medium', resolution = '1080p' } = body;

    // 验证输入参数
    if (!prompt || !duration || !style || !audioType) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 检查用户配额
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { subscription: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: '用户不存在' },
        { status: 404 }
      );
    }

    // 获取用户本月已生成的视频数量
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const videosThisMonth = await prisma.video.count({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: startOfMonth
        }
      }
    });

    // 检查配额限制
    const planType = user.subscription?.planType || 'FREE';
    const limits = {
      FREE: 3,
      BASIC: 20,
      PRO: 100,
      ENTERPRISE: -1 // 无限
    };

    const monthlyLimit = limits[planType as keyof typeof limits];
    if (monthlyLimit !== -1 && videosThisMonth >= monthlyLimit) {
      return NextResponse.json(
        { error: '本月视频生成配额已用完，请升级套餐' },
        { status: 429 }
      );
    }

    // 检查视频时长限制
    const durationLimits = {
      FREE: 30,
      BASIC: 120,
      PRO: 300,
      ENTERPRISE: 600
    };

    const maxDuration = durationLimits[planType as keyof typeof durationLimits];
    if (duration > maxDuration) {
      return NextResponse.json(
        { error: `当前套餐最大支持 ${maxDuration} 秒视频` },
        { status: 400 }
      );
    }

    // 创建视频记录
    const video = await prisma.video.create({
      data: {
        userId: session.user.id,
        title: prompt,
        description: `ASMR 视频 - ${style} 风格`,
        prompt,
        style,
        duration,
        status: 'PROCESSING',
        metadata: {
          audioType,
          quality,
          resolution
        }
      }
    });

    // 调用 VEO3 API 生成视频
    try {
      const veo3Response = await veo3Client.generateVideo({
        prompt,
        duration,
        style,
        audioType,
        quality,
        resolution
      });

      // 更新视频状态
      await prisma.video.update({
        where: { id: video.id },
        data: {
          status: veo3Response.status === 'completed' ? 'COMPLETED' : 'PROCESSING',
          videoUrl: veo3Response.videoUrl || null,
          thumbnailUrl: veo3Response.thumbnailUrl || null
        }
      });

      // 更新使用统计
      await prisma.usageStats.upsert({
        where: {
          userId_date: {
            userId: session.user.id,
            date: new Date()
          }
        },
        update: {
          videosGenerated: {
            increment: 1
          },
          totalDuration: {
            increment: duration
          },
          apiCalls: {
            increment: 1
          }
        },
        create: {
          userId: session.user.id,
          date: new Date(),
          videosGenerated: 1,
          totalDuration: duration,
          apiCalls: 1
        }
      });

      return NextResponse.json({
        success: true,
        data: {
          id: video.id,
          status: veo3Response.status,
          estimatedTime: veo3Response.estimatedTime
        }
      });

    } catch (veo3Error) {
      // VEO3 API 调用失败，更新视频状态
      await prisma.video.update({
        where: { id: video.id },
        data: {
          status: 'FAILED'
        }
      });

      console.error('VEO3 API Error:', veo3Error);
      return NextResponse.json(
        { error: '视频生成失败，请稍后重试' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    // 构建查询条件
    const where: any = {
      userId: session.user.id
    };

    if (status) {
      where.status = status;
    }

    // 获取视频列表
    const videos = await prisma.video.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    });

    // 获取总数
    const total = await prisma.video.count({ where });

    return NextResponse.json({
      success: true,
      data: videos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get videos error:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 