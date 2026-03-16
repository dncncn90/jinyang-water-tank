import React from 'react';
import { Phone, Mail, FileText, CheckCircle2, Truck } from 'lucide-react';

export default function PERoundCSSection() {
    return (
        <div className="w-full bg-[#f4f8fc] px-4 sm:px-6 lg:px-12 py-12 -mt-1 relative z-10 border-t border-[#e2ecf5] overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* 맞춤 제작 및 고객센터 */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl sm:text-3xl font-black text-industrial-900 tracking-tight">맞춤 제작 및 고객센터</h2>
                            <span className="bg-industrial-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">B2B 대환영</span>
                        </div>

                        <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed font-medium break-keep">
                            원형 물탱크 외에도 <span className="text-industrial-900 font-black underline underline-offset-4 decoration-industrial-200">FRP, SMC</span> 등 원하는 형태와 용량으로 주문 제작이 가능합니다.
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Contact Box (Phone) */}
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col group hover:border-industrial-300 transition-colors">
                                <div className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">전화 및 팩스</div>
                                <div className="flex items-center gap-2 mb-2 text-industrial-900">
                                    <Phone className="w-5 h-5 shrink-0" />
                                    <a href="tel:031-236-8227" className="text-xl font-black tracking-tight hover:underline">031-236-8227</a>
                                </div>
                                <div className="text-gray-500 font-bold text-sm pl-7">FAX: 031-237-4435</div>
                            </div>

                            {/* Contact Box (Online) */}
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex flex-col group hover:border-industrial-300 transition-colors">
                                <div className="text-xs text-gray-400 mb-2 font-bold uppercase tracking-wider">온라인 문의</div>
                                <div className="flex items-center gap-2 mb-2 text-industrial-900">
                                    <Mail className="w-5 h-5 shrink-0 text-industrial-600" />
                                    <a href="mailto:jy2368227@naver.com" className="text-base font-bold hover:underline truncate">jy2368227@naver.com</a>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm pl-7">
                                    <FileText className="w-4 h-4 shrink-0" />
                                    <span>스마트 견적 시스템 24시간 운영</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 배송 및 교환/반품 안내 */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
                    <h2 className="text-2xl sm:text-3xl font-black text-industrial-900 tracking-tight mb-8 pb-4 border-b border-gray-100">배송 및 교환/반품 안내</h2>

                    <div className="grid lg:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                                <Truck className="w-5 h-5 text-industrial-600" /> 배송 정보
                            </h3>
                            <ul className="space-y-4">
                                <li className="p-4 bg-industrial-50 rounded-xl border border-industrial-100">
                                    <div className="text-industrial-900 leading-relaxed break-keep font-medium text-sm">
                                        <strong className="font-extrabold text-industrial-600">단골/대량 우대:</strong> 전용 화물 루트를 통해 <span className="underline underline-offset-4 decoration-industrial-300">거리에 상관없이 최저가 운임을 보장</span>합니다.
                                    </div>
                                </li>
                                <li className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-industrial-400 shrink-0 mt-0.5" />
                                    <div><strong className="text-gray-900">원칙:</strong> 화물/직송 배송 (물탱크 특성상 전 제품 착불 배송)</div>
                                </li>
                                <li className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-industrial-400 shrink-0 mt-0.5" />
                                    <div><strong className="text-gray-900">주의:</strong> 지역별 화물비 편차가 큼 (대형 제품은 사전 문의 필수)</div>
                                </li>
                                <li className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                                    <div><strong className="text-gray-900">직배송:</strong> 수원 및 인근(화성, 용인 등) 직배송으로 운임 절제 가능</div>
                                </li>
                                <li className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-industrial-400 shrink-0 mt-0.5" />
                                    <div><strong className="text-gray-900">기간:</strong> 평일 1~2일 소요 (오후 1시 전 주문 시 당일 출고 원칙)</div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-industrial-600" /> 교환 및 환불 정책
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-industrial-400 shrink-0 mt-0.5" />
                                    <div><strong className="text-gray-900">불량/오배송:</strong> 제품 자체 결함 시 100% 무상 교환 처리</div>
                                </li>
                                <li className="flex items-start gap-2.5 text-gray-600 text-sm leading-relaxed font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-industrial-400 shrink-0 mt-0.5" />
                                    <div><strong className="text-gray-900">단순변심:</strong> 왕복 화물비 고객 부담 (구매 전 규격 확인 필수)</div>
                                </li>
                                <li className="mt-4 bg-red-50 p-4 rounded-xl border border-red-100 text-red-700 text-xs font-bold leading-relaxed break-keep">
                                    ⚠️ 사용, 오염, 파손, 타공 등 설치가 진행되어 상품 가치가 훼손된 경우에는 어떠한 사유로도 반품 및 교환이 불가합니다.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
