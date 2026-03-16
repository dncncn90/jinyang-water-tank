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
    template: '%s | 진양건재 - 수원 물탱크 전문',
    default: '진양건재 - 수원 PE 물탱크 전문 판매 | AI 스마트 견적',
  },
  description: '수원 30년 경력 진양건재의 PE 원형·사각 물탱크 전문 쇼핑몰. 1톤~30톤 다양한 규격, 당일 출고 가능, 전국 화물 배송. 무료 AI 견적 시스템으로 내 물탱크 가격을 바로 확인하세요.',
  keywords: ['물탱크', 'PE 물탱크', '원형 물탱크', '사각 물탱크', '물탱크 가격', '물탱크 판매', '수원 물탱크', '물탱크 견적', '물탱크 피팅', '농업용 물탱크', '공업용 물탱크', '진양건재', '물탱크 교체', 'FRP 물탱크', 'SMC 물탱크'],
  authors: [{ name: '진양건재', url: 'https://www.진양건재.com' }],
  creator: '진양건재',
  publisher: '진양건재',
  category: '물탱크 / 배관자재',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.진양건재.com',
    siteName: '진양건재 물탱크',
    title: '진양건재 - 수원 PE 물탱크 전문 판매',
    description: '30년 전통 수원 물탱크 전문점. 1톤~30톤 다양한 규격, 당일 출고, 전국 배송 가능. AI 견적 시스템으로 최저가 확인!',
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
    title: '진양건재 - 수원 PE 물탱크 전문 판매',
    description: '30년 전통 수원 물탱크 전문점. AI 견적으로 최저가 바로 확인!',
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
