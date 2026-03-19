import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SolapiMessageService } from 'solapi';

// TODO: 사장님께서 회원가입 후 발급받으실 API 키 입력란
const messageService = new SolapiMessageService(
    process.env.SOLAPI_API_KEY || 'ENTER_YOUR_API_KEY',
    process.env.SOLAPI_API_SECRET || 'ENTER_YOUR_API_SECRET'
);

export async function POST(request: Request) {
    console.log('[OrderAPI] Received POST request');
    const supabase = await createClient();

    try {
        const body = await request.json();
        console.log('[OrderAPI] Request body:', JSON.stringify(body).substring(0, 100) + '...');
        const {
            name,
            phone,
            password,
            address,
            requirements,
            totalAmount,
            items,
            orderId, // Client-generated ID or we can generate here
            paymentMethod,
            paymentKey
        } = body;

        // 1. Hash the password for guest order lookup
        const hashedPassword = await bcrypt.hash(password, 10);

        // YYMMDD-HHMMSS 형식의 간편 주문번호 생성 (한국 시간 기준)
        const now = new Date();
        const kst = new Date(now.getTime() + (9 * 60 * 60 * 1000));
        const yymmdd = kst.toISOString().slice(2, 10).replace(/-/g, '');
        const hhmmss = kst.toISOString().slice(11, 19).replace(/:/g, '');
        const orderUuid = `${yymmdd}-${hhmmss}-${Math.floor(Math.random() * 1000)}`;

        // 2. 디스코드 알림 전송
        try {
            const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL?.trim();
            const currentPaymentMethod = paymentMethod || 'BANK_TRANSFER';
            
            console.log(`[OrderAPI] Discord Webhook URL: ${discordWebhookUrl ? discordWebhookUrl.substring(0, 15) + '...' : 'MISSING'}`);
            
            if (discordWebhookUrl && discordWebhookUrl.startsWith('http')) {
                const itemText = items.map((i: any) => {
                    const optionText = i.options ? ` [${i.options}]` : '';
                    return `- ${i.name}${optionText} : ${i.quantity}개`;
                }).join('\n');

                const discordMessage = {
                    username: "진양건재 실시간 알리미 🚨",
                    embeds: [{
                        title: currentPaymentMethod === 'BANK_TRANSFER' ? "🏦 [무통장 주문] 새 주문이 접수되었습니다!" : "🚨 [운임비 상담 필요] 새 주문이 접수되었습니다!",
                        color: currentPaymentMethod === 'BANK_TRANSFER' ? 3447003 : 15105570,
                        fields: [
                            { name: "📍 배송지 (지도/화물 조회용)", value: address || '정보 없음' },
                            { name: "📞 고객명 / 연락처", value: `${name} (${phone})` },
                            { name: "📦 주문상품", value: itemText || '정보 없음' },
                            { name: "💰 주문총액 (상품대금)", value: `${(totalAmount || 0).toLocaleString()}원`, inline: true },
                            { name: "🧾 주문번호", value: orderUuid, inline: true },
                            { name: "💳 결제수단", value: currentPaymentMethod === 'BANK_TRANSFER' ? '무통장 입금' : '기타/상담', inline: true },
                            { name: "📝 기타 요청사항", value: requirements || '없음' }
                        ],
                        footer: { text: "조속히 확인하여 고객님께 배송비 및 일정을 안내해 주세요." },
                        timestamp: new Date().toISOString()
                    }]
                };

                const res = await fetch(discordWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(discordMessage)
                });
                
                if (!res.ok) {
                    const errorMsg = await res.text();
                    console.error(`[OrderAPI] Discord Webhook Error (${res.status}):`, errorMsg);
                } else {
                    console.log(`[OrderAPI] Discord notification success: ${orderUuid}`);
                }
            }
        } catch (discordError) {
            console.error("[OrderAPI] Discord Notification Exception:", discordError);
        }

        try {
            // 2. Insert into 'orders' table
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    id: orderUuid, // 토스페이먼츠 orderId와 일치시키기 위해 id 필드에 명시적으로 넣음
                    guest_name: name,
                    guest_phone: phone,
                    guest_password: hashedPassword,
                    recipient_name: name,
                    recipient_phone: phone,
                    shipping_address: address,
                    shipping_memo: requirements,
                    total_amount: totalAmount,
                    status: 'pending',
                    payment_method: paymentMethod || 'BANK_TRANSFER',
                })
                .select()
                .single();

            if (!orderError) {
                // 3. Insert 'order_items'
                if (items && items.length > 0) {
                    const orderItems = items.map((item: any) => ({
                        order_id: orderData.id,
                        product_name: item.name,
                        product_price: item.price,
                        quantity: item.quantity,
                        options: { option: item.option }
                    }));

                    await supabase.from('order_items').insert(orderItems);

                    // 4. Send Kakao Alimtalk to Customer via Solapi
                    try {
                        const pfId = process.env.KAKAO_PF_ID || 'ENTER_YOUR_PF_ID'; // 카카오 비즈니스 채널 발신프로필 아이디
                        const templateId = process.env.KAKAO_TEMPLATE_ID || 'ENTER_YOUR_TEMPLATE_ID'; // 승인받은 템플릿 코드

                        // 주문건 대표 상품명 추출
                        const representItemName = items.length > 1
                            ? `${items[0].name} 외 ${items.length - 1}건`
                            : items[0].name;

                        // TODO: 솔라피 및 카카오 템플릿 승인 완료 후 아래 주석을 해제하면 정상 발송됩니다.
                        /*
                        await messageService.sendOne({
                            to: phone.replace(/[^0-9]/g, ''), // 수신자 번호 (숫자만)
                            from: process.env.SENDER_PHONE || '01000000000', // 발신자 번호 (솔라피에 등록된 번호)
                            kakaoOptions: {
                                pfId: pfId,
                                templateId: templateId,
                                // 카카오 알림톡 템플릿 변수에 맞춰 값을 채워넣습니다.
                                variables: {
                                    "#{홍길동}": name,
                                    "#{12345678}": orderUuid,
                                    "#{PE원형 물탱크 1톤 외 2건}": representItemName,
                                    "#{150,000}": totalAmount.toLocaleString()
                                }
                            }
                        });
                        console.log(`알림톡 발송 대기열 추가 (Order ID: ${orderUuid})`);
                        */
                    } catch (aligoError) {
                        console.error("카카오 알림톡 발송 실패:", aligoError);
                        // 알림톡이 실패하더라도 주문 자체는 성공 처리되어야 하므로 에러만 로깅합니다.
                    }

                }
            } else {
                console.log("Supabase DB 에러:", orderError.message);
            }
        } catch (dbError) {
            console.error("Supabase 미설정 또는 연결 오류 (임시 주문 ID 반환):", dbError);
        }

        return NextResponse.json({ success: true, orderId: orderUuid });

    } catch (error: any) {
        console.error('Server /api/orders Error:', error?.message || error);
        return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
    }
}
