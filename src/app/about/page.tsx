'use client';

import { Building2, Truck, Users, History, Phone, MapPin, Award, CheckCircle2 } from 'lucide-react';
import NaverMap from '@/components/common/NaverMap';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-industrial-900 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-industrial-900 via-industrial-900/80 to-transparent"></div>
                    {/* Placeholder for warehouse/background image */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-800 border border-industrial-700 text-industrial-300 text-sm font-medium mb-6">
                            <History className="w-4 h-4" />
                            <span>Since 1987</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            37년 신뢰의<br />
                            <span className="text-industrial-400">건축자재 전문 유통</span> 파트너
                        </h1>
                        <p className="text-lg text-gray-300 leading-relaxed mb-8">
                            진양건재는 1987년 설립 이래 37년간 수원시 중심에서
                            수도권 전역과 전국 건설 현장에 최고 품질의 자재를 공급해왔습니다.
                            <br className="hidden sm:block" />
                            3세대에 걸친 신뢰와 3만여 현장의 성공적인 시공 경험이 우리의 자부심입니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-b border-gray-100 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl font-bold text-industrial-600 mb-2">1989</div>
                            <div className="text-sm text-gray-500 font-medium">설립 연도</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-industrial-600 mb-2">37년</div>
                            <div className="text-sm text-gray-500 font-medium">무사고 운영 실적</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-industrial-600 mb-2">30,000+</div>
                            <div className="text-sm text-gray-500 font-medium">현장 공급 경험</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-industrial-600 mb-2">50+</div>
                            <div className="text-sm text-gray-500 font-medium">협력 제조사</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values & Business Areas */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 진양건재인가요?</h2>
                        <p className="text-gray-600">토목부터 전기까지, 모든 건축자재를 원스톱으로 공급합니다.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">신속 대응 물류 시스템</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                수원 본사와 아산 전용 창고를 거점으로 수도권 당일 배송을 지향합니다.
                                대량 주문 시 공장 직송 시스템으로 비용을 절감해 드립니다.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">검증된 정품 품질</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                KS 인증제품 및 검증된 브랜드 제품만을 취급합니다.
                                50여 개 우수 제조사와의 직거래 네트워크로 가격 경쟁력을 확보했습니다.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">3세대를 잇는 신뢰</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                할아버지 세대부터 아들 세대까지 이어지는 단골 고객이 증명합니다.
                                전문가의 시각으로 현장에 딱 맞는 최적의 자재를 추천해 드립니다.
                            </p>
                        </div>
                    </div>

                    {/* Product Categories Detail */}
                    <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">전문 취급 품목</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-bold text-industrial-700 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> 배관/관류
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-2 pl-7">
                                    <li>수도관 (VP, PE, CPVC)</li>
                                    <li>하수관 (VG1, VG2, 이중관)</li>
                                    <li>전선관 (CD, ELP)</li>
                                    <li>냉온수관 (XL, PB, 몰코)</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-industrial-700 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> 토목/건축
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-2 pl-7">
                                    <li>맨홀 (콘크리트, 주철)</li>
                                    <li>지붕재 (FRP, PVC)</li>
                                    <li>판재 (PE, PP, 합판)</li>
                                    <li>각종 스티로폼/보온재</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-industrial-700 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> 물탱크/정화조
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-2 pl-7">
                                    <li>PE / FRP / SMC 물탱크</li>
                                    <li>부패식 / 오수합병 정화조</li>
                                    <li>약품탱크, 화공약품용</li>
                                    <li>이동식 화장실</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-industrial-700 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" /> 설비/부속
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-2 pl-7">
                                    <li>각종 밸브 및 피팅</li>
                                    <li>행거, 보온테이프</li>
                                    <li>펌프 및 수위조절기</li>
                                    <li>현장 잡자재 일절</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location & Contact */}
            <section className="py-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">오시는 길</h2>
                            <p className="text-gray-600 mb-8">
                                수원시청 사거리에 위치하고 있어 접근이 편리합니다.<br />
                                언제든지 방문하셔서 자재를 직접 확인하고 상담받으세요.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-industrial-100 text-industrial-600 rounded-lg flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">본사 및 매장</h3>
                                        <p className="text-gray-600 text-sm mt-1">경기도 수원시 팔달구 효원로 209-5 (시청사거리)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-industrial-100 text-industrial-600 rounded-lg flex items-center justify-center shrink-0">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">물류 창고</h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            제1창고 (탱크/정화조): 수원 대황교동<br />
                                            제2창고 (콘크리트): 충남 아산
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-industrial-100 text-industrial-600 rounded-lg flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">연락처</h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            전화: 031-236-8227<br />
                                            팩스: 031-237-4435<br />
                                            이메일: jy2368227@naver.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[400px] bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200">
                            <NaverMap />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
