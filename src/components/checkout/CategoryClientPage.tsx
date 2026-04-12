'use client';

import { use } from 'react';
import CategoryGrid from '@/components/checkout/CategoryGrid';
import { PRODUCTS } from '@/lib/products';

export default function CategoryClientPage({ 
    params, 
    categoryInfo 
}: { 
    params: Promise<{ slug: string }>, 
    categoryInfo: { title: string; description: string; emoji: string } 
}) {
    const { slug } = use(params);
    const categoryProducts = PRODUCTS.filter(p => p.category === slug);
    
    const slugMap: Record<string, string> = {
        'pe-round': '원형물탱크',
        'pe-square': '사각물탱크',
        'fittings': '부속자재',
        'coir-mat': '야자매트',
    };
    const initialTab = slugMap[slug] || '전체 보기';

    return (
        <div className="bg-white min-h-screen pt-28 pb-24">
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{categoryInfo.emoji}</span>
                        <h1 className="text-4xl font-black text-gray-900">{categoryInfo.title}</h1>
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
                        {categoryInfo.description}
                    </p>
                </div>

                <CategoryGrid initialTab={initialTab} products={categoryProducts} />
            </section>
        </div>
    );
}
