import Stripe from 'stripe';
import { Plan } from '@/types';

// 初始化 Stripe 客户端
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// 套餐计划配置
export const plans: Plan[] = [
  {
    id: 'free',
    name: '免费版',
    type: 'FREE',
    price: 0,
    currency: 'usd',
    features: [
      '每月 3 个视频',
      '最长 30 秒',
      '720p 分辨率',
      '基础风格',
    ],
    limits: {
      videosPerMonth: 3,
      maxDuration: 30,
      maxQuality: 'low',
      maxResolution: '720p',
    },
    stripePriceId: '',
  },
  {
    id: 'basic',
    name: '基础版',
    type: 'BASIC',
    price: 999, // $9.99
    currency: 'usd',
    features: [
      '每月 20 个视频',
      '最长 2 分钟',
      '1080p 分辨率',
      '所有风格',
      '优先处理',
    ],
    limits: {
      videosPerMonth: 20,
      maxDuration: 120,
      maxQuality: 'medium',
      maxResolution: '1080p',
    },
    stripePriceId: process.env.STRIPE_BASIC_PRICE_ID!,
  },
  {
    id: 'pro',
    name: '专业版',
    type: 'PRO',
    price: 2999, // $29.99
    currency: 'usd',
    features: [
      '每月 100 个视频',
      '最长 5 分钟',
      '4K 分辨率',
      '所有风格',
      '优先处理',
      '批量生成',
      '自定义风格',
    ],
    limits: {
      videosPerMonth: 100,
      maxDuration: 300,
      maxQuality: 'high',
      maxResolution: '4k',
    },
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
  },
  {
    id: 'enterprise',
    name: '企业版',
    type: 'ENTERPRISE',
    price: 9999, // $99.99
    currency: 'usd',
    features: [
      '无限视频生成',
      '最长 10 分钟',
      '4K 分辨率',
      '所有风格',
      '最高优先级',
      '批量生成',
      '自定义风格',
      'API 访问',
      '专属支持',
    ],
    limits: {
      videosPerMonth: -1, // 无限
      maxDuration: 600,
      maxQuality: 'ultra',
      maxResolution: '4k',
    },
    stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
  },
];

/**
 * 创建 Stripe 客户
 */
export async function createStripeCustomer(email: string, name?: string) {
  return stripe.customers.create({
    email,
    name,
    metadata: {
      source: 'ai-amsr',
    },
  });
}

/**
 * 创建支付会话
 */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      source: 'ai-amsr',
    },
  });
}

/**
 * 创建一次性支付会话
 */
export async function createOneTimeCheckoutSession(
  customerId: string,
  amount: number,
  description: string,
  successUrl: string,
  cancelUrl: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: description,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      source: 'ai-amsr',
    },
  });
}

/**
 * 取消订阅
 */
export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

/**
 * 恢复订阅
 */
export async function reactivateSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}

/**
 * 获取客户信息
 */
export async function getCustomer(customerId: string) {
  return stripe.customers.retrieve(customerId);
}

/**
 * 获取订阅信息
 */
export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * 验证 Webhook 签名
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  secret: string
) {
  return stripe.webhooks.constructEvent(payload, signature, secret);
} 