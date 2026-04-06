'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Shield, Truck, FileText, ZoomIn, MessageSquare, ArrowLeft, Ruler, MousePointerClick, ChevronDown, Phone, ShoppingCart, CreditCard, Leaf } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import Image from 'next/image';
import ProductMarketingContent from '@/components/products/ProductMarketingContent';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

// --- Helper Components ---

function TrustBadge({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            {icon}
            <span className="text-xs font-bold text-gray-700">{text}</span>
        </div>
    );
}

function SpecRow({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
    return (
        <div className={`grid grid-cols-3 py-3 border-b border-gray-100 ${highlight ? 'bg-yellow-50/50' : ''}`}>
            <dt className="text-gray-500 text-sm pl-2">{label}</dt>
            <dd className="col-span-2 text-gray-900 font-medium">{value}</dd>
        </div>
    );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = PRODUCTS.find(p => p.id === id); 
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
    const [requirements, setRequirements] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const { addToCart } = useCart();
    const router = useRouter();

    if (!product) return notFound();
    
    const isSquare = product.category === 'pe-square';
    const isFittingCategory = product.category === 'fittings';

    // Price Calculation (Apply 1.1x VAT)
    const optionsTotal = Object.values(selectedOptions).reduce((acc, curr) => acc + (curr.priceChange * (curr.quantity || 1)), 0);
    const totalPrice = product.price + optionsTotal;

    const handleOptionChange = (optionName: string, choiceLabel: string, priceChange: number) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionName]: { label: choiceLabel, priceChange, quantity: prev[optionName]?.quantity || 1 },
        }));
    };

    const handleOptionQuantityChange = (optionName: string, delta: number) => {
        setSelectedOptions((prev) => {
            const current = prev[optionName];
            if (!current) return prev;
            const newQuantity = Math.max(1, (current.quantity || 1) + delta);
            return {
                ...prev,
                [optionName]: { ...current, quantity: newQuantity }
            };
        });
    };

    const getCartItemName = () => {
        if (!product) return '';
        let finalName = product.name;
        if (product.id.includes('-series')) {
            const capacityOpt = selectedOptions['용량(규격) 선택']?.label;
            if (capacityOpt) {
                const match = capacityOpt.match(/^([0-9.]+)톤/);
                if (match) {
                    const shape = product.category.includes('square') ? '사각' : '원형';
                    finalName = `${match[1]}톤 ${shape} 물탱크`;
                }
            }
        } else {
            const match = product.name.match(/([0-9.]+)톤.*?(원형|사각)/);
            if (match) {
                finalName = `${match[1]}톤 ${match[2]} 물탱크`;
            }
        }
        return finalName;
    };

    const validateOptions = () => {
        if (product.options) {
            const missingRequired = product.options.filter(opt => opt.required && !selectedOptions[opt.name]);
            if (missingRequired.length > 0) {
                alert(`다음 필수 옵션을 선택해주세요: ${missingRequired.map(o => o.name).join(', ')}`);
                return false;
            }
        }
        return true;
    };

    const handleActionIntent = (action: 'cart' | 'buy') => {
        if (!validateOptions()) return;
        executeAction(action);
    };

    const executeAction = (action: 'cart' | 'buy') => {
        if (!product) return;

        if (isFittingCategory) {
            const totalOptionPrice = Object.values(selectedOptions).reduce((acc, curr) => acc + curr.priceChange, 0);
            const selectedLabels = Object.values(selectedOptions)
                .map(opt => opt.label.split(' - ')[0])
                .filter(label => label && !label.includes('선택 안함'));
            
            const combinedName = selectedLabels.length > 0 
                ? `${product.name} (${selectedLabels.join(', ')})`
                : product.name;

            addToCart({
                productId: product.id,
                name: combinedName,
                basePrice: product.price + totalOptionPrice,
                options: [],
                requirements: requirements,
                quantity: quantity,
                image: product.images[0] || ''
            });
        } else {
            const baseOptions = Object.entries(selectedOptions)
                .filter(([_, { priceChange }]) => priceChange === 0)
                .map(([name, { label }]) => ({
                    name,
                    value: label,
                    priceChange: 0
                }));

            addToCart({
                productId: product.id,
                name: getCartItemName(),
                basePrice: product.price,
                options: baseOptions,
                requirements: requirements,
                quantity: quantity,
                image: product.images[0] || ''
            });

            Object.entries(selectedOptions)
                .filter(([_, { priceChange }]) => priceChange > 0)
                .forEach(([name, { label, priceChange, quantity: optQty }]) => {
                    let subProductId = 'fittings';
                    let subImage = '/images/products/fit-bronze-real.png';
                    
                    if (name.includes('볼밸브')) {
                        subProductId = 'fit-ballvalve-brass';
                        subImage = '/images/products/fit-ballvalve-brass.jpg';
                    } else if (name.includes('볼탑')) {
                        subProductId = 'fit-ball-tap';
                        subImage = '/images/products/fit-ball-tap-real.png';
                    } else if (name.includes('뚜껑')) {
                        subProductId = 'fit-lid-series';
                        subImage = '/images/products/tank-lid-real.jpg';
                    } else if (name.includes('게이지')) {
                        subProductId = 'fit-level-gauge';
                        subImage = '/images/products/fit-level-gauge.png';
                    } else if (name.includes('청동') || name.includes('신주')) {
                        subProductId = 'fit-bronze-series';
                        subImage = '/images/products/fit-bronze-real.png';
                    } else if (name.includes('PE')) {
                        subProductId = 'fit-pe-series';
                        subImage = '/images/products/fit-pe-real.jpg';
                    } else if (name.includes('철근핀')) {
                        subProductId = 'coir-mat-pins';
                        subImage = '/images/products/yaja/pins.png';
                    }

                    addToCart({
                        productId: subProductId,
                        name: `${name}: ${label}`,
                        basePrice: priceChange,
                        options: [],
                        requirements: '',
                        quantity: (optQty || 1) * quantity,
                        image: subImage
                    });
                });
        }

        if (action === 'cart') {
            if (confirm('상품들이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?')) {
                router.push('/cart');
            }
        } else {
            router.push('/cart');
        }
    };

    const handleOpenChat = () => {
        window.dispatchEvent(new Event('open-chat'));
    };

    const handlePrintQuote = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const date = new Date().toLocaleDateString();
            const items = [
                { name: product.name, price: product.price, quantity: 1 },
                ...Object.entries(selectedOptions)
                    .filter(([_, val]) => val.priceChange > 0)
                    .map(([key, val]) => ({ name: `${key}: ${val.label}`, price: val.priceChange, quantity: val.quantity || 1 }))
            ];

            printWindow.document.write(`
                <html>
                    <head>
                        <title>견적서 - 진양건재</title>
                        <style>
                            @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
                            body { font-family: 'Pretendard', 'Malgun Gothic', sans-serif; padding: 0; margin: 0; color: #333; -webkit-print-color-adjust: exact; }
                            .page { width: 210mm; min-height: 297mm; padding: 20mm; margin: 0 auto; background: white; box-sizing: border-box; position: relative; }
                            .header { text-align: center; margin-bottom: 40px; position: relative; border-bottom: 2px solid #333; padding-bottom: 20px; }
                            .header h1 { font-size: 32px; font-weight: 900; letter-spacing: 5px; margin: 0; color: #111; }
                            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 40px; gap: 20px; font-size: 14px; }
                            .meta-item { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                            .item-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                            .item-table th { background-color: #f8f9fa; border-top: 2px solid #333; border-bottom: 1px solid #888; padding: 12px 10px; font-size: 13px; font-weight: bold; }
                            .item-table td { padding: 12px 10px; border-bottom: 1px solid #eee; font-size: 13px; }
                            .summary-container { display: flex; justify-content: flex-end; margin-bottom: 40px; }
                            .summary-box { width: 300px; text-align: right; }
                            .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; }
                            .summary-row.total { margin-top: 15px; padding-top: 15px; border-top: 2px solid #333; color: #1a56db; }
                            .bank-container { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; text-align: center; background-color: #fcfcfc; margin-bottom: 40px; }
                            .footer { text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
                        </style>
                    </head>
                    <body>
                        <div class="page">
                            <div class="header"><h1>견 적 서</h1></div>
                            <div class="meta-grid">
                                <div><div class="meta-item"><span>발행일자</span><span>${date}</span></div></div>
                                <div><div class="meta-item"><span>공급자</span><span>진양건재</span></div></div>
                            </div>
                            <table class="item-table">
                                <thead><tr><th>품목명</th><th>수량</th><th>공급가액</th></tr></thead>
                                <tbody>
                                    ${items.map(item => `<tr><td>${item.name}</td><td align="center">${item.quantity}</td><td align="right">${item.price.toLocaleString()}</td></tr>`).join('')}
                                </tbody>
                            </table>
                            <div class="summary-container">
                                <div class="summary-box">
                                    <div class="summary-row"><span>총 견적금액 (VAT포함)</span><span style="font-weight:bold;font-size:18px;">${totalPrice.toLocaleString()} 원</span></div>
                                </div>
                            </div>
                            <div class="bank-container"><span>진양건재 전용계좌: KB국민 9-63608227-53</span></div>
                            <div class="footer">경기도 수원시 팔달구 효원로 209-5 | Tel: 031-236-8227</div>
                        </div>
                        <script>window.onload = function() { window.print(); }</script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    return (
        <div className="bg-white min-h-screen pt-28 pb-24">
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 relative cursor-zoom-in" onClick={() => setIsZoomed(!isZoomed)}>
                            <div className={`w-full h-full flex items-center justify-center p-2 transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
                                {product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain drop-shadow-xl" /> : <div className="text-gray-300 flex flex-col items-center"><FileText className="w-16 h-16 mb-2" /><span>이미지 준비중</span></div>}
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1"><ZoomIn className="w-3 h-3" /> 확대보기</div>
                        </div>
                        <div className="flex gap-2 mt-4 justify-center lg:justify-start">
                            {product.category === 'coir-mat' ? (
                                <><TrustBadge icon={<Leaf className="w-4 h-4 text-emerald-600" />} text="최고급 품질" /><TrustBadge icon={<Check className="w-4 h-4 text-emerald-600" />} text="천연 코코넛" /><TrustBadge icon={<Shield className="w-4 h-4 text-emerald-600" />} text="최고강도" /></>
                            ) : (
                                <><TrustBadge icon={<Shield className="w-4 h-4 text-blue-600" />} text="KS인증" /><TrustBadge icon={<Check className="w-4 h-4 text-green-600" />} text="KC인증" /><TrustBadge icon={<Shield className="w-4 h-4 text-purple-600" />} text="ISO9001" /></>
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full mb-2">{product.category === 'coir-mat' ? '친환경 조경 자재' : isSquare ? '공간활용 최적화' : '대한민국 표준'}</span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
                            <p className="text-gray-500 text-sm lg:text-base">{product.description}</p>
                        </div>

                        <div className="mt-6 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 text-xs bg-white inline-flex px-2.5 py-1 rounded border mb-4 text-gray-600 border-gray-200">
                                <Truck className="w-4 h-4" />
                                <span>{product.category === 'coir-mat' ? '진양건재 단독 혜택: 무료배송' : '화물 착불 배송 (지역별 요금 상이)'}</span>
                            </div>
                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-3xl font-bold text-blue-600">{totalPrice.toLocaleString()}원</span>
                                    <span className="text-sm text-gray-500 font-medium">(부가세 포함)</span>
                                </div>

                                {product.options && (
                                    <div className="mt-4 space-y-4">
                                        {product.options.map((opt) => (
                                            <div key={opt.name} className="flex flex-col">
                                                <label className="text-sm font-bold text-gray-800 mb-1.5">{opt.name}</label>
                                                <select className="w-full bg-white border border-gray-300 py-3 px-4 rounded-xl text-gray-700 font-medium" onChange={(e) => {
                                                    const choice = opt.choices.find(c => c.label === e.target.value);
                                                    if (choice) handleOptionChange(opt.name, choice.label, choice.priceChange);
                                                }}>
                                                    {opt.choices.map(c => <option key={c.label} value={c.label}>{c.label}</option>)}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 space-y-4">
                                    <div className="flex gap-3">
                                        <button onClick={() => handleActionIntent('cart')} className="flex-1 bg-white text-blue-600 border-2 border-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-sm"><ShoppingCart className="w-5 h-5" /> 장바구니</button>
                                        <button onClick={() => handleActionIntent('buy')} className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"><CreditCard className="w-5 h-5" /> 바로 구매하기</button>
                                    </div>
                                    <div className={`${product.category === 'coir-mat' ? 'flex' : 'grid grid-cols-2'} gap-3 pt-4 border-t border-gray-100`}>
                                        {product.category !== 'coir-mat' && (
                                            <button onClick={handleOpenChat} className="bg-gray-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"><MessageSquare className="w-4 h-4" /> 진양스마트견적</button>
                                        )}
                                        <button onClick={handlePrintQuote} className={`bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm ${product.category === 'coir-mat' ? 'w-full' : ''}`}><FileText className="w-4 h-4" /> 견적서 출력</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <ProductMarketingContent category={product.category} />
            </div>
        </div>
    );
}
