'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Shield, Truck, FileText, ZoomIn, MessageSquare, ArrowLeft, Ruler, MousePointerClick, ChevronDown, Phone, ShoppingCart, CreditCard } from 'lucide-react';
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
    const product = PRODUCTS.find(p => p.id === id); // Changed from getProductById
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

        // 1. 물탱크 본체 추가 (유료 옵션 제외)
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

        // 2. 유료 옵션들을 별도 품목으로 추가
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
                }

                addToCart({
                    productId: subProductId,
                    name: `${name}: ${label}`,
                    basePrice: priceChange, // 옵션의 개별 단가
                    options: [],
                    requirements: '',
                    quantity: (optQty || 1) * quantity, // 물탱크 수량만큼 곱해줌
                    image: subImage
                });
            });

        if (action === 'cart') {
            if (confirm('상품들이 장바구니에 개별 품목으로 담겼습니다. 장바구니로 이동하시겠습니까?')) {
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
            const items: { name: string; price: number; quantity: number }[] = [
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
                            
                            /* Header */
                            .header { text-align: center; margin-bottom: 40px; position: relative; border-bottom: 2px solid #333; padding-bottom: 20px; }
                            .header h1 { font-size: 32px; font-weight: 900; letter-spacing: 5px; margin: 0; color: #111; }
                            .stamp { position: absolute; right: 0; top: 10px; font-size: 12px; color: #999; border: 1px solid #ddd; padding: 2px 6px; border-radius: 2px; }

                            /* Meta */
                            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 40px; gap: 20px; font-size: 14px; }
                            .meta-item { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                            .meta-label { font-weight: bold; color: #555; }
                            .meta-value { font-weight: 500; }

                            /* Table */
                            .item-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                            .item-table th { background-color: #f8f9fa; border-top: 2px solid #333; border-bottom: 1px solid #888; padding: 12px 10px; font-size: 13px; font-weight: bold; color: #333; text-align: center; }
                            .item-table td { padding: 12px 10px; border-bottom: 1px solid #eee; font-size: 13px; color: #444; }
                            .item-table td.center { text-align: center; }
                            .item-table td.right { text-align: right; }
                            .item-table tr:last-child td { border-bottom: 1px solid #333; }

                            /* Summary Section */
                            .summary-container { display: flex; justify-content: flex-end; margin-bottom: 40px; }
                            .summary-box { width: 300px; text-align: right; }
                            .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #666; }
                            .summary-row.total { margin-top: 15px; padding-top: 15px; border-top: 2px solid #333; color: #1a56db; align-items: flex-end; }
                            .total-label { font-size: 16px; font-weight: bold; }
                            .total-value { font-size: 24px; font-weight: 800; }
                            .vat-note { font-size: 11px; color: #1a56db; margin-top: 5px; opacity: 0.8; }

                            /* Bank Info */
                            .bank-container { border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; text-align: center; background-color: #fcfcfc; margin-bottom: 40px; }
                            .bank-label { font-size: 12px; color: #666; font-weight: bold; margin-bottom: 8px; display: block; }
                            .bank-account { font-size: 18px; font-weight: 800; color: #333; letter-spacing: 0.5px; }
                            .bank-bank { color: #16a34a; margin-right: 8px; }

                            /* Footer */
                            .footer { text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 20px; line-height: 1.6; }
                        </style>
                    </head>
                    <body>
                        <div class="page">
                            <div class="header">
                                <h1>견 적 서</h1>
                                <div class="stamp">(인) 생략</div>
                            </div>

                            <div class="meta-grid">
                                <div>
                                    <div class="meta-item">
                                        <span class="meta-label">발행일자</span>
                                        <span class="meta-value">${date}</span>
                                    </div>
                                    <div class="meta-item" style="margin-top: 10px;">
                                        <span class="meta-label">수신</span>
                                        <span class="meta-value">고객님 귀하</span>
                                    </div>
                                </div>
                                <div style="text-align: right;">
                                    <div class="meta-item">
                                        <span class="meta-label">공급자</span>
                                        <span class="meta-value">진양건재</span>
                                    </div>
                                    <div class="meta-item" style="margin-top: 10px;">
                                        <span class="meta-label">등록번호</span>
                                        <span class="meta-value">124-53-29653</span>
                                    </div>
                                </div>
                            </div>

                            <table class="item-table">
                                <colgroup>
                                    <col style="width: auto">
                                    <col style="width: 60px">
                                    <col style="width: 120px">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>품목명</th>
                                        <th>수량</th>
                                        <th>공급가액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${items.map(item => `
                                        <tr>
                                            <td>${item.name}</td>
                                            <td class="center">${item.quantity}</td>
                                            <td class="right">${item.price.toLocaleString()}</td>
                                        </tr>
                                    `).join('')}
                                    <!-- 빈 줄 채우기 (Optional) -->
                                    <tr>
                                        <td style="height: 30px;"></td><td></td><td></td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="summary-container">
                                <div class="summary-box">
                                    <div className="summary-row">
                                        <span>공급가액</span>
                                        <span>${(Math.round(totalPrice / 1.1)).toLocaleString()} 원</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>부가세 (VAT)</span>
                                        <span>${(totalPrice - Math.round(totalPrice / 1.1)).toLocaleString()} 원</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span className="total-label">총 견적금액</span>
                                        <span className="total-value">${totalPrice.toLocaleString()} 원</span>
                                    </div>
                                    <div class="vat-note">* 위 금액은 부가세가 포함된 최종 입금액입니다.</div>
                                </div>
                            </div>

                            <div class="bank-container">
                                <span class="bank-label">입금 계좌 안내</span>
                                <div class="bank-account">
                                    <span class="bank-bank">KB국민</span> 9-63608227-53 (진양건재)
                                </div>
                            </div>

                            <div class="footer">
                                * 본 견적서는 온라인 자동 발행 견적서로, 실 재고 및 배송비(착불)에 따라 최종 금액이 변동될 수 있습니다. (직인생략)<br/>
                                경기도 수원시 팔달구 효원로 209-5 | Tel: 031-236-8227 | Fax: 031-237-4435
                            </div>
                        </div>
                        <script>
                            window.onload = function() { window.print(); }
                        </script>
                    </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const isSquare = product.category === 'pe-square';
    const isFittingCategory = product.category === 'fittings';

    return (
        <div className="bg-white min-h-screen pt-28 pb-24">

            {/* --------------------------------------------------------------------------------
               SECTION A: Product Hero (Visual & Call to Action)
               -------------------------------------------------------------------------------- */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Visual (Left) */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div
                            className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 relative cursor-zoom-in"
                            onClick={() => setIsZoomed(!isZoomed)}
                        >
                            <div className={`w-full h-full flex items-center justify-center p-2 transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
                                {product.images?.[0] ? (
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain drop-shadow-xl mix-blend-multiply" />
                                ) : (
                                    <div className="text-gray-300 flex flex-col items-center">
                                        <FileText className="w-16 h-16 mb-2" />
                                        <span>이미지 준비중</span>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 shadow-sm flex items-center gap-1">
                                <ZoomIn className="w-3 h-3" /> 확대보기
                            </div>
                        </div>

                        {/* Trust Badges under Image */}
                        <div className="flex gap-2 mt-4 justify-center lg:justify-start">
                            <TrustBadge icon={<Shield className="w-4 h-4 text-blue-600" />} text="KS인증" />
                            <TrustBadge icon={<Check className="w-4 h-4 text-green-600" />} text="KC인증" />
                            <TrustBadge icon={<Shield className="w-4 h-4 text-purple-600" />} text="ISO9001" />
                        </div>
                    </div>

                    {/* Info (Right) */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-2">
                            <span className="inline-block px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full mb-2">
                                {isSquare ? '공간활용 최적화' : '대한민국 표준'}
                            </span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-2 break-keep">
                                {product.name}
                            </h1>
                            <p className="text-gray-500 text-sm lg:text-base">
                                {product.category === 'fittings'
                                    ? product.description
                                    : isSquare
                                        ? "좁은 공간, 낮은 천장에도 설치 가능한 100% 국산 정품 물탱크"
                                        : "3중 구조로 자외선을 차단하여 이끼가 끼지 않는 고강도 물탱크"}
                            </p>
                        </div>

                        {/* Price Area */}
                        <div className="mt-6 sm:mt-8 mb-8 p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 text-[11px] sm:text-sm text-gray-600 bg-white inline-flex px-2.5 py-1 rounded border border-gray-200 mb-4 sm:mb-0">
                                <Truck className="w-3.5 h-3.5 sm:w-4 h-4 text-industrial-500" />
                                <span>화물 착불 배송 (지역별 요금 상이)</span>
                            </div>
                            <div className="border-t border-gray-100 pt-4 sm:pt-6">
                                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                    <span className="text-2xl sm:text-3xl font-bold text-industrial-600">{totalPrice.toLocaleString()}원</span>
                                    <span className="text-xs sm:text-sm text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">(부가세 10% 포함)</span>
                                </div>

                                {/* Product Options (Dropdowns) */}
                                {product.options && product.options.length > 0 && (
                                    <div className="mt-4 mb-6 space-y-4">
                                        {product.options.map((opt) => {
                                            const isBronzeSize = opt.name === '피팅 규격 (청동 선택 시)';
                                            const isPESize = opt.name === '피팅 규격 (PE 선택 시)';
                                            const fittingMaterial = selectedOptions['피팅 재질']?.label;

                                            const isDisabled =
                                                (isBronzeSize && fittingMaterial !== '청동(신주) 피팅') ||
                                                (isPESize && fittingMaterial !== 'PE 제작 피팅');

                                            return (
                                                <div key={opt.name} className="flex flex-col">
                                                    <label className={`text-sm font-bold mb-1.5 flex items-center gap-1 ${isDisabled ? 'text-gray-400' : 'text-gray-800'}`}>
                                                        {opt.name} {opt.required && <span className="text-red-500">*</span>}
                                                    </label>
                                                    <div className="flex gap-2">
                                                        <div className="relative flex-1">
                                                            <select
                                                                className={`w-full appearance-none bg-white border border-gray-300 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium transition-shadow hover:shadow-sm ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700'}`}
                                                                value={selectedOptions[opt.name]?.label || ''}
                                                                disabled={isDisabled}
                                                                onChange={(e) => {
                                                                    const selectedChoice = opt.choices.find(c => c.label === e.target.value);
                                                                    if (selectedChoice) {
                                                                        handleOptionChange(opt.name, selectedChoice.label, selectedChoice.priceChange);

                                                                        // Special logic: If '피팅 재질' changes, clear the other size selection
                                                                        if (opt.name === '피팅 재질') {
                                                                            if (selectedChoice.label === '청동(신주) 피팅') {
                                                                                handleOptionChange('피팅 규격 (PE 선택 시)', '', 0);
                                                                            } else if (selectedChoice.label === 'PE 제작 피팅') {
                                                                                handleOptionChange('피팅 규격 (청동 선택 시)', '', 0);
                                                                            } else {
                                                                                handleOptionChange('피팅 규격 (PE 선택 시)', '', 0);
                                                                                handleOptionChange('피팅 규격 (청동 선택 시)', '', 0);
                                                                            }
                                                                        }
                                                                    } else {
                                                                        // Handle unselection
                                                                        setSelectedOptions(prev => {
                                                                            const next = { ...prev };
                                                                            delete next[opt.name];

                                                                            if (opt.name === '피팅 재질') {
                                                                                delete next['피팅 규격 (청동 선택 시)'];
                                                                                delete next['피팅 규격 (PE 선택 시)'];
                                                                            }
                                                                            return next;
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                {!opt.required && (
                                                                    <option value="">
                                                                        {isDisabled ? '해당 재질 선택 시 활성화' : '선택 안함'}
                                                                    </option>
                                                                )}
                                                                {opt.choices.map(choice => (
                                                                    <option key={choice.label} value={choice.label}>
                                                                        {choice.label} {choice.priceChange > 0 ? `(+${choice.priceChange.toLocaleString()}원)` : ''}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                                <ChevronDown className={`w-5 h-5 ${isDisabled ? 'opacity-50' : ''}`} />
                                                            </div>
                                                        </div>
                                                        {(!isDisabled && !isFittingCategory && selectedOptions[opt.name]?.priceChange > 0) && (
                                                            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shrink-0">
                                                                <button
                                                                    onClick={() => handleOptionQuantityChange(opt.name, -1)}
                                                                    className="w-10 h-[46px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors"
                                                                >-</button>
                                                                <span className="w-8 text-center text-sm font-bold text-gray-900">{selectedOptions[opt.name]?.quantity || 1}</span>
                                                                <button
                                                                    onClick={() => handleOptionQuantityChange(opt.name, 1)}
                                                                    className="w-10 h-[46px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors"
                                                                >+</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                 {/* Quantity Selector */}
                                <div className="mb-6 flex flex-col">
                                    <label className="text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-1">
                                        수량
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >-</button>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-16 h-10 border border-gray-300 rounded-lg text-center font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >+</button>
                                    </div>
                                </div>

                                {/* Requirements Field */}
                                <div className="mb-6 flex flex-col">
                                    <label className="text-sm font-bold text-gray-800 mb-1.5 flex items-center gap-1">
                                        추가 요청사항 (선택)
                                    </label>
                                    <textarea
                                        className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium transition-shadow hover:shadow-sm h-20 resize-none"
                                        placeholder="원하시는 타공 위치나 배송 관련 요청사항을 적어주세요."
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                    ></textarea>
                                </div>

                                <p className="text-xs text-red-500 font-bold mb-6">
                                    * 사업자 회원/대량 구매 시 추가 할인 가능 (전화 문의)
                                </p>
                                <div className="flex flex-col gap-3">
                                    {/* Primary CTA */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleActionIntent('cart')}
                                            className="flex-1 bg-white border-2 border-industrial-600 text-industrial-600 font-bold py-4 rounded-xl hover:bg-industrial-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            장바구니 담기
                                        </button>
                                        <button
                                            onClick={() => handleActionIntent('buy')}
                                            className="flex-1 bg-industrial-600 text-white font-bold py-4 rounded-xl hover:bg-industrial-700 transition-colors shadow-lg shadow-industrial-200 flex items-center justify-center gap-2"
                                        >
                                            <CreditCard className="w-5 h-5" />
                                            무통장 입금 주문하기
                                        </button>
                                    </div>

                                    {/* Secondary CTA */}
                                    <div className="grid grid-cols-2 gap-3 mt-2 border-t border-gray-200 pt-4">
                                        <button
                                            onClick={handleOpenChat}
                                            className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 transition-colors flex items-center justify-center gap-2 text-sm"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            1분 스마트 견적
                                        </button>
                                        <button
                                            onClick={handlePrintQuote}
                                            className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                                        >
                                            <FileText className="w-4 h-4" />
                                            견적서 출력
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <a href="tel:031-236-8227" className="text-sm text-gray-500 hover:text-industrial-600 underline font-medium">
                                        대량 구매 및 도매 견적 문의: 031-236-8227
                                    </a>
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
