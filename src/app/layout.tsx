import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ASMR 视频生成器 - AI 驱动的 ASMR 内容创作平台',
  description:
    '使用先进的 AI 技术生成高质量的 ASMR 视频内容，支持多种风格和音效，让您轻松创作独特的 ASMR 体验。',
  keywords: 'ASMR, 视频生成, AI, 放松, 冥想, 睡眠, 音效',
  authors: [{ name: 'ASMR Studio Team' }],
  creator: 'ASMR Studio',
  publisher: 'ASMR Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: 'ASMR 视频生成器',
    description: 'AI 驱动的 ASMR 内容创作平台',
    url: '/',
    siteName: 'ASMR Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ASMR Studio',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASMR 视频生成器',
    description: 'AI 驱动的 ASMR 内容创作平台',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
