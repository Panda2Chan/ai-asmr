'use client';

import { UserProfile } from '@/types';
import { Video, Clock, TrendingUp, Users } from 'lucide-react';

interface DashboardStatsProps {
  user?: UserProfile | null;
}

export default function DashboardStats({ user }: DashboardStatsProps) {
  const stats = [
    {
      name: '总视频数',
      value: user?.usage?.videosGenerated || 0,
      icon: Video,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: '剩余额度',
      value: user?.usage?.videosRemaining || 0,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: '本月生成',
      value: 12, // 这里可以从API获取
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: '团队成员',
      value: 1, // 这里可以从API获取
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <div
          key={stat.name}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center">
            <div className={`rounded-lg p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
