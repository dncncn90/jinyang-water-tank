'use client';

import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className="relative bg-[#F8F9FA] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
                        <h2 className="text-[24px] sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.3] tracking-tight break-keep">
                            물탱크 가격? <br className="sm:hidden" />
                            진양스마트견적이면<br className="sm:hidden" />
                            <span className="text-[#003399]">1분만에</span> 확인 끝!
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg break-keep mx-auto lg:mx-0">
                            복잡한 전화 상담 없이, 규격만 입력하세요.<br className="hidden sm:block" />
                            진양건재에서 가장 합리적인 단가를 제안합니다.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-10">
                            <button onClick={() => window.dispatchEvent(new Event('open-chat'))} className="flex items-center justify-center bg-[#003399] hover:bg-blue-900 text-white text-lg font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-900/10">
                                간편 가격 확인하기
                            </button>
                            <a href="tel:031-236-8227" className="flex items-center justify-center bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-lg font-bold py-4 px-8 rounded-xl border-2 border-slate-100 dark:border-slate-800 transition-all active:scale-[0.98]">
                                진양건재 바로 전화하기
                            </a>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 font-medium">
                            가입 없이 무료로 견적을 확인하실 수 있습니다.
                        </p>
                    </div>

                    <div className="relative mt-8 lg:mt-0">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] aspect-[16/9] lg:aspect-[4/3] bg-slate-100">
                            <img
                                alt="진양건재 물탱크"
                                className="w-full h-full object-cover"
                                src="/images/hero-tanks.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

