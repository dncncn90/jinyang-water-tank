'use client';

import { useState, useRef, useEffect } from 'react';
import { Store, Send, X, MessageSquare, ChevronRight, CheckCircle2, RotateCcw, Box, Truck, Receipt, Check, ShoppingCart, FileText } from 'lucide-react';
import { PRICING_DB, calculateLogistics, getProductName, PRODUCTS } from '@/lib/products';
import { useCart } from '@/context/CartContext';

type Message = {
    id: string;
    role: 'system' | 'user' | 'assistant';
    content: string;
    type?: 'text' | 'product-recommendation' | 'quote-ready' | 'options';
    options?: { label: string; value: string }[];
    productData?: any;
};

type QuoteState = {
    step: 'INIT' | 'USAGE_SELECTED' | 'RECOMMENDATION_SHOWN' | 'CAPACITY_SELECTED' | 'FITTING_SIZE_SELECTED' | 'FITTING_SELECTED' | 'LID_SELECTED' | 'DELIVERY_METHOD_CHOSEN' | 'DONE';
    capacity?: string;
    type?: 'standard' | 'm_series' | 'u_series' | 'white';
    fittingSize?: string;
    fittingType?: 'bronze' | 'pe' | 'none';
    lid?: 'small' | 'large' | 'none';
    location?: string;
    shippingCost: number;
    logisticsData?: {
        distance: number;
        truckType: '1ton' | '5ton';
        truckCount: number;
        costPerTruck: number;
    };
    totalPrice: number;
    items: { name: string; price: number; quantity: number }[];
    tempUsage?: string;
    recType?: string;
    deliveryMethod?: 'delivery' | 'pickup';
};

