'use client';

import { useState } from 'react';
import { FileText, ZoomIn, MessageSquare, ShoppingCart, CreditCard, Leaf, Check, Shield, Truck } from 'lucide-react';
import { Product } from '@/lib/products';
import ProductMarketingContent from '@/components/products/ProductMarketingContent';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { ProductJsonLd } from '@/components/seo/JsonLd';

function TrustBadge({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            {icon}
            <span className="text-xs font-bold text-gray-700">{text}</span>
        </div>
    );
}

export default function ProductClientPage({ product }: { product: Product }) {
    const [selectedOptions, setSelectedOptions] = useState<Record<string, { label: string; priceChange: number; quantity?: number }>>(() => {
        const initial: Record<string, { label: string; priceChange: number; quantity?: number }> = {};
        if (product?.options) {
            product.options.forEach(opt => {
                if (opt.required && opt.choices.length > 0) {
                    initial[opt.name] = {
                        label: opt.choices[0].label,
                        priceChange: opt.choices[0].priceChange,
                        quantity: 1
                    };
                }
            });
        }
        return initial;
    });
    const [requirements] = useState('');
    const [quantity] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();

    const isSquare = product.category === 'pe-square';
    const isFittingCategory = product.category === 'fittings';

    // Price Calculation
    const optionsTotal = Object.values(selectedOptions).reduce((acc, curr) => acc + (curr.priceChange * (curr.quantity || 1)), 0);
    const totalPrice = product.price + optionsTotal;

    const handleOptionChange = (optionName: string, choiceLabel: string, priceChange: number) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionName]: { label: choiceLabel, priceChange, quantity: prev[optionName]?.quantity || 1 },
        }));
    };

    const handleActionIntent = (action: 'cart' | 'buy') => {
        if (product.options) {
            const missingRequired = product.options.filter(opt => opt.required && !selectedOptions[opt.name]);
            if (missingRequired.length > 0) {
                alert(`다음 필수 옵션을 선택해주세요: ${missingRequired.map(o => o.name).join(', ')}`);
                return;
            }
        }
        
        // Simple cart logic
        addToCart({
            productId: product.id,
            name: product.name,
            basePrice: product.price,
            options: [],
            requirements: requirements,
            quantity: quantity,
            image: product.images[0] || ''
        });

        if (action === 'cart') {
            if (confirm('상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?')) {
                router.push('/cart');
            }
        } else {
            router.push('/order');
        }
    };

    return (
        <div className="bg-white min-h-screen pt-28 pb-24">
            <ProductJsonLd 
                productId={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.images[0] || ''}
            />
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 relative cursor-zoom-in" onClick={() => setIsZoomed(!isZoomed)}>
                            <div className={`w-full h-full flex items-center justify-center p-2 transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
                                {product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain drop-shadow-xl" /> : <div className="text-gray-300 flex flex-col items-center"><FileText className="w-16 h-16 mb-2" /><span>이미지 준비중</span></div>}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            {product.category === 'coir-mat' ? (
                                <><TrustBadge icon={<Leaf className="w-4 h-4 text-emerald-600" />} text="최고급 품질" /><TrustBadge icon={<Check className="w-4 h-4 text-emerald-600" />} text="천연 코코넛" /></>
                            ) : (
                                <><TrustBadge icon={<Shield className="w-4 h-4 text-blue-600" />} text="KS인증" /><TrustBadge icon={<Check className="w-4 h-4 text-green-600" />} text="전문 도매" /></>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-gray-500 mb-6">{product.description}</p>
                        
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-bold text-blue-600">{totalPrice.toLocaleString()}원</span>
                                <span className="text-sm text-gray-500">(부가세 포함)</span>
                            </div>

                            {product.options && (
                                <div className="space-y-4 mb-6">
                                    {product.options.map((opt) => (
                                        <div key={opt.name}>
                                            <label className="text-sm font-bold text-gray-700 block mb-1.5">{opt.name}</label>
                                            <select 
                                                className="w-full bg-white border border-gray-300 p-3 rounded-xl"
                                                onChange={(e) => {
                                                    const choice = opt.choices.find(c => c.label === e.target.value);
                                                    if (choice) handleOptionChange(opt.name, choice.label, choice.priceChange);
                                                }}
                                            >
                                                {opt.choices.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                <button onClick={() => handleActionIntent('cart')} className="bg-white text-blue-600 border-2 border-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition-all">장바구니</button>
                                <button onClick={() => handleActionIntent('buy')} className="bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all">바로 구매하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 border-t border-gray-100 pt-12">
                <ProductMarketingContent category={product.category} />
            </div>
        </div>
    );
}
