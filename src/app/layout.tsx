import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ASMR 视频生成器 - AI 驱动的放松视频创作平台',
  description: '使用 VEO3 AI 技术生成高质量的 ASMR 视频，支持多种风格和自定义参数，让您轻松创建放松内容。',
  keywords: 'ASMR, 视频生成, AI, 放松, 冥想, 睡眠, VEO3',
  authors: [{ name: 'AI AMSR Team' }],
  creator: 'AI AMSR Team',
  publisher: 'AI AMSR',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'ASMR 视频生成器 - AI 驱动的放松视频创作平台',
    description: '使用 VEO3 AI 技术生成高质量的 ASMR 视频，支持多种风格和自定义参数。',
    url: '/',
    siteName: 'AI AMSR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ASMR 视频生成器',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASMR 视频生成器 - AI 驱动的放松视频创作平台',
    description: '使用 VEO3 AI 技术生成高质量的 ASMR 视频，支持多种风格和自定义参数。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 