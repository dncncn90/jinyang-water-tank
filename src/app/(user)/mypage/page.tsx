'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MyPage() {
    // Mock user state
    const [user] = useState({
        name: '진양건설(주)',
        type: 'business', // 'individual' or 'business'
        phone: '010-1234-5678',
        businessNumber: '123-45-67890'
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Profile */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8 flex items-center gap-6">
                    <div className="w-20 h-20 bg-industrial-100 rounded-full flex items-center justify-center text-industrial-600 font-bold text-2xl border-4 border-industrial-50">
                        {user.name.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-extrabold text-gray-900">{user.name}</h1>
                            {user.type === 'business' && (
                                <span className="px-2 py-1 bg-industrial-100 text-industrial-700 text-xs font-bold rounded-md">B2B 사업자 회원</span>
                            )}
                        </div>
                        <p className="text-gray-500">{user.phone}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-900 mb-4 px-2">나의 쇼핑</h3>
                            <nav className="space-y-1">
                                <a href="#" className="block px-3 py-2.5 rounded-xl bg-industrial-50 text-industrial-700 font-bold">진행 중인 주문/견적</a>
                                <a href="#" className="block px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">주문 내역</a>
                                <a href="#" className="block px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">관심 상품</a>
                            </nav>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-900 mb-4 px-2">정보 관리</h3>
                            <nav className="space-y-1">
                                <a href="#" className="block px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium">회원 정보 수정</a>
                                {user.type === 'business' && (
                                    <a href="#" className="block px-3 py-2.5 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 font-bold flex items-center justify-between">
                                        사업자/세무 정보
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    </a>
                                )}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Business Member Section */}
                        {user.type === 'business' && (
                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-industrial-600" />
                                    사업자 회원 전용 메뉴
                                </h2>

                                <div className="space-y-6">
                                    {/* Upload License */}
                                    <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-gray-900">사업자 등록증 관리</h3>
                                                <p className="text-sm text-gray-500 mt-1">전자세금계산서 무실적 발행을 위해 필수입니다.</p>
                                            </div>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
                                                <CheckCircle2 className="w-3 h-3" /> 등록됨
                                            </span>
                                        </div>
                                        <div className="flex gap-3 mt-4">
                                            <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                                                <Upload className="w-4 h-4 text-gray-500" />
                                                변경 업로드
                                            </button>
                                            <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors">
                                                사본 보기
                                            </button>
                                        </div>
                                    </div>

                                    {/* Auto Tax Invoice */}
                                    <div className="border border-blue-100 rounded-2xl p-6 bg-blue-50/50 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                            <FileText className="w-24 h-24 text-blue-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">세금계산서 자동 신청 설정</h3>
                                        <p className="text-sm text-gray-600 mb-6">설정을 켜두시면 매월 말일, 또는 결제 완료 시 자동으로 100% 매입 세금계산서가 지정된 이메일로 발행됩니다.</p>

                                        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FileText className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-sm">발행 이메일: info@jinyang.com</p>
                                                    <p className="text-xs text-green-600 font-medium mt-0.5">자동 신청 활성화 상태 ✨</p>
                                                </div>
                                            </div>
                                            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-lg transition-colors">
                                                설정 변경
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Recent Orders Overview */}
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">최근 진행 현황</h2>
                            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                                <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">진행 중인 주문이나 견적이 없습니다.</p>
                                <button className="mt-4 bg-industrial-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-industrial-700 transition-colors shadow-md shadow-industrial-200">
                                    상품 둘러보기
                                </button>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
