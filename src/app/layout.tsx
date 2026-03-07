import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FloatingChatWidget from "@/components/layout/FloatingChatWidget";
import Providers from "@/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "진양건재 - 물탱크 AI 견적",
  description: "산업용/가정용 물탱크 및 배관자재 AI 견적 상담",
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-lg`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <FloatingChatWidget />
        </Providers>
      </body>
    </html>
  );
}
