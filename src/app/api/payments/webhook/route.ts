import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Toss Payments Webhook Logic
        // Verify payment status and update order status

        console.log('Toss Webhook Received:', body);

        return NextResponse.json({ received: true });
    } catch (error) {
        return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
    }
}
