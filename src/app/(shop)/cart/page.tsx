'use client';

import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck, MapPin, Store, Building2, Phone } from 'lucide-react';
import Image from 'next/image';
import { calculateShippingCost } from '@/lib/shipping';
import { useDaumPostcodePopup } from 'react-daum-postcode';

export default function CartPage() {
    const {
        items,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartItemCount,
        shippingAddress,
        setShippingAddress,
        postcode,
        setPostcode,
        shippingType,
        setShippingType
    } = useCart();

    const cartTotal = getCartTotal();
    const hasItems = items.length > 0;

    const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const handleAddressComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setShippingAddress(fullAddress);
        setPostcode(data.zonecode);
    };

    const handleAddressSearch = () => {
        open({ onComplete: handleAddressComplete });
    };

    const estimatedShipping = useMemo(() => {
        if (shippingType === 'pickup') return 0;
        if (!shippingAddress) return 0;
        return calculateShippingCost(items, shippingAddress);
    }, [shippingAddress, shippingType, items]);

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-industrial-600" />
                    장바구니
                </h1>

                {!hasItems ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">장바구니가 비어있습니다</h2>
                        <p className="text-gray-500 mb-8">원하시는 상품을 장바구니에 담아보세요!</p>
                        <Link href="/" className="inline-flex items-center gap-2 bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                            상품 둘러보기
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
                        {/* Cart Items List */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
                                {items.map((item) => (
                                    <div key={item.cartItemId} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 animate-in fade-in">
                                        {/* Image */}
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0 relative overflow-hidden">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <ShoppingBag className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="w-full">
                                                <div className="flex justify-between items-start gap-4 mb-3">
                                                    <h3 className="font-black text-2xl sm:text-3xl text-black leading-tight tracking-tight">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.cartItemId)}
                                                        className="p-1 -mr-1 -mt-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Options & Requirements */}
                                                <div className="space-y-2 mb-6 w-full">
                                                    {item.options.map((opt, i) => (
                                                        <div key={i} className="text-sm text-gray-600 flex flex-col gap-1 py-3 px-4 bg-gray-50 rounded-xl border border-gray-100/50">
                                                            <span className="font-bold text-gray-900 text-xs uppercase tracking-wide break-keep">
                                                                {opt.name}
                                                            </span>
                                                            <div className="flex justify-between items-center w-full">
                                                                <span className="text-gray-700 font-medium break-keep">{opt.value}</span>
                                                                {opt.priceChange > 0 && (
                                                                    <span className="text-sm text-industrial-500 font-bold ml-2 bg-industrial-50 px-2 py-0.5 rounded-md shrink-0">
                                                                        +{opt.priceChange.toLocaleString()}원
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {item.requirements && (
                                                        <div className="text-base text-industrial-700 bg-industrial-50/50 px-4 py-3 rounded-xl mt-3 border border-industrial-100 flex flex-col sm:grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-4 items-start">
                                                            <span className="font-bold block text-industrial-900 uppercase text-xs tracking-wider">요청사항</span>
                                                            <span className="whitespace-pre-wrap font-medium">{item.requirements}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Price & Quantity Controls */}
                                            <div className="flex items-end justify-between border-t border-gray-100 pt-5 mt-2">
                                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                        className="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-4 py-2 font-semibold text-gray-900 border-x border-gray-200 min-w-[3rem] text-center bg-gray-50/30">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                        className="px-3 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-400 font-bold mb-1">{(item.totalPrice / item.quantity).toLocaleString()}원 / 개</div>
                                                    <div className="text-3xl sm:text-4xl font-black text-red-600 tracking-tight">{item.totalPrice.toLocaleString()}원</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary Bottom Layout */}
                        <div className="bg-white p-6 lg:p-10 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2 pb-4 border-b border-gray-100">
                                <ArrowRight className="w-5 h-5 text-industrial-600" />
                                주문 요약
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                {/* Left Side of Summary: Shipping Selection & Info */}
                                <div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-bold text-gray-700 mb-3">배송 방식 선택</label>
                                        <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl border border-gray-200">
                                            <button
                                                onClick={() => setShippingType('delivery')}
                                                className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${shippingType === 'delivery' ? 'bg-white text-industrial-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                <Truck className="w-4 h-4" />
                                                화물 배송
                                            </button>
                                            <button
                                                onClick={() => setShippingType('pickup')}
                                                className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-all ${shippingType === 'pickup' ? 'bg-white text-industrial-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                            >
                                                <Store className="w-4 h-4" />
                                                매장 방문수령
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                                                    {shippingType === 'delivery' ? (
                                                        <>
                                                            <Truck className="w-4 h-4 text-industrial-600" />
                                                            화물 배송지 정보
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Store className="w-4 h-4 text-industrial-600" />
                                                            방문 수령 장소
                                                        </>
                                                    )}
                                                </div>
                                                {shippingType === 'delivery' ? (
                                                    <div className="mt-3">
                                                        {shippingAddress ? (
                                                            <div className="text-lg text-gray-800 font-bold leading-relaxed break-keep">
                                                                {shippingAddress}
                                                            </div>
                                                        ) : (
                                                            <div className="text-base text-gray-400 font-bold italic">상세 배송 주소를 입력해주세요.</div>
                                                        )}
                                                        <button
                                                            onClick={handleAddressSearch}
                                                            className="text-xs text-industrial-600 font-bold hover:underline mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-industrial-100 rounded-full w-fit shadow-sm"
                                                        >
                                                            <MapPin className="w-3 h-3" />
                                                            {shippingAddress ? '주소 변경' : '주소 검색/입력'}
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="mt-3 text-[14px] text-gray-700 font-medium leading-relaxed">
                                                        <p className="font-bold">진양건재 인계동 본점</p>
                                                        <p className="text-gray-500 font-normal mt-1">(수원시 팔달구 효원로 209-5)</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {shippingType === 'delivery' && (
                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                                <div className="text-sm text-orange-600 font-bold flex items-center gap-1.5">
                                                    화물 직송 예상 <span className="text-[11px] font-normal text-gray-400">(착불)</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-black text-orange-600 text-xl tracking-tight">
                                                        {estimatedShipping > 0 ? `+ ${estimatedShipping.toLocaleString()}원` : '주소 필요'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {shippingType === 'pickup' && (
                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                                <div className="text-sm text-green-600 font-bold">방문 수령 배송비</div>
                                                <span className="font-black text-green-600 text-xl tracking-tight">0원</span>
                                            </div>
                                        )}
                                    </div>
                                    {!shippingAddress && shippingType === 'delivery' && (
                                        <div className="text-[12px] text-orange-600 font-bold mt-4 bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-start gap-2 break-keep">
                                            <div className="mt-0.5 shrink-0 text-lg">※</div>
                                            화물 배송 선택 시 배송지 주소를 입력하셔야 정확한 운임 확인 및 결제가 가능합니다.
                                        </div>
                                    )}
                                </div>

                                {/* Right Side of Summary: Final Price & Buttons */}
                                <div className="flex flex-col gap-6">
                                    <div className="space-y-3 px-1">
                                        <div className="flex justify-between items-center text-gray-600 font-medium">
                                            <span className="text-sm">상품 총 합계</span>
                                            <span className="text-gray-900 font-bold">{cartTotal.toLocaleString()}원</span>
                                        </div>

                                        {/* Final Price Box - Replaced from Sidebar */}
                                        <div className="bg-gray-900 rounded-2xl p-6 lg:p-8 text-white shadow-xl shadow-gray-200/50">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">FINAL TOTAL</span>
                                                <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-md text-gray-300 font-bold">VAT 포함</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-4xl lg:text-5xl font-black tracking-tighter text-white">
                                                    {cartTotal.toLocaleString()}원
                                                </span>
                                            </div>
                                            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                                                <div className="flex items-center gap-3 text-sm text-gray-300 font-bold">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                                                    세금계산서 및 현금영수증 발행 가능
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-orange-400 font-black">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
                                                    배송비 미포함 (현장 착불 결제)
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            href="/checkout"
                                            onClick={(e) => {
                                                if (shippingType === 'delivery' && !shippingAddress) {
                                                    e.preventDefault();
                                                    alert('화물 배송을 위해 배송지 주소를 먼저 입력해주세요.');
                                                    handleAddressSearch();
                                                }
                                            }}
                                            className={`flex-[2] font-black py-5 px-4 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] ${(shippingType === 'delivery' && !shippingAddress)
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-industrial-600 hover:bg-industrial-700 shadow-industrial-200/50'
                                                } text-white`}
                                        >
                                            <span className="text-lg whitespace-nowrap">바로 결제하기</span>
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                        <a
                                            href="tel:031-236-8227"
                                            className="flex-1 bg-[#FF4500] hover:bg-orange-600 text-white font-black py-5 px-4 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl shadow-orange-200/50 hover:scale-[1.01] active:scale-[0.98]"
                                        >
                                            <span className="text-lg whitespace-nowrap">전화 문의</span>
                                        </a>
                                    </div>

                                    <div className="text-center bg-blue-50/50 p-8 md:p-10 border border-blue-100 rounded-[2.5rem] relative overflow-hidden group hover:bg-blue-50 transition-colors">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Building2 className="w-24 h-24 text-blue-900" />
                                        </div>
                                        <div className="relative z-10 flex flex-col items-center">
                                            <p className="text-xl md:text-2xl text-slate-900 font-extrabold leading-snug break-keep">
                                                도매 및 대량 주문은 <span className="text-blue-600 inline-block px-1">031-236-8227</span>로 연락주시면<br className="hidden md:block" />
                                                현장 상황에 맞는 <span className="underline decoration-blue-500 decoration-4 underline-offset-4">가장 저렴한 견적</span>을 안내해 드립니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Bottom spacing for aesthetics */}
            <div className="h-20 sm:h-32"></div>
        </div>
    );
}
