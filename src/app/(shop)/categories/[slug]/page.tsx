'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

// Map slugs to display titles and details
const CATEGORY_INFO: Record<string, { title: string; description: string; emoji: string }> = {
    'pe-round': {
        title: '원형 물탱크',
        description: '가장 널리 사용되는 표준형 물탱크입니다. 강한 내구성과 경제성을 자랑합니다.',
        emoji: '🔵',
    },
    'pe-square': {
        title: '사각 물탱크',
        description: '좁은 공간이나 코너에 설치하기 좋은 사각 물탱크입니다. 공간 활용도가 뛰어납니다.',
        emoji: '🟦',
    },
    'fittings': {
        title: '부속자재',
        description: '물탱크와 배관 연결을 위한 각종 피팅 및 밸브',
        emoji: '🔧',
    },
    'chemical-tank': {
        title: '약품탱크',
        description: '내화학성이 뛰어난 산업용 약품 탱크',
        emoji: '🧪',
    },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const categoryInfo = CATEGORY_INFO[slug] || { title: '제품 목록', description: '전체 제품 목록입니다.', emoji: '📦' };

    useEffect(() => {
        const categoryProducts = PRODUCTS.filter(p => p.category === slug);
        setAllProducts(categoryProducts);
        // Initialize quantities
        const initialQuantities: Record<string, number> = {};
        categoryProducts.forEach(p => {
            initialQuantities[p.id] = 1;
        });
        setQuantities(initialQuantities);
    }, [slug]);

    const handleQuantityChange = (id: string, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta)
        }));
    };

    const handleAddToCart = (product: Product) => {
        const q = quantities[product.id] || 1;
        addToCart({
            productId: product.id,
            name: product.name,
            basePrice: product.price,
            options: [],
            requirements: '카테고리 목록에서 추가됨',
            quantity: q,
            image: product.images[0] || ''
        });
        alert(`${product.name} ${q}개가 장바구니에 담겼습니다.`);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-6 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        메인으로 돌아가기
                    </Link>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{categoryInfo.emoji}</span>
                        <h1 className="text-3xl font-black text-gray-900">{categoryInfo.title}</h1>
                    </div>
                    <p className="text-gray-600 max-w-2xl break-keep">{categoryInfo.description}</p>
                    <p className="text-gray-400 mt-2 text-sm">총 <span className="text-industrial-600 font-bold">{allProducts.length}</span>개의 제품</p>
                </div>

                {/* Product Grid */}
                {allProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                            >
                                <Link href={`/products/${product.id}`} className="aspect-square bg-gray-50 flex items-center justify-center p-6 shrink-0">
                                    {product.images[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                                    )}
                                </Link>
                                <div className="p-4 flex-1 flex flex-col">
                                    <Link href={`/products/${product.id}`}>
                                        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-industrial-600 transition-colors line-clamp-2 min-h-[3rem]">{product.name}</h3>
                                    </Link>
                                    <p className="text-xs text-gray-400 mb-2">{product.specs.capacity}</p>
                                    <p className="text-lg font-black text-industrial-900 mb-4">{Number(product.price).toLocaleString()}원</p>
                                    
                                    <div className="mt-auto space-y-3">
                                        <button 
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full bg-industrial-900 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-industrial-800 transition-colors flex items-center justify-center gap-2"
                                        >
                                            담기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-400">제품이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
