'use client';

import Link from 'next/link';
import { Truck, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';

const TABS = ['전체 보기', '원형물탱크', '사각물탱크', '부속자재'];

// Define the top-level overview cards for the "전체 보기" tab
const overviewCategories = [
    {
        id: 'overview-round',
        name: 'PE 원형 물탱크',
        tag: '인기상품',
        tagColor: 'bg-red-600',
        capacityBadge: '0.2톤 ~ 10톤',
        price: 64900,
        description: '0.2톤부터 10톤까지 · 용량별 옵션 선택',
        features: ['KS인증'],
        images: ['/images/products/tank-round-real.png'],
        targetTab: '원형물탱크'
    },
    {
        id: 'overview-square',
        name: 'PE 사각 물탱크',
        tag: '공간활용',
        capacityBadge: '0.2톤 ~ 2톤',
        price: 70400,
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
        price: 3300,
        description: '황동 피팅, 밸브, 뚜껑 등 규격별 선택',
        features: ['신주/PE'],
        images: ['/images/products/fit-bronze-real.png'],
        targetTab: '부속자재'
    }
];

export default function CategoryGrid() {
    const [activeTab, setActiveTab] = useState('전체 보기');

    // Get items to display based on active tab
    const getDisplayItems = () => {
        if (activeTab === '전체 보기') {
            return overviewCategories.map(item => ({ ...item, isOverview: true }));
        }

        return PRODUCTS.filter(product => {
            // First, filter out any unwanted top-level categories explicitly
            const excludedCategories = ['buried', 'chemical', 'septic', 'mobile-toilet', 'water-tank']; // 'water-tank' might be too generic
            if (excludedCategories.includes(product.category)) return false;

            // Hide the wrapper "-series" products except for fittings
            if (product.id.includes('-series') && product.category !== 'fittings') return false;

            if (activeTab === '원형물탱크') return product.category === 'pe-round';
            if (activeTab === '사각물탱크') return product.category === 'pe-square';
            if (activeTab === '부속자재') return product.category === 'fittings';

            return false;
        });
    };

    const displayItems = getDisplayItems();

    return (
        <section id="products" className="py-16 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">상품 목록</h2>
                        <p className="mt-2 text-gray-500">원하시는 규격의 물탱크를 바로 확인해 보세요</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-12 border-b border-slate-100 pb-4">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-bold pb-2 transition-colors ${activeTab === tab
                                ? 'text-slate-900 border-b-2 border-slate-900'
                                : 'text-slate-400 hover:text-slate-900'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto ${activeTab === '전체 보기' ? 'md:grid-cols-3 max-w-5xl' : 'lg:grid-cols-3 xl:grid-cols-4'}`}>
                    {displayItems.map((item: any) => {
                        const isOverview = item.isOverview;
                        const hrefUrl = isOverview ? '#' : `/products/${item.id}`;
                        const isLevelGauge = item.id === 'fit-level-gauge';

                        const handleItemClick = (e: React.MouseEvent) => {
                            if (isOverview) {
                                e.preventDefault();
                                setActiveTab(item.targetTab);
                                // Scroll to the tabs section
                                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                            }
                        };

                        return (
                            <div
                                key={item.id}
                                onClick={handleItemClick}
                                className={`group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col bg-white ${isOverview ? 'cursor-pointer' : ''}`}
                            >
                                <div className="block relative aspect-square p-6 group-hover:bg-gray-50 transition-colors bg-white">
                                    {item.tag && (
                                        <div className={`absolute top-0 left-0 ${item.tagColor || 'bg-industrial-900'} text-white text-xs font-bold px-3 py-1.5 rounded-br-xl shadow-sm z-10`}>
                                            {item.tag}
                                        </div>
                                    )}
                                    {!item.tag && item.features && item.features[0] && (
                                        <div className="absolute top-0 left-0 bg-industrial-900 text-white text-xs font-bold px-3 py-1.5 rounded-br-xl shadow-sm z-10">
                                            {item.features[0]}
                                        </div>
                                    )}
                                    {item.capacityBadge && (
                                        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-black px-2.5 py-1 rounded-md shadow-sm z-10 border border-yellow-500">
                                            {item.capacityBadge}
                                        </div>
                                    )}
                                    {!item.capacityBadge && item.specs?.capacity && (
                                        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-black px-2.5 py-1 rounded-md shadow-sm z-10 border border-yellow-500">
                                            {item.specs.capacity}
                                        </div>
                                    )}

                                    <img
                                        src={item.images?.[0] || ''}
                                        alt={item.name}
                                        className={`w-full h-full object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300 mix-blend-multiply ${isLevelGauge ? 'p-8 scale-90' : ''}`}
                                    />
                                </div>

                                <div className="p-5 flex flex-col flex-1 cursor-default bg-white border-t border-gray-50">
                                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">
                                        {item.name}
                                    </h3>

                                    {item.description && (
                                        <p className="text-xs text-gray-500 mb-3 font-medium line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}

                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        <div className="flex items-end justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-400 font-medium mb-0.5">판매가 (VAT 포함)</span>
                                                <span className="font-bold text-lg tracking-tight text-slate-900">
                                                    {item.price.toLocaleString()}원{isOverview && <span className="text-sm font-normal text-slate-500 ml-1">~</span>}
                                                </span>
                                            </div>
                                            {isOverview ? (
                                                <button className="flex items-center gap-1 text-xs font-semibold text-[#003399] bg-blue-50 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                                    목록 보기
                                                </button>
                                            ) : (
                                                <Link href={hrefUrl} className="flex items-center gap-1 text-xs font-semibold text-[#003399] bg-blue-50 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                                    상세 보기
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
