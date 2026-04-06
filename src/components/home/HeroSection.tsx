'use client';

import Image from 'next/image';
import { Phone, ChevronRight } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative bg-[#F8FAFC] overflow-hidden border-b border-gray-200">
            {/* 배경 데코레이션 (신뢰감 있는 남색 포인트) */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#003366]/5 skew-x-[-15deg] transform translate-x-20 hidden lg:block"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10 font-['Pretendard']">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* 텍스트 영역 */}
                    <div className="flex flex-col gap-6 text-center lg:text-left">
                        <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-[#003366] font-black text-sm sm:text-base uppercase tracking-widest px-4 py-1.5 bg-[#003366]/10 rounded-full w-fit mx-auto lg:mx-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#003366] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#003366]"></span>
                            </span>
                            진양 스마트 견적 시스템
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] leading-[1.2] tracking-tight break-keep">
                            물탱크 가격?<br />
                            <span className="text-[#003366]">1분만에</span> 확인 끝!
                        </h1>

                        <div className="space-y-2">
                            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-bold leading-snug break-keep">
                                복잡한 전화 상담 없이, 규격만 입력하세요.
                            </p>
                            <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed break-keep">
                                진양건재에서 가장 합리적인 단가를 제안합니다.<br />
                                가입 없이 무료로 견적을 확인하실 수 있습니다.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-4 lg:mt-8">
                            <button 
                                onClick={() => window.dispatchEvent(new Event('open-chat'))} 
                                className="flex-1 group flex flex-col items-center justify-center bg-[#003366] hover:bg-[#002855] text-white py-4 px-6 rounded-2xl transition-all shadow-xl shadow-blue-900/20 active:scale-95 text-center min-h-[88px]"
                            >
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="text-xs sm:text-sm font-bold text-blue-200/80">바로 확인 가능한</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-300" />
                                </div>
                                <span className="text-lg sm:text-2xl font-black tracking-tight">실시간 스마트 견적</span>
                            </button>
                            <a 
                                href="tel:031-236-8227" 
                                className="flex-1 flex flex-col items-center justify-center bg-white hover:bg-gray-50 text-[#003366] py-4 px-6 rounded-2xl border-2 border-[#003366] transition-all active:scale-95 text-center min-h-[88px]"
                            >
                                <Phone className="w-5 h-5 mb-1 fill-current" />
                                <span className="text-lg sm:text-xl font-black">바로 전화하기</span>
                            </a>
                        </div>
                    </div>

                    {/* 이미지 영역 (사용자 제공 실물 사진 적용) */}
                    <div className="relative order-first lg:order-last">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white aspect-[16/10] bg-gray-200">
                            <Image
                                src="/images/hero-main-warehouse.jpg"
                                alt="수원-PE물탱크-도매-진양건재"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

