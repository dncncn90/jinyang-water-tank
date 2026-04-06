export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    isRecommended?: boolean;
    isFreeShipping?: boolean;
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
            '0.2': 74500, '0.4': 90100, '0.6': 120000, '1': 175900,
            '2': 302000, '3': 406000, '4': 523000, '5': 601000,
            '6': 809000, '8': 1043000, '10': 1238000
        },
        m_series: {
            '0.2': 81000, '0.4': 130400, '0.6': 147300, '1': 217500, '2': 373500
        },
        u_series: { '2': 448800, '5': 990000 },
        white: { '0.6': 135300, '1': 200200 } // 농약용
    },
    lids: { 'small': 16500, 'large': 33000 },
    fittings: {
        bronze: {
            '15': 3300, '20': 4400, '25': 5500, '30': 7700, '40': 11000,
            '50': 14300, '65': 29700, '75': 36300, '100': 68200
        },
        pe: {
            '15': 14300, '20': 16500, '25': 19800, '30': 23100, '40': 26400,
            '50': 30800, '65': 36300, '75': 52800, '100': 66000
        },
        nipple: {
            '15': 1100, '20': 1870, '25': 2970, '32': 5610, '40': 7040, '50': 10890
        },
        valve: {
            '15': 4620, '20': 6270, '25': 11110, '32': 16830, '40': 24750, '50': 36630
        },
        balltop: {
            '15': 8360, '20': 12870, '25': 14960, '32': 38170, '40': 48510, '50': 74580
        },
        gauge: 33000
    },
    coir_mat: {
        '0.6': 75000,
        '0.8': 87000,
        '1.0': 99000,
        '1.2': 111000,
        '1.5': 136000,
        '2.0': 166000
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
            { label: '15mm - 3,300원', priceChange: 3300 },
            { label: '20mm - 4,400원', priceChange: 4400 },
            { label: '25mm - 5,500원', priceChange: 5500 },
            { label: '30mm - 7,700원', priceChange: 7700 },
            { label: '40mm - 11,000원', priceChange: 11000 },
            { label: '50mm - 14,300원', priceChange: 14300 },
            { label: '65mm - 29,700원', priceChange: 29700 },
            { label: '75mm - 36,300원', priceChange: 36300 },
            { label: '100mm - 68,200원', priceChange: 68200 }
        ]
    },
    {
        name: '피팅 규격 (PE 선택 시)',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '규격 선택 안함 / 기본 가공 없음', priceChange: 0 },
            { label: '15mm - 14,300원', priceChange: 14300 },
            { label: '20mm - 16,500원', priceChange: 16500 },
            { label: '25mm - 19,800원', priceChange: 19800 },
            { label: '30mm - 23,100원', priceChange: 23100 },
            { label: '40mm - 26,400원', priceChange: 26400 },
            { label: '50mm - 30,800원', priceChange: 30800 },
            { label: '65mm - 36,300원', priceChange: 36300 },
            { label: '75mm - 52,800원', priceChange: 52800 },
            { label: '100mm - 66,000원', priceChange: 66000 }
        ]
    },
    {
        name: '단니플',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '15mm - 1,100원', priceChange: 1100 },
            { label: '20mm - 1,870원', priceChange: 1870 },
            { label: '25mm - 2,970원', priceChange: 2970 },
            { label: '32mm - 5,610원', priceChange: 5610 },
            { label: '40mm - 7,040원', priceChange: 7040 },
            { label: '50mm - 10,890원', priceChange: 10890 },
        ]
    },
    {
        name: '볼밸브',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '15mm - 4,620원', priceChange: 4620 },
            { label: '20mm - 6,270원', priceChange: 6270 },
            { label: '25mm - 11,110원', priceChange: 11110 },
            { label: '32mm - 16,830원', priceChange: 16830 },
            { label: '40mm - 24,750원', priceChange: 24750 },
            { label: '50mm - 36,630원', priceChange: 36630 },
        ]
    },
    {
        name: '볼탑',
        type: 'select' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '15mm - 8,360원', priceChange: 8360 },
            { label: '20mm - 12,870원', priceChange: 12870 },
            { label: '25mm - 14,960원', priceChange: 14960 },
            { label: '32mm - 38,170원', priceChange: 38170 },
            { label: '40mm - 48,510원', priceChange: 48510 },
            { label: '50mm - 74,580원', priceChange: 74580 },
        ]
    },
    {
        name: '레벨 게이지 (수위계)',
        type: 'radio' as const,
        required: false,
        choices: [
            { label: '선택 안함', priceChange: 0 },
            { label: '투명 튜브형 장착(33,000원)', priceChange: 33000 }
        ]
    }
];

