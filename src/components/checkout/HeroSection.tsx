'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare, Search, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import PredictiveSearchBar from '../search/PredictiveSearchBar';

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-[700px] h-auto bg-industrial-900 flex flex-col items-center justify-center overflow-hidden py-32 sm:py-40">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url('/images/products/tank-round-real.png')" }} // Placeholder until we have a warehouse shot
            ></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-industrial-950/80 via-industrial-900/60 to-industrial-950"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium text-white/90">진양건재 · KS인증 · 전국배송</span>
                </div>

                {/* Vertical Commerce Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-lg leading-tight">
                    물탱크가 필요할 땐,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">진양스마트견적</span>
                </h1>

                <p className="text-lg sm:text-xl text-industrial-200 mb-10 max-w-2xl leading-relaxed">
                    복잡한 가입 없이 <strong>1분 만에 견적</strong>부터 주문까지.<br className="hidden sm:block" />
                    30년 노하우로 현장에 딱 맞는 제품을 추천해 드립니다.
                </p>

                {/* Main Action: Search & CTA */}
                <div className="w-full max-w-2xl flex flex-col gap-4">
                    {/* Integrated Search Bar */}
                    <div className="relative group z-20">
                        <PredictiveSearchBar />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
                        <button
                            onClick={() => document.getElementById('floating-chat-trigger')?.click()}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-95"
                        >
                            <MessageSquare className="w-5 h-5" />
                            <span>1분 스마트 견적 받기</span>
                        </button>

                        <Link
                            href="#products"
                            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm transition-all border border-white/10"
                        >
                            <span>전체 상품 둘러보기</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-3 gap-8 mt-16 w-full max-w-3xl border-t border-white/10 pt-8">
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">30+</div>
                        <div className="text-xs sm:text-sm text-industrial-400">년 업력</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1">KS</div>
                        <div className="text-xs sm:text-sm text-industrial-400">인증 정품</div>
                    </div>
                    <div className="text-center border-l border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">100%</div>
                        <div className="text-xs sm:text-sm text-industrial-400">전국 배송</div>
                    </div>
                </div>

            </div>
        </section>
    );
}
