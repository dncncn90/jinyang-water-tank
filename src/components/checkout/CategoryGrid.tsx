'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS, PRICING_DB } from '@/lib/products';

const TABS = ['전체 보기', '원형물탱크', '사각물탱크', '부속자재', '야자매트'];

// Define the top-level overview cards for the "전체 보기" tab
const overviewCategories = [
    {
        id: 'overview-round',
        name: 'PE 원형 물탱크',
        tag: '인기상품',
        tagColor: 'bg-red-600',
        capacityBadge: '0.2~10톤',
        price: PRICING_DB.tanks.standard['0.2'],
        description: '0.2톤부터 10톤까지 · 용량별 옵션 선택',
        features: ['KS인증'],
        images: ['/images/products/tank-round-real.png'],
        targetTab: '원형물탱크'
    },
    {
        id: 'overview-square',
        name: 'PE 사각 물탱크',
        tag: '공간활용',
        capacityBadge: '0.2~2톤',
        price: PRICING_DB.tanks.m_series['0.2'],
        description: '좁은 코너, 실내 전용 · 용량별 옵션 선택',
        features: ['좁은공간'],
        images: ['/images/products/tank-square-real.jpg'],
        targetTab: '사각물탱크'
    },
    {
        id: 'overview-fittings',
        name: '각종 부속자재 및 밸브',
        tag: '부속품',
        capacityBadge: '15A ~ 100A',
        price: PRICING_DB.fittings.bronze['15'],
        description: '황동 피팅, 밸브, 뚜껑 등 규격별 선택',
        features: ['신주/PE'],
        images: ['/images/products/fit-bronze-real.png'],
        targetTab: '부속자재'
    },
    {
        id: 'overview-coir-mat',
        name: '품질인정 야자매트',
        tag: '무료배송',
        tagColor: 'bg-emerald-600',
        capacityBadge: '추천상품',
        price: PRICING_DB.coir_mat['1.0'],
        description: 'B2B/공사 현장 대량 납품 전용 · 철근핀 풀세트 구성',
        features: ['천연코코넛'],
        images: ['/images/products/yaja/yaja-product.png'],
        targetTab: '야자매트'
    }
];

export default function CategoryGrid() {
    const [activeTab, setActiveTab] = useState('전체 보기');
    const { addToCart } = useCart();
    const router = useRouter();

    // Get items to display based on active tab
    const getDisplayItems = () => {
        if (activeTab === '전체 보기') {
            return overviewCategories.map(item => ({ ...item, isOverview: true }));
        }

        return PRODUCTS.filter(product => {
            const excludedCategories = ['buried', 'chemical', 'septic', 'mobile-toilet', 'water-tank'];
            if (excludedCategories.includes(product.category)) return false;
            if (product.id.includes('-series') && product.category !== 'fittings') return false;

            if (activeTab === '원형물탱크') return product.category === 'pe-round';
            if (activeTab === '사각물탱크') return product.category === 'pe-square';
            if (activeTab === '부속자재') return product.category === 'fittings';
            if (activeTab === '야자매트') return product.category === 'coir-mat';

            return false;
        });
    };

    const displayItems = getDisplayItems();

    return (
        <section id="products" className="py-16 sm:py-24 bg-[#F1F5F9] font-['Pretendard']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mb-12 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-black text-[#003366] tracking-tight mb-2">분류별 상품 안내</h2>
                    <p className="text-lg sm:text-xl text-gray-500 font-bold">찾으시는 제품군을 선택해 주세요</p>
                </div>

                {/* 탭 네비게이션 (큼직한 버튼 형태) */}
                <div className="flex gap-2 sm:gap-4 mb-10 overflow-x-auto no-scrollbar pb-2">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl text-lg font-black transition-all whitespace-nowrap shadow-sm border-2 ${
                                activeTab === tab
                                    ? 'bg-[#003366] text-white border-[#003366]'
                                    : 'bg-white text-gray-600 border-gray-100 hover:border-[#003366]/30'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto ${activeTab === '전체 보기' ? 'md:grid-cols-3 max-w-6xl' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
                    {displayItems.map((item: any) => {
                        const isOverview = item.isOverview;
                        const isLevelGauge = item.id === 'fit-level-gauge';

                        const handleItemClick = (e: React.MouseEvent) => {
                            if (isOverview) {
                                e.preventDefault();
                                setActiveTab(item.targetTab);
                                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        };

                        return (
                            <div
                                key={item.id}
                                onClick={handleItemClick}
                                className={`group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-white flex flex-col bg-white ${isOverview ? 'cursor-pointer' : ''}`}
                            >
                                {/* 상품 이미지 영역 */}
                                <div className="block relative aspect-square p-8 group-hover:scale-105 transition-transform duration-500">
                                    {item.tag && (
                                        <div className={`absolute top-4 left-4 ${item.tagColor || 'bg-[#003366]'} text-white text-sm font-black px-4 py-1.5 rounded-lg shadow-md z-10`}>
                                            {item.tag}
                                        </div>
                                    )}
                                    {item.capacityBadge && (
                                        <div className="absolute top-4 right-4 bg-[#FFD400] text-[#003366] text-xs font-black px-3 py-1 rounded-md shadow-sm z-10 border border-yellow-500 animate-pulse">
                                            {item.capacityBadge}
                                        </div>
                                    )}

                                    <img
                                        src={item.images?.[0] || ''}
                                        alt={item.name}
                                        className={`w-full h-full object-contain drop-shadow-lg ${isLevelGauge ? 'p-10' : ''}`}
                                    />
                                </div>

                                {/* 상품 정보 영역 */}
                                <div className="p-6 pt-2 flex flex-col flex-1">
                                    <h3 className="text-xl font-black text-[#111827] mb-2 leading-tight">
                                        {item.name}
                                    </h3>

                                    {item.description && (
                                        <p className="text-base text-gray-500 mb-4 font-bold leading-snug">
                                            {item.description}
                                        </p>
                                    )}

                                    <div className="mt-auto space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100/50">
                                            <span className="block text-xs text-gray-400 font-black mb-1 uppercase tracking-wider">판매가 (VAT 포함)</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="font-black text-2xl sm:text-3xl text-[#003366] tracking-tighter">
                                                    {item.price.toLocaleString()}원
                                                </span>
                                                {isOverview && <span className="text-lg font-bold text-gray-400">~</span>}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {isOverview ? (
                                                <button className="w-full flex items-center justify-center gap-2 text-lg font-black text-white bg-[#003366] py-4 rounded-2xl hover:bg-[#002855] transition-all shadow-lg active:scale-95">
                                                    종류별 확인
                                                    <ArrowRight className="w-5 h-5" />
                                                </button>
                                            ) : (
                                                <Link
                                                    href={`/products/${item.id}`}
                                                    className="flex items-center justify-center gap-2 text-lg font-black text-white bg-[#003366] py-4 rounded-2xl hover:bg-[#002855] transition-all shadow-lg active:scale-95"
                                                >
                                                    상세보기
                                                    <ArrowRight className="w-5 h-5" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
