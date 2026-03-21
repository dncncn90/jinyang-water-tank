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

        const discordMessage = {
            username: "진양건재 실시간 상담 알리미 💬",
            embeds: [{
                title: "💬 [전문가 상담 신청] 새로운 상담 요청이 접수되었습니다!",
                description: `접수일시: ${kst.toLocaleString('ko-KR')}\n\n**고객님께서 견적 확인 후 상담을 요청하셨습니다.**`,
                color: 0x3498db, // Blue
                fields: [
                    { name: "👤 고객 정보", value: `**이름**: ${name}\n**연락처**: ${phone}`, inline: true },
                    { name: "🏗️ 탱크 유형", value: quoteState?.recType === 'standard' ? '원형' : '사각', inline: true },
                    { name: "📦 상세 견적 내역", value: itemLines, inline: false },
                    { name: "💰 총 견적 금액", value: `**${(totalPrice || 0).toLocaleString()}원** (부가세 포함 / 운임 착불)`, inline: false }
                ],
                footer: { text: "진양건재 관리자 시스템 | 빠른 연락 부탁드립니다." },
                timestamp: new Date().toISOString()
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
