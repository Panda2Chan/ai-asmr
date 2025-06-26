// 基础类型定义
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 用户相关类型
export interface User extends BaseEntity {
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  subscription?: Subscription;
  settings?: UserSettings;
}

export interface UserSettings extends BaseEntity {
  userId: string;
  language: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  autoSave: boolean;
}

// 订阅相关类型
export interface Subscription extends BaseEntity {
  userId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  stripeCurrentPeriodEnd: Date | null;
  planType: PlanType;
  status: SubscriptionStatus;
}

export type PlanType = 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID' | 'TRIAL';

// 视频相关类型
export interface Video extends BaseEntity {
  userId: string;
  title: string;
  description: string | null;
  prompt: string;
  style: string;
  duration: number;
  status: VideoStatus;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  metadata: VideoMetadata | null;
}

export interface VideoMetadata {
  style: string;
  audioType: string;
  quality: string;
  resolution: string;
  fps: number;
  bitrate: number;
}

export type VideoStatus = 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

// 视频生成请求类型
export interface VideoGenerationRequest {
  prompt: string;
  duration: number;
  style: VideoStyle;
  audioType: AudioType;
  quality?: VideoQuality;
  resolution?: VideoResolution;
}

export type VideoStyle = 
  | 'nature' 
  | 'rain' 
  | 'ocean' 
  | 'forest' 
  | 'fire' 
  | 'whitenoise' 
  | 'meditation' 
  | 'sleep' 
  | 'relaxation' 
  | 'custom';

export type AudioType = 
  | 'rain' 
  | 'ocean' 
  | 'forest' 
  | 'fire' 
  | 'whitenoise' 
  | 'meditation' 
  | 'sleep' 
  | 'relaxation' 
  | 'custom';

export type VideoQuality = 'low' | 'medium' | 'high' | 'ultra';
export type VideoResolution = '720p' | '1080p' | '1440p' | '4k';

// VEO3 API 相关类型
export interface Veo3ApiResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  estimatedTime?: number;
  error?: string;
}

export interface Veo3ApiRequest {
  prompt: string;
  duration: number;
  style: string;
  audioType: string;
  quality?: string;
  resolution?: string;
}

// 使用统计类型
export interface UsageStats extends BaseEntity {
  userId: string;
  date: Date;
  videosGenerated: number;
  totalDuration: number;
  apiCalls: number;
}

// 支付相关类型
export interface Payment extends BaseEntity {
  userId: string;
  stripePaymentId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description: string | null;
  metadata: any;
}

export type PaymentStatus = 'PENDING' | 'SUCCEEDED' | 'FAILED' | 'CANCELED';

// Stripe 相关类型
export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface StripeSubscription {
  id: string;
  customerId: string;
  status: string;
  currentPeriodEnd: number;
  priceId: string;
}

export interface StripePrice {
  id: string;
  productId: string;
  unitAmount: number;
  currency: string;
  recurring?: {
    interval: 'month' | 'year';
  };
}

// 套餐计划类型
export interface Plan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  currency: string;
  features: string[];
  limits: {
    videosPerMonth: number;
    maxDuration: number;
    maxQuality: VideoQuality;
    maxResolution: VideoResolution;
  };
  stripePriceId: string;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 表单类型
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileForm {
  name: string;
  email: string;
  language: string;
  theme: 'light' | 'dark';
  notifications: boolean;
}

// 国际化类型
export interface Locale {
  code: string;
  name: string;
  flag: string;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// 通知类型
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// 文件上传类型
export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// 会话类型
export interface Session {
  user: User;
  expires: string;
}

// 仪表板统计类型
export interface DashboardStats {
  totalVideos: number;
  totalDuration: number;
  thisMonthVideos: number;
  thisMonthDuration: number;
  subscriptionStatus: SubscriptionStatus;
  planType: PlanType;
  usagePercentage: number;
}

// 搜索和过滤类型
export interface VideoFilters {
  status?: VideoStatus;
  style?: VideoStyle;
  dateRange?: {
    start: Date;
    end: Date;
  };
  duration?: {
    min: number;
    max: number;
  };
}

export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: VideoFilters;
} 