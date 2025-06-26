'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { UserProfile } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Search,
} from 'lucide-react';

interface DashboardHeaderProps {
  user?: UserProfile | null;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 左侧：Logo 和搜索 */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">ASMR Studio</h1>
            </div>

            {/* 搜索框 */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="搜索视频..."
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* 右侧：通知和用户菜单 */}
          <div className="flex items-center space-x-4">
            {/* 通知按钮 */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Bell className="h-6 w-6" />
                <span className="sr-only">查看通知</span>
              </button>

              {/* 通知菜单 */}
              {isNotificationsOpen && (
                <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <div className="border-b border-gray-100 px-4 py-2 text-sm text-gray-700">
                      <h3 className="font-medium">通知</h3>
                    </div>
                    <div className="px-4 py-3 text-sm text-gray-500">
                      暂无新通知
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 用户菜单 */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="flex items-center space-x-2">
                  {user?.image ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.image}
                      alt={user.name}
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.name || '用户'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.subscription?.plan || 'free'} 计划
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </button>

              {/* 用户下拉菜单 */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      href="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="mr-3 h-4 w-4" />
                      个人资料
                    </a>
                    <a
                      href="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      设置
                    </a>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        退出登录
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
