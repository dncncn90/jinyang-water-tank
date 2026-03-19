'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import PredictiveSearchBar from '../search/PredictiveSearchBar';
import { useCart } from '@/context/CartContext';

const NAVIGATION = [
    { name: '회사소개', href: '/about' },
    { name: '원형물탱크', href: '/categories/pe-round' },
    { name: '사각물탱크', href: '/categories/pe-square' },
    { name: '부속자재', href: '/categories/fittings' },
];

import { usePathname } from 'next/navigation';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    const { getCartItemCount } = useCart();

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isSolid = scrolled || mobileMenuOpen || !isMainPage;

    return (
        <div className="sticky top-0 z-50 w-full flex flex-col">
            {/* Top Bar for Business Members */}
            <div className="bg-industrial-900 text-white text-[10px] sm:text-xs py-2 px-4 text-center w-full relative z-50 shadow-md">
                <span className="opacity-95 block sm:inline leading-tight break-keep">📢 <strong>전국 어디든</strong> 빠르고 안전하게 책임 배송해 드립니다!</span>
                <span className="hidden sm:inline mx-2 text-industrial-500">|</span>
                <span className="text-[#FFD400] font-black block sm:inline mt-1 sm:mt-0 text-[11px] sm:text-sm">빠른 문의: 031-236-8227</span>
            </div>

            <header
                className={`w-full transition-all duration-300 ${isSolid
                    ? 'bg-white shadow-md py-3 border-b border-gray-200'
                    : 'bg-white/95 backdrop-blur-md py-3 shadow-sm border-b border-gray-200'
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">

                    {/* Logo Area */}
                    <div className="flex shrink-0">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-1.5 group">
                            <div className="flex items-center gap-1.5 group">
                                <Image
                                    src="/logo.png"
                                    alt="진양건재 로고"
                                    width={48}
                                    height={48}
                                    className="object-contain h-10 w-10 sm:h-12 sm:w-12 drop-shadow-sm group-hover:scale-105 transition-transform"
                                    priority
                                />
                                <span className={`text-lg sm:text-xl font-black tracking-tighter whitespace-nowrap shrink-0 ${isSolid ? 'text-gray-900' : 'text-slate-800'} mt-0.5`}>
                                    진양건재
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex lg:hidden items-center gap-2">
                        <a href="tel:031-236-8227" className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-md transition-transform active:scale-95 whitespace-nowrap shrink-0">
                            <Phone className="w-2.5 h-2.5" />
                            <span>전화상담</span>
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ${isSolid ? 'text-gray-700' : 'text-slate-800'}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">메뉴 열기</span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:gap-x-4 xl:gap-x-6 items-center overflow-x-auto justify-end flex-nowrap hide-scrollbar pb-1 -mb-1">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`whitespace-nowrap shrink-0 text-sm font-semibold leading-6 transition-colors hover:text-industrial-400 ${isSolid ? 'text-gray-900' : 'text-slate-800'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/wholesale"
                            className={`whitespace-nowrap shrink-0 text-sm font-semibold leading-6 transition-colors hover:text-industrial-400 ${isSolid ? 'text-gray-900' : 'text-slate-800'}`}
                        >
                            도매·견적문의
                        </Link>

                        <a
                            href="https://blog.naver.com/jypvc-"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`whitespace-nowrap shrink-0 text-sm font-semibold leading-6 transition-colors hover:text-[#03C75A] ${isSolid ? 'text-gray-900' : 'text-slate-800'} flex items-center gap-1 lg:ml-1 xl:ml-2`}
                        >
                            <span className="bg-[#03C75A] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-black tracking-tighter">N</span>
                            블로그
                        </a>

                        <div className={`shrink-0 h-4 w-px ${isSolid ? 'bg-gray-300' : 'bg-slate-300'} lg:mx-1 xl:mx-2`}></div>

                        <Link
                            href="/cart"
                            className={`whitespace-nowrap shrink-0 relative text-sm font-semibold leading-6 transition-colors hover:text-industrial-400 ${isSolid ? 'text-gray-900' : 'text-slate-800'} flex items-center gap-1`}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {isMounted && getCartItemCount() > 0 && (
                                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                                    {getCartItemCount()}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="tel:031-236-8227"
                            className={`whitespace-nowrap shrink-0 flex items-center gap-2 px-3 xl:px-5 py-2 xl:py-2.5 rounded-xl font-bold transition-all bg-[#FFD400] hover:bg-yellow-400 text-gray-900 shadow-md lg:ml-2 xl:ml-4`}
                        >
                            <Phone className="w-4 h-4 xl:w-5 xl:h-5" />
                            <span className="text-base xl:text-xl tracking-tight">031-236-8227</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top-2">
                        <div className="p-4 space-y-4">
                            <div className="space-y-1">
                                {NAVIGATION.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/wholesale"
                                    className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    도매·견적문의
                                </Link>
                                <a
                                    href="https://blog.naver.com/jypvc-"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="bg-[#03C75A] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-black tracking-tighter">N</span>
                                    공식 블로그
                                </a>
                            </div>
                            <div className="py-6 border-t border-gray-100 flex flex-col gap-2">
                                <Link
                                    href="/cart"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center justify-between"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center gap-2">
                                        <ShoppingCart className="w-5 h-5 text-industrial-600" />
                                        장바구니
                                    </div>
                                    {isMounted && getCartItemCount() > 0 && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {getCartItemCount()}
                                        </span>
                                    )}
                                </Link>
                                
                                <a
                                    href="tel:031-236-8227"
                                    className="-mx-3 mt-4 block rounded-lg px-3 py-2.5 text-base font-bold leading-7 text-white bg-industrial-600 hover:bg-industrial-700 flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-5 h-5" />
                                    전화 상담하기 (031-236-8227)
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}
