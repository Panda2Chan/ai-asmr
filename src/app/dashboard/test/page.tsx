'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';

export default function TestPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Dashboard 测试页面
        </h1>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">会话状态</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">状态:</p>
              <p className="text-sm text-gray-900">{status}</p>
            </div>

            {session && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-700">用户信息:</p>
                  <pre className="mt-1 overflow-auto rounded bg-gray-50 p-2 text-sm text-gray-900">
                    {JSON.stringify(session, null, 2)}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">用户 ID:</p>
                  <p className="text-sm text-gray-900">{session.user?.id}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">邮箱:</p>
                  <p className="text-sm text-gray-900">{session.user?.email}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">姓名:</p>
                  <p className="text-sm text-gray-900">{session.user?.name}</p>
                </div>
              </>
            )}

            {!session && status === 'unauthenticated' && (
              <div className="py-8 text-center">
                <p className="mb-4 text-gray-500">您尚未登录</p>
                <Button href="/auth/signin">去登录</Button>
              </div>
            )}

            {status === 'loading' && (
              <div className="py-8 text-center">
                <p className="text-gray-500">加载中...</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">快速导航</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              href="/dashboard"
              variant="outline"
              className="justify-start"
            >
              返回 Dashboard
            </Button>
            <Button href="/" variant="outline" className="justify-start">
              返回首页
            </Button>
            <Button
              href="/auth/signin"
              variant="outline"
              className="justify-start"
            >
              登录页面
            </Button>
            <Button
              href="/api/auth/signout"
              variant="outline"
              className="justify-start"
            >
              退出登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
