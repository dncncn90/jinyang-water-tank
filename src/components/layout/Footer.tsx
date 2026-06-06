'use client';

import Link from 'next/link';
import { Phone, MapPin, Mail, Printer, Truck } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-industrial-950 text-industrial-200 py-12 border-t border-industrial-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Company Info */}
                    <div>
                        <h3 className="text-[#FFD400] text-2xl font-black mb-4 tracking-tight">진양건재</h3>
                        <p className="text-xs text-white/60 font-medium mb-6 leading-relaxed break-keep">
                            37년 전통의 물탱크·정화조 전문 유통기업. 정직한 가격과 신속한 전국 배송을 약속합니다.
                        </p>
                        <div className="flex items-start gap-2 pt-4 border-t border-industrial-900">
                            <MapPin className="w-3.5 h-3.5 text-industrial-500 shrink-0 mt-0.5" />
                            <span className="text-[11px] text-industrial-400 font-medium">경기도 수원시 팔달구 효원로 209-5</span>
                        </div>
                    </div>

                    {/* Customer Center */}
                    <div>
                        <h3 className="text-white text-sm font-bold mb-4 border-b border-industrial-800 pb-2 text-industrial-400">고객센터</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="text-white font-black text-2xl">031-236-8227</span>
                            </li>
                            <li className="text-[12px] text-industrial-400 font-bold mb-4">
                                평일 07:00 - 18:00 | 토요일 07:00 - 15:00
                            </li>
                            <li className="flex flex-col gap-1.5 text-[13px] text-industrial-300 pt-4 border-t border-industrial-900">
                                <span className="flex items-center gap-2">
                                    <Printer className="w-4 h-4 text-industrial-500" /> 
                                    <span className="font-bold text-industrial-500 mr-1">FAX</span> 031-237-4435
                                </span>
                                <span className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-industrial-500" /> 
                                    <span className="font-bold text-industrial-500 mr-1">E-mail</span> jy2368227@naver.com
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Regional Services - Unified Keywords */}
                    <div className="lg:col-span-1">
                        <h3 className="text-white text-sm font-bold mb-4 border-b border-industrial-800 pb-2 text-industrial-400">지역별 물탱크·저수조</h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] text-industrial-400">
                            <Link href="/regions/suwon" className="hover:text-white transition-colors">수원 물탱크</Link>
                            <Link href="/regions/hwaseong" className="hover:text-white transition-colors">화성 물탱크</Link>
                            <Link href="/regions/yongin" className="hover:text-white transition-colors">용인 물탱크</Link>
                            <Link href="/regions/ansan" className="hover:text-white transition-colors">안산 물탱크</Link>
                            <Link href="/regions/pyeongtaek" className="hover:text-white transition-colors">평택 물탱크</Link>
                            <Link href="/regions/osan" className="hover:text-white transition-colors">오산 물탱크</Link>
                        </div>
                    </div>

                    {/* Policies & National Delivery */}
                    <div>
                        <h3 className="text-white text-sm font-bold mb-4 border-b border-industrial-800 pb-2 text-industrial-400">안내 및 정책</h3>
                        <div className="flex flex-col gap-2.5 text-xs text-industrial-400">
                            <div className="flex items-center gap-2 text-orange-500/80 font-bold mb-1">
                                <Truck className="w-3.5 h-3.5" /> 전국 화물 배송 가능
                            </div>
                            <Link href="/about" className="hover:text-white transition-colors">회사소개</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
                            <a href="https://blog.naver.com/jypvc-" target="_blank" rel="noopener noreferrer" className="text-[#03C75A] font-bold mt-1">N 공식 블로그</a>
                        </div>
                    </div>
                </div>

                {/* Trust Badges - Balanced Layout (3-Column Style) */}
                <div className="border-t border-industrial-900 pt-8 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                        {/* Left: Copyright */}
                        <div className="text-center md:text-left order-3 md:order-1">
                            <p className="text-industrial-500 text-[11px] font-medium">
                                &copy; {new Date().getFullYear()} 진양건재. All rights reserved.
                            </p>
                        </div>

                        {/* Center: Simplified Business Info */}
                        <div className="text-center order-1 md:order-2">
                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-industrial-500 font-bold opacity-80">
                                <p>대표자: 김준성</p>
                                <span className="hidden sm:inline text-industrial-800">|</span>
                                <p>사업자번호: 124-53-29653</p>
                                <span className="hidden sm:inline text-industrial-800">|</span>
                                <p>통신판매업: 제2025-수원팔달-0609호</p>
                            </div>
                        </div>

                        {/* Right: Escrow */}
                        <div className="flex justify-center md:justify-end order-2 md:order-3">
                            <div className="flex items-center gap-4 bg-white/5 px-4 py-2.5 rounded-xl border border-white/5">
                                <div className="text-right hidden sm:block">
                                    <span className="text-white text-[10px] font-black leading-tight block">국가인증 안전결제</span>
                                    <span className="text-industrial-500 text-[9px] font-medium block">KB에스크로</span>
                                </div>
                                <form name="KB_AUTHMARK_FORM" method="get" className="hidden">
                                    <input type="hidden" name="page" value="C021590" />
                                    <input type="hidden" name="cc" value="b034066:b035526" />
                                    <input type="hidden" name="mHValue" value="c4e78c4453eaa8d582c547f4408b344b" />
                                </form>
                                <button
                                    onClick={() => {
                                        window.open('', 'KB_AUTHMARK', 'height=604, width=648, status=yes, toolbar=no, menubar=no, location=no');
                                        const form = document.forms.namedItem('KB_AUTHMARK_FORM') as HTMLFormElement;
                                        if (form) {
                                            form.action = 'https://okbfex.kbstar.com/quics';
                                            form.target = 'KB_AUTHMARK';
                                            form.submit();
                                        }
                                    }}
                                    className="hover:scale-105 transition-transform"
                                >
                                    <img src="http://img1.kbstar.com/img/escrow/escrowcmark.gif" alt="KB에스크로" className="h-7 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
