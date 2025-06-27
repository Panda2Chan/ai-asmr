import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: '未授权访问' },
        { status: 401 }
      );
    }

    // 获取用户详细信息
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscription: true,
        usage: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: '用户不存在' },
        { status: 404 }
      );
    }

    // 如果没有使用量记录，创建一个
    if (!user.usage) {
      await prisma.usage.create({
        data: {
          userId: user.id,
          videosGenerated: 0,
          videosRemaining: 10, // 免费用户默认额度
          totalVideosAllowed: 10,
          resetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后重置
        },
      });
    }

    // 重新获取包含使用量的用户数据
    const userWithUsage = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscription: true,
        usage: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: userWithUsage,
    });
  } catch (error) {
    console.error('获取用户资料失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: '未授权访问' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    // 更新用户信息
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        email: email || undefined,
      },
      include: {
        subscription: true,
        usage: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error('更新用户资料失败:', error);
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
