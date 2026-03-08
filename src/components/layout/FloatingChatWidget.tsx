'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Send, X, MessageSquare, ChevronRight, CheckCircle2, RotateCcw, Box, Truck, Receipt, Check, ShoppingCart, FileText, CreditCard, Phone } from 'lucide-react';
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

export default function FloatingChatWidget() {
    const router = useRouter();
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
            content: '안녕하세요! 진양스마트견적입니다.\n어떤 형태의 물탱크를 찾으시나요?',
            type: 'options',
            options: [
                { label: '원형 물탱크', value: 'standard' },
                { label: '사각 물탱크', value: 'm_series' }
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

                responseText = `${shape === 'standard' ? '원형' : '사각'} 선택하셨군요!\n필요한 용량을 선택해주세요.`;

                // Construct options based on recType
                if (shape === 'm_series') {
                    nextOptions = [
                        { label: '0.2톤 (가정용, 소형 상가에 적합)', value: '0.2' },
                        { label: '0.4톤 (가정용, 소형 상가에 적합)', value: '0.4' },
                        { label: '0.6톤 (가정용, 소형 상가에 적합)', value: '0.6' },
                        { label: '1톤 (가장 인기 있는 규격입니다! ⭐)', value: '1' },
                        { label: '2톤 (농업용, 공업용, 대형 건물용)', value: '2' }
                    ];
                } else {
                    nextOptions = [
                        { label: '0.2톤 (가정용, 소형 상가에 적합)', value: '0.2' },
                        { label: '0.4톤 (가정용, 소형 상가에 적합)', value: '0.4' },
                        { label: '0.6톤 (가정용, 소형 상가에 적합)', value: '0.6' },
                        { label: '1톤 (가장 인기 있는 규격입니다! ⭐)', value: '1' },
                        { label: '2톤 (농업용, 공업용, 대형 건물용)', value: '2' },
                        { label: '3톤 (농업용, 공업용, 대형 건물용)', value: '3' },
                        { label: '4톤 (농업용, 공업용, 대형 건물용)', value: '4' },
                        { label: '5톤 (농업용, 공업용, 대형 건물용)', value: '5' },
                        { label: '6톤 (농업용, 공업용, 대형 건물용)', value: '6' },
                        { label: '8톤 (농업용, 공업용, 대형 건물용)', value: '8' },
                        { label: '10톤 (농업용, 공업용, 대형 건물용)', value: '10' }
                    ];
                }
                nextType = 'options';
            }

            // Step 3: Capacity Selected -> Ask Fitting Size
            else if (quoteState.step === 'RECOMMENDATION_SHOWN') {
                const cap = value;
                const dbKey = (quoteState.recType || 'standard') as keyof typeof PRICING_DB.tanks;
                const basePrice = (PRICING_DB.tanks[dbKey] as any)[cap];

                if (!basePrice) {
                    responseText = '해당 용량의 가격 정보가 없습니다. 상담원에게 문의해주세요.';
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

                    responseText = `${cap}톤 선택 완료!\n\n물탱크에 배관을 연결할 피팅 크기를 골라주세요.\n(피팅은 물탱크에 구멍을 뚫고 배관을 연결하는 부속입니다)`;
                    nextOptions = [
                        { label: '15mm (가정용 수도)', value: '15' },
                        { label: '20mm (가장 많이 쓰는 표준 ⭐)', value: '20' },
                        { label: '25mm (물 양이 많이 필요할 때)', value: '25' },
                        { label: '40mm (대형·배수용)', value: '40' },
                        { label: '50mm (대형·배수용)', value: '50' },
                        { label: '피팅 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                }
            }

            // Step 4: Fitting Size -> 갯수 선택
            else if (quoteState.step === 'CAPACITY_SELECTED') {
                if (value === 'none') {
                    // 피팅 없음 -> 단니플로 바로
                    nextState.step = 'FITTING_SELECTED';
                    responseText = `피팅 없이 진행합니다.\n\n신주단니플이 필요하신가요?\n단니플은 배관과 밸브 사이를 짧게 이어주는 연결 부속입니다.`;
                    nextOptions = [
                        { label: '15mm', value: 'nipple_15' },
                        { label: '20mm', value: 'nipple_20' },
                        { label: '25mm', value: 'nipple_25' },
                        { label: '32mm', value: 'nipple_32' },
                        { label: '40mm', value: 'nipple_40' },
                        { label: '50mm', value: 'nipple_50' },
                        { label: '다니플 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                } else {
                    nextState.step = 'FITTING_SIZE_SELECTED';
                    nextState.fittingSize = value;
                    responseText = `${value}mm 피팅 선택!\n\n몇 개가 필요하신가요?\n(도움말: 일반적으로 입수・출수・퇴수용으로 3개를 설치합니다)`;
                    nextOptions = [
                        { label: '1개', value: '1' },
                        { label: '2개', value: '2' },
                        { label: '3개 (권장: 입수·출수·퇴수용)', value: '3' },
                        { label: '4개', value: '4' },
                    ];
                    nextType = 'options';
                }
            }

            // Step 5: 갯수 -> 재질 선택
            else if (quoteState.step === 'FITTING_SIZE_SELECTED') {
                nextState.step = 'FITTING_COUNT_SELECTED';
                nextState.fittingCount = parseInt(value);
                responseText = `${value}개로 준비하겠습니다.\n\n피팅 재질을 선택해주세요.\n청동(신주)은 내구성이 우수하고, PE는 부식에 강해 약품·식품용에 적합합니다.`;
                nextOptions = [
                    { label: '청동(신주) — 내구성 우수, 일반용', value: 'bronze' },
                    { label: 'PE제작 — 부식없음, 약품·식품용', value: 'pe' },
                ];
                nextType = 'options';
            }

            // Step 6: 재질 -> 피팅 추가 + 번들 확인
            else if (quoteState.step === 'FITTING_COUNT_SELECTED') {
                nextState.step = 'FITTING_SELECTED';
                nextState.fittingType = value as 'bronze' | 'pe';
                const fCount = nextState.fittingCount || 1;
                const fitUnitPrice = (PRICING_DB.fittings as any)[value]?.[nextState.fittingSize!] || 0;
                if (fitUnitPrice) {
                    nextState.items.push({
                        name: `${value === 'bronze' ? '청동' : 'PE'} 피팅 ${nextState.fittingSize}mm`,
                        price: fitUnitPrice,
                        quantity: fCount
                    });
                    nextState.totalPrice += fitUnitPrice * fCount;
                }

                // 번들 예상금액 계산
                const nipplePriceMap: Record<string, number> = { '15': 1000, '20': 1700, '25': 2700, '32': 5100, '40': 6400, '50': 9900 };
                const valvePriceMap: Record<string, number> = { '15': 4200, '20': 5700, '25': 10100, '32': 15300, '40': 22500, '50': 33300 };
                const nippleUnit = nipplePriceMap[nextState.fittingSize!] || 0;
                const valveUnit = valvePriceMap[nextState.fittingSize!] || 0;
                const bundleTotal = (nippleUnit + valveUnit) * fCount;

                responseText = `${value === 'bronze' ? '청동(신주)' : 'PE'} 피팅 ${nextState.fittingSize}mm × ${fCount}개 추가 완료!\n\n단니플(${nextState.fittingSize}mm) + 볼밸브(${nextState.fittingSize}mm) ${fCount}세트를 함께 담으시겠어요?\n(${fCount}세트 연결 합계: ${bundleTotal.toLocaleString()}원, 부가세 별도)`;
                nextOptions = [
                    { label: `${fCount}세트 함께 담기 (추천)`, value: 'auto' },
                    { label: '아니요, 직접 선택할게요', value: 'manual' },
                ];
                nextType = 'options';
            }

            // Step 7 (번들/개별): 단니플+볼밸브 처리
            else if (quoteState.step === 'FITTING_SELECTED') {
                if (value === 'auto') {
                    // 자동 번들 담기
                    const fSize = quoteState.fittingSize!;
                    const fCount = quoteState.fittingCount || 1;
                    const nipplePriceMap: Record<string, number> = { '15': 1000, '20': 1700, '25': 2700, '32': 5100, '40': 6400, '50': 9900 };
                    const valvePriceMap: Record<string, number> = { '15': 10000, '20': 12000, '25': 15000, '40': 25000, '50': 35000 };
                    const nippleUnit = nipplePriceMap[fSize] || 0;
                    const valveUnit = valvePriceMap[fSize] || 0;
                    if (nippleUnit) {
                        nextState.items.push({ name: `신주단니플 ${fSize}mm`, price: nippleUnit, quantity: fCount });
                        nextState.totalPrice += nippleUnit * fCount;
                    }
                    if (valveUnit) {
                        nextState.items.push({ name: `황동볼밸브 ${fSize}mm`, price: valveUnit, quantity: fCount });
                        nextState.totalPrice += valveUnit * fCount;
                    }
                    nextState.step = 'BALLVALVE_SELECTED';
                    responseText = `단니플 + 볼밸브 ${fCount}세트 자동 추가!\n\n볼탑(수위조절 밸브)이 필요하신가요?\n볼탑은 탱크 안에 부구(플로트)를 달아 일정 수위가 되면 자동으로 물 공급을 차단합니다.`;
                    nextOptions = [
                        { label: '15mm', value: 'balltop_15' },
                        { label: '20mm', value: 'balltop_20' },
                        { label: '25mm', value: 'balltop_25' },
                        { label: '32mm', value: 'balltop_32' },
                        { label: '40mm', value: 'balltop_40' },
                        { label: '50mm', value: 'balltop_50' },
                        { label: '볼탑 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                } else if (value === 'manual') {
                    // 직접 선택 -> 단니플부터
                    nextState.step = 'NIPPLE_SELECTED';
                    const tip = quoteState.fittingSize ? `\n\n💡 팁: 피팅 ${quoteState.fittingSize}mm에 맞춰 ${quoteState.fittingSize}mm를 추천합니다.` : '';
                    responseText = `단니플 규격을 선택해주세요.\n단니플은 배관과 밸브 사이를 짧게 이어주는 연결 부속입니다.${tip}`;
                    nextOptions = [
                        { label: '15mm', value: 'nipple_15' },
                        { label: '20mm', value: 'nipple_20' },
                        { label: '25mm', value: 'nipple_25' },
                        { label: '32mm', value: 'nipple_32' },
                        { label: '40mm', value: 'nipple_40' },
                        { label: '50mm', value: 'nipple_50' },
                        { label: '단니플 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                } else {
                    // 피팅 없음 경로: 단니플부터 시작
                    nextState.step = 'NIPPLE_SELECTED';
                    responseText = `단니플 규격을 선택해주세요.\n단니플은 배관과 밸브 사이를 짧게 이어주는 연결 부속입니다.`;
                    nextOptions = [
                        { label: '15mm', value: 'nipple_15' },
                        { label: '20mm', value: 'nipple_20' },
                        { label: '25mm', value: 'nipple_25' },
                        { label: '32mm', value: 'nipple_32' },
                        { label: '40mm', value: 'nipple_40' },
                        { label: '50mm', value: 'nipple_50' },
                        { label: '단니플 필요없음', value: 'none' }
                    ];
                    nextType = 'options';
                }
            }

            // Step 8 (수동): 단니플 선택 -> 볼밸브 묻기
            else if (quoteState.step === 'NIPPLE_SELECTED') {
                nextState.step = 'BALLVALVE_SELECTED';
                if (value !== 'none') {
                    const sizeMap: Record<string, number> = {
                        'nipple_15': 1000, 'nipple_20': 1700, 'nipple_25': 2700,
                        'nipple_32': 5100, 'nipple_40': 6400, 'nipple_50': 9900
                    };
                    const sizeLabel = value.replace('nipple_', '');
                    const np = sizeMap[value] || 0;
                    const fCount = quoteState.fittingCount || 1; // 갯수 유지
                    nextState.items.push({ name: `신주단니플 ${sizeLabel}mm`, price: np, quantity: fCount });
                    nextState.totalPrice += np * fCount;
                    nextState.nippleSize = sizeLabel;
                }

                const valveTip = quoteState.fittingSize && quoteState.fittingSize !== 'none' ? `\n\n💡 팁: 피팅이 ${quoteState.fittingSize}mm이므로, 볼밸브도 ${quoteState.fittingSize}mm를 추천합니다.` : '';
                responseText = `황동볼밸브 규격을 선택해주세요.\n볼밸브는 물 흐름을 제어하는 개폐 밸브입니다.${valveTip}`;
                nextOptions = [
                    { label: '15mm', value: 'valve_15' },
                    { label: '20mm', value: 'valve_20' },
                    { label: '25mm', value: 'valve_25' },
                    { label: '32mm', value: 'valve_32' },
                    { label: '40mm', value: 'valve_40' },
                    { label: '50mm', value: 'valve_50' },
                    { label: '볼밸브 필요없음', value: 'none' }
                ];
                nextType = 'options';
            }

            // Step 8: 볼밸브 선택 -> 볼탑
            else if (quoteState.step === 'BALLVALVE_SELECTED') {
                nextState.step = 'BALLTOP_SELECTED';

                // 직전 단계(단니플 선택 후)에서 넘어온 value가 볼밸브(valve_xx)인지 확인하여 장바구니에 담기
                if (value !== 'none' && value.startsWith('valve_')) {
                    const valvePriceMap: Record<string, number> = {
                        'valve_15': 4200, 'valve_20': 5700, 'valve_25': 10100,
                        'valve_32': 15300, 'valve_40': 22500, 'valve_50': 33300
                    };
                    const sizeLabel = value.replace('valve_', '');
                    const valvePrice = valvePriceMap[value] || 0;
                    const fCount = quoteState.fittingCount || 1; // 갯수 유지
                    nextState.items.push({ name: `황동볼밸브 ${sizeLabel}mm`, price: valvePrice, quantity: fCount });
                    nextState.totalPrice += valvePrice * fCount;
                    nextState.ballvalveSize = sizeLabel;
                }

                responseText = `볼탑(수위조절 밸브)이 필요하신가요?\n볼탑은 탱크 안에 부구(플로트)를 달아 일정 수위가 되면 자동으로 물 공급을 차단합니다.`;
                nextOptions = [
                    { label: '15mm', value: 'balltop_15' },
                    { label: '20mm', value: 'balltop_20' },
                    { label: '25mm', value: 'balltop_25' },
                    { label: '32mm', value: 'balltop_32' },
                    { label: '40mm', value: 'balltop_40' },
                    { label: '50mm', value: 'balltop_50' },
                    { label: '볼탑 필요없음', value: 'none' }
                ];
                nextType = 'options';
            }

            // Step 9: 볼탑 선택 -> 레벨게이지
            else if (quoteState.step === 'BALLTOP_SELECTED') {
                nextState.step = 'GAUGE_SELECTED';
                if (value !== 'none') {
                    const balltopPriceMap: Record<string, number> = {
                        'balltop_15': 7600, 'balltop_20': 11700, 'balltop_25': 13600,
                        'balltop_32': 34700, 'balltop_40': 44100, 'balltop_50': 67800
                    };
                    const sizeLabel = value.replace('balltop_', '');
                    const balltopPrice = balltopPriceMap[value] || 0;
                    nextState.items.push({ name: `볼탑 ${sizeLabel}mm`, price: balltopPrice, quantity: 1 });
                    nextState.totalPrice += balltopPrice;
                    nextState.balltopSize = sizeLabel;
                }

                responseText = `레벨게이지(수위계)가 필요하신가요?\n투명 튜브를 탱크 외부에 연결하여 내부 수위를 눈으로 바로 확인할 수 있습니다. 별도 전원 없이 사용 가능합니다.`;
                nextOptions = [
                    { label: '레벨게이지 추가 (30,000원, 부가세 별도)', value: 'yes' },
                    { label: '필요없음', value: 'none' }
                ];
                nextType = 'options';
            }

            // Step 10: 레벨게이지 -> 추가 뚜껑
            else if (quoteState.step === 'GAUGE_SELECTED') {
                nextState.step = 'LID_SELECTED';
                if (value !== 'none') {
                    nextState.hasGauge = true;
                    nextState.items.push({ name: '레벨게이지(수위계)', price: 30000, quantity: 1 });
                    nextState.totalPrice += 30000;
                }

                responseText = `물탱크 뚜껑은 기본 1개 포함입니다.\n뚜껑이 추가로 더 필요하신가요? (특수 설치 시 필요)`;
                // 용량에 따라 뚜껑 규격 자동 매칭
                const capacityNum = parseFloat(quoteState.capacity || '1');
                if (capacityNum <= 2) {
                    nextOptions = [
                        { label: '추가 뚜껑 필요없음 (기본 포함)', value: 'none' },
                        { label: '소형 추가 (Ø380mm, 10,000원 부가세별도)', value: 'small' },
                    ];
                } else {
                    nextOptions = [
                        { label: '추가 뚜껑 필요없음 (기본 포함)', value: 'none' },
                        { label: '대형 추가 (Ø470mm, 20,000원 부가세별도)', value: 'large' },
                    ];
                }
                nextType = 'options';
            }

            // Step 11: 뚜껑 -> 배송 방법
            else if (quoteState.step === 'LID_SELECTED') {
                nextState.step = 'DELIVERY_METHOD_CHOSEN';

                // 직전 단계 뚜껑 선택 저장
                nextState.lid = value as 'small' | 'large' | 'none';
                if (value !== 'none') {
                    const isSmall = value === 'small';
                    const lidPrice = PRICING_DB.lids[value as 'small' | 'large'];
                    const label = isSmall ? '소형 Ø380mm' : '대형 Ø470mm';
                    nextState.items.push({ name: `물탱크 뚜껑 추가 (${label})`, price: lidPrice, quantity: 1 });
                    nextState.totalPrice += lidPrice;
                }

                responseText = `마지막으로 수령 방법을 선택해주세요.\n\n💡 타공 위치는 걱정 마세요! 주문 확인 후 진양건재 전문가가 직접 전화(해피콜)를 드려 꼼꼼히 체크해 드립니다.`;
                nextOptions = [
                    { label: '화물 배송 (착불)', value: 'delivery' },
                    { label: '방문 수령 (수원 팔달구 효원로 / 운임 0원)', value: 'pickup' }
                ];
                nextType = 'options';
            }

            // Step 12: 배송 수단(DELIVERY_METHOD_CHOSEN) -> 주소 입력 또는 방문수령 완료
            else if (quoteState.step === 'DELIVERY_METHOD_CHOSEN' && !quoteState.deliveryMethod) {
                nextState.deliveryMethod = value as 'delivery' | 'pickup';
                if (value === 'pickup') {
                    // 방문 수령일 경우엔 주소입력 생략하고 바로 DONE
                    calculateFinalQuote('pickup', '방문 수령');
                } else {
                    // 화물 배송은 주소를 입력받기 위해 text 타입으로 전환
                    nextState.step = 'DELIVERY_METHOD_CHOSEN'; // 상태 유지하며 텍스트 응답 기다림
                    responseText = `배송받으실 주소(동/읍/면 단위)를 입력해주세요.\n(예: 경기도 화성시 남양읍)`;
                    nextType = 'text';
                }
            }

            // Step 13: 주소 입력 (텍스트) -> 완료
            else if (quoteState.step === 'DELIVERY_METHOD_CHOSEN' && quoteState.deliveryMethod === 'delivery' && value) {
                calculateFinalQuote('delivery', value);
                return; // 상태 업데이트는 calculateFinalQuote 안에서 이루어짐
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

    const executeAddToCart = () => {
        let productIdStr = 'pe-round-series';
        if (quoteState.type === 'm_series') {
            productIdStr = 'pe-square-series';
        }

        const formattedOptions = [];
        const mapSize = (s: string) => {
            const num = parseInt(s);
            if (!isNaN(num)) return `${num}mm`;
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
    };

    const handleAddToCart = () => {
        executeAddToCart();
        alert('장바구니에 담겼습니다!');
        setShowQuoteModal(false);
        setIsOpen(false);
    };

    const handleDirectCheckout = () => {
        executeAddToCart();
        setShowQuoteModal(false);
        setIsOpen(false);
        router.push('/checkout');
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
                                            <div className={`px-3.5 py-2.5 rounded-xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-industrial-600 text-white rounded-tr-none' : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none font-medium'}`}>
                                                {msg.content}
                                            </div>
                                        )}

                                        {msg.type === 'options' && msg.options && (
                                            <div className="flex flex-col gap-2 mt-2">
                                                {msg.options.map((opt) => (
                                                    <button
                                                        key={opt.value}
                                                        onClick={() => handleOptionSelect(opt.value, opt.label)}
                                                        className="bg-white border-2 border-industrial-100 hover:border-industrial-500 text-gray-800 hover:text-industrial-600 font-semibold py-2.5 px-4 rounded-xl transition-all text-left flex justify-between items-center group text-sm active:bg-industrial-50 shadow-sm"
                                                    >
                                                        <span>{opt.label}</span>
                                                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-industrial-500 shrink-0 ml-2"></div>
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
                                        onClick={handleDirectCheckout}
                                        className="w-full bg-[#FF4500] hover:bg-[#E63E00] text-white font-bold py-4 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2 text-lg"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        바로 결제하기 (카드/무통장입금)
                                    </button>

                                    <button
                                        onClick={handleAddToCart}
                                        className="w-full bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        장바구니 담기
                                    </button>

                                    <a
                                        href="tel:031-236-8227"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                                    >
                                        <Phone className="w-5 h-5" />
                                        결제 전 전화상담
                                    </a>

                                    <div className="grid grid-cols-2 gap-3 mt-1 pt-3 border-t border-gray-100">
                                        <button
                                            onClick={handlePrint}
                                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-sm"
                                        >
                                            <FileText className="w-4 h-4" />
                                            견적서 인쇄
                                        </button>

                                        <button
                                            onClick={handleReset}
                                            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-2 text-sm"
                                        >
                                            <RotateCcw className="w-4 h-4" />
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
