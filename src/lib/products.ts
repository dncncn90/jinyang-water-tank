export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    isRecommended?: boolean;
    features: string[];
    specs: {
        dimensions?: string;
        capacity?: string;
        material?: string;
        warranty?: string;
    };
    detailedSpecs?: {
        diameter?: number; // mm (External)
        height?: number; // mm (Total)
        waterHeight?: number; // mm (Inlet/Water Level)
        width?: number; // mm (for square)
        length?: number; // mm (for square)
        manholeSize?: number; // mm
    };
    images: string[];
    reviews: { user: string; rating: number; comment: string; date: string }[];
    options?: {
        name: string;
        type: 'select' | 'radio' | 'checkbox';
        required: boolean;
        choices: { label: string; priceChange: number }[];
    }[];
};

// --- PRICING DATA DATABASE ---
export const PRICING_DB = {
    tanks: {
        standard: {
            '0.2': 59000, '0.4': 72000, '0.6': 95000, '1': 144000,
            '2': 240000, '3': 324000, '4': 426000, '5': 486000,
            '6': 660000, '8': 840000, '10': 960000
        },
        m_series: {
            '0.2': 64000, '0.4': 99000, '0.6': 114000, '1': 172000, '2': 306000
        },
        u_series: { '2': 408000, '5': 900000 },
        white: { '0.6': 123000, '1': 182000 } // 농약용
    },
    lids: { 'small': 10000, 'large': 20000 },
    fittings: {
        bronze: {
            '15': 3000, '20': 4000, '25': 5000, '30': 7000, '40': 10000,
            '50': 13000, '65': 27000, '75': 33000, '100': 62000
        },
        pe: {
            '15': 13000, '20': 15000, '25': 18000, '30': 21000, '40': 24000,
            '50': 28000, '65': 33000, '75': 48000, '100': 60000
        }
    }
};

export const getProductName = (key: string) => {
    if (key === 'standard') return '일반용 (원형)';
    if (key === 'm_series') return '사각 (Square)';
    if (key === 'u_series') return '매설용 (U시리즈)';
    if (key === 'white') return '약품/식품용 (White)';
    return '물탱크';
};

import { calculateShippingCost } from './shipping';

export const calculateLogistics = async (capacity: string, type: string, count: number, location: string) => {
    const shape = type === 'm_series' ? '사각' : '원형';
    const items = [{
        name: `${shape} 물탱크 ${capacity}톤`,
        quantity: count
    }];

    const cost = calculateShippingCost(items, location);
    const tonnage = parseFloat(capacity);

    return {
        totalShipping: cost,
        distance: location.includes('수원') ? 10 : 50, // Simplified distance for display
        truckType: (tonnage >= 5 ? '5ton' : '1ton') as '1ton' | '5ton',
        truckCount: 1,
        costPerTruck: cost
    };
};

