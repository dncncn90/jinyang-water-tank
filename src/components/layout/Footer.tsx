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
                        <p className="text-base text-white/90 font-bold mb-6 leading-relaxed bg-industrial-900 border border-industrial-800 p-4 rounded-lg shadow-inner">
                            물탱크, 정화조, 배관자재 전문 유통기업.<br />
                            현장에 필요한 모든 자재를 합리적인 가격에 공급합니다.
                        </p>
                        <div className="text-sm text-industrial-400 space-y-1.5 font-medium">
                            <p>대표자: 김준성 | 사업자등록번호: 124-53-29653</p>
                            <p>통신판매업신고: 제2024-수원팔달-0000호</p>
                            <p>주소: 경기도 수원시 팔달구 효원로 209-5 (인계동)</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">고객센터</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-industrial-500 shrink-0" />
                                <div>
                                    <span className="block text-white font-bold text-lg">031-236-8227</span>
                                    <span className="text-xs text-industrial-500">평일 07:00 - 18:00, 토요일 07:00 - 15:00</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Printer className="w-5 h-5 text-industrial-500 shrink-0" />
                                <span>031-237-4435</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-industrial-500 shrink-0" />
                                <span>jy2368227@naver.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Policies & Trust */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">정보 및 정책</h3>
                        <div className="flex flex-col gap-2 text-sm text-industrial-300 mb-6">
                            <Link href="/about" className="hover:text-white transition-colors">회사소개</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
                        </div>
                    </div>
                </div>

                {/* Escrow Banner Centered */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center max-w-lg w-full">
                        <h4 className="text-white font-bold text-base mb-2 flex items-center justify-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                            국가 인증 안전결제 시스템 적용 업체
                        </h4>
                        <p className="text-sm text-industrial-400">
                            저희 쇼핑몰은 고객님의 안전거래를 위해 NH농협은행과 제휴한<br />
                            에스크로(구매안전) 서비스를 운영하고 있습니다.
                        </p>
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
                    📞 031-236-8227 전화 주문 및 도매 문의
                </a>
            </div>
        </footer>
    );
}
