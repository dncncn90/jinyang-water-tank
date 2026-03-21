import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, quoteState, items, totalPrice } = body;

        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL?.trim();

        if (!discordWebhookUrl || !discordWebhookUrl.startsWith('http')) {
            console.error('[ConsultationAPI] Discord Webhook URL is missing or invalid.');
            return NextResponse.json({ success: true, warning: 'Notification skipped' });
        }

        const now = new Date();
        const kst = new Date(now.getTime() + (9 * 60 * 60 * 1000));
        
        const itemLines = items?.map((i: any) => `- **${i.name}** (${i.price.toLocaleString()}원)`).join('\n') || '정보 없음';

        const location = quoteState?.location || '주소 미입력';
        const shippingCost = quoteState?.shippingCost ? `${quoteState.shippingCost.toLocaleString()}원` : '미정 (상담 필요)';
        const deliveryMethod = quoteState?.deliveryMethod === 'pickup' ? '방문 수령' : '화물 배송';

        const discordMessage = {
            username: "진양건재 실시간 알림",
            embeds: [{
                title: "[상담 요청] 스마트견적 챗봇 상담 접수",
                description: `고객님께서 견적 확인 후 상담을 요청하셨습니다.\n빠른 확인 및 해피콜을 진행해 주세요.`,
                color: 0x3498db, // Blue
                fields: [
                    { name: "고객 정보", value: `${name}\n${phone}`, inline: true },
                    { name: "수령 정보", value: `${deliveryMethod}\n${location}`, inline: true },
                    { name: "견적품목", value: itemLines, inline: false },
                    { name: "결제예상액", value: `${(totalPrice || 0).toLocaleString()}원 (VAT포함)`, inline: true },
                    { name: "예상 운임비", value: `${shippingCost} (착불)`, inline: true }
                ],
                footer: { text: `접수일시: ${kst.toLocaleString('ko-KR')} | 진양건재 관리자 시스템` }
            }]
        };

        const res = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordMessage)
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('[ConsultationAPI] Discord Notification Failed:', errorText);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[ConsultationAPI] Exception:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
