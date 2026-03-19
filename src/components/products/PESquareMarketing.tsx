'use client';

import React, { useState } from 'react';
import { ShoppingCart, Check, ChevronRight } from 'lucide-react';
import PERoundCSSection from './PERoundCSSection';
import { useCart } from '@/context/CartContext';
import { PRICING_DB } from '@/lib/products';

const SQUARE_PRODUCTS = [
    { id: 'pe-square-02t', name: '0.2톤 사각 물탱크', capacity: '0.2', price: PRICING_DB.tanks.m_series['0.2'] },
    { id: 'pe-square-04t', name: '0.4톤 사각 물탱크', capacity: '0.4', price: PRICING_DB.tanks.m_series['0.4'] },
    { id: 'pe-square-06t', name: '0.6톤 사각 물탱크', capacity: '0.6', price: PRICING_DB.tanks.m_series['0.6'] },
    { id: 'pe-square-1t', name: '1톤 사각 물탱크', capacity: '1', price: PRICING_DB.tanks.m_series['1'] },
    { id: 'pe-square-2t', name: '2톤 사각 물탱크', capacity: '2', price: PRICING_DB.tanks.m_series['2'] },
];

interface MarketingProps {
    hidePurchaseGrid?: boolean;
}

export default function PESquareMarketing({ hidePurchaseGrid = false }: MarketingProps) {
    const { addToCart } = useCart();
    const handleAddToCart = (product: typeof SQUARE_PRODUCTS[0]) => {
        addToCart({
            productId: product.id,
            name: product.name,
            basePrice: product.price,
            options: [],
            requirements: '메인 페이지 바로 구매하기 섹션에서 추가됨',
            quantity: 1,
            image: '/images/products/tank-square-real.jpg'
        });
        alert(`${product.name} 1개가 장바구니에 담겼습니다.`);
    };

    return (
        <div className="w-full bg-white flex flex-col items-center pb-20">
            {/* Main Detail Image */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center shadow-lg border border-gray-100 rounded-2xl overflow-hidden mt-8 bg-white">
                <img
                    src="/images/products/pe-square-details/square-detail-hq.jpg"
                    alt="사각 PE 물탱크 상세정보"
                    className="w-full h-auto block"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
            </div>

            {/* Product Selection Grid */}
            {!hidePurchaseGrid && (
                <section className="w-full max-w-6xl mx-auto mt-20 px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-industrial-900 mb-4 tracking-tight">바로 구매하기</h2>
                        <p className="text-gray-500 font-medium">원하시는 용량을 선택해 장바구니에 바로 담으세요.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SQUARE_PRODUCTS.map((product) => (
                            <div key={product.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group border-b-4 border-b-gray-100 hover:border-b-industrial-500">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-black text-industrial-900 text-lg">{product.name}</h3>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mt-1">{product.capacity} TON CAPACITY</p>
                                    </div>
                                    <div className="bg-industrial-50 text-industrial-600 p-2 rounded-xl group-hover:bg-industrial-600 group-hover:text-white transition-colors">
                                        <Check className="w-5 h-5" />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-4 mt-6">
                                    <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                                        <span>가격 (부가세 포함)</span>
                                        <span className="text-industrial-600 text-lg font-black">{product.price.toLocaleString()}원</span>
                                    </div>

                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-industrial-900 hover:bg-industrial-800 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-industrial-100 mt-2"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        장바구니 담기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className="w-full max-w-7xl mx-auto mt-20 bg-white rounded-[2rem] overflow-hidden">
                <PERoundCSSection />
            </div>
        </div>
    );
}
