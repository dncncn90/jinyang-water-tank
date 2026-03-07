'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle, Loader2 } from 'lucide-react';

function FailContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const code = searchParams.get('code');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 max-w-md w-full text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">결제에 실패했습니다</h1>
                <p className="text-gray-500 mb-2">{message || '알 수 없는 오류가 발생했습니다.'}</p>
                {code && <p className="text-xs text-gray-400 mb-8">에러 코드: {code}</p>}

                <div className="flex flex-col gap-3 mt-6">
                    <Link href="/checkout" className="bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                        다시 시도하기
                    </Link>
                    <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors">
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function FailPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        }>
            <FailContent />
        </Suspense>
    );
}
