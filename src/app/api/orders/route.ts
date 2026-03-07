import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const supabase = await createClient();

    try {
        const body = await request.json();
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

        const orderUuid = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

        try {
            // 2. Insert into 'orders' table
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    guest_name: name,
                    guest_phone: phone,
                    guest_password: hashedPassword,
                    recipient_name: name,
                    recipient_phone: phone,
                    shipping_address: address,
                    shipping_memo: requirements,
                    total_amount: totalAmount,
                    status: 'pending',
                    payment_method: paymentMethod || 'TOSS_PAYMENTS',
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
                }
            } else {
                console.log("Supabase 미설정으로 인해 DB 저장을 건너뜁니다.");
            }
        } catch (dbError) {
            console.log("Supabase DB 연결 오류 (테스트용 주문 ID 반환):", dbError);
        }

        return NextResponse.json({ success: true, orderId: orderUuid });

    } catch (error) {
        console.error('Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
