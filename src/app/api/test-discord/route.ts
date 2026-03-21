import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const debugVer = "v2.0"; // To verify change in browser
    
    const allKeys = Object.keys(process.env).filter(key => 
        key.startsWith('NEXT_PUBLIC_') || key.includes('DISCORD') || key.includes('TOSS') || key.includes('SUPABASE')
    );
    console.log(`[TestDiscord] Available Env Keys:`, allKeys);
    
    if (!webhookUrl) {
        return NextResponse.json({ 
            success: false, 
            debug_ver: debugVer,
            message: "DISCORD_WEBHOOK_URL이 .env 파일에 설정되어 있지 않습니다.",
            available_keys: allKeys,
            current_cwd: process.cwd()
        }, { status: 400 });
    }

    try {
        const urlToLog = webhookUrl.substring(0, 15) + '...';
        console.log(`[TestDiscord] --- Debug Start ---`);
        console.log(`[TestDiscord] Webhook URL: ${urlToLog}`);
        console.log(`[TestDiscord] URL Length: ${webhookUrl.length}`);
        console.log(`[TestDiscord] startsWith http: ${webhookUrl.startsWith('http')}`);

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "진양건재 테스트 봇 🚨",
                content: "🚀 **디스코드 알림 테스트 메시지입니다!**\n이 메시지가 보인다면 서버와 디스코드 웹훅 연결이 정상적으로 설정된 것입니다.\n\n- 발생시각: " + new Date().toLocaleString('ko-KR')
            })
        });
        
        console.log(`[TestDiscord] Response Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log(`[TestDiscord] Success!`);
            return NextResponse.json({ 
                success: true, 
                message: "테스트 메시지가 발송되었습니다. 디스코드를 확인하세요!",
                debug: { status: response.status, url_length: webhookUrl.length }
            });
        } else {
            const errorText = await response.text();
            console.error(`[TestDiscord] Discord Error Body:`, errorText);
            return NextResponse.json({ 
                success: false, 
                message: `웹훅 발송 실패: ${response.status}`, 
                details: errorText 
            }, { status: 500 });
        }
    } catch (error: any) {
        console.error(`[TestDiscord] Exception:`, error);
        return NextResponse.json({ 
            success: false, 
            message: "알 수 없는 오류 발생", 
            error: error.message 
        }, { status: 500 });
    } finally {
        console.log(`[TestDiscord] --- Debug End ---`);
    }
}