export const PRODUCTS: Product[] = [
    // --- PE Round Tanks ---
    {
        id: 'pe-round-02t',
        name: '0.2톤 PE물탱크(원형)',
        category: 'pe-round',
        price: PRICING_DB.tanks.standard['0.2'],
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
        price: PRICING_DB.tanks.standard['0.4'],
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
        price: PRICING_DB.tanks.standard['0.6'],
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
        price: PRICING_DB.tanks.standard['1'],
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
        price: PRICING_DB.tanks.standard['2'],
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
        price: PRICING_DB.tanks.standard['3'],
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
        price: PRICING_DB.tanks.standard['4'],
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
        price: PRICING_DB.tanks.standard['5'],
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
        price: PRICING_DB.tanks.standard['6'],
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
        price: PRICING_DB.tanks.standard['8'],
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
        price: PRICING_DB.tanks.standard['10'],
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
        price: PRICING_DB.tanks.m_series['0.2'],
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
        price: PRICING_DB.tanks.m_series['0.4'],
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
        price: PRICING_DB.tanks.m_series['0.6'],
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
        price: PRICING_DB.tanks.m_series['1'],
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
        price: PRICING_DB.tanks.m_series['2'],
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
        price: 3300,
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
                    { label: '15mm - 3,300원', priceChange: 0 },
                    { label: '20mm - 4,400원', priceChange: 1100 },
                    { label: '25mm - 5,500원', priceChange: 2200 },
                    { label: '30mm - 7,700원', priceChange: 4400 },
                    { label: '40mm - 11,000원', priceChange: 7700 },
                    { label: '50mm - 14,300원', priceChange: 11000 },
                    { label: '65mm - 29,700원', priceChange: 26400 },
                    { label: '75mm - 36,300원', priceChange: 33000 },
                    { label: '100mm - 68,200원', priceChange: 64900 },
                ]
            }
        ]
    },
    {
        id: 'fit-ballvalve-brass',
        name: '황동볼밸브',
        category: 'fittings',
        price: 4620,
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
                    { label: '15mm - 4,620원', priceChange: 0 },
                    { label: '20mm - 6,270원', priceChange: 1650 },
                    { label: '25mm - 11,110원', priceChange: 6490 },
                    { label: '32mm - 16,830원', priceChange: 12210 },
                    { label: '40mm - 24,750원', priceChange: 20130 },
                    { label: '50mm - 36,630원', priceChange: 32010 },
                ]
            }
        ]
    },
    {
        id: 'fit-short-nipple',
        name: '신주단니플',
        category: 'fittings',
        price: 1100,
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
                    { label: '15mm - 1,100원', priceChange: 0 },
                    { label: '20mm - 1,870원', priceChange: 770 },
                    { label: '25mm - 2,970원', priceChange: 1870 },
                    { label: '32mm - 5,610원', priceChange: 4510 },
                    { label: '40mm - 7,040원', priceChange: 5940 },
                    { label: '50mm - 10,890원', priceChange: 9790 },
                ]
            }
        ]
    },
    {
        id: 'fit-pe-series',
        name: 'PE제작니플(PE제작구찌)',
        category: 'fittings',
        price: 14300,
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
                    { label: '15mm - 14,300원', priceChange: 0 },
                    { label: '20mm - 16,500원', priceChange: 2200 },
                    { label: '25mm - 19,800원', priceChange: 5500 },
                    { label: '30mm - 23,100원', priceChange: 8800 },
                    { label: '40mm - 26,400원', priceChange: 12100 },
                    { label: '50mm - 30,800원', priceChange: 16500 },
                    { label: '65mm - 36,300원', priceChange: 22000 },
                    { label: '75mm - 52,800원', priceChange: 38500 },
                    { label: '100mm - 66,000원', priceChange: 51700 },
                ]
            }
        ]
    },
    {
        id: 'fit-lid-series',
        name: '물탱크 뚜껑',
        category: 'fittings',
        price: 16500,
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
                    { label: '소형 (직경380mm, ~2톤용) - 16,500원', priceChange: 0 },
                    { label: '대형 (직경470mm, 3톤 이상) - 33,000원', priceChange: 16500 },
                ]
            }
        ]
    },
    {
        id: 'fit-ball-tap',
        name: '볼탑',
        category: 'fittings',
        price: 8360,
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
                    { label: '15mm - 8,360원', priceChange: 0 },
                    { label: '20mm - 12,870원', priceChange: 4510 },
                    { label: '25mm - 14,960원', priceChange: 6600 },
                    { label: '32mm - 38,170원', priceChange: 29810 },
                    { label: '40mm - 48,510원', priceChange: 40150 },
                    { label: '50mm - 74,580원', priceChange: 66220 },
                ]
            }
        ]
    },
    {
        id: 'fit-level-gauge',
        name: '레벨게이지(수위계)',
        category: 'fittings',
        price: 33000,
        description: '물탱크 외부에서 내부 수위를 직관적으로 확인할 수 있는 투명 튜브형 레벨게이지입니다.',
        features: ['수위 직관적 확인', '깔끔한 마감'],
        specs: { capacity: '공용', material: '투명 호스 및 신주 피팅', warranty: '-' },
        images: ['/images/products/fit-level-gauge.png'],
        reviews: []
    },

    // --- ORIGINAL INDIVIDUAL PRODUCTS BELOW ---
    // --- PE Tanks (General - Blue) ---
    // Sizes based on: https://blog.naver.com/jypvc-/224104052091


    
    {
        id: 'coir-mat-premium',
        name: '프리미엄 야자매트 (코코넛 매트)',
        category: 'coir-mat',
        price: 99000,
        description: '베트남산 최고급 천연 코코넛 섬유로 제작된 친환경 야자매트입니다. 보행로, 등산로, 조경용으로 최적화되어 있습니다.',
        isRecommended: true,
        isFreeShipping: true,
        features: ['100% 천연 코코넛', '미끄럼 방지', '토양 보호', '내구성 강화'],
        specs: { material: '베트남산 코코넛 섬유', warranty: '1년' },
        images: ['/images/products/yaja/yaja-product.png'],
        reviews: [],
        options: [
            {
                name: '매트 폭(너비) 선택',
                type: 'select',
                required: true,
                choices: [
                    { label: '0.6m x 10m - 75,000원', priceChange: -24000 },
                    { label: '0.8m x 10m - 87,000원', priceChange: -12000 },
                    { label: '1.0m x 10m (표준) - 99,000원', priceChange: 0 },
                    { label: '1.2m x 10m - 111,000원', priceChange: 12000 },
                    { label: '1.5m x 10m - 136,000원', priceChange: 37000 },
                    { label: '2.0m x 10m - 166,000원', priceChange: 67000 },
                ]
            },
            {
                name: '고정용 철근핀 추가',
                type: 'radio',
                required: true,
                choices: [
                    { label: '철근핀 15개 포함 (기본형) - 0원', priceChange: 0 },
                    { label: '철근핀 30개 포함 (강화형) - 5,000원', priceChange: 5000 },
                ]
            }
        ]
    }
];

export function getProductById(id: string): Product | undefined {
    return PRODUCTS.find(p => p.id === id);
}
