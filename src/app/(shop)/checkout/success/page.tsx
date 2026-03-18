'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, PhoneCall } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount') || '0';
    const type = searchParams.get('type') || 'delivery';

    // 결제 성공 (무통장 입금 안내)
    return (
        <div className="min-h-screen bg-[#f5f7f8] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Success Header */}
                <div className="pt-12 pb-8 px-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0ea5e9]/10 mb-6">
                        <CheckCircle className="w-10 h-10 text-[#0ea5e9]" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">주문이 완료되었습니다!</h1>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 inline-block text-left mb-2 max-w-lg w-full">
                        <p className="text-orange-900 font-bold mb-2 break-keep text-lg">
                            {type === 'delivery' ? '건자재 특성상 지역별 운임비 확인이 필요합니다.' : '방문 수령 전 피팅(타공) 위치 확인 등 상담이 필요합니다.'}
                        </p>
                        <p className="text-orange-800 text-sm leading-relaxed break-keep font-medium">
                            담당자가 기재하신 번호로 곧 연락드려 {type === 'delivery' ? '최종 금액을 안내해' : '수령 일정과 피팅 위치를 확인해'} 드리겠습니다.<br/>
                            <strong className="text-red-500 font-extrabold text-base bg-red-50 px-1 py-0.5 rounded mt-1 inline-block">전화 상담 전에는 입금을 잠시 기다려 주세요.</strong>
                        </p>
                    </div>
                </div>

                {/* Order Details Box */}
                <div className="px-8 pb-8">
                    <div className="bg-[#0ea5e9]/5 rounded-xl p-6 border border-[#0ea5e9]/10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-[#0ea5e9]/10">
                                <span className="text-gray-600 font-medium">주문 번호</span>
                                <span className="text-[#0c4a6e] font-bold font-mono">{orderId}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#0ea5e9]/10">
                                <span className="text-gray-600 font-medium">결제 금액</span>
                                <span className="text-[#0c4a6e] text-2xl font-bold">{Number(amount).toLocaleString()} 원</span>
                            </div>
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 my-2 opacity-80 mix-blend-multiply">
                                <div className="text-sm text-blue-800 font-bold mb-1">입금 계좌 안내 (상담 후 입금 요망)</div>
                                <div className="text-xl font-bold tracking-tight text-blue-900">
                                    <span className="text-blue-600 mr-2">KB국민</span>
                                    9-63608227-53 (진양건재)
                                </div>
                                <p className="text-xs text-blue-600/80 mt-2 font-bold">* 담당자 통화 종료 후, 안내받으신 최종 금액을 위 계좌로 입금해 주세요.</p>
                            </div>
                            <div className="flex justify-between items-start py-2">
                                <span className="text-gray-600 font-medium">배송 예정일</span>
                                <div className="text-right">
                                    <span className="bg-[#f97316] text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1 inline-block">확인 예정</span>
                                    <p className="text-gray-900 font-semibold">주문일로부터 1~2일 이내</p>
                                    <p className="text-gray-500 text-sm">(개별 해피콜 예정)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Happy Call 3-Step Guide */}
                <div className="px-8 pb-8">
                    <div className="bg-white border-2 border-industrial-100 rounded-2xl p-6 shadow-md overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <PhoneCall className="w-24 h-24 text-industrial-600" />
                        </div>
                        <h3 className="text-lg font-black text-industrial-900 mb-6 flex items-center gap-2">
                            <PhoneCall className="w-5 h-5 text-orange-500" />
                            진양건재의 약속: 1:1 맞춤 해피콜
                        </h3>

                        <div className="grid grid-cols-3 gap-2 relative">
                            {/* Connection Lines */}
                            <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-industrial-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-gray-900 mb-1">주문 완료</p>
                                    <p className="text-[11px] text-gray-500 leading-tight break-keep">시스템 접수 완료</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-orange-200 animate-bounce-subtle">
                                    <PhoneCall className="w-6 h-6" />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-black text-orange-600 mb-1 leading-tight">전문가 해피콜</p>
                                    <p className="text-[11px] text-orange-700 font-bold leading-tight break-keep">운임 할인 및<br />일정 상담</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center font-bold">3</div>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-gray-900 mb-1">배송 및 완료</p>
                                    <p className="text-[11px] text-gray-500 leading-tight break-keep">안전하게 현장 배송</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm text-center text-gray-600 font-medium leading-relaxed break-keep">
                                <span className="text-industrial-600 font-black">잠시만 기다려주세요!</span> 담당 전문가가 주문 내역을 확인한 후, <br />
                                바로 직접 전화를 드려 <strong className="text-orange-600 font-black text-base italic">{type === 'delivery' ? '최저가 운임비' : '피팅(타공) 위치 등'}</strong>를 맞춰드리겠습니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="px-8 pb-12 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/guest/order-lookup"
                        className="flex-1 py-4 px-6 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-all text-center"
                    >
                        주문 내역 상세 보기
                    </Link>
                    <Link
                        href="/"
                        className="flex-1 py-4 px-6 rounded-lg bg-[#0ea5e9] text-white font-bold hover:bg-[#0ea5e9]/90 shadow-lg shadow-[#0ea5e9]/20 transition-all text-center"
                    >
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[#0ea5e9]" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
