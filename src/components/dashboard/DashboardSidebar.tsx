'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Video,
  BarChart3,
  Settings,
  CreditCard,
  Users,
  FileText,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  { name: '概览', href: '/dashboard', icon: Home },
  { name: '视频生成', href: '/dashboard/generate', icon: Video },
  { name: '我的视频', href: '/dashboard/videos', icon: Video },
  { name: '数据分析', href: '/dashboard/analytics', icon: BarChart3 },
  { name: '订阅管理', href: '/dashboard/subscription', icon: CreditCard },
  { name: '团队管理', href: '/dashboard/team', icon: Users },
  { name: '文档', href: '/dashboard/docs', icon: FileText },
  { name: '帮助', href: '/dashboard/help', icon: HelpCircle },
  { name: '设置', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* 移动端菜单按钮 */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-md bg-white p-2 shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* 侧边栏 */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 px-4">
            <h2 className="text-xl font-bold text-gray-900">ASMR Studio</h2>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'border-r-2 border-blue-700 bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5',
                      isActive ? 'text-blue-700' : 'text-gray-400'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 底部信息 */}
          <div className="border-t border-gray-200 p-4">
            <div className="text-center text-xs text-gray-500">
              <p>ASMR Studio v1.0.0</p>
              <p className="mt-1">© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端遮罩 */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
