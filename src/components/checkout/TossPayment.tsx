'use client';

import { useEffect, useRef, useState } from 'react';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { Loader2 } from 'lucide-react';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
// 주문마다 고유한 customerKey 생성
const customerKey = `customer_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

interface TossPaymentProps {
    amount: number;
    orderId: string;
    orderName: string;
    customerName: string;
    customerEmail?: string;
}

export default function TossPayment({ amount, orderId, orderName, customerName, customerEmail }: TossPaymentProps) {
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
    const [price, setPrice] = useState(amount);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // Load Payment Widget
                const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

                // Render Payment Methods
                const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
                    '#payment-widget',
                    { value: amount },
                    { variantKey: 'DEFAULT' }
                );

                // Render Agreement
                paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });

                paymentWidgetRef.current = paymentWidget;
                paymentMethodsWidgetRef.current = paymentMethodsWidget;

                // Set loading to false after a short delay to ensure rendering completes
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);

            } catch (error) {
                console.error('Error loading Toss Payment Widget:', error);
                setIsLoading(false); // Enable anyway on error so user isn't stuck forever, or maybe show error UI
            }
        })();
    }, [amount]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;
        if (paymentMethodsWidget == null) {
            return;
        }
        paymentMethodsWidget.updateAmount(amount);
    }, [amount]);

    const handlePaymentRequest = async () => {
        const paymentWidget = paymentWidgetRef.current;
        if (!paymentWidget) return;

        try {
            await paymentWidget.requestPayment({
                orderId: orderId,
                orderName: orderName,
                customerName: customerName,
                customerEmail: customerEmail,
                successUrl: `${window.location.origin}/checkout/success`,
                failUrl: `${window.location.origin}/checkout/fail`,
            });
        } catch (error) {
            console.error('Payment Request Error:', error);
            alert('결제 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="w-full">
            {isLoading && (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            )}
            <div id="payment-widget" className="w-full" />
            <div id="agreement" className="w-full" />

            <button
                onClick={handlePaymentRequest}
                disabled={isLoading}
                className={`w-full font-bold py-4 px-6 rounded-xl mt-6 transition-colors shadow-lg ${isLoading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed shadow-none'
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30'
                    }`}
            >
                {isLoading ? '결제창 불러오는 중...' : `${amount.toLocaleString()}원 결제하기`}
            </button>
        </div>
    );
}