export default function FloatingChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const { addToCart } = useCart();

    // Quote State
    const [quoteState, setQuoteState] = useState<QuoteState>({
        step: 'INIT',
        totalPrice: 0,
        shippingCost: 0,
        items: []
    });

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: '안녕하세요! 진양스마트견적입니다.\n고객님께 딱 맞는 물탱크 견적을 내어드릴게요.\n\n먼저, 어떤 형태의 물탱크를 찾으시나요?',
            type: 'options',
            options: [
                { label: '원형 물탱크 (튼튼하고 가성비 좋음)', value: 'standard' },
                { label: '사각 물탱크 (공간 효율, 옥상용)', value: 'm_series' }
            ]
        }
    ]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (isOpen && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    // Listen for custom open-chat event
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat', handleOpenChat);
        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    const addMessage = (role: 'user' | 'assistant', content: string, type: Message['type'] = 'text', options?: Message['options']) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role,
            content,
            type,
            options
        }]);
    };

    const calculateFinalQuote = async (deliveryMethod: 'delivery' | 'pickup', locationInput: string) => {
        let finalState = { ...quoteState };
        let responseText = '';
        let nextType: Message['type'] = 'quote-ready';

        if (deliveryMethod === 'pickup') {
            finalState.step = 'DONE';
            finalState.location = '방문 수령 (경기도 수원시 팔달구 효원로 209-5)';
            finalState.shippingCost = 0;
            finalState.logisticsData = {
                distance: 0,
                truckType: '1ton',
                truckCount: 1,
                costPerTruck: 0
            };
            responseText = `견적 산출이 완료되었습니다!\n\n- 수령 방법: 방문 수령 (경기도 수원시 팔달구 효원로 209-5)\n- 운임: 0원\n\n아래 버튼을 눌러 상세 견적서를 확인하세요.`;
        } else {
            const logistics = await calculateLogistics(
                quoteState.capacity || '1',
                (quoteState.type || 'standard') as string,
                1,
                locationInput
            );

            finalState.step = 'DONE';
            finalState.location = locationInput;
            finalState.shippingCost = logistics.totalShipping;
            finalState.logisticsData = logistics;

            const truckInfo = `${logistics.truckType === '1ton' ? '1톤' : '5톤'} 트럭 ${logistics.truckCount}대`;
            responseText = `견적 산출이 완료되었습니다!\n\n- 배송지: ${locationInput} (약 ${logistics.distance}km)\n- 배차: ${truckInfo}\n- 예상 운임: ${logistics.totalShipping.toLocaleString()}원\n\n아래 버튼을 눌러 상세 견적서를 확인하세요.`;
        }

        setQuoteState(finalState);
        addMessage('assistant', responseText, nextType);
    };

    const processUserInput = (text: string) => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            // Step 3: Location Context -> Recommendation (User types or selects location context)
            // Actually, location context is better as options.
            // Let's assume this is Step 4: Final Capacity Input after Recommendation
            if (quoteState.step === 'RECOMMENDATION_SHOWN') {
                const numberMatch = text.match(/([0-9.]+)/);
                if (numberMatch) {
                    const cap = numberMatch[1];
                    // Map recommendation to DB key
                    // quoteState.recType should hold 'standard' | 'm_series' | 'u_series' | 'white'
                    const dbKey = (quoteState.recType || 'standard') as keyof typeof PRICING_DB.tanks;

                    if (PRICING_DB.tanks[dbKey] && (PRICING_DB.tanks[dbKey] as any)[cap]) {

                        const basePrice = (PRICING_DB.tanks[dbKey] as any)[cap];

                        setQuoteState(prev => ({
                            ...prev,
                            step: 'CAPACITY_SELECTED',
                            capacity: cap,
                            type: dbKey as any,
                            items: [{
                                name: `${cap}톤 물탱크 (${getProductName(dbKey)})`,
                                price: basePrice,
                                quantity: 1
                            }],
                            totalPrice: basePrice
                        }));

                        addMessage('assistant', `${cap}톤으로 선택하셨습니다.\n연결하실 배관(피팅) 사이즈가 어떻게 되나요? \n(모르시면 '선택안함'을 눌러주세요)`, 'options', [
                            { label: '15mm', value: '15' }, { label: '20mm', value: '20' },
                            { label: '25mm', value: '25' }, { label: '40mm', value: '40' },
                            { label: '50mm', value: '50' }, { label: '선택안함 (필요없음)', value: 'none' }
                        ]);
                    } else {
                        addMessage('assistant', `죄송합니다. 선택하신 제품(${getProductName(dbKey)})에는 ${cap}톤 모델이 없습니다. \n다른 용량을 입력해주세요.`);
                    }
                } else {
                    addMessage('assistant', '용량을 숫자로 정확히 입력해주세요. (예: 3톤)');
                }
            }

            // Step Last: Location Input (Address)
            else if (quoteState.step === 'DELIVERY_METHOD_CHOSEN') { // Address Input step
                const location = text;
                calculateFinalQuote('delivery', location);
            }

        }, 800);
    };

    const handleOptionSelect = (value: string, label: string) => {
        addMessage('user', label);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            let nextState = { ...quoteState };
            let responseText = '';
            let nextOptions: Message['options'] = undefined;
            let nextType: Message['type'] = 'text';

            // Step 1: Shape Selected -> Ask Capacity
            if (quoteState.step === 'INIT') {
                const shape = value;
                nextState.step = 'RECOMMENDATION_SHOWN' as any;
                nextState.recType = shape;

                responseText = `${shape === 'standard' ? '원형' : '사각'} 물탱크를 선택하셨습니다.\n\n필요하신 용량을 선택해주세요.`;

                // Construct options based on recType
                if (shape === 'm_series') {
                    nextOptions = [
                        { label: '0.2톤 (200L 소용량, 좁은 틈새 보관용)', value: '0.2' },
                        { label: '0.4톤 (베란다, 세탁실 등 협소 공간용)', value: '0.4' },
                        { label: '0.6톤 (다용도실 모서리 밀착형)', value: '0.6' },
                        { label: '1톤 (가장 인기 있는 기성 사각 베스트셀러)', value: '1' },
                        { label: '2톤 (옥상/지하실 코너용 대용량)', value: '2' }
                    ];
                } else {
                    nextOptions = [
                        { label: '0.2톤 (일반 가정집, 소형 상가용)', value: '0.2' },
                        { label: '0.4톤 (다가구 주택, 좁은 공간용)', value: '0.4' },
                        { label: '0.6톤 (다용도실용 중소형 사이즈)', value: '0.6' },
                        { label: '1톤 (가장 대중적인 다목적 표준 용량)', value: '1' },
                        { label: '2톤 (옥상용, 농업용수로 널리 쓰임)', value: '2' },
                        { label: '3톤 (중소형 공장, 대농장, 상가 건물용)', value: '3' },
                        { label: '4톤 (안정적인 용량 확보가 필요한 현장)', value: '4' },
                        { label: '5톤 (대량 용수 확보용 초대형 탱크)', value: '5' },
                        { label: '6톤 (다량의 급수 및 특수 시설용)', value: '6' },
                        { label: '8톤 (산업단지나 시설 재배 특대형)', value: '8' },
                        { label: '10톤 (대규모 플랜트, 소방용수 등 최대 용량)', value: '10' }
                    ];
                }
                nextType = 'options';
            }

            // Step 3: Capacity Selected -> Ask Fitting Size
            else if (quoteState.step === 'RECOMMENDATION_SHOWN') {
                const cap = value;
                // quoteState.recType should hold 'standard' | 'm_series' | 'u_series' | 'white'
                const dbKey = (quoteState.recType || 'standard') as keyof typeof PRICING_DB.tanks;
                const basePrice = (PRICING_DB.tanks[dbKey] as any)[cap];

                // Fallback if invalid (shouldn't happen with buttons)
                if (!basePrice) {
                    responseText = '죄송합니다. 해당 용량의 가격 정보가 없습니다. 상담원에게 문의해주세요.';
                    nextType = 'text';
                } else {
                    nextState.step = 'CAPACITY_SELECTED';
                    nextState.capacity = cap;
                    nextState.type = dbKey as any;
                    nextState.items = [{
                        name: `${cap}톤 물탱크 (${getProductName(dbKey)})`,
                        price: basePrice,
                        quantity: 1
                    }];
                    nextState.totalPrice = basePrice;

                    responseText = `${cap}톤으로 선택하셨습니다.\n연결하실 배관(피팅) 사이즈가 어떻게 되나요? \n(모르시면 '선택안함'을 눌러주세요)`;
                    nextOptions = [
                        { label: '15mm', value: '15' }, { label: '20mm', value: '20' },
                        { label: '25mm', value: '25' }, { label: '40mm', value: '40' },
                        { label: '50mm', value: '50' }, { label: '선택안함 (필요없음)', value: 'none' }
                    ];
                    nextType = 'options';
                }
            }

            // Step 4: Fitting Size -> Ask Fitting Type (Standard Flow resumes)
            else if (quoteState.step === 'CAPACITY_SELECTED') {
                if (value === 'none') {
                    nextState.step = 'FITTING_SELECTED';
                    nextState.fittingSize = undefined;
                    responseText = `피팅을 선택하지 않으셨습니다.\n물탱크 뚜껑이 필요하신가요?`;
                    nextOptions = [
                        { label: '소 (10,000원)', value: 'small' },
                        { label: '대 (20,000원)', value: 'large' },
                        { label: '필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                } else {
                    nextState.step = 'FITTING_SIZE_SELECTED';
                    nextState.fittingSize = value;
                    responseText = `${value}mm를 선택하셨습니다. 피팅 재질을 선택해주세요.`;
                    nextOptions = [
                        { label: '청동 (내구성 우수)', value: 'bronze' },
                        { label: 'PE제작 (부식 없음)', value: 'pe' },
                        { label: '선택안함 (필요없음)', value: 'none' }
                    ];
                    nextType = 'options';
                }
            }

            // Step 5: Fitting Material -> Ask Lid
            else if (quoteState.step === 'FITTING_SIZE_SELECTED') {
                nextState.step = 'FITTING_SELECTED';

                if (value !== 'none') {
                    nextState.fittingType = value as 'bronze' | 'pe';
                    const fitPrice = (PRICING_DB.fittings as any)[value][nextState.fittingSize!];
                    nextState.items.push({
                        name: `${value === 'bronze' ? '청동' : 'PE'} 피팅 ${nextState.fittingSize}mm`,
                        price: fitPrice || 0,
                        quantity: 1
                    });
                    if (fitPrice) nextState.totalPrice += fitPrice;
                    responseText = `피팅이 추가되었습니다.\n물탱크 뚜껑이 필요하신가요?`;
                } else {
                    responseText = `피팅을 선택하지 않으셨습니다.\n물탱크 뚜껑이 필요하신가요?`;
                }

                nextOptions = [
                    { label: '소 (600L 이하 / 1만원)', value: 'small' },
                    { label: '대 (1톤 이상 / 2만원)', value: 'large' },
                    { label: '필요없음 (기존 보유)', value: 'none' }
                ];
                nextType = 'options';
            }

            // Step 6: Lid -> Ask Delivery Method
            else if (quoteState.step === 'FITTING_SELECTED') {
                nextState.step = 'LID_SELECTED';
                nextState.lid = value as any;

                if (value !== 'none') {
                    const lidPrice = PRICING_DB.lids[value as 'small' | 'large'];
                    nextState.items.push({
                        name: `물탱크 뚜껑 (${label})`,
                        price: lidPrice,
                        quantity: 1
                    });
                    nextState.totalPrice += lidPrice;
                }

                responseText = `마지막으로 수령 방법을 선택해주세요.`;
                nextOptions = [
                    { label: '일반 화물 배송 (착불)', value: 'delivery' },
                    { label: '방문 수령 (수원시 팔달구 효원로 209-5 / 운임 0원)', value: 'pickup' }
                ];
                nextType = 'options';
            }

            // Step 7: Delivery Method Selected -> Ask Address OR Finish
            else if (quoteState.step === 'LID_SELECTED') {
                nextState.deliveryMethod = value as 'delivery' | 'pickup';
                if (value === 'pickup') {
                    calculateFinalQuote('pickup', '방문 수령');
                } else {
                    // Ask for Address text
                    nextState.step = 'DELIVERY_METHOD_CHOSEN';
                    responseText = `배송받으실 상세 주소(동/읍/면 까지)를 입력해주세요.\n(예: 경기도 화성시 남양읍)`;
                    nextType = 'text';
                }
            }

            setQuoteState(nextState);
            addMessage('assistant', responseText, nextType, nextOptions);

        }, 600);
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        addMessage('user', input);
        setInput('');
        processUserInput(input);
    };

    const handleReset = () => {
        setQuoteState({ step: 'INIT', totalPrice: 0, shippingCost: 0, items: [] });
        setMessages([{
            id: Date.now().toString(),
            role: 'assistant',
            content: '새로운 견적 상담을 시작합니다.\n먼저, 어떤 형태의 물탱크를 찾으시나요?',
            type: 'options',
            options: [
                { label: '원형 물탱크 (튼튼하고 가성비 좋음)', value: 'standard' },
                { label: '사각 물탱크 (공간 효율, 옥상용)', value: 'm_series' }
            ]
        }]);
        setShowQuoteModal(false);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>견적서 - 진양스마트견적</title>
                        <style>
                            @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                            body { font-family: 'Pretendard', 'Malgun Gothic', sans-serif; padding: 0; margin: 0; color: #333; -webkit-print-color-adjust: exact; }
                            .page { width: 210mm; min-height: 297mm; padding: 20mm; margin: 0 auto; background: white; box-sizing: border-box; position: relative; }
                            
                            /* Header */
                            .header { text-align: center; margin-bottom: 40px; position: relative; border-bottom: 2px solid #333; padding-bottom: 20px; }
                            .header h1 { font-size: 32px; font-weight: 900; letter-spacing: 5px; margin: 0; color: #111; }
                            .stamp { position: absolute; right: 0; top: 10px; font-size: 12px; color: #999; border: 1px solid #ddd; padding: 2px 6px; border-radius: 2px; }

                            /* Meta */
                            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 40px; gap: 20px; font-size: 14px; }
                            .meta-item { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                            .meta-label { font-weight: bold; color: #555; }
                            .meta-value { font-weight: 500; }

                            /* Table */
                            .item-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                            .item-table th { background-color: #f8f9fa; border-top: 2px solid #333; border-bottom: 1px solid #888; padding: 12px 10px; font-size: 13px; font-weight: bold; color: #333; text-align: center; }
                            .item-table td { padding: 12px 10px; border-bottom: 1px solid #eee; font-size: 13px; color: #444; }
                            .item-table td.center { text-align: center; }
                            .item-table td.right { text-align: right; }
                            .item-table tr:last-child td { border-bottom: 1px solid #333; }

                            /* Summary Section */
                            .summary-container { display: flex; justify-content: flex-end; margin-bottom: 40px; }
                            .summary-box { width: 320px; text-align: right; }
                            .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #666; }
                            .summary-row.total { margin-top: 15px; padding-top: 15px; border-top: 2px solid #333; color: #1a56db; align-items: flex-end; }
                            .total-label { font-size: 16px; font-weight: bold; }
                            .total-value { font-size: 24px; font-weight: 800; }
                            .vat-note { font-size: 11px; color: #1a56db; margin-top: 5px; opacity: 0.8; }

                            /* Bank Info */
                            .bank-container { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; text-align: center; background-color: #fcfcfc; margin-bottom: 40px; }
                            .bank-label { font-size: 12px; color: #666; font-weight: bold; margin-bottom: 8px; display: block; }
                            .bank-account { font-size: 18px; font-weight: 800; color: #333; letter-spacing: 0.5px; }
                            .bank-bank { color: #16a34a; margin-right: 8px; }

                            /* Footer */
                            .footer { text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 20px; line-height: 1.6; }
                        </style>
                    </head>
                    <body>
                        <div class="page">
                            <div class="header">
                                <h1>견 적 서</h1>
                                <div class="stamp">(인) 생략</div>
                            </div>

                            <div class="meta-grid">
                                <div>
                                    <div class="meta-item">
                                        <span class="meta-label">발행일자</span>
                                        <span class="meta-value">${new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div class="meta-item" style="margin-top: 10px;">
                                        <span class="meta-label">수신</span>
                                        <span class="meta-value">고객님 귀하</span>
                                    </div>
                                    <div class="meta-item" style="margin-top: 10px;">
                                        <span class="meta-label">배송지</span>
                                        <span class="meta-value" style="max-width: 150px; text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${quoteState.location || '-'}</span>
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div class="meta-item">
                                        <span class="meta-label">공급자</span>
                                        <span class="meta-value">진양건재</span>
                                    </div>
                                    <div class="meta-item" style="margin-top: 10px;">
                                        <span class="meta-label">등록번호</span>
                                        <span class="meta-value">124-53-29653</span>
                                    </div>
                                    <div class="meta-item" style="margin-top: 10px;">
                                        <span class="meta-label">연락처</span>
                                        <span class="meta-value">031-236-8227</span>
                                    </div>
                                </div>
                            </div>

                            <table class="item-table">
                                <colgroup>
                                    <col style="width: auto">
                                    <col style="width: 60px">
                                    <col style="width: 120px">
                                    <col style="width: 120px">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>품목명</th>
                                        <th>수량</th>
                                        <th>단가</th>
                                        <th>공급가액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${quoteState.items.map(item => `
                                        <tr>
                                            <td>${item.name}</td>
                                            <td class="center">${item.quantity || 1}</td>
                                            <td class="right">${item.price.toLocaleString()}</td>
                                            <td class="right">${((item.price) * (item.quantity || 1)).toLocaleString()}</td>
                                        </tr>
                                    `).join('')}
                                    <!-- 빈 줄 채우기 (Optional) -->
                                    <tr>
                                        <td style="height: 30px;"></td><td></td><td></td><td></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="summary-container">
                                <div class="summary-box">
                                    <div class="summary-row">
                                        <span>공급가액</span>
                                        <span>${quoteState.totalPrice.toLocaleString()} 원</span>
                                    </div>
                                    <div class="summary-row">
                                        <span>부가세 (VAT)</span>
                                        <span>${Math.floor(quoteState.totalPrice * 0.1).toLocaleString()} 원</span>
                                    </div>
                                    <div class="summary-row">
                                        <span style="color: #d97706;">+ 운임 (착불/별도)</span>
                                        <span style="color: #d97706;">${quoteState.shippingCost.toLocaleString()} 원</span>
                                    </div>
                                    <div class="summary-row total">
                                        <span class="total-label">총 견적금액</span>
                                        <span class="total-value">${(quoteState.totalPrice + Math.floor(quoteState.totalPrice * 0.1)).toLocaleString()} 원</span>
                                    </div>
                                    <div class="vat-note">* 위 금액은 부가세가 포함된 최종 입금액입니다.</div>
                                </div>
                            </div>

                            <div class="bank-container">
                                <span class="bank-label">입금 계좌 안내</span>
                                <div class="bank-account">
                                    <span class="bank-bank">KB국민</span> 9-63608227-53 (진양건재)
                                </div>
                            </div>

                            <div class="footer">
                                * 본 견적서는 온라인 발급 전용이며, 실 재고 유무 및 운임 변동이 있을 수 있습니다. (직인생략)<br/>
                                경기도 수원시 팔달구 효원로 209-5 | Tel: 031-236-8227 | Fax: 031-237-4435
                            </div>
                        </div>
                        <script>
                            window.onload = function() { window.print(); }
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const handleAddToCart = () => {
        // Find matching product in PRODUCTS array to get image and correct IDs
        // Here we do a simple mapping based on category/type
        let productIdStr = 'pe-round-series';
        if (quoteState.type === 'm_series') {
            productIdStr = 'pe-square-series';
        }

        const matchedProduct = PRODUCTS.find(p => p.id === productIdStr);

        // Convert quote options to cart options format
        const formattedOptions = [];

        // Helper to format size nicely like the product page
        const mapSize = (s: string) => {
            if (s === '15') return '15A (1/2")';
            if (s === '20') return '20A (3/4")';
            if (s === '25') return '25A (1")';
            if (s === '40') return '40A (1.5")';
            if (s === '50') return '50A (2")';
            if (s === '65') return '65A (2.5")';
            if (s === '75') return '75A (3")';
            if (s === '100') return '100A (4")';
            return `${s}mm`;
        };

        if (quoteState.fittingSize && quoteState.fittingSize !== 'none') {
            formattedOptions.push({
                name: '피팅 재질',
                value: quoteState.fittingType === 'bronze' ? '청동(신주) 피팅' : 'PE 제작 피팅',
                priceChange: 0
            });
            formattedOptions.push({
                name: quoteState.fittingType === 'bronze' ? '피팅 규격 (청동 선택 시)' : '피팅 규격 (PE 선택 시)',
                value: mapSize(quoteState.fittingSize),
                priceChange: quoteState.items.find(i => i.name.includes('피팅'))?.price || 0
            });
        }
        // Assuming valveSize and hasGauge are not part of current quoteState,
        // but if they were, they would be added here.
        // For now, removing them as they are not defined in the current quoteState type.
        // if (quoteState.valveSize && quoteState.valveSize !== 'none') {
        //     formattedOptions.push({
        //         name: '볼밸브',
        //         value: `${quoteState.valveSize}mm`,
        //         priceChange: quoteState.items.find(i => i.name.includes('밸브'))?.price || 0
        //     });
        // }
        // if (quoteState.hasGauge) {
        //     formattedOptions.push({
        //         name: '레벨 게이지',
        //         value: '추가함',
        //         priceChange: quoteState.items.find(i => i.name.includes('게이지'))?.price || 0
        //     });
        // }
        if (quoteState.lid && quoteState.lid !== 'none') {
            formattedOptions.push({
                name: '물탱크 뚜껑',
                value: quoteState.lid === 'small' ? '소형' : '대형',
                priceChange: quoteState.items.find(i => i.name.includes('뚜껑'))?.price || 0
            });
        }

        const shapeName = quoteState.type === 'm_series' ? '사각' : '원형';

        addToCart({
            productId: productIdStr,
            name: `${quoteState.capacity}톤 ${shapeName} 물탱크`,
            basePrice: quoteState.items[0]?.price || 0, // Assumption: First item is the tank
            options: formattedOptions,
            requirements: `챗봇 간편 견적으로 추가됨`,
            quantity: 1,
            image: quoteState.type === 'm_series' ? '/images/products/tank-square-real.jpg' : '/images/products/tank-round-real.png'
        });

        alert('장바구니에 담겼습니다!');
        setShowQuoteModal(false);
        setIsOpen(false);
    };

    return (
        <>
            <button
                id="floating-chat-trigger"
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'hidden' : 'flex'} fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-50 items-center gap-2 bg-industrial-600 hover:bg-industrial-500 text-white font-bold py-3.5 px-5 sm:py-4 sm:px-6 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95`}
            >
                <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-lg">진양스마트견적 Chat</span>
                <MessageSquare className="w-6 h-6 ml-1" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[100] w-full sm:w-[420px] h-[100dvh] sm:h-[650px] flex flex-col bg-white sm:rounded-2xl shadow-2xl border-none sm:border sm:border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">

                    <div className="bg-industrial-900 p-4 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-industrial-700 flex items-center justify-center border-2 border-industrial-500 relative">
                                <Store className="w-6 h-6" />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-industrial-900 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold">진양스마트견적</h3>
                                <p className="text-xs text-industrial-300">● 실시간 견적 중</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-3 hover:bg-industrial-800 rounded-full transition-all active:scale-90"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4" ref={scrollRef}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'hidden' : 'bg-industrial-100 text-industrial-600'}`}>
                                        <Store className="w-5 h-5" />
                                    </div>

                                    <div className="space-y-2 w-full">
                                        {msg.content && (
                                            <div className={`p-4 rounded-xl text-base whitespace-pre-wrap leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-industrial-600 text-white rounded-tr-none' : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none font-medium'}`}>
                                                {msg.content}
                                            </div>
                                        )}

                                        {msg.type === 'options' && msg.options && (
                                            <div className="flex flex-col gap-2 mt-2">
                                                {msg.options.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => handleOptionSelect(opt.value, opt.label)}
                                                        className="bg-white border-2 border-industrial-100 hover:border-industrial-500 text-gray-800 hover:text-industrial-600 font-bold py-4 px-5 rounded-2xl transition-all text-left flex justify-between items-center group text-base sm:text-lg active:bg-industrial-50 shadow-sm"
                                                    >
                                                        <span>{opt.label}</span>
                                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-industrial-500 shrink-0"></div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {msg.type === 'quote-ready' && (
                                            <button
                                                onClick={() => { setShowQuoteModal(true); }}
                                                className="w-full bg-white border border-industrial-200 text-industrial-700 p-3 rounded-xl flex items-center justify-between hover:bg-industrial-50 transition-colors group animate-pulse"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="block font-bold text-gray-900 text-sm">견적서 보기 및 장바구니 담기</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-industrial-500 font-medium">Click to Open</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-2 max-w-[80%]">
                                    <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center shrink-0 text-industrial-600">
                                        <Store className="w-5 h-5" />
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                                        <RotateCcw className="w-4 h-4 animate-spin text-industrial-500" />
                                        <span className="text-sm text-gray-500 font-medium">최적의 견적을 산출 중입니다...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {!showQuoteModal && (
                        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="메시지 입력..."
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-full focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 block pl-5 p-4 pr-14 transition-all"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-industrial-900 text-white p-2 rounded-full hover:bg-industrial-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {showQuoteModal && (
                        <div className="absolute inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-bottom-10 duration-200">
                            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                                <h3 className="font-bold text-lg text-gray-900">
                                    견적서 요약
                                </h3>
                                <button onClick={() => setShowQuoteModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-6">

                                {/* 1. QUOTE SUMMARY VIEW */}
                                <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-3">
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-gray-500 font-medium">품목</span>
                                        <span className="font-bold text-gray-900">{quoteState.capacity || '-'}톤 물탱크 ({getProductName(quoteState.type || 'standard')})</span>
                                    </div>

                                    {quoteState.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm py-1">
                                            <span className="text-gray-600">- {item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                                            <span className="font-medium text-gray-800">{item.price.toLocaleString()}원</span>
                                        </div>
                                    ))}

                                    <div className="flex justify-between text-sm py-1 pt-3 border-t border-gray-100">
                                        <span className="text-gray-600">배송지 ({quoteState.deliveryMethod === 'pickup' ? '방문수령' : '일반 배송'})</span>
                                        <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">{quoteState.location || '-'}</span>
                                    </div>

                                    <div className="flex justify-between text-sm py-1 mt-2">
                                        <span className="text-gray-600">공급가액</span>
                                        <span className="font-medium text-gray-800">{quoteState.totalPrice.toLocaleString()}원</span>
                                    </div>

                                    <div className="flex justify-between text-sm py-1">
                                        <span className="text-gray-600">부가세(10%)</span>
                                        <span className="font-medium text-gray-800">{(quoteState.totalPrice * 0.1).toLocaleString()}원</span>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
                                        <span className="font-bold text-gray-900">최종 제품가</span>
                                        <span className="font-bold text-industrial-600 text-lg">{(quoteState.totalPrice * 1.1).toLocaleString()}원</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 text-right -mt-2">표시된 금액은 부가세가 포함된 실제 결제 금액입니다.</p>

                                    <div className="flex justify-between text-sm py-2 mt-2 bg-yellow-50 rounded px-3 border border-yellow-100">
                                        <span className="text-yellow-800 font-medium">예상 운임</span>
                                        <span className="font-bold text-yellow-800">약 {quoteState.shippingCost.toLocaleString()}원 (착불/변동가능)</span>
                                    </div>
                                </div>

                                <div className="bg-gray-100/50 p-4 rounded-xl text-xs text-gray-600 space-y-3 leading-relaxed border border-gray-200">
                                    <div className="font-bold text-gray-800 mb-1">[투명한 정찰제 안내]</div>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>진양건재 스마트견적의 모든 합계 금액은 부가가치세(VAT) 10%가 포함된 최종 가격입니다.</li>
                                        <li>결제 시 세금계산서 및 현금영수증이 100% 의무 발행되며, 별도의 추가 금액은 절대 발생하지 않습니다.</li>
                                        <li>저희 진양건재는 투명한 거래를 통해 고객님의 세무 처리를 확실하게 도와드립니다.</li>
                                    </ul>

                                    <div className="font-bold text-industrial-700 mt-4 mb-1">[진양만의 특별 혜택]</div>
                                    <ul className="space-y-1">
                                        <li>🛠️ <b>무료 타공 서비스</b>: 피팅 구매 시, 원하시는 위치에 무료로 구멍을 뚫어 보내드립니다.</li>
                                        <li>📍 <b>방문 수령 시</b>: 운임 0원 (경기도 수원시 팔달구 효원로 209-5 / 진양건재)</li>
                                    </ul>

                                    <div className="font-bold text-gray-800 mt-4 mb-1">[운송비 별도 안내]</div>
                                    <ul className="list-disc pl-4 space-y-1 text-gray-500">
                                        <li>제품 가격은 정찰제이나, <b>운송비는 지역 및 배차 상황에 따른 실비(착불)</b>가 적용됩니다.</li>
                                        <li>과도한 운임이 발생하지 않도록 가장 효율적인 배송 방식을 사장님이 직접 조율해 드립니다.</li>
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-3 mt-auto pt-2">
                                    <div className="bg-blue-50 text-blue-900 p-3 rounded-lg text-xs text-center border border-blue-100 mb-1">
                                        <b>"물탱크는 규격과 부속 선택이 중요합니다."</b><br />
                                        스마트견적으로 뽑으신 내용을 토대로 전문가가 직접 재검토해 드립니다.<br />
                                        지금 바로 상담 버튼을 눌러 확정 견적을 받으세요!
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-4 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 text-lg"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        장바구니에 담기
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={handlePrint}
                                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
                                        >
                                            <FileText className="w-5 h-5" />
                                            견적서 인쇄
                                        </button>

                                        <button
                                            onClick={handleReset}
                                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            다시 견적받기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
