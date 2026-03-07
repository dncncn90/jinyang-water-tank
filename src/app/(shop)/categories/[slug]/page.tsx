'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Filter } from 'lucide-react';
import { PRODUCTS, Product } from '@/lib/products';
import ProductCard from '@/components/checkout/ProductCard';

// Map slugs to display titles and details
const CATEGORY_INFO: Record<string, { title: string; description: string }> = {
    'pe-round': {
        title: '원형 물탱크 (Vertical)',
        description: '가장 널리 사용되는 표준형 물탱크입니다. 강한 내구성과 경제성을 자랑합니다.',
    },
    'pe-square': {
        title: '사각 물탱크 (Square)',
        description: '좁은 공간이나 코너에 설치하기 좋은 사각 물탱크입니다. 공간 활용도가 뛰어납니다.',
    },
    'septic-tank': {
        title: '정화조',
        description: '환경을 생각하는 고강도 PE 정화조 (부패식/폭기식)',
    },
    'toilet': {
        title: '이동식 화장실',
        description: '간편한 설치와 쾌적한 사용성의 이동식 화장실',
    },
    'fittings': {
        title: '부속자재',
        description: '물탱크와 배관 연결을 위한 각종 피팅 및 밸브',
    },
    'chemical-tank': {
        title: '약품탱크',
        description: '내화학성이 뛰어난 산업용 약품 탱크',
    },
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<{ capacity: string[] }>({ capacity: [] });

    // Safety check for category
    const categoryInfo = CATEGORY_INFO[slug] || { title: '제품 목록', description: '전체 제품 목록입니다.' };

    useEffect(() => {
        // Initial load
        const categoryProducts = PRODUCTS.filter(p => p.category === slug);
        setAllProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
    }, [slug]);

    useEffect(() => {
        if (selectedFilters.capacity.length === 0) {
            setFilteredProducts(allProducts);
            return;
        }

        const filtered = allProducts.filter(p => {
            // Extract numeric capacity for comparison or exact string match
            // Simple string partial match for now: "1톤" in "1톤 PE..."
            return selectedFilters.capacity.some(filterCap => p.name.includes(filterCap));
        });
        setFilteredProducts(filtered);
    }, [selectedFilters, allProducts]);

    // Extract unique capacities for filter options (heuristic based on name or specs)
    const capacityOptions = Array.from(new Set(allProducts.map(p => {
        // Simplified extraction logic: Look for common capacity patterns
        const match = p.name.match(/(\d+(?:톤|L|리터|mm|인용))/);
        return match ? match[0] : '기타';
    }))).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const toggleFilter = (cap: string) => {
        setSelectedFilters(prev => {
            const newCaps = prev.capacity.includes(cap)
                ? prev.capacity.filter(c => c !== cap)
                : [...prev.capacity, cap];
            return { ...prev, capacity: newCaps };
        });
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex justify-between items-start">
                        <div>
                            <Link href="/" className="inline-flex items-center text-industrial-500 hover:text-industrial-700 mb-6 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                메인으로 돌아가기
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{categoryInfo.title}</h1>
                            <p className="text-lg text-gray-600 max-w-full inline-block whitespace-nowrap overflow-visible">
                                {categoryInfo.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filter / Sort Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
                    <p className="text-gray-500 font-medium">총 <span className="text-industrial-600 font-bold">{filteredProducts.length}</span>개의 제품</p>

                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${showFilter ? 'bg-industrial-100 text-industrial-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        <Filter className="w-4 h-4" />
                        <span className="text-sm font-medium">규격 필터 {showFilter ? '접기' : '열기'}</span>
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilter && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
                        <h3 className="font-bold text-gray-900 mb-3">용량/규격 선택</h3>
                        <div className="flex flex-wrap gap-2">
                            {capacityOptions.map((cap) => (
                                <button
                                    key={cap}
                                    onClick={() => toggleFilter(cap)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedFilters.capacity.includes(cap)
                                        ? 'bg-industrial-600 text-white shadow-md transform scale-105'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-industrial-300'
                                        }`}
                                >
                                    {cap}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    capacity: product.specs.capacity || '-',
                                    material: product.specs.material || '-',
                                    price: Number(product.price),
                                    image: product.images[0],
                                    features: product.features,
                                    hasOptions: !!(product.options && product.options.length > 0) && !['pe-round', 'pe-square'].includes(product.category)
                                }}
                                onSelect={() => window.location.href = `/products/${product.id}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500">해당 조건에 맞는 제품이 없습니다.</p>
                        <button
                            onClick={() => setSelectedFilters({ capacity: [] })}
                            className="mt-4 text-industrial-600 font-medium hover:underline"
                        >
                            필터 초기화
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
