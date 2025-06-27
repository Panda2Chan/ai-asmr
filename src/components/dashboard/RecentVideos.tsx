'use client';

import { useState, useEffect } from 'react';
import { UserProfile, VideoGeneration } from '@/types';
import {
  Play,
  Download,
  Share2,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface RecentVideosProps {
  user?: UserProfile | null;
}

export default function RecentVideos({ user }: RecentVideosProps) {
  const [videos, setVideos] = useState<VideoGeneration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentVideos = async () => {
      try {
        const response = await fetch('/api/videos/recent');
        if (response.ok) {
          const data = await response.json();
          setVideos(data.data || []);
        } else {
          setError('获取视频列表失败');
        }
      } catch (error) {
        console.error('获取视频列表错误:', error);
        setError('网络错误');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentVideos();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'processing':
        return '处理中';
      case 'failed':
        return '失败';
      default:
        return '等待中';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'processing':
        return 'text-blue-600 bg-blue-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">最近视频</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">最近视频</h3>
        </div>
        <div className="py-8 text-center">
          <p className="text-gray-500">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
            variant="outline"
          >
            重试
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">最近视频</h3>
        <Button variant="outline" size="sm">
          查看全部
        </Button>
      </div>

      {videos.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Play className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="mb-2 text-lg font-medium text-gray-900">还没有视频</h4>
          <p className="mb-4 text-gray-500">开始创建您的第一个 ASMR 视频</p>
          <Button href="/dashboard/generate">创建视频</Button>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.slice(0, 5).map(video => (
            <div
              key={video.id}
              className="flex items-center space-x-4 rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
            >
              {/* 缩略图 */}
              <div className="flex-shrink-0">
                {video.thumbnailUrl ? (
                  <img
                    src={video.thumbnailUrl}
                    alt={video.prompt}
                    className="h-12 w-16 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-16 items-center justify-center rounded-md bg-gray-200">
                    <Play className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>

              {/* 视频信息 */}
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium text-gray-900">
                  {video.prompt}
                </h4>
                <div className="mt-1 flex items-center space-x-4">
                  <span className="text-xs text-gray-500">
                    {formatDuration(video.duration)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {video.style} • {video.audioType}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(video.createdAt)}
                </p>
              </div>

              {/* 状态 */}
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                    video.status
                  )}`}
                >
                  {getStatusIcon(video.status)}
                  <span className="ml-1">{getStatusText(video.status)}</span>
                </span>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center space-x-2">
                {video.status === 'completed' && video.videoUrl && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(video.videoUrl, '_blank')}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = video.videoUrl!;
                        link.download = `video-${video.id}.mp4`;
                        link.click();
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button size="sm" variant="ghost">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
