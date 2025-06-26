'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentVideos from '@/components/dashboard/RecentVideos';
import QuickActions from '@/components/dashboard/QuickActions';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    // 获取用户详细信息
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.data);
        }
      } catch (error) {
        console.error('获取用户数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [session, status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!session) {
    return null; // 会被重定向到登录页面
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            {/* 欢迎信息 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                欢迎回来，{user?.name || session.user?.name}！
              </h1>
              <p className="mt-2 text-gray-600">开始创建您的 ASMR 视频内容</p>
            </div>

            {/* 统计卡片 */}
            <DashboardStats user={user} />

            {/* 主要内容区域 */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* 快速操作 */}
              <div className="lg:col-span-1">
                <QuickActions user={user} />
              </div>

              {/* 最近视频 */}
              <div className="lg:col-span-2">
                <RecentVideos user={user} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
