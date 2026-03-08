'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ShoppingCart, Eye } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/products';

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

// Categories that use dropdown selector (large product lists)
const DROPDOWN_CATEGORIES = ['pe-round', 'pe-square'];

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const categoryInfo = CATEGORY_INFO[slug] || { title: '제품 목록', description: '전체 제품 목록입니다.', emoji: '📦' };
    const useDropdown = DROPDOWN_CATEGORIES.includes(slug);

    useEffect(() => {
        const categoryProducts = PRODUCTS.filter(p => p.category === slug);
        setAllProducts(categoryProducts);
        setSelectedProductId('');
        setSelectedProduct(null);
    }, [slug]);

    // When dropdown selection changes
    const handleProductSelect = (productId: string) => {
        setSelectedProductId(productId);
        const found = allProducts.find(p => p.id === productId) || null;
        setSelectedProduct(found);
    };

    // --- DROPDOWN UI (원형/사각 물탱크) ---
    if (useDropdown) {
        return (
            <div className="bg-white min-h-screen pt-24 pb-20">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">

                    {/* Back Link */}
                    <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-8 transition-colors text-sm font-medium">
                        <ArrowLeft className="w-4 h-4 mr-1.5" />
                        메인으로 돌아가기
                    </Link>

                    {/* Header Card */}
                    <div className="bg-gradient-to-br from-industrial-50 to-blue-50 border border-industrial-100 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{categoryInfo.emoji}</span>
                            <h1 className="text-2xl font-black text-gray-900">{categoryInfo.title}</h1>
                        </div>
                        <p className="text-sm text-gray-600 break-keep leading-relaxed">{categoryInfo.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center text-xs bg-white border border-industrial-200 text-industrial-700 px-2.5 py-1 rounded-full font-medium">KS 인증 정품</span>
                            <span className="inline-flex items-center text-xs bg-white border border-industrial-200 text-industrial-700 px-2.5 py-1 rounded-full font-medium">3중층 구조</span>
                            <span className="inline-flex items-center text-xs bg-white border border-industrial-200 text-industrial-700 px-2.5 py-1 rounded-full font-medium">총 {allProducts.length}개 규격</span>
                        </div>
                    </div>

                    {/* STEP 1: Dropdown Selector */}
                    <div className="bg-white border-2 border-industrial-200 rounded-2xl p-5 mb-4 shadow-sm">
                        <p className="text-xs font-bold text-industrial-600 uppercase tracking-widest mb-3">STEP 1 · 용량 선택</p>
                        <div className="relative">
                            <select
                                value={selectedProductId}
                                onChange={(e) => handleProductSelect(e.target.value)}
                                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 font-semibold rounded-xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-industrial-500 focus:border-transparent transition-all text-base"
                            >
                                <option value="">— 용량을 선택하세요 —</option>
                                {allProducts.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name.split(' ')[0]}({p.specs.capacity}) — {Number(p.price).toLocaleString()}원~
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* STEP 2: Product Info (shown after selection) */}
                    {selectedProduct ? (
                        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
                            {/* Product Card */}
                            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg mb-4">
                                {/* Image */}
                                <div className="bg-gradient-to-b from-gray-50 to-white px-8 pt-8 pb-4 flex justify-center">
                                    <img
                                        src={selectedProduct.images[0]}
                                        alt={selectedProduct.name}
                                        className="h-44 object-contain drop-shadow-md"
                                    />
                                </div>

                                <div className="p-5">
                                    <h2 className="text-xl font-black text-gray-900 mb-1">{selectedProduct.name}</h2>
                                    <p className="text-sm text-gray-500 mb-4 break-keep">{selectedProduct.description}</p>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {selectedProduct.specs.capacity && (
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">용량</p>
                                                <p className="text-sm font-bold text-gray-900">{selectedProduct.specs.capacity}</p>
                                            </div>
                                        )}
                                        {selectedProduct.specs.dimensions && (
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">규격</p>
                                                <p className="text-sm font-bold text-gray-900">{selectedProduct.specs.dimensions}</p>
                                            </div>
                                        )}
                                        {selectedProduct.specs.material && (
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">소재</p>
                                                <p className="text-sm font-bold text-gray-900">{selectedProduct.specs.material}</p>
                                            </div>
                                        )}
                                        {selectedProduct.specs.warranty && (
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">보증</p>
                                                <p className="text-sm font-bold text-gray-900">{selectedProduct.specs.warranty}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {selectedProduct.features.map((f, i) => (
                                            <span key={i} className="text-xs bg-industrial-50 text-industrial-700 border border-industrial-100 px-2 py-1 rounded-full font-medium">
                                                #{f}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price */}
                                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
                                        <p className="text-xs text-red-400 font-bold mb-1">기본가 (VAT 포함)</p>
                                        <p className="text-3xl font-black text-red-600">
                                            {Number(selectedProduct.price).toLocaleString()}원~
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">* 피팅, 타공 등 옵션에 따라 가격이 달라집니다</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link
                                            href={`/products/${selectedProduct.id}`}
                                            className="flex items-center justify-center gap-2 bg-industrial-900 hover:bg-industrial-800 text-white font-bold py-4 rounded-xl transition-colors text-sm"
                                        >
                                            <Eye className="w-4 h-4" />
                                            상세 보기
                                        </Link>
                                        <Link
                                            href={`/products/${selectedProduct.id}`}
                                            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-colors text-sm"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            바로 주문
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Tip: Browse all */}
                            <p className="text-center text-xs text-gray-400">
                                전체 규격 비교가 필요하신가요?{' '}
                                <Link href={`/products/${selectedProduct.id}`} className="text-industrial-600 font-bold underline">
                                    상세 페이지에서 확인하기
                                </Link>
                            </p>
                        </div>
                    ) : (
                        /* Placeholder when nothing selected */
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center">
                            <div className="text-4xl mb-3">{categoryInfo.emoji}</div>
                            <p className="text-gray-400 font-medium text-sm">위에서 용량을 선택하면<br />제품 정보와 가격이 표시됩니다</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // --- GRID UI (fittings, chemical-tank 등 - 기존 방식 유지) ---
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
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
                                    {product.images[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-industrial-600 transition-colors line-clamp-2">{product.name}</h3>
                                    <p className="text-xs text-gray-400 mb-3">{product.specs.capacity}</p>
                                    <p className="text-lg font-black text-red-600">{Number(product.price).toLocaleString()}원~</p>
                                </div>
                            </Link>
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