const COMMON_TANK_OPTIONS = [
    {
        name: '타공 여부',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함 (출고 원형 그대로)', priceChange: 0 },
            { label: '원하는 위치 타공 (요청사항 기재) - 무료', priceChange: 0 }
        ]
    },
    {
        name: '피팅 재질',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함 (가공 없음)', priceChange: 0 },
            { label: '청동(신주) 피팅', priceChange: 0 },
            { label: 'PE 제작 피팅', priceChange: 0 }
        ]
    },
    {
        name: '피팅 규격 (청동 선택 시)',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '규격 선택 안함 / 기본 가공 없음', priceChange: 0 },
            { label: '15mm - 3,000원', priceChange: 3000 },
            { label: '20mm - 4,000원', priceChange: 4000 },
            { label: '25mm - 5,000원', priceChange: 5000 },
            { label: '30mm - 7,000원', priceChange: 7000 },
            { label: '40mm - 10,000원', priceChange: 10000 },
            { label: '50mm - 13,000원', priceChange: 13000 },
            { label: '65mm - 27,000원', priceChange: 27000 },
            { label: '75mm - 33,000원', priceChange: 33000 },
            { label: '100mm - 62,000원', priceChange: 62000 }
        ]
    },
    {
        name: '피팅 규격 (PE 선택 시)',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '규격 선택 안함 / 기본 가공 없음', priceChange: 0 },
            { label: '15mm - 13,000원', priceChange: 13000 },
            { label: '20mm - 15,000원', priceChange: 15000 },
            { label: '25mm - 18,000원', priceChange: 18000 },
            { label: '30mm - 21,000원', priceChange: 21000 },
            { label: '40mm - 24,000원', priceChange: 24000 },
            { label: '50mm - 28,000원', priceChange: 28000 },
            { label: '65mm - 33,000원', priceChange: 33000 },
            { label: '75mm - 48,000원', priceChange: 48000 },
            { label: '100mm - 60,000원', priceChange: 60000 }
        ]
    },
    {
        name: '단니플',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '15mm - 1,000원', priceChange: 1000 },
            { label: '20mm - 1,700원', priceChange: 1700 },
            { label: '25mm - 2,700원', priceChange: 2700 },
            { label: '32mm - 5,100원', priceChange: 5100 },
            { label: '40mm - 6,400원', priceChange: 6400 },
            { label: '50mm - 9,900원', priceChange: 9900 },
        ]
    },
    {
        name: '볼밸브',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '15mm - 4,200원', priceChange: 4200 },
            { label: '20mm - 5,700원', priceChange: 5700 },
            { label: '25mm - 10,100원', priceChange: 10100 },
            { label: '32mm - 15,300원', priceChange: 15300 },
            { label: '40mm - 22,500원', priceChange: 22500 },
            { label: '50mm - 33,300원', priceChange: 33300 },
        ]
    },
    {
        name: '볼탑',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '15mm - 7,600원', priceChange: 7600 },
            { label: '20mm - 11,700원', priceChange: 11700 },
            { label: '25mm - 13,600원', priceChange: 13600 },
            { label: '32mm - 34,700원', priceChange: 34700 },
            { label: '40mm - 44,100원', priceChange: 44100 },
            { label: '50mm - 67,800원', priceChange: 67800 },
        ]
    },
    {
        name: '레벨 게이지 (수위계)',
        type: 'radio' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '투명 튜브형 장착(30,000원)', priceChange: 30000 }
        ]
    }
];

