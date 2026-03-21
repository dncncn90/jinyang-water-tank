'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Send, X, MessageSquare, ChevronRight, CheckCircle2, RotateCcw, Box, Truck, Receipt, Check, ShoppingCart, FileText, CreditCard, Phone, Info, HelpCircle } from 'lucide-react';
import { PRICING_DB, calculateLogistics, getProductName, PRODUCTS } from '@/lib/products';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

type Message = {
    id: string;
    role: 'system' | 'user' | 'assistant';
    content: string;
    type?: 'text' | 'product-recommendation' | 'quote-ready' | 'options';
    options?: { 
        label: string; 
        value: string;
        tag?: string;
        capacity?: string;
        description?: string;
        price?: number;
        isBest?: boolean;
    }[];
    productData?: any;
    helpText?: string;
    step?: QuoteState['step'];
};

type QuoteState = {
    step: 'INIT' | 'SHAPE_SELECTED' | 'USAGE_SELECTED' | 'RECOMMENDATION_SHOWN' | 'CAPACITY_SELECTED' | 'FITTING_SIZE_SELECTED' | 'FITTING_COUNT_SELECTED' | 'FITTING_SELECTED' | 'PE_FITTING_SELECTED' | 'NIPPLE_SELECTED' | 'BALLVALVE_SELECTED' | 'BALLTOP_SELECTED' | 'GAUGE_SELECTED' | 'LID_SELECTED' | 'DELIVERY_METHOD_CHOSEN' | 'DONE';
    capacity?: string;
    type?: 'standard' | 'm_series' | 'u_series' | 'white';
    fittingSize?: string;
    fittingCount?: number;
    fittingType?: 'bronze' | 'pe' | 'none';
    nippleSize?: string;
    ballvalveSize?: string;
    balltopSize?: string;
    hasGauge?: boolean;
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

const HELP_TEXTS: Record<string, string> = {
    'INIT': "좁은 공간엔 사각, 가성비와 안정성은 원형을 추천해요.",
    'RECOMMENDATION_SHOWN': "0.4~0.6톤은 가정용, 1톤 이상은 농공업용이나 베스트 상품군으로 가장 많이 써요.",
    'CAPACITY_SELECTED': "탱크에 구멍을 뚫고 배관을 연결하는 입구예요. 20mm가 표준입니다.",
    'FITTING_SIZE_SELECTED': "배관 연결을 위해 보통 1~2개 정도의 구멍(피팅)을 가장 많이 뚫어 사용합니다.",
    'FITTING_COUNT_SELECTED': "신주(청동)는 금속이라 튼튼하고, PE는 약품이나 식품 탱크에 녹슬지 않아 좋아요.",
    'FITTING_SELECTED': "밸브가 없으면 물을 잠글 수 없어요! 단니플(연결부)과 볼밸브(스위치) 세트를 추천해요.",
    'BALLTOP_SELECTED': "물이 꽉 차면 화장실 변기처럼 자동으로 공급을 끊어주는 스마트 부속이에요.",
    'GAUGE_SELECTED': "탱크 밖에서 물이 얼마나 남았는지 눈으로 바로 확인하는 눈금자예요.",
    'LID_SELECTED': "기본 1개는 포함! 분실이나 파손에 대비해 예비용이 필요한 분만 선택하세요.",
    'DELIVERY_METHOD_CHOSEN': "부피가 커서 택배가 안 돼요. 화물(착불)이나 방문(수원)을 골라주세요."
};

export default function FloatingChatWidget() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showQuoteModal, setShowQuoteModal] = useState(false);
    const [isConsultationMode, setIsConsultationMode] = useState(false);
    const [consultationFormData, setConsultationFormData] = useState({ name: '', phone: '', agreed: false });
    const [isConsultationSubmitted, setIsConsultationSubmitted] = useState(false);
    const { addToCart, setShippingAddress, setShippingType } = useCart();

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
            content: '안녕하세요! 진양스마트견적입니다.\n어떤 형태의 물탱크를 찾으시나요?',
            type: 'options',
            options: [
                { label: '원형 물탱크', value: 'standard' },
                { label: '사각 물탱크', value: 'm_series' }
            ],
            helpText: HELP_TEXTS['INIT'],
            step: 'INIT'
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

    const addMessage = (role: 'user' | 'assistant', content: string, type: Message['type'] = 'text', options?: Message['options'], helpText?: string, step?: QuoteState['step']) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role,
            content,
            type,
            options,
            helpText,
            step
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
        addMessage('assistant', responseText, nextType, undefined, undefined, 'DONE');
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
                        ], undefined, 'CAPACITY_SELECTED');
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

    const handleOptionSelect = (value: string, label: string, buttonStep?: QuoteState['step']) => {
        addMessage('user', label);
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // Crucial: Deep copy items array to avoid mutation bugs!
            let nextState = { ...quoteState, items: [...quoteState.items] };
            let responseText = '';
            let nextOptions: Message['options'] = undefined;
            let nextType: Message['type'] = 'text';

            const evaluationStep = buttonStep || quoteState.step;

            // Step 1: Shape Selected -> Ask Capacity
            if (evaluationStep === 'INIT') {
                const shape = value;
                nextState.step = 'RECOMMENDATION_SHOWN' as any;
                nextState.recType = shape;
                responseText = `${shape === 'standard' ? '원형' : '사각'} 선택하셨군요!\n필요한 용량을 선택해주세요.`;
                
                // Helper to get price and format label
                const getLabel = (cap: string, desc: string, isBest = false) => {
                    const price = (PRICING_DB.tanks[shape as keyof typeof PRICING_DB.tanks] as any)[cap];
                    return { 
                        label: `${isBest ? '★베스트 | ' : ''}${cap}톤 (${desc})${price ? ` - ${price.toLocaleString()}원` : ''}`, 
                        value: cap,
                        tag: isBest ? 'BEST' : undefined,
                        capacity: `${cap}톤`,
                        description: desc,
                        price: price,
                        isBest: isBest
                    };
                };

                if (shape === 'm_series') {
                    nextOptions = [
                        getLabel('0.2', '소형/가정용'),
                        getLabel('0.4', '가정용'),
                        getLabel('0.6', '추천/다용도'),
                        getLabel('1', '가장 많이 씀', true),
                        getLabel('2', '대용량 확보')
                    ];
                } else {
                    nextOptions = [
                        getLabel('0.2', '소형/가정용'),
                        getLabel('0.4', '가정용'),
                        getLabel('0.6', '추천/다용도'),
                        getLabel('1', '가장 많이 씀', true),
                        getLabel('2', '농업용/식당용'),
                        getLabel('3', '중형/학원·상가'),
                        getLabel('4', '빌라/소형건물'),
                        getLabel('5', '현장/대용량'),
                        getLabel('6', '대형'),
                        getLabel('8', '대형'),
                        getLabel('10', '초대형/소방용')
                    ];
                }
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['RECOMMENDATION_SHOWN'], 'RECOMMENDATION_SHOWN');
            }

            // Step 2: Capacity Selected -> Ask Fitting Size
            else if (evaluationStep === 'RECOMMENDATION_SHOWN') {
                const cap = value;
                const dbKey = (quoteState.recType || 'standard') as keyof typeof PRICING_DB.tanks;
                const basePrice = (PRICING_DB.tanks[dbKey] as any)[cap] || 0;
                if (basePrice === 0) {
                    addMessage('assistant', '해당 용량의 가격 정보가 없습니다. 상담원에게 문의해주세요.');
                } else {
                    nextState.step = 'CAPACITY_SELECTED';
                    nextState.capacity = cap;
                    nextState.type = dbKey as any;
                    nextState.items = [{ name: `${cap}톤 물탱크 (${getProductName(dbKey)})`, price: basePrice, quantity: 1 }];
                    nextState.totalPrice = basePrice;
                    responseText = `${cap}톤 선택 완료!\n\n물탱크에 배관을 연결할 피팅 크기를 골라주세요.`;
                    nextOptions = [
                        { label: '15mm', value: '15' }, { label: '20mm', value: '20' },
                        { label: '25mm', value: '25' }, { label: '40mm', value: '40' },
                        { label: '50mm', value: '50' }, { label: '피팅 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                    addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['CAPACITY_SELECTED'], 'CAPACITY_SELECTED');
                }
            }

            // Step 3: Fitting Size Selected -> If None Jump to Balltop, else Fitting Count
            else if (evaluationStep === 'CAPACITY_SELECTED') {
                if (value === 'none') {
                    nextState.step = 'BALLTOP_SELECTED'; // Jump to Balltop
                    responseText = `피팅 없이 진행합니다.\n\n볼탑(자동밸브)이 필요하신가요?`;
                    nextOptions = [
                        { label: '15mm', value: 'balltop_15' }, { label: '20mm', value: 'balltop_20' },
                        { label: '25mm', value: 'balltop_25' }, { label: '32mm', value: 'balltop_32' },
                        { label: '40mm', value: 'balltop_40' }, { label: '50mm', value: 'balltop_50' },
                        { label: '볼탑 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                    addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['BALLTOP_SELECTED'], 'BALLTOP_SELECTED');
                } else {
                    nextState.step = 'FITTING_SIZE_SELECTED';
                    nextState.fittingSize = value;
                    responseText = `${value}mm 피팅 선택!\n\n몇 개가 필요하신가요?`;
                    nextOptions = [
                        { label: '1개', value: '1' }, { label: '2개', value: '2' },
                        { label: '3개', value: '3' }, { label: '4개', value: '4' }
                    ];
                    nextType = 'options';
                    addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['FITTING_SIZE_SELECTED'], 'FITTING_SIZE_SELECTED');
                }
            }

            // Step 4: Fitting Count Selected -> Ask Material
            else if (evaluationStep === 'FITTING_SIZE_SELECTED') {
                nextState.step = 'FITTING_COUNT_SELECTED';
                nextState.fittingCount = parseInt(value);
                responseText = `${value}개로 준비하겠습니다.\n\n피팅 재질을 선택해주세요.`;
                nextOptions = [
                    { label: '청동(신주)', value: 'bronze' },
                    { label: 'PE제작', value: 'pe' }
                ];
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['FITTING_COUNT_SELECTED'], 'FITTING_COUNT_SELECTED');
            }

            // Step 5: Material Selected -> Ask Bundle (Nipple + Valve)
            else if (evaluationStep === 'FITTING_COUNT_SELECTED') {
                nextState.step = 'FITTING_SELECTED';
                nextState.fittingType = value as 'bronze' | 'pe';
                const fCount = nextState.fittingCount || 1;
                const fitUnitPrice = (PRICING_DB.fittings as any)[value]?.[nextState.fittingSize!] || 0;
                if (fitUnitPrice) {
                    nextState.items.push({ name: `${value === 'bronze' ? '청동' : 'PE'} 피팅 ${nextState.fittingSize}mm`, price: fitUnitPrice, quantity: fCount });
                    nextState.totalPrice += fitUnitPrice * fCount;
                }
                responseText = `${value === 'bronze' ? '청동(신주)' : 'PE'} 피팅 ${nextState.fittingSize}mm × ${fCount}개 추가 완료!\n\n단니플(${nextState.fittingSize}mm) + 볼밸브(${nextState.fittingSize}mm) ${fCount}세트를 함께 담으시겠어요?`;
                nextOptions = [
                    { label: `${fCount}세트 함께 담기 (추천)`, value: 'auto' },
                    { label: '아니요, 직접 선택할게요', value: 'manual' }
                ];
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['FITTING_SELECTED'], 'FITTING_SELECTED');
            }

            // Step 6: Bundle Choice -> Jump to Balltop or Manual
            else if (evaluationStep === 'FITTING_SELECTED') {
                if (value === 'auto') {
                    const fSize = quoteState.fittingSize!;
                    const fCount = quoteState.fittingCount || 1;
                    const nippleUnit = PRICING_DB.fittings.nipple[fSize as keyof typeof PRICING_DB.fittings.nipple] || 0;
                    const valveUnit = PRICING_DB.fittings.valve[fSize as keyof typeof PRICING_DB.fittings.valve] || 0;
                    if (nippleUnit) { nextState.items.push({ name: `신주단니플 ${fSize}mm`, price: nippleUnit, quantity: fCount }); nextState.totalPrice += nippleUnit * fCount; }
                    if (valveUnit) { nextState.items.push({ name: `황동볼밸브 ${fSize}mm`, price: valveUnit, quantity: fCount }); nextState.totalPrice += valveUnit * fCount; }

                    nextState.step = 'BALLTOP_SELECTED';
                    responseText = `볼탑(자동밸브)이 필요하신가요?`;
                    nextOptions = [
                        { label: '15mm', value: 'balltop_15' }, { label: '20mm', value: 'balltop_20' },
                        { label: '25mm', value: 'balltop_25' }, { label: '32mm', value: 'balltop_32' },
                        { label: '40mm', value: 'balltop_40' }, { label: '50mm', value: 'balltop_50' },
                        { label: '볼탑 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                    addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['BALLTOP_SELECTED'], 'BALLTOP_SELECTED');
                } else if (value === 'manual') {
                    nextState.step = 'NIPPLE_SELECTED';
                    responseText = `${quoteState.fittingSize}mm 단니플을 몇 개 추가하시겠어요?`;
                    nextOptions = [
                        { label: '1개', value: '1' }, { label: '2개', value: '2' },
                        { label: '3개', value: '3' }, { label: '4개', value: '4' },
                        { label: '단니플 필요없음', value: '0' }
                    ];
                    nextType = 'options';
                    addMessage('assistant', responseText, nextType, nextOptions, undefined, 'NIPPLE_SELECTED');
                }
            }

            // Step 6-A: Manual Nipple Selection
            else if (evaluationStep === 'NIPPLE_SELECTED') {
                const count = parseInt(value);
                if (count > 0) {
                    const fSize = quoteState.fittingSize!;
                    const nippleUnit = PRICING_DB.fittings.nipple[fSize as keyof typeof PRICING_DB.fittings.nipple] || 0;
                    if (nippleUnit) {
                        nextState.items.push({ name: `신주단니플 ${fSize}mm`, price: nippleUnit, quantity: count });
                        nextState.totalPrice += nippleUnit * count;
                    }
                }
                
                nextState.step = 'BALLVALVE_SELECTED';
                responseText = `${quoteState.fittingSize}mm 볼밸브를 몇 개 추가하시겠어요?`;
                nextOptions = [
                    { label: '1개', value: '1' }, { label: '2개', value: '2' },
                    { label: '3개', value: '3' }, { label: '4개', value: '4' },
                    { label: '볼밸브 필요없음', value: '0' }
                ];
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, undefined, 'BALLVALVE_SELECTED');
            }

            // Step 6-B: Manual Ballvalve Selection
            else if (evaluationStep === 'BALLVALVE_SELECTED') {
                const count = parseInt(value);
                if (count > 0) {
                    const fSize = quoteState.fittingSize!;
                    const valveUnit = PRICING_DB.fittings.valve[fSize as keyof typeof PRICING_DB.fittings.valve] || 0;
                    if (valveUnit) {
                        nextState.items.push({ name: `황동볼밸브 ${fSize}mm`, price: valveUnit, quantity: count });
                        nextState.totalPrice += valveUnit * count;
                    }
                }

                nextState.step = 'BALLTOP_SELECTED';
                responseText = `볼탑(자동밸브)이 필요하신가요?`;
                nextOptions = [
                    { label: '15mm', value: 'balltop_15' }, { label: '20mm', value: 'balltop_20' },
                    { label: '25mm', value: 'balltop_25' }, { label: '32mm', value: 'balltop_32' },
                    { label: '40mm', value: 'balltop_40' }, { label: '50mm', value: 'balltop_50' },
                    { label: '볼탑 필요없음', value: 'none' }
                ];
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['BALLTOP_SELECTED'], 'BALLTOP_SELECTED');
            }

            // Step 7: Balltop Selected -> Ask Gauge
            else if (evaluationStep === 'BALLTOP_SELECTED') {
                nextState.step = 'GAUGE_SELECTED';
                if (value !== 'none') {
                    const sizeLabel = value.replace('balltop_', '');
                    const balltopPrice = (PRICING_DB.fittings.balltop as any)[sizeLabel] || 0;
                    nextState.items.push({ name: `볼탑 ${sizeLabel}mm`, price: balltopPrice, quantity: 1 });
                    nextState.totalPrice += balltopPrice;
                }
                responseText = `레벨게이지(수위계)가 필요하신가요?`;
                nextOptions = [
                    { label: '레벨게이지 추가 (+33,000원)', value: 'yes' },
                    { label: '필요없음', value: 'none' }
                ];
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['GAUGE_SELECTED'], 'GAUGE_SELECTED');
            }

            // Step 8: Gauge Selected -> Ask Lid
            else if (evaluationStep === 'GAUGE_SELECTED') {
                nextState.step = 'LID_SELECTED';
                if (value !== 'none') {
                    nextState.hasGauge = true;
                    const gaugePrice = PRICING_DB.fittings.gauge || 33000;
                    nextState.items.push({ name: '레벨게이지(수위계)', price: gaugePrice, quantity: 1 });
                    nextState.totalPrice += gaugePrice;
                }
                responseText = `물탱크 뚜껑은 기본 1개 포함입니다.\n추가 예비용 뚜껑이 더 필요하신가요?`;
                const capacityNum = parseFloat(quoteState.capacity || '1');
                if (capacityNum <= 2) {
                    nextOptions = [
                        { label: '추가 필요없음 (기본 포함)', value: 'none' },
                        { label: '소형 추가 (+11,000원)', value: 'small' }
                    ];
                } else {
                    nextOptions = [
                        { label: '추가 필요없음 (기본 포함)', value: 'none' },
                        { label: '대형 추가 (+22,000원)', value: 'large' }
                    ];
                }
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['LID_SELECTED'], 'LID_SELECTED');
            }

            // Step 9: Lid Selected -> Delivery Method
            else if (evaluationStep === 'LID_SELECTED') {
                nextState.step = 'DELIVERY_METHOD_CHOSEN';
                nextState.lid = value as any;
                if (value !== 'none') {
                    const isSmall = value === 'small';
                    const lidPrice = PRICING_DB.lids[value as 'small' | 'large'] || 0;
                    nextState.items.push({ name: `물탱크 뚜껑 추가 (${isSmall ? '소형' : '대형'})`, price: lidPrice, quantity: 1 });
                    nextState.totalPrice += lidPrice;
                }
                responseText = `마지막으로 수령 방법을 선택해주세요.`;
                nextOptions = [
                    { label: '화물 배송 (착불)', value: 'delivery' },
                    { label: '방문 수령 (수원 / 운임 0원)', value: 'pickup' }
                ];
                nextType = 'options';
                addMessage('assistant', responseText, nextType, nextOptions, HELP_TEXTS['DELIVERY_METHOD_CHOSEN'], 'DELIVERY_METHOD_CHOSEN');
            }

            // Step 10: Delivery Method -> Done or Address
            else if (evaluationStep === 'DELIVERY_METHOD_CHOSEN') {
                nextState.deliveryMethod = value as any;
                if (value === 'pickup') {
                    calculateFinalQuote('pickup', '방문 수령');
                } else {
                    responseText = `배송받으실 주소(동/읍/면 단위)를 입력해주세요.\n(예: 경기도 화성시 남양읍)`;
                    nextType = 'text';
                    addMessage('assistant', responseText, nextType);
                }
            }

            setQuoteState(nextState);

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
            content: '새 견적을 시작합니다.\n어떤 형태의 물탱크가 필요하신가요?',
            type: 'options',
            options: [
                { label: '원형 물탱크', value: 'standard' },
                { label: '사각 물탱크', value: 'm_series' }
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
                                    <div className="summary-row">
                                        <span>공급가액</span>
                                        <span>${(Math.round(quoteState.totalPrice / 1.1)).toLocaleString()} 원</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>부가세 (VAT)</span>
                                        <span>${(quoteState.totalPrice - Math.round(quoteState.totalPrice / 1.1)).toLocaleString()} 원</span>
                                    </div>
                                    <div className="summary-row">
                                        <span style={{ color: '#d97706' }}>+ 운임 (착불/별도)</span>
                                        <span style={{ color: '#d97706' }}>${quoteState.shippingCost.toLocaleString()} 원</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span className="total-label">총 견적금액</span>
                                        <span className="total-value">${quoteState.totalPrice.toLocaleString()} 원</span>
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

    const executeAddToCart = () => {
        if (!quoteState.items || quoteState.items.length === 0) return;

        // 1. Add Tank (Main Item)
        const tankItem = quoteState.items[0];
        const shapeName = quoteState.type === 'm_series' ? '사각' : '원형';
        const productIdStr = quoteState.type === 'm_series' 
            ? `pe-square-${quoteState.capacity?.replace('.', '')}t` 
            : `pe-round-${quoteState.capacity?.replace('.', '')}t`;

        // Create options for the tank based on selected features
        const tankOptions: any[] = [];
        if (quoteState.fittingSize && quoteState.fittingSize !== 'none') {
            tankOptions.push({
                name: '피팅 재질',
                value: quoteState.fittingType === 'bronze' ? '청동(신주) 피팅' : 'PE 제작 피팅',
                priceChange: 0
            });

            tankOptions.push({
                name: quoteState.fittingType === 'bronze' ? '피팅 규격 (청동 선택 시)' : '피팅 규격 (PE 선택 시)',
                value: quoteState.fittingSize + 'mm',
                priceChange: 0 // 분리해서 담으므로 본체에서는 0원으로 처리
            });
        }

        // Add Tank
        addToCart({
            productId: productIdStr,
            name: `${quoteState.capacity}톤 ${shapeName} 물탱크`,
            basePrice: tankItem.price,
            options: tankOptions,
            requirements: '',
            quantity: 1,
            image: quoteState.type === 'm_series' ? '/images/products/tank-square-real.jpg' : '/images/products/tank-round-real.png'
        });

        // 2. Add extra items (Fittings, Valves, Balltops, Lids, Gauge) separately
        quoteState.items.slice(1).forEach(item => {
            let subProductId = 'fittings';
            let subImage = '/images/products/fit-bronze-real.png';
            
            if (item.name.includes('밸브')) {
                subProductId = 'fit-ballvalve-brass';
                subImage = '/images/products/fit-ballvalve-brass.jpg';
            } else if (item.name.includes('볼탑')) {
                subProductId = 'fit-ball-tap';
                subImage = '/images/products/fit-ball-tap-real.png';
            } else if (item.name.includes('뚜껑')) {
                subProductId = 'fit-lid-series';
                subImage = '/images/products/tank-lid-real.jpg';
            } else if (item.name.includes('게이지')) {
                subProductId = 'fit-level-gauge';
                subImage = '/images/products/fit-level-gauge.png';
            } else if (item.name.includes('니플') || item.name.includes('피팅')) {
                subProductId = (item.name.includes('청동') || item.name.includes('신주')) ? 'fit-bronze-series' : 'fit-pe-series';
                subImage = (item.name.includes('청동') || item.name.includes('신주')) ? '/images/products/fit-bronze-real.png' : '/images/products/fit-pe-real.jpg';
            }

            addToCart({
                productId: subProductId,
                name: item.name,
                basePrice: item.price,
                // Passing a unique option to ensure the cartItemId is unique and prevents merging bugs!
                options: [{ name: '품목', value: item.name, priceChange: 0 }],
                requirements: '',
                quantity: item.quantity || 1,
                image: subImage
            });
        });

        // 3. Persist Shipping Info
        if (quoteState.deliveryMethod) {
            setShippingType(quoteState.deliveryMethod);
        }
        if (quoteState.location) {
            setShippingAddress(quoteState.location);
        }
    };

    const handleAddToCart = () => {
        if (isLoading) return; // Prevent double click
        executeAddToCart();
        alert('장바구니에 담겼습니다!');
        setShowQuoteModal(false);
        setIsOpen(false);
    };

    const handleDirectCheckout = () => {
        if (isLoading) return; // Prevent double click
        executeAddToCart();
        setShowQuoteModal(false);
        setIsOpen(false);
        router.push('/checkout');
    };

    const handleConsultationSubmit = () => {
        if (!consultationFormData.name || !consultationFormData.phone) {
            alert('성함과 연락처를 모두 입력해주세요.');
            return;
        }
        if (!consultationFormData.agreed) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }
        setIsConsultationSubmitted(true);
        
        // Send to Discord via our new API
        fetch('/api/consultation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: consultationFormData.name,
                phone: consultationFormData.phone,
                quoteState: quoteState,
                items: quoteState.items,
                totalPrice: quoteState.totalPrice
            })
        }).catch(err => console.error('Failed to send consultation to Discord:', err));

        setTimeout(() => {
            setIsConsultationMode(false);
            setIsConsultationSubmitted(false);
            setShowQuoteModal(false);
            alert('상담 신청이 완료되었습니다! 담당자가 곧 연락드리겠습니다.');
        }, 1500);
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
                                            <div className="relative group/msg max-w-full">
                                                <div className={`px-3.5 py-2.5 rounded-xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-industrial-600 text-white rounded-tr-none' : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none font-medium'}`}>
                                                    {msg.content}
                                                </div>
                                                {msg.helpText && (
                                                    <div className="mt-1.5 flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-100 rounded-lg text-[11px] text-blue-700 animate-in fade-in slide-in-from-top-1">
                                                        <Info className="w-3.5 h-3.5 shrink-0" />
                                                        <span>{msg.helpText}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {msg.type === 'options' && msg.options && (
                                            <div className="flex flex-col gap-2.5 mt-2">
                                                {msg.options.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => handleOptionSelect(opt.value, opt.label, msg.step)}
                                                        className="bg-white border-[1.5px] border-gray-100 hover:border-industrial-500 hover:shadow-md text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all text-left flex justify-between items-center group active:scale-[0.98] shadow-sm relative overflow-hidden"
                                                    >
                                                        <div className="flex flex-col gap-0.5">
                                                            {opt.tag && (
                                                                <span className="inline-block w-fit px-1.5 py-0.5 rounded-md bg-industrial-100 text-industrial-700 text-[10px] font-bold mb-1 border border-industrial-200">
                                                                    {opt.tag}
                                                                </span>
                                                            )}
                                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                                <span className="font-bold text-gray-900 text-[15px]">{opt.capacity || opt.label.split(' - ')[0].replace('★베스트 | ', '')}</span>
                                                                {opt.description && (
                                                                    <span className="text-[11px] text-gray-500 font-medium">({opt.description})</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3 shrink-0">
                                                            {opt.price && (
                                                                <span className="font-bold text-industrial-600 text-sm">
                                                                    {opt.price.toLocaleString()}원
                                                                </span>
                                                            )}
                                                            {!opt.price && opt.label.includes('원') && (
                                                                <span className="font-bold text-industrial-600 text-sm">
                                                                    {opt.label.split(' - ')[1] || opt.label.split('(+')[1]?.split(')')[0]}
                                                                </span>
                                                            )}
                                                            <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-industrial-500 group-hover:bg-industrial-50 transition-colors shrink-0 flex items-center justify-center">
                                                                <div className="w-2.5 h-2.5 rounded-full bg-industrial-500 opacity-0 group-active:opacity-100 transition-opacity"></div>
                                                            </div>
                                                        </div>

                                                        {/* Subtle highlight for best items */}
                                                        {opt.isBest && (
                                                            <div className="absolute top-0 right-0 w-12 h-12 bg-industrial-500/5 rounded-full -mr-6 -mt-6"></div>
                                                        )}
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

                    {/* Live Total Amount Floating Bar */}
                    {quoteState.step !== 'INIT' && quoteState.step !== 'DONE' && (
                        <div className="px-4 py-2 bg-industrial-50 border-t border-industrial-100 flex justify-between items-center shrink-0 animate-in slide-in-from-bottom-2">
                            <div className="flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4 text-industrial-500" />
                                <span className="text-xs font-bold text-industrial-700">현재 예상 합계</span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-black text-industrial-900">{quoteState.totalPrice.toLocaleString()}원</span>
                                <p className="text-[10px] text-industrial-400 -mt-0.5">(배송비 제외)</p>
                            </div>
                        </div>
                    )}

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
                                    최종 견적서 요약
                                </h3>
                                <button onClick={() => setShowQuoteModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
                                {/* Reassurance Message */}
                                <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                    <div className="bg-green-100 p-1.5 rounded-full text-green-600 shrink-0">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-black text-green-900">걱정 마세요!</p>
                                        <p className="text-xs text-green-800 leading-tight">결제 전 전문가가 직접 전화를 드려 규격과 타공 위치를 한 번 더 꼼꼼히 확인해 드립니다.</p>
                                    </div>
                                </div>

                                {/* 1. QUOTE SUMMARY VIEW */}
                                <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm space-y-3">
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-gray-500 font-medium">품목</span>
                                        <span className="font-bold text-gray-900">{quoteState.capacity || '-'}톤 물탱크 ({getProductName(quoteState.type || 'standard')})</span>
                                    </div>

                                    {quoteState.items.slice(1).map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm py-1">
                                            <span className="text-gray-600">- {item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                                            <span className="font-medium text-gray-800">{(item.price * item.quantity).toLocaleString()}원</span>
                                        </div>
                                    ))}

                                    <div className="flex justify-between text-sm py-1 pt-3 border-t border-gray-100">
                                        <span className="text-gray-600">배송지 ({quoteState.deliveryMethod === 'pickup' ? '방문수령' : '일반 배송'})</span>
                                        <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">{quoteState.location || '-'}</span>
                                    </div>

                                    <div className="flex justify-between text-sm py-1 mt-2">
                                        <span className="text-gray-600">공급가액</span>
                                        <span className="font-medium text-gray-800">{Math.round(quoteState.totalPrice / 1.1).toLocaleString()}원</span>
                                    </div>

                                    <div className="flex justify-between text-sm py-1">
                                        <span className="text-gray-600">부가세(VAT)</span>
                                        <span className="font-medium text-gray-800">{(quoteState.totalPrice - Math.round(quoteState.totalPrice / 1.1)).toLocaleString()}원</span>
                                    </div>

                                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
                                        <span className="font-bold text-gray-900">최종 제품가</span>
                                        <span className="font-bold text-industrial-600 text-lg">{quoteState.totalPrice.toLocaleString()}원</span>
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
                                        <li>과도한 운임이 발생하지 않도록 가장 효율적인 배송 방식을 담당 전문가가 직접 조율해 드립니다.</li>
                                    </ul>
                                </div>
 
                                {isConsultationMode ? (
                                    <div className="bg-white border-2 border-industrial-100 p-5 rounded-xl shadow-md space-y-4 animate-in zoom-in-95 duration-200">
                                        <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">전문가 상담 신청</h4>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">성함</label>
                                                <input
                                                    type="text"
                                                    value={consultationFormData.name}
                                                    onChange={(e) => setConsultationFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    placeholder="홍길동"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-industrial-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 mb-1">연락처</label>
                                                <input
                                                    type="tel"
                                                    value={consultationFormData.phone}
                                                    onChange={(e) => setConsultationFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="010-1234-5678"
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-industrial-500"
                                                />
                                            </div>
                                            <div className="pt-2">
                                                <label className="flex items-start gap-2 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={consultationFormData.agreed}
                                                        onChange={(e) => setConsultationFormData(prev => ({ ...prev, agreed: e.target.checked }))}
                                                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-industrial-600 focus:ring-industrial-500"
                                                    />
                                                    <div className="text-[11px] leading-tight text-gray-600">
                                                        <span className="font-bold text-gray-900">[필수] 개인정보 수집 및 이용 동의</span>
                                                        <p className="mt-0.5">상담 및 해피콜을 위해 정보를 수집합니다. 자세한 내용은 <Link href="/privacy" target="_blank" className="underline font-bold text-industrial-600">개인정보처리방침</Link>을 확인하세요.</p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => setIsConsultationMode(false)}
                                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-lg text-sm transition-colors"
                                            >
                                                취소
                                            </button>
                                            <button
                                                onClick={handleConsultationSubmit}
                                                disabled={isConsultationSubmitted}
                                                className="flex-[2] bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-3 rounded-lg text-sm shadow-md transition-colors disabled:opacity-50"
                                            >
                                                {isConsultationSubmitted ? '신청 중...' : '상담 신청 완료'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3 mt-auto pt-2">
                                        <div className="bg-blue-50 text-blue-900 p-3 rounded-lg text-xs text-center border border-blue-100 mb-1">
                                            <b>"물탱크는 규격과 부속 선택이 중요합니다."</b><br />
                                            스마트견적으로 뽑으신 내용을 토대로 전문가가 직접 재검토해 드립니다.<br />
                                            지금 바로 상담 버튼을 눌러 확정 견적을 받으세요!
                                        </div>
 
                                        <button
                                            onClick={() => setIsConsultationMode(true)}
                                            className="w-full bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-4 px-4 rounded-xl shadow-md transition-all flex justify-center items-center gap-2 text-lg animate-bounce-subtle"
                                        >
                                            <Phone className="w-5 h-5" />
                                            실시간 전문가 상담 신청
                                        </button>
 
                                        <button
                                            onClick={handleDirectCheckout}
                                            className="w-full bg-[#FF4500] hover:bg-[#E63E00] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                                        >
                                            <CreditCard className="w-5 h-5" />
                                            무통장 입금으로 바로 주문
                                        </button>
 
                                        <div className="grid grid-cols-2 gap-3 mt-1 pt-3 border-t border-gray-100">
                                            <button
                                                onClick={handleAddToCart}
                                                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-sm"
                                            >
                                                <ShoppingCart className="w-4 h-4" />
                                                장바구니 담기
                                            </button>
                                            <a
                                                href="tel:031-236-8227"
                                                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-sm"
                                            >
                                                <Phone className="w-4 h-4" />
                                                전화걸기
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
