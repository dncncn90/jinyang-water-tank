import Link from 'next/link';
import { Phone, MapPin, Mail, Printer } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-industrial-950 text-industrial-200 py-12 border-t border-industrial-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Company Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <h3 className="text-white text-xl font-black mb-4 tracking-tight">진양건재</h3>
                        <p className="text-sm text-white/70 font-medium mb-6 leading-relaxed break-keep">
                            물탱크, 정화조, 배관자재 전문 유통기업.<br />
                            현장에 필요한 모든 자재를 정직한 가격에 공급합니다.
                        </p>
                        <div className="text-xs text-industrial-500 space-y-1.5 font-medium leading-relaxed">
                            <p>대표자: 김준성 | 사업자등록번호: 124-53-29653</p>
                            <p>통신판매업신고: 제2025-수원팔달-0609호</p>
                            <p>주소: 경기도 수원시 팔달구 효원로 209-5 (인계동)</p>
                        </div>
                    </div>

                    {/* Customer Center */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4 border-b border-industrial-800 pb-2">고객센터</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                                <div>
                                    <span className="block text-white font-black text-xl tracking-tight">031-236-8227</span>
                                    <span className="text-xs text-industrial-400">평일 07:00 - 18:00 | 토요일 07:00 - 15:00</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3 border-t border-industrial-900 pt-3">
                                <Printer className="w-5 h-5 text-industrial-500 shrink-0" />
                                <span className="text-industrial-400">FAX: 031-237-4435</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-industrial-500 shrink-0" />
                                <span className="text-industrial-400">jy2368227@naver.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Policies */}
                    <div className="flex flex-col">
                        <h3 className="text-white text-lg font-bold mb-4 border-b border-industrial-800 pb-2">정보 및 정책</h3>
                        <div className="flex flex-col gap-3 text-sm text-industrial-400">
                            <Link href="/about" className="hover:text-white transition-colors flex items-center gap-2">
                                <span className="w-1 h-1 bg-industrial-700 rounded-full"></span> 회사소개
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors flex items-center gap-2">
                                <span className="w-1 h-1 bg-industrial-700 rounded-full"></span> 이용약관
                            </Link>
                            <Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-2">
                                <span className="w-1 h-1 bg-industrial-700 rounded-full"></span> 개인정보처리방침
                            </Link>
                            <a href="https://blog.naver.com/jypvc-" target="_blank" rel="noopener noreferrer" className="hover:text-[#03C75A] transition-colors flex items-center gap-2 mt-2">
                                <span className="text-[10px] bg-[#03C75A] text-white px-1.5 py-0.5 rounded-sm font-black">N</span> 공식 블로그
                            </a>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center shrink-0">
                            <Phone className="w-6 h-6 text-orange-500" />
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-black text-base mb-1">100% 담당 전문가 해피콜</h4>
                            <p className="text-xs text-industrial-400 leading-relaxed break-keep">
                                주문 즉시 담당 전문가가 최적의 <span className="text-orange-500 font-bold">최저가 배송비</span>를<br className="hidden lg:block" /> 직접 조율하여 안내해 드립니다. 안심하고 주문하세요!
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center md:items-start gap-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
                            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-white font-black text-base mb-1">국가 인증 안전결제 (에스크로)</h4>
                            <p className="text-xs text-industrial-400 leading-relaxed break-keep">
                                KB국민은행과 제휴한 에스크로 시스템을 통해<br className="hidden lg:block" /> 고객님의 소중한 대금을 배송 완료 시까지 안전하게 보호합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-industrial-900 pt-8 text-center text-xs text-industrial-500 pb-20 md:pb-8">
                    <p>&copy; {new Date().getFullYear()} 진양건재. All rights reserved.</p>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200">
                <a
                    href="tel:031-236-8227"
                    className="w-full bg-[#FF4500] hover:bg-[#E63E00] text-white flex items-center justify-center gap-2 py-4 rounded-xl font-black text-lg shadow-lg active:scale-95 transition-transform"
                >
                    <Phone className="w-5 h-5 fill-current" />
                    031-236-8227 전화 주문 및 도매 문의
                </a>
            </div>
        </footer>
    );
}
