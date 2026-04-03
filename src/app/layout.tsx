import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FloatingChatWidget from "@/components/layout/FloatingChatWidget";
import FloatingCallButton from "@/components/layout/FloatingCallButton";
import Providers from "@/components/providers/Providers";
import { LocalBusinessJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#1a56db',
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.진양건재.com'),
  title: {
    template: '%s | 수원·수도권 물탱크 저수조 도매 | PE 물탱크, 정화조 당일 배송 - 진양건재',
    default: '수원·수도권 물탱크 저수조 도매 | PE 물탱크, 정화조 당일 배송 - 진양건재',
  },
  description: '수원, 용인, 화성 등 수도권 전 지역 물탱크 및 저수조 직배송 전문. 1분 만에 확인하는 스마트 견적 시스템! 1989년 설립된 37년 전통의 진양건재에서 정직한 가격으로 만나보세요.',
  keywords: [
    '수원 물탱크', '수원 저수조', '화성 물탱크 판매', '용인 PE물탱크', '안산 정화조', '수도권 물탱크 도매',
    'PE 물탱크 규격', '식수용 물탱크 가격', '저수조 파는곳', '5톤 물탱크 단가', '사각 물탱크 구매', '정화조 설치 단가',
    '물탱크 싼 곳', '물탱크 직배송', '물탱크 견적 문의', '재고 보유 건재상', '물탱크 도매가', '수원 건재상'
  ],
  authors: [{ name: '진양건재', url: 'https://www.진양건재.com' }],
  creator: '진양건재',
  publisher: '진양건재',
  category: '물탱크 / 배관자재',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.진양건재.com',
    siteName: '진양건재 물탱크',
    title: '수원·수도권 물탱크 도매 | PE 물탱크, 정화조 당일 배송 - 진양건재',
    description: '수원, 용인, 화성 등 수도권 전 지역 물탱크 직배송. 1분 만에 확인하는 스마트 견적 시스템! 1989년 설립된 37년 전통의 진양건재에서 정직한 가격으로 만나보세요.',
    images: [
      {
        url: '/images/hero-tanks.jpg',
        width: 1200,
        height: 630,
        alt: '진양건재 PE 물탱크 전문점 - 수원·화성·용인 도매',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '수원·수도권 물탱크 도매 | PE 물탱크, 정화조 당일 배송 - 진양건재',
    description: '수원, 용인, 화성 등 수도권 전 지역 물탱크 직배송. 1분 만에 확인하는 스마트 견적 시스템! 1989년 설립된 37년 전통의 진양건재에서 정직한 가격으로 만나보세요.',
    images: ['/images/hero-tanks.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.진양건재.com',
  },
  verification: {
    google: 'ZqRfgwSuRr4xcJBxIazExUdQK6DJd-WWQWUeLgJvRB8',
    other: {
      'naver-site-verification': 'd73b710e51da801a7d7ca29bdb7223a1326f168c',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
        <link href="https://webfontworld.github.io/gmarket/GmarketSans.css" rel="stylesheet" />
        <LocalBusinessJsonLd />
        <FaqJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-lg font-medium`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <FloatingChatWidget />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
