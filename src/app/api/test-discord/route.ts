import { NextResponse } from 'next/server';

export async function GET() {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    
    if (!webhookUrl) {
        return NextResponse.json({ 
            success: false, 
            message: "DISCORD_WEBHOOK_URL이 .env 파일에 설정되어 있지 않습니다." 
        }, { status: 400 });
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "진양건재 테스트 봇",
                content: "🚀 디스코드 알림 테스트 메시지입니다! 이 메시지가 보인다면 설징이 완료된 것입니다."
            })
        });

        if (response.ok) {
            return NextResponse.json({ success: true, message: "테스트 메시지가 발송되었습니다. 디스코드를 확인하세요!" });
        } else {
            const errorText = await response.text();
            return NextResponse.json({ success: false, message: `웹훅 발송 실패: ${response.status}`, details: errorText }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ success: false, message: "네트워크 오류 발생", error: error.message }, { status: 500 });
    }
}
