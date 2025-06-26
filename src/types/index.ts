import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// 扩展 NextAuth 类型
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}

// 用户相关类型
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  createdAt: Date;
  updatedAt: Date;
  subscription?: Subscription;
  usage?: Usage;
}

// 订阅相关类型
export interface Subscription {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 使用量相关类型
export interface Usage {
  id: string;
  userId: string;
  videosGenerated: number;
  videosRemaining: number;
  totalVideosAllowed: number;
  resetDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 视频生成相关类型
export interface VideoGeneration {
  id: string;
  userId: string;
  prompt: string;
  duration: number;
  style: string;
  audioType: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 视频生成请求类型
export interface VideoGenerationRequest {
  prompt: string;
  duration: number;
  style: string;
  audioType: string;
}

// 视频生成响应类型
export interface VideoGenerationResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  estimatedTime?: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  errorMessage?: string;
}

// VEO3 API 相关类型
export interface Veo3Config {
  apiKey: string;
  apiUrl: string;
  timeout: number;
}

export interface Veo3VideoRequest {
  prompt: string;
  duration: number;
  style: string;
  audioType: string;
  quality?: string;
  resolution?: string;
}

export interface Veo3VideoResponse {
  id: string;
  status: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  estimatedTime?: number;
  error?: string;
}

// 支付相关类型
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

// Stripe 相关类型
export interface StripeConfig {
  secretKey: string;
  publishableKey: string;
  webhookSecret: string;
}

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
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  items: StripeSubscriptionItem[];
}

export interface StripeSubscriptionItem {
  id: string;
  priceId: string;
  quantity: number;
}

export interface StripePrice {
  id: string;
  productId: string;
  unitAmount: number;
  currency: string;
  recurring?: {
    interval: string;
    intervalCount: number;
  };
}

export interface StripeProduct {
  id: string;
  name: string;
  description?: string;
  metadata?: Record<string, string>;
}

// 分页相关类型
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// 搜索和过滤相关类型
export interface VideoFilters {
  status?: string;
  style?: string;
  audioType?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SearchParams extends PaginationParams {
  query?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: VideoFilters;
}

// 环境变量类型
export interface EnvironmentVariables {
  DATABASE_URL: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  VEO3_API_KEY: string;
  VEO3_API_URL: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NEXT_PUBLIC_APP_URL: string;
  ALLOWED_EMAIL_DOMAINS?: string;
}

// 组件 Props 类型
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface HeaderProps {
  user?: UserProfile;
}

export interface HeroProps {
  user?: UserProfile;
}

export interface PricingProps {
  user?: UserProfile;
  currentPlan?: string;
}

export interface FeaturesProps {
  user?: UserProfile;
}

export interface TestimonialsProps {
  user?: UserProfile;
}

export interface FAQProps {
  user?: UserProfile;
}

export interface FooterProps {
  user?: UserProfile;
}
