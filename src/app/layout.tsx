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
    template: '%s | 수원·수도권 물탱크 도매 전문 및 친환경 야자매트 공식 판매처 - 진양건재 (진양PVC건재총판)',
    default: '수원·수도권 물탱크 도매 전문 및 친환경 야자매트 공식 판매처 | 수도권 당일 직배송 - 진양건재 (진양PVC건재총판)',
  },
  description: '수원 37년 전통의 진양건재(진양PVC건재총판). 원형/사각 PE 물탱크, 농업용/농약용 백색 경운기 탱크, 지하 매설용 저수조 및 고강도 친환경 야자매트 최저가 보장. PVC 배관자재(VG1, VG2), PE수도관, CD전선관/ELP관, XL/PB 에이콘 파이프 수도권 전 지역 당일 직배송 및 도도매 견적 전문.',
  keywords: [
    '진양건재', '진양PVC건재총판', '진양PVC건재', '진양건재총판',
    '수원 배관자재', '화성 배관자재', '용인 배관자재', '안산 배관자재', '평택 배관자재', '오산 배관자재',
    '수원 VG1', '화성 VG1', '용인 VG1', '안산 VG1', '수원 VG2', '화성 VG2', '용인 VG2', '안산 VG2',
    '수원 PE수도관', '화성 PE수도관', '용인 PE수도관', '안산 PE수도관', '평택 PE수도관', '오산 PE수도관',
    '수원 이중벽관', '화성 이중벽관', '용인 이중벽관', '안산 이중벽관', '수원 CD전선관', '화성 CD관', '화성 ELP주름관', '용인 ELP관',
    '수원 엑셀파이프', '화성 엑셀파이프', '용인 에이콘파이프', '수원 PB파이프', '화성 PB관', '수원 몰코관',
    '수원 물탱크', '수원 저수조', '화성 물탱크 판매', '용인 PE물탱크', '안산 정화조', '수도권 물탱크 도매',
    '수원 야자매트', '화성 야자매트', '용인 야자매트', '야자매트', '코코넛매트', '보행매트', '식생매트',
    '평택 물탱크', '오산 물탱크', '물탱크 직배송', '물탱크 단가', '사각 물탱크', '정직한 건재상', '물탱크 견적 문의', '재고 보유 건재상', '물탱크 도매가', '수원 건재상',
    '농업용 물탱크', '농사용 물탱크', '농약 물탱크', '경운기 물탱크', '경운기 농약탱크', '백색 물탱크', '약품 물탱크', '화학 물탱크', '밭 물탱크 1톤', '농사용 2톤 물탱크',
    '매립형 물탱크', '매설용 물탱크', '지하 물탱크', '매설탱크', '지하수 물탱크', '정화조 매설', '토압 방지 물탱크', 'U시리즈 물탱크', '야자매트 가격', '야자매트 단가',
    '코코넛 보행매트', '미끄럼방지 보행매트', '야자매트 셀프시공', '정원 야자매트', '조경용 야자매트'
  ],
  authors: [{ name: '진양건재', url: 'https://www.진양건재.com' }],
  creator: '진양건재 (진양PVC건재총판)',
  publisher: '진양건재 (진양PVC건재총판)',
  category: '물탱크 / 배관자재 / 친환경 야자매트',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.진양건재.com',
    siteName: '진양건재 (진양PVC건재총판) 물탱크 & 야자매트',
    title: '수원·수도권 물탱크 도매 및 야자매트 최저가 | PE 물탱크, 정화조 당일 배송 - 진양건재 (진양PVC건재총판)',
    description: '수원 37년 전통의 진양건재(진양PVC건재총판). 수원, 용인, 화성 등 수도권 전 지역 물탱크 및 야자매트 직배송. 1분 스마트 견적! 농업용 백색 물탱크, 고강도 매립형 물탱크 및 친환경 야자매트를 정직한 가격으로 만나보세요.',
    images: [
      {
        url: '/images/hero-tanks.jpg',
        width: 1200,
        height: 630,
        alt: '진양건재 (진양PVC건재총판) PE 물탱크 & 야자매트 전문점 - 수원·화성·용인 도매',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '수원·수도권 물탱크 도매 및 야자매트 최저가 | PE 물탱크, 정화조 당일 배송 - 진양건재 (진양PVC건재총판)',
    description: '수원 37년 전통의 진양건재(진양PVC건재총판). 수원, 용인, 화성 등 수도권 전 지역 물탱크 및 야자매트 직배송. 1분 스마트 견적! 농업용 백색 물탱크, 고강도 매립형 물탱크 및 친환경 야자매트를 정직한 가격으로 만나보세요.',
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
