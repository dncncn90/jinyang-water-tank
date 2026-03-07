'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ShoppingBag, Search, HelpCircle, ArrowLeft, Construction, User, Phone, Home, Headset, UserPlus, Info, ArrowRight } from 'lucide-react';

function OrderResultContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') || '방문자';
    const phone = searchParams.get('phone') || '';

    return (
        <div className="bg-slate-50 dark:bg-slate-900 font-sans min-h-screen flex flex-col pt-24">
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-10">
                {/* Simplified Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/guest/order-lookup" className="group flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-industrial-600 hover:text-white transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">조회 결과</h1>
                    </div>
                    <Link href="/guest/order-lookup" className="text-sm font-bold text-slate-400 hover:text-industrial-600 flex items-center gap-1.5 transition-colors">
                        <Search className="w-4 h-4" />
                        다시 조회하기
                    </Link>
                </div>

                {/* User Info Highlight Card */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-industrial-100 to-slate-100 dark:from-industrial-900/20 dark:to-slate-900/20 rounded-3xl blur opacity-50"></div>
                    <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center gap-8">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-industrial-600">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">CUSTOMER NAME</p>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{name} 님</h3>
                            </div>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-slate-100 dark:bg-slate-700"></div>
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-industrial-600">
                                <Phone className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">PHONE NUMBER</p>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white">{phone || '정보 없음'}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area (Empty State) */}
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-industrial-600 blur-2xl opacity-10 rounded-full"></div>
                            <div className="relative w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-12 h-12 text-slate-200" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">조회된 내역이 없습니다</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-medium break-keep">
                            입력하신 성함과 연락처에 해당하는 <br />
                            주문 또는 견적 신청 내역이 아직 존재하지 않습니다.
                        </p>

                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            <Link href="/" className="flex items-center gap-2 px-8 py-4 bg-industrial-900 hover:bg-black text-white font-bold rounded-2xl transition-all active:scale-95">
                                <Home className="w-5 h-5" />
                                홈으로 돌아가기
                            </Link>
                            <a href="tel:031-236-8227" className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95">
                                <Headset className="w-5 h-5" />
                                고객센터 전화문의
                            </a>
                        </div>
                    </div>

                    {/* Notice Disclaimer Bar */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-start gap-4 max-w-2xl mx-auto">
                            <Info className="w-5 h-5 text-industrial-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-slate-500 font-medium leading-relaxed break-keep">
                                현재 진양건재 시스템은 <strong>정식 오픈 준비 중</strong>입니다.
                                실제 주문 내역 데이터베이스 연동이 완료된 후부터는 정확한 실시간 조회가 가능합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Bottom Promotion */}
            <div className="w-full bg-industrial-900 py-10">
                <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-800 rounded-lg text-orange-500 text-xs font-black tracking-widest uppercase mb-3">
                            Premium Benefit
                        </div>
                        <h2 className="text-white text-2xl font-black tracking-tight leading-tight">
                            회원으로 가입하고 <br className="sm:hidden" />
                            편리하게 내역을 관리하세요
                        </h2>
                    </div>
                    <Link href="/register" className="group shrink-0 flex items-center justify-center gap-3 h-16 px-10 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black shadow-xl shadow-orange-950/20 transition-all hover:-translate-y-1">
                        <UserPlus className="w-6 h-6" />
                        1분만에 가입하기
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
            <div className="h-20 md:h-0"></div>
        </div>
    );
}

export default function OrderResultPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-industrial-600"></div>
            </div>
        }>
            <OrderResultContent />
        </Suspense>
    );
}
