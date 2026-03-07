import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const supabase = await createClient();

    try {
        const { paymentKey, orderId, amount } = await request.json();

        if (!paymentKey || !orderId || !amount) {
            return NextResponse.json(
                { error: '필수 파라미터가 누락되었습니다.' },
                { status: 400 }
            );
        }

        const secretKey = process.env.TOSS_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json(
                { error: '서버 설정 오류: TOSS_SECRET_KEY가 없습니다.' },
                { status: 500 }
            );
        }

        // 1. 토스페이먼츠 결제 승인 API 호출
        const encodedKey = Buffer.from(`${secretKey}:`).toString('base64');
        const tossResponse = await fetch(
            'https://api.tosspayments.com/v1/payments/confirm',
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${encodedKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentKey, orderId, amount }),
            }
        );

        const tossData = await tossResponse.json();

        if (!tossResponse.ok) {
            console.error('Toss Confirm Error:', tossData);
            return NextResponse.json(
                { error: tossData.message || '결제 승인에 실패했습니다.' },
                { status: tossResponse.status }
            );
        }

        // 2. Supabase orders 테이블 상태 업데이트 (또는 새로 생성 - FloatingChatWidget에선 사전 주문생성을 안하므로 upsert 방식 채택)
        // 위젯 특성상 현재 사용자 정보가 누락되어 있을 수 있으나, 최대한 정보를 반영해 임시 저장합니다.
        const { error: updateError } = await supabase
            .from('orders')
            .upsert({
                id: orderId, // Widget에서 전달한 orderId 사용
                status: 'paid',
                payment_method: tossData.method,
                payment_key: tossData.paymentKey,
                total_amount: amount,
            }, { onConflict: 'id' });

        if (updateError) {
            // DB 업데이트 실패 - 결제는 됐지만 DB 반영 실패
            // 이 경우 로그를 남기되 사용자에게는 성공 처리
            console.error('DB Update Error after payment:', updateError);
        }

        // 3. 이메일 알림 전송 (에러가 나도 결제 성공은 리턴해야 하므로 try-catch 분리)
        try {
            // API 자체 호출 방식 이용 (next/server 내장 fetch 활용 가능하나, 내부 호출이므로 직접 실행)
            const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
            await fetch(`${origin}/api/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderId,
                    name: tossData.orderName || '토스결제고객', // 기본값
                    phone: '미수집(카드결제)',
                    address: '해피콜로 확인 필요',
                    requirements: '토스페이먼츠 간편결제로 접수됨. 관리자 확인 바람',
                    items: [{ name: tossData.orderName, quantity: 1, price: amount }],
                    totalAmount: amount
                })
            });
        } catch (emailErr) {
            console.error('Email Notification Error after Toss Payment:', emailErr);
        }

        return NextResponse.json({ success: true, payment: tossData });
    } catch (error) {
        console.error('Payment Confirm Server Error:', error);
        return NextResponse.json(
            { error: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
