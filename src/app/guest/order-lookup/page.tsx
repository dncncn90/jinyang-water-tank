'use client';
import Link from 'next/link';
import { Search, User, Phone, ArrowRight, CreditCard } from 'lucide-react';

export default function OrderLookupPage() {
    return (
        <main className="flex-grow flex items-center justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="w-full max-w-md space-y-8 mt-8">
                {/* Page Header */}
                {/* Header Section */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-industrial-600 rounded-2xl shadow-lg shadow-industrial-200 mb-2 rotate-3">
                        <Search className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                        주문/견적 조회
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                        주문 시 입력하신 정보를 확인해주세요.
                    </p>
                </div>

                {/* Main Card */}
                <div className="relative group">
                    {/* Decorative Background Element */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-industrial-600 to-orange-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>

                    <div className="relative bg-white dark:bg-slate-800 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
                        <div className="p-8 sm:p-12">
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get('name');
                                const phone = formData.get('phone');
                                window.location.href = `/guest/order-lookup/result?name=${name}&phone=${phone}`;
                            }} className="space-y-8">

                                {/* Inputs container */}
                                <div className="space-y-6">
                                    <div className="group/input">
                                        <label className="block text-base font-bold text-slate-500 dark:text-slate-400 mb-3 ml-1 uppercase tracking-wider" htmlFor="name">
                                            주문자 성함
                                        </label>
                                        <div className="relative flex items-center bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus-within:border-industrial-500 focus-within:bg-white dark:focus-within:bg-slate-900 rounded-2xl transition-all p-1">
                                            <div className="p-4 text-slate-400">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <input
                                                className="block w-full px-2 py-4 text-xl font-black bg-transparent placeholder-slate-300 focus:outline-none dark:text-white"
                                                id="name"
                                                name="name"
                                                placeholder="이름을 입력하세요"
                                                type="text"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="group/input">
                                        <label className="block text-base font-bold text-slate-500 dark:text-slate-400 mb-3 ml-1 uppercase tracking-wider" htmlFor="phone">
                                            연락처
                                        </label>
                                        <div className="relative flex items-center bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus-within:border-industrial-500 focus-within:bg-white dark:focus-within:bg-slate-900 rounded-2xl transition-all p-1">
                                            <div className="p-4 text-slate-400">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <input
                                                className="block w-full px-2 py-4 text-xl font-black bg-transparent placeholder-slate-300 focus:outline-none dark:text-white"
                                                id="phone"
                                                name="phone"
                                                placeholder="010-0000-0000"
                                                type="tel"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button className="relative w-full group overflow-hidden bg-industrial-900 rounded-2xl p-5 transition-all hover:bg-black active:scale-[0.98]" type="submit">
                                    <div className="relative flex items-center justify-center gap-3">
                                        <span className="text-xl font-black text-white">조회하기</span>
                                        <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            </form>

                            {/* Divider with Text */}
                            <div className="relative flex items-center gap-4 my-10 font-bold text-xs text-slate-300 dark:text-slate-600 uppercase tracking-[0.2em] justify-center text-center">
                                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700"></div>
                                <span>Membership</span>
                                <div className="h-px flex-1 bg-slate-100 dark:bg-slate-700"></div>
                            </div>

                            {/* Refined Promo Area */}
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 group/promo">
                                <div className="w-16 h-16 shrink-0 bg-white dark:bg-slate-800 rounded-2xl shadow-sm flex items-center justify-center text-industrial-600 group-hover/promo:scale-110 transition-transform duration-500">
                                    <CreditCard className="w-8 h-8" />
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h3 className="text-lg font-black text-slate-900 dark:text-white">회원가입 하고 혜택 받기</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
                                        지난 내역을 한눈에 보고 <br className="sm:hidden" />
                                        할인 혜택까지 챙기세요.
                                    </p>
                                    <Link href="/register" className="inline-flex items-center gap-2 py-3 px-6 bg-white dark:bg-slate-800 border-2 border-industrial-100 dark:border-slate-700 rounded-xl text-sm font-black text-industrial-600 hover:bg-industrial-600 hover:text-white transition-all shadow-sm">
                                        1분만에 시작하기 <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimal Footer */}
                <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-sm font-bold text-slate-300 dark:text-slate-600 pt-4">
                    <Link href="/terms" className="hover:text-industrial-600 transition-colors">이용약관</Link>
                    <Link href="/privacy" className="hover:text-industrial-600 transition-colors">개인정보처리</Link>
                    <Link href="/support" className="hover:text-industrial-600 transition-colors">고객센터</Link>
                </div>
            </div>
            <div className="h-24 md:h-0"></div> {/* Spacer for floating button on mobile */}
        </main>
    );
}
