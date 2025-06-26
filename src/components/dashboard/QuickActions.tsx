'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/types';
import { Button } from '@/components/ui/Button';
import {
  Plus,
  Upload,
  Settings,
  CreditCard,
  Sparkles,
  Zap,
} from 'lucide-react';

interface QuickActionsProps {
  user?: UserProfile | null;
}

export default function QuickActions({ user }: QuickActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const actions = [
    {
      name: '创建新视频',
      description: '使用 AI 生成 ASMR 视频',
      icon: Plus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '/dashboard/generate',
      disabled: false,
    },
    {
      name: '上传视频',
      description: '上传现有视频进行编辑',
      icon: Upload,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      href: '/dashboard/upload',
      disabled: false,
    },
    {
      name: '升级计划',
      description: '获取更多功能和额度',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '/dashboard/subscription',
      disabled: user?.subscription?.plan === 'enterprise',
    },
    {
      name: 'AI 助手',
      description: '获取创意建议和帮助',
      icon: Sparkles,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      href: '/dashboard/ai-assistant',
      disabled: false,
    },
  ];

  const handleAction = async (action: (typeof actions)[0]) => {
    if (action.disabled) return;

    setIsLoading(true);
    try {
      router.push(action.href);
    } catch (error) {
      console.error('导航错误:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">快速操作</h3>
        <Zap className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {actions.map(action => (
          <button
            key={action.name}
            onClick={() => handleAction(action)}
            disabled={action.disabled || isLoading}
            className={`
              w-full rounded-lg border border-gray-200 p-4 text-left transition-all duration-200
              ${
                action.disabled
                  ? 'cursor-not-allowed bg-gray-50 opacity-50'
                  : 'bg-white hover:border-gray-300 hover:shadow-md'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`rounded-lg p-2 ${action.bgColor}`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{action.name}</h4>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 使用提示 */}
      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-blue-100 p-1">
            <Sparkles className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">使用提示</h4>
            <p className="mt-1 text-sm text-blue-700">
              尝试使用详细的描述来获得更好的 AI 生成效果
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
