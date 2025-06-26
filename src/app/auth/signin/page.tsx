'use client';

import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { FcGoogle } from 'react-icons/fc';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 检查用户是否已经登录
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('google', {
        callbackUrl: '/dashboard',
        redirect: false,
      });

      if (result?.error) {
        setError('登录失败，请重试');
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('登录过程中发生错误');
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">欢迎回来</h1>
          <p className="text-gray-600">
            登录您的账户以继续使用 ASMR 视频生成器
          </p>
        </div>

        <div className="space-y-6 rounded-lg bg-white p-6 shadow-lg">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            loading={isLoading}
            className="flex w-full items-center justify-center space-x-3 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            size="lg"
          >
            <FcGoogle className="h-5 w-5" />
            <span>{isLoading ? '登录中...' : '使用 Google 登录'}</span>
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              登录即表示您同意我们的{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-500">
                服务条款
              </a>{' '}
              和{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                隐私政策
              </a>
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            还没有账户？{' '}
            <button
              onClick={() => router.push('/auth/signup')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              立即注册
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
