'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ShoppingCart, Home } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

const NAVIGATION = [
    { name: '회사소개', href: '/about' },
    { name: '원형물탱크', href: '/categories/pe-round' },
    { name: '사각물탱크', href: '/categories/pe-square' },
    { name: '부속자재', href: '/categories/fittings' },
    { name: '도매·견적문의', href: '/wholesale' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const { getCartItemCount } = useCart();

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="sticky top-0 z-50 w-full flex flex-col font-['Pretendard']">
            {/* 상단 책임 배송 안내 (고대비 공지) */}
            <div className="bg-[#001A33] text-white py-2.5 px-4 text-center w-full shadow-md border-b border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
                    <span className="text-sm sm:text-base font-bold leading-tight">📢 <strong>전국 어디든</strong> 빠르고 안전하게 책임 배송해 드립니다!</span>
                    <span className="hidden sm:inline opacity-30">|</span>
                    <span className="text-[#FFD400] font-black text-base sm:text-lg">빠른 문의: 031-236-8227</span>
                </div>
            </div>

            <header
                className={`w-full transition-all duration-300 border-b ${
                    scrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-4'
                } border-gray-200`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between gap-4">
                        {/* 로고 영역 */}
                        <div className="flex shrink-0">
                            <Link href="/" className="flex items-center gap-2 group">
                                <Image
                                    src="/logo.png"
                                    alt="진양건재 로고"
                                    width={56}
                                    height={56}
                                    className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
                                    priority
                                />
                                <span className="text-xl sm:text-2xl font-black text-[#001A33] tracking-tighter">
                                    진양건재
                                </span>
                            </Link>
                        </div>

                        {/* 데스크탑 네비게이션 */}
                        <nav className="hidden lg:flex items-center gap-x-8">
                            {NAVIGATION.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-lg font-bold transition-colors hover:text-[#00509d] ${
                                        pathname === item.href ? 'text-[#003366] border-b-2 border-[#003366]' : 'text-gray-700'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* 우측 아이콘 및 전화 버튼 */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/cart"
                                className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {isMounted && getCartItemCount() > 0 && (
                                    <span className="absolute top-1 right-1 bg-red-600 text-white text-[11px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center ring-2 ring-white">
                                        {getCartItemCount()}
                                    </span>
                                )}
                            </Link>

                            <a
                                href="tel:031-236-8227"
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-black bg-[#FFD400] hover:bg-yellow-400 text-[#001A33] shadow-md transition-transform active:scale-95 text-lg"
                            >
                                <Phone className="w-5 h-5 fill-current" />
                                <span>031-236-8227</span>
                            </a>

                            <a
                                href="tel:031-236-8227"
                                className="sm:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[#FFD400] text-[#001A33] shadow-md active:scale-90"
                            >
                                <Phone className="w-6 h-6 fill-current" />
                            </a>
                        </div>
                    </div>

                    {/* 모바일 직접 노출 메뉴 (가로 스크롤 스타일) */}
                    <div className="lg:hidden mt-3 -mx-4 px-4 overflow-x-auto no-scrollbar border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 pb-2">
                            <Link href="/" className="shrink-0 flex flex-col items-center gap-1 px-3 py-1 bg-gray-50 rounded-lg border border-gray-200">
                                <Home className="w-4 h-4 text-gray-600" />
                                <span className="text-xs font-bold text-gray-700">홈</span>
                            </Link>
                            {NAVIGATION.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-black transition-all ${
                                        pathname === item.href 
                                            ? 'bg-[#003366] text-white' 
                                            : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