export const PRODUCTS: Product[] = [
    // --- PE Round Tanks ---
    {
        id: 'pe-round-02t',
        name: '0.2톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 59000,
        description: '일반 가정집, 소형 상가에서 사용하기 좋은 200L 소형 물탱크입니다.',
        features: ['KS인증 정품', '3중층 구조'],
        specs: { capacity: '200L', dimensions: 'Ø650 x H780 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-04t',
        name: '0.4톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 72000,
        description: '좁은 공간에 적합하며 수도 요금이 저렴한 다가구 주택용으로 많이 쓰입니다.',
        features: ['KS인증 정품', '3중층 무독성'],
        specs: { capacity: '400L', dimensions: 'Ø760 x H1100 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-06t',
        name: '0.6톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 95000,
        description: '다용도실, 베란다 등에 설치하기 좋은 중소형 사이즈입니다.',
        features: ['KS인증 정품', '녹조 방지'],
        specs: { capacity: '600L', dimensions: 'Ø880 x H1240 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-1t',
        name: '1톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 144000,
        description: '가장 대중적으로 많이 찾는 표준 1톤 용량의 다목적 물탱크입니다.',
        features: ['KS인증 정품', '내충격성 우수'],
        isRecommended: true,
        specs: { capacity: '1,000L', dimensions: 'Ø1050 x H1450 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-2t',
        name: '2톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 240000,
        description: '옥상용, 농업용수 보관용으로 널리 쓰이는 대용량 2톤 탱크입니다.',
        features: ['농업용 추천', '강력한 내구성'],
        specs: { capacity: '2,000L', dimensions: 'Ø1360 x H1650 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-3t',
        name: '3톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 324000,
        description: '중소형 공장, 대농장, 상가 건물에 적합한 3톤 모델입니다.',
        features: ['산업·농업용', '대용량 보관'],
        isRecommended: true,
        specs: { capacity: '3,000L', dimensions: 'Ø1550 x H1850 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-4t',
        name: '4톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 426000,
        description: '안정적인 용량 확보가 필요한 현장에 적합한 4톤 탱크입니다.',
        features: ['다목적 용도', '견고한 디자인'],
        specs: { capacity: '4,000L', dimensions: 'Ø1700 x H1950 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-5t',
        name: '5톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 486000,
        description: '대량의 용수 확보가 필요한 현장에 필수적인 5톤 초대형 탱크입니다.',
        features: ['공장·현장용', '초대형 용량'],
        specs: { capacity: '5,000L', dimensions: 'Ø1850 x H2150 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-6t',
        name: '6톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 660000,
        description: '다량의 급수 및 특수 시설용 6톤 물탱크입니다.',
        features: ['대형 급수용', '뛰어난 내충격성'],
        specs: { capacity: '6,000L', dimensions: 'Ø2000 x H2300 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-8t',
        name: '8톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 840000,
        description: '산업단지나 대형 농장에 적합한 8톤 특대형 탱크입니다.',
        features: ['산업용 대용량', '고밀도 압축'],
        specs: { capacity: '8,000L', dimensions: 'Ø2150 x H2550 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-round-10t',
        name: '10톤 PE물탱크(원형)',
        category: 'pe-round',
        price: 960000,
        description: '대규모 시설단지, 소방용수 등에 활용되는 최대 10톤 용량입니다.',
        features: ['소방·플랜트', '압도적 내구성'],
        specs: { capacity: '10,000L', dimensions: 'Ø2280 x H2750 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-round-real.png'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },

    // --- PE Square Tanks ---
    {
        id: 'pe-square-02t',
        name: '0.2톤 PE물탱크(사각)',
        category: 'pe-square',
        price: 64000,
        description: '200L 소용량의 콤팩트한 사각 물탱크로, 좁은 공간에 효율적으로 설치 가능합니다.',
        features: ['KS인증 정품', '공간 활용 100%'],
        specs: { capacity: '200L', dimensions: 'W600 x L900 x H600 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-square-real.jpg'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-square-04t',
        name: '0.4톤 PE물탱크(사각)',
        category: 'pe-square',
        price: 99000,
        description: '베란다, 세탁실 등 좁은 코너 공간에 딱 맞는 사각 물탱크입니다.',
        features: ['KS인증 정품', '협소 공간용'],
        specs: { capacity: '400L', dimensions: 'W700 x L980 x H730 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-square-real.jpg'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-square-06t',
        name: '0.6톤 PE물탱크(사각)',
        category: 'pe-square',
        price: 114000,
        description: '다용도실 등 모서리 공간에 밀착하여 설치하기 좋습니다.',
        features: ['공간 절약', '이끼 방지'],
        specs: { capacity: '600L', dimensions: 'W800 x L1160 x H830 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-square-real.jpg'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-square-1t',
        name: '1톤 PE물탱크(사각)',
        category: 'pe-square',
        price: 172000,
        description: '실내기계실, 지하실 등에 가장 많이 설치되는 1톤 사각 베스트셀러입니다.',
        features: ['베스트셀러', '안정적 거치'],
        isRecommended: true,
        specs: { capacity: '1,000L', dimensions: 'W1000 x L1450 x H930 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-square-real.jpg'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'pe-square-2t',
        name: '2톤 PE물탱크(사각)',
        category: 'pe-square',
        price: 306000,
        description: '넓은 옥상이나 지하실 코너에 대용량(2톤) 보관을 원할 때 적합합니다.',
        features: ['대용량 사각', '구조적 안정성'],
        specs: { capacity: '2,000L', dimensions: 'W1260 x L1830 x H1100 mm', material: 'PE', warranty: '1년' },
        images: ['/images/products/tank-square-real.jpg'],
        reviews: [],
        options: COMMON_TANK_OPTIONS
    },
    {
        id: 'fit-bronze-series',
        name: '청동니플(신주구찌)',
        category: 'fittings',
        price: 3000,
        description: '물탱크 피팅용 청동 니플 (신주 구찌) 15mm~100mm 배관 연결 부속',
        features: ['강력한 체결력', '영구적 사용'],
        specs: { capacity: '15A ~ 100A', material: 'Bronze / 황동', warranty: '-' },
        images: ['/images/products/fit-bronze-real.png'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (사이즈) 선택',
                type: 'select',
                required: true,
                choices: [
                    { label: '15mm - 3,000원', priceChange: 0 },
                    { label: '20mm - 4,000원', priceChange: 1000 },
                    { label: '25mm - 5,000원', priceChange: 2000 },
                    { label: '30mm - 7,000원', priceChange: 4000 },
                    { label: '40mm - 10,000원', priceChange: 7000 },
                    { label: '50mm - 13,000원', priceChange: 10000 },
                    { label: '65mm - 27,000원', priceChange: 24000 },
                    { label: '75mm - 33,000원', priceChange: 30000 },
                    { label: '100mm - 62,000원', priceChange: 59000 },
                ]
            }
        ]
    },
    {
        id: 'fit-ballvalve-brass',
        name: '황동볼밸브',
        category: 'fittings',
        price: 4200,
        description: '물탱크/배관용 황동 볼밸브 (신주 밸브) 15mm~50mm 고압 내식성 타입',
        features: ['황동 밸브', '우수한 내구성'],
        specs: { capacity: '15mm ~ 50mm', material: 'Brass / 황동', warranty: '-' },
        images: ['/images/products/fit-ballvalve-brass.jpg'],
        reviews: [],
        options: [
            {
                name: '밸브 규격 (사이즈) 선택',
                type: 'select',
                required: true,
                choices: [
                    { label: '15mm - 4,200원', priceChange: 0 },
                    { label: '20mm - 5,700원', priceChange: 1500 },
                    { label: '25mm - 10,100원', priceChange: 5900 },
                    { label: '32mm - 15,300원', priceChange: 11100 },
                    { label: '40mm - 22,500원', priceChange: 18300 },
                    { label: '50mm - 33,300원', priceChange: 29100 },
                ]
            }
        ]
    },
    {
        id: 'fit-short-nipple',
        name: '신주단니플',
        category: 'fittings',
        price: 1000,
        description: '배관과 밸브, 기타 피팅류를 짧게 연결할 때 사용하는 신주단니플입니다.',
        features: ['배관 연결용', '정밀 가공'],
        specs: { capacity: '15mm ~ 50mm', material: 'Bronze / 황동', warranty: '-' },
        images: ['/images/products/fit-short-nipple.jpg'],
        reviews: [],
        options: [
            {
                name: '단니플 규격 (사이즈) 선택',
                type: 'select',
                required: true,
                choices: [
                    { label: '15mm - 1,000원', priceChange: 0 },
                    { label: '20mm - 1,700원', priceChange: 700 },
                    { label: '25mm - 2,700원', priceChange: 1700 },
                    { label: '32mm - 5,100원', priceChange: 4100 },
                    { label: '40mm - 6,400원', priceChange: 5400 },
                    { label: '50mm - 9,900원', priceChange: 8900 },
                ]
            }
        ]
    },
    {
        id: 'fit-pe-series',
        name: 'PE제작니플(PE제작구찌)',
        category: 'fittings',
        price: 13000,
        description: '약품 보관용 및 특수 용도로 사용하기 적합한 PE 소재의 피팅입니다.',
        features: ['우수한 내화학성', '맞춤 가공'],
        specs: { capacity: '15mm ~ 100mm', material: 'PE 플라스틱', warranty: '-' },
        images: ['/images/products/fit-pe-real.jpg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (사이즈) 선택',
                type: 'select',
                required: true,
                choices: [
                    { label: '15mm - 13,000원', priceChange: 0 },
                    { label: '20mm - 15,000원', priceChange: 2000 },
                    { label: '25mm - 18,000원', priceChange: 5000 },
                    { label: '30mm - 21,000원', priceChange: 8000 },
                    { label: '40mm - 24,000원', priceChange: 11000 },
                    { label: '50mm - 28,000원', priceChange: 15000 },
                    { label: '65mm - 33,000원', priceChange: 20000 },
                    { label: '75mm - 48,000원', priceChange: 35000 },
                    { label: '100mm - 60,000원', priceChange: 47000 },
                ]
            }
        ]
    },
    {
        id: 'fit-lid-series',
        name: '물탱크 뚜껑',
        category: 'fittings',
        price: 10000,
        description: '3중 구조로 자외선을 차단하여 이끼가 끼지 않는 고강도 물탱크 뚜껑입니다.',
        features: ['100% 규격 호환', '자외선 차단'],
        specs: { capacity: '소/대형', material: 'PE', warranty: '-' },
        images: ['/images/products/tank-lid-real.jpg'],
        reviews: [],
        options: [
            {
                name: '뚜껑 사이즈 선택',
                type: 'select',
                required: true,
                choices: [
                    { label: '소형 (직경380mm, ~2톤용) - 10,000원', priceChange: 0 },
                    { label: '대형 (직경470mm, 3톤 이상) - 20,000원', priceChange: 10000 },
                ]
            }
        ]
    },
    {
        id: 'fit-ball-tap',
        name: '볼탑',
        category: 'fittings',
        price: 7600,
        description: '물탱크 내 일정 수위 유지 및 수위 조절용 자동 밸브(볼탑)입니다.',
        features: ['수위 자동 조절', '부구 부력 이용'],
        specs: { capacity: '15mm ~ 50mm', material: '기타/복합', warranty: '-' },
        images: ['/images/products/fit-ball-tap-real.png'],
        reviews: [],
        options: [
            {
                name: '볼탑 규격 (사이즈) 선택',
                type: 'select',
                required: true,
                choices: [
                    { label: '15mm - 7,600원', priceChange: 0 },
                    { label: '20mm - 11,700원', priceChange: 4100 },
                    { label: '25mm - 13,600원', priceChange: 6000 },
                    { label: '32mm - 34,700원', priceChange: 27100 },
                    { label: '40mm - 44,100원', priceChange: 36500 },
                    { label: '50mm - 67,800원', priceChange: 60200 },
                ]
            }
        ]
    },
    {
        id: 'fit-level-gauge',
        name: '레벨게이지(수위계)',
        category: 'fittings',
        price: 30000,
        description: '물탱크 외부에서 내부 수위를 직관적으로 확인할 수 있는 투명 튜브형 레벨게이지입니다.',
        features: ['수위 직관적 확인', '깔끔한 마감'],
        specs: { capacity: '공용', material: '투명 호스 및 신주 피팅', warranty: '-' },
        images: ['/images/products/fit-level-gauge.png'],
        reviews: []
    },

    // --- ORIGINAL INDIVIDUAL PRODUCTS BELOW ---
    // --- PE Tanks (General - Blue) ---
    // Sizes based on: https://blog.naver.com/jypvc-/224104052091


    // --- Chemical Tanks (White/Yellow) ---
    // { 100L: 45000, 200L: 65000, 300L: 85000, 400L: 105000, 500L: 135000, 600L: 155000, 800L: 195000, 1T: 235000, 2T: 380000, 3T: 550000, 5T: 850000 }
    {
        id: 'chem-100',
        name: '100L 약품탱크 (원형)',
        category: 'chemical-tank',
        price: 45000,
        description: '소량의 약품 보관 및 교반에 적합한 100L 탱크입니다.',
        features: ['내약품성 PE', '정량 눈금', '소형 교반기 장착 가능'],
        specs: { dimensions: 'Ø500 x H700 mm', capacity: '100 Liter', material: 'HDPE', warranty: '1년' },
        images: ['/images/products/chem-tank-yellow.svg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (Inlet/Outlet/Drain)',
                type: 'select',
                required: true,
                choices: [
                    { label: '기본 (None)', priceChange: 0 },
                    { label: '15A (1/2")', priceChange: 15000 },
                    { label: '20A (3/4")', priceChange: 20000 },
                    { label: '25A (1")', priceChange: 25000 }
                ]
            },
            {
                name: '레벨 게이지 (수위계)',
                type: 'radio',
                required: false,
                choices: [
                    { label: '선택 안함', priceChange: 0 },
                    { label: '투명 튜브형 장착', priceChange: 33000 }
                ]
            }
        ]
    },
    {
        id: 'chem-200',
        name: '200L 약품탱크 (원형)',
        category: 'chemical-tank',
        price: 65000,
        description: '가장 널리 쓰이는 소형 200L 약품 탱크입니다.',
        features: ['내산성/내알칼리성', '일체형 성형', '누수 0%'],
        specs: { dimensions: 'Ø600 x H850 mm', capacity: '200 Liter', material: 'HDPE', warranty: '1년' },
        images: ['/images/products/chem-tank-yellow.svg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (Inlet/Outlet/Drain)',
                type: 'select',
                required: true,
                choices: [
                    { label: '기본 (None)', priceChange: 0 },
                    { label: '15A (1/2")', priceChange: 16500 },
                    { label: '20A (3/4")', priceChange: 22000 },
                    { label: '25A (1")', priceChange: 27500 }
                ]
            },
            {
                name: '레벨 게이지 (수위계)',
                type: 'radio',
                required: false,
                choices: [
                    { label: '선택 안함', priceChange: 0 },
                    { label: '투명 튜브형 장착', priceChange: 36300 }
                ]
            }
        ]
    },
    {
        id: 'chem-300',
        name: '300L 약품탱크 (원형)',
        category: 'chemical-tank',
        price: 85000,
        description: '300L 용량의 산업용 약품 탱크입니다.',
        features: ['고밀도 폴리에틸렌', '자외선 차단', '수위 확인 가능(백색)'],
        specs: { dimensions: 'Ø700 x H950 mm', capacity: '300 Liter', material: 'HDPE', warranty: '1년' },
        images: ['/images/products/chem-tank-yellow.svg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (Inlet/Outlet/Drain)',
                type: 'select',
                required: true,
                choices: [
                    { label: '기본 (None)', priceChange: 0 },
                    { label: '15A (1/2")', priceChange: 16500 },
                    { label: '20A (3/4")', priceChange: 22000 },
                    { label: '25A (1")', priceChange: 27500 }
                ]
            },
            {
                name: '레벨 게이지 (수위계)',
                type: 'radio',
                required: false,
                choices: [
                    { label: '선택 안함', priceChange: 0 },
                    { label: '투명 튜브형 장착', priceChange: 36300 }
                ]
            }
        ]
    },
    {
        id: 'chem-500',
        name: '500L 약품탱크 (원형)',
        category: 'chemical-tank',
        price: 135000,
        description: '반톤(500L) 용량의 약품 저장조입니다.',
        features: ['화학 플랜트용', '두께 보강', '안전한 보관'],
        specs: { dimensions: 'Ø850 x H1100 mm', capacity: '500 Liter', material: 'HDPE', warranty: '1년' },
        images: ['/images/products/chem-tank-yellow.svg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (Inlet/Outlet/Drain)',
                type: 'select',
                required: true,
                choices: [
                    { label: '기본 (None)', priceChange: 0 },
                    { label: '15A (1/2")', priceChange: 16500 },
                    { label: '20A (3/4")', priceChange: 22000 },
                    { label: '25A (1")', priceChange: 27500 }
                ]
            },
            {
                name: '레벨 게이지 (수위계)',
                type: 'radio',
                required: false,
                choices: [
                    { label: '선택 안함', priceChange: 0 },
                    { label: '투명 튜브형 장착', priceChange: 36300 }
                ]
            }
        ]
    },
    {
        id: 'chem-1t',
        name: '1톤 약품탱크 (원형)',
        category: 'chemical-tank',
        price: 235000,
        description: '표준 1톤 용량의 대형 약품 탱크입니다.',
        features: ['강력한 내구성', '충격 흡수 설계', '각종 화학물질 저장'],
        specs: { dimensions: 'Ø1100 x H1350 mm', capacity: '1,000 Liter', material: 'HDPE', warranty: '1년' },
        images: ['/images/products/chem-tank-yellow.svg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (Inlet/Outlet/Drain)',
                type: 'select',
                required: true,
                choices: [
                    { label: '기본 (None)', priceChange: 0 },
                    { label: '15A (1/2")', priceChange: 16500 },
                    { label: '20A (3/4")', priceChange: 22000 },
                    { label: '25A (1")', priceChange: 27500 }
                ]
            },
            {
                name: '레벨 게이지 (수위계)',
                type: 'radio',
                required: false,
                choices: [
                    { label: '선택 안함', priceChange: 0 },
                    { label: '투명 튜브형 장착', priceChange: 36300 }
                ]
            }
        ]
    },
    {
        id: 'chem-2t',
        name: '2톤 약품탱크 (원형)',
        category: 'chemical-tank',
        price: 380000,
        description: '2톤 용량의 산업용 대형 약품 탱크입니다.',
        features: ['보강 밴드 처리', '대용량 저장', '특수 약품 대응'],
        specs: { dimensions: 'Ø1400 x H1650 mm', capacity: '2,000 Liter', material: 'HDPE', warranty: '1년' },
        images: ['/images/products/chem-tank-yellow.svg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (Inlet/Outlet/Drain)',
                type: 'select',
                required: true,
                choices: [
                    { label: '기본 (None)', priceChange: 0 },
                    { label: '15A (1/2")', priceChange: 16500 },
                    { label: '20A (3/4")', priceChange: 22000 },
                    { label: '25A (1")', priceChange: 27500 }
                ]
            },
            {
                name: '레벨 게이지 (수위계)',
                type: 'radio',
                required: false,
                choices: [
                    { label: '선택 안함', priceChange: 0 },
                    { label: '투명 튜브형 장착', priceChange: 36300 }
                ]
            }
        ]
    },
    {
        id: 'chem-3t',
        name: '3톤 약품탱크 (원형)',
        category: 'chemical-tank',
        price: 550000,
        description: '3톤 용량의 초대형 약품 저장조입니다.',
        features: ['플랜트 설비용', '최대 두께', '압도적 안정성'],
        specs: { dimensions: 'Ø1600 x H1850 mm', capacity: '3,000 Liter', material: 'HDPE', warranty: '1년' },
        images: ['/images/products/chem-tank-yellow.svg'],
        reviews: [],
        options: [
            {
                name: '피팅 규격 (Inlet/Outlet/Drain)',
                type: 'select',
                required: true,
                choices: [
                    { label: '기본 (None)', priceChange: 0 },
                    { label: '15A (1/2")', priceChange: 16500 },
                    { label: '20A (3/4")', priceChange: 22000 },
                    { label: '25A (1")', priceChange: 27500 }
                ]
            },
            {
                name: '레벨 게이지 (수위계)',
                type: 'radio',
                required: false,
                choices: [
                    { label: '선택 안함', priceChange: 0 },
                    { label: '투명 튜브형 장착', priceChange: 36300 }
                ]
            }
        ]
    },

    // --- Fittings (Bronze) ---


    // --- Septic Tanks (Bonus / Keep Existing) ---
    {
        id: 'septic-5',
        name: '5인용 부패정화조 (PE)',
        category: 'septic-tank',
        price: 350000,
        description: '가정집, 소규모 사무실용 5인용 단독 정화조입니다. 시공이 간편하고 파손 위험이 적은 PE 소재입니다.',
        features: [
            '환경부 고시 규격 만족',
            '가볍고 시공이 편리함',
            '반영구적인 수명'
        ],
        specs: {
            dimensions: 'Ø1100 x L1600 mm',
            capacity: '5 Person Usage',
            material: 'PE',
            warranty: '1년'
        },
        images: [
            '/images/products/septic-5.svg',
        ],
        reviews: []
    },
    {
        id: 'septic-10',
        name: '10인용 부패정화조 (PE)',
        category: 'septic-tank',
        price: 550000,
        description: '전원주택, 펜션 등에서 많이 사용하는 10인용 정화조입니다.',
        features: ['대용량 처리', '강력한 내구성', '시공비 절감'],
        specs: {
            dimensions: 'Ø1400 x L1900 mm',
            capacity: '10 Person Usage',
            material: 'PE',
            warranty: '1년'
        },
        images: ['/images/products/septic-5.svg'], // Shared SVG
        reviews: []
    },
    {
        id: 'toilet-mobile',
        name: '이동식 화장실 (포세식/거품식)',
        category: 'toilet',
        price: 850000,
        description: '건설 현장, 농막, 행사장에 설치 가능한 고급 이동식 화장실입니다. 물을 적게 쓰는 포세식입니다.',
        features: ['냄새 차단 기술', '저수탱크 일체형', '간편한 설치'],
        specs: {
            dimensions: 'W1100 x L1300 x H2300 mm',
            capacity: '변기 1조',
            material: 'Sandwich Panel / PE',
            warranty: '1년'
        },
        images: ['/images/products/toilet.svg'],
        reviews: []
    },
];

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find(p => p.id === id);
}
