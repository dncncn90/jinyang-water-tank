import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FloatingChatWidget from "@/components/layout/FloatingChatWidget";
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
    template: '%s | 진양건재 - 수원·화성·용인 물탱크 도매 전문',
    default: '수원·화성·용인 물탱크 도매 전문 진양건재 | PE 단가 스마트 견적',
  },
  description: '수원, 화성, 용인, 평택, 오산, 안산 등 경기 남부 지역 PE 물탱크, 정화조 전문 유통 진양건재입니다. 복잡한 전화 상담 없이 AI 스마트 견적으로 1분 만에 최저가 단가와 화물 배송비를 확인해 보세요.',
  keywords: ['수원 물탱크', '화성 물탱크', '용인 물탱크', '평택 물탱크', '오산 물탱크', '안산 물탱크', '진양건재', '진양PVC건재총판', '진양PVC', 'PE물탱크', '사각물탱크', '원형물탱크', '물탱크가격', '정화조도매'],
  authors: [{ name: '진양건재', url: 'https://www.진양건재.com' }],
  creator: '진양건재',
  publisher: '진양건재',
  category: '물탱크 / 배관자재',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.진양건재.com',
    siteName: '진양건재 물탱크',
    title: '수원·화성·용인 물탱크 도매 전문 진양건재 | PE 단가 스마트 견적',
    description: '수원, 화성, 용인, 평택, 오산, 안산 등 경기 남부 지역 PE 물탱크, 정화조 전문 유통 진양건재입니다. 복잡한 전화 상담 없이 AI 스마트 견적으로 1분 만에 최저가 단가와 화물 배송비를 확인해 보세요.',
    images: [
      {
        url: '/images/hero-tanks.jpg',
        width: 1200,
        height: 630,
        alt: '진양건재 PE 물탱크 전문점',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '수원·화성·용인 물탱크 도매 전문 진양건재 | PE 단가 스마트 견적',
    description: '수원, 화성, 용인, 평택, 오산, 안산 등 경기 남부 지역 PE 물탱크, 정화조 전문 유통 진양건재입니다. 복잡한 전화 상담 없이 AI 스마트 견적으로 1분 만에 최저가 단가와 화물 배송비를 확인해 보세요.',
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
        <link href="https://webfontworld.github.io/gmarket/GmarketSans.css" rel="stylesheet" />
        <LocalBusinessJsonLd />
        <FaqJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-base sm:text-lg`}
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
