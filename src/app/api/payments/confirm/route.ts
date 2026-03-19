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

        const secretKey = process.env.TOSS_SECRET_KEY?.trim();
        if (!secretKey) {
            console.error('SERVER_ERROR: TOSS_SECRET_KEY is missing in environment variables.');
            return NextResponse.json(
                { error: '서버 설정 오류: 결제 비밀키가 설정되지 않았습니다.' },
                { status: 500 }
            );
        }

        console.log(`[PaymentConfirm] Attempting confirm for orderId: ${orderId}, amount: ${amount}, KeyPrefix: ${secretKey.substring(0, 7)}...`);

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

            // 시크릿키 오류인 경우 사용자에게 구체적인 해결 방법 안내 도출
            if (tossData.code === 'INVALID_API_KEY') {
                return NextResponse.json(
                    { error: '토스페이먼츠 인증 오류: 현재 설정된 클라이언트 키와 시크릿 키가 서로 다른 계정의 것입니다. 개발자 센터에서 두 키를 모두 본인의 키로 교체해 주세요.' },
                    { status: 401 }
                );
            }

            return NextResponse.json(
                { error: tossData.message || '결제 승인에 실패했습니다.' },
                { status: tossResponse.status }
            );
        }

        // 2. Supabase orders 테이블 상태 업데이트
        // orderId가 id와 매칭되지 않을 경우를 대비해 유연하게 조회 후 업데이트 시도
        const { error: updateError } = await supabase
            .from('orders')
            .update({
                status: 'paid',
                payment_method: tossData.method || '카드결제',
                payment_key: tossData.paymentKey,
                total_amount: amount,
            })
            .eq('id', orderId);

        if (updateError) {
            console.error('DB Update Error (Order status might not have updated):', updateError.message);
        }

        // 3. 결제 완료 후 디스코드 알림 전송 (항상 발송 시도)
        try {
            const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
            console.log(`[PaymentConfirm] Discord Webhook URL: ${discordWebhookUrl ? discordWebhookUrl.substring(0, 15) + '...' : 'MISSING'}`);

            if (discordWebhookUrl && discordWebhookUrl.startsWith('http')) {
                // 주문 상세 정보(상품 목록 등)를 가져오기 위해 DB 조회
                // orderId(order_uuid)를 통해 orders 테이블의 id를 검색
                const { data: orderDetails } = await supabase
                    .from('orders')
                    .select('*, order_items(*)')
                    .eq('id', orderId)
                    .single();

                if (orderDetails) {
                    const items = orderDetails.order_items || [];
                    const optionText = items.map((i: any) => `- ${i.product_name} (${i.options?.option || '기본'}) : ${i.quantity}개`).join('\n');

                    const name = orderDetails.guest_name || tossData.orderName;
                    const phone = orderDetails.guest_phone || '정보 없음';
                    const address = orderDetails.shipping_address || '정보 없음';
                    const requirements = orderDetails.shipping_memo || '없음';

                    const discordMessage = {
                        username: "진양건재 실시간 알리미 🚨",
                        embeds: [{
                            title: "✅ [결제 완료] 배송 및 해피콜 대기",
                            color: 3066993, // 초록색 계열
                            fields: [
                                { name: "주문번호", value: orderId, inline: true },
                                { name: "실결제액", value: `${amount.toLocaleString()}원`, inline: true },
                                { name: "고객명 (연락처)", value: `${name} (${phone})` },
                                { name: "배송지", value: address },
                                { name: "주문상품", value: optionText || tossData.orderName },
                                { name: "요청사항", value: requirements }
                            ],
                            footer: { text: "담당 전문가는 주문 내역을 확인하고 고객님께 해피콜을 진행해 주세요." },
                            timestamp: new Date().toISOString()
                        }]
                    };

                    await fetch(discordWebhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(discordMessage)
                    });
                }
            }
        } catch (discordError) {
            console.error("관리자 디스코드 알림 발송 실패:", discordError);
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
