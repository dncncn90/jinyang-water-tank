'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    const [status, setStatus] = useState<'loading' | 'success' | 'fail'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!paymentKey || !orderId || !amount) {
            setErrorMessage('결제 정보가 올바르지 않습니다.');
            setStatus('fail');
            return;
        }

        // 서버에 결제 승인 요청
        const confirmPayment = async () => {
            try {
                const response = await fetch('/api/payments/confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        paymentKey,
                        orderId,
                        amount: Number(amount),
                    }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    setStatus('success');
                } else {
                    setErrorMessage(data.error || '결제 승인에 실패했습니다.');
                    setStatus('fail');
                }
            } catch (err) {
                setErrorMessage('서버와 통신 중 오류가 발생했습니다.');
                setStatus('fail');
            }
        };

        confirmPayment();
    }, [paymentKey, orderId, amount]);

    // 로딩 중
    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 max-w-md w-full text-center">
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-6" />
                    <h1 className="text-xl font-bold text-gray-900">결제를 처리하고 있습니다...</h1>
                    <p className="text-gray-400 mt-2 text-sm">잠시만 기다려주세요. 페이지를 닫지 마세요.</p>
                </div>
            </div>
        );
    }

    // 결제 실패
    if (status === 'fail') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 max-w-md w-full text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">결제에 실패했습니다</h1>
                    <p className="text-gray-500 mb-2">{errorMessage}</p>
                    <p className="text-xs text-gray-400 mb-8">문제가 지속되면 고객센터로 문의해주세요.</p>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/checkout"
                            className="bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                        >
                            다시 시도하기
                        </Link>
                        <Link
                            href="/"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors"
                        >
                            홈으로 돌아가기
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 결제 성공
    return (
        <div className="min-h-screen bg-[#f5f7f8] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Success Header */}
                <div className="pt-12 pb-8 px-8 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0ea5e9]/10 mb-6">
                        <CheckCircle className="w-10 h-10 text-[#0ea5e9]" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">주문이 정상적으로 완료되었습니다.</h1>
                    <p className="text-gray-500">진양 PVC를 이용해 주셔서 감사합니다. 정성을 다해 준비하겠습니다.</p>
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
                            <div className="flex justify-between items-start py-2">
                                <span className="text-gray-600 font-medium">배송 예정일</span>
                                <div className="text-right">
                                    <span className="bg-[#f97316] text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1 inline-block">확인 예정</span>
                                    <p className="text-gray-900 font-semibold">주문일로부터 3~5일 이내</p>
                                    <p className="text-gray-500 text-sm">(개별 해피콜 예정)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Banner */}
                <div className="px-8 pb-8">
                    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            담당 엔지니어가 24시간 내에 현장 설치 및 배송 일정 조율을 위해 연락드릴 예정입니다. 주말 및 공휴일의 경우 다음 영업일에 안내됩니다.
                        </p>
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
