'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronRight, Check, User, AlertCircle, FileText, CreditCard, HelpCircle, PhoneCall, Truck, Store } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { calculateShippingCost } from '@/lib/shipping';

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart, shippingAddress, postcode, shippingType } = useCart();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        zipcode: postcode || '',
        address: shippingAddress || '',
        detailAddress: '',
        requirements: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // If data is loaded later from context
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            address: prev.address || shippingAddress,
            zipcode: prev.zipcode || postcode
        }));
    }, [shippingAddress, postcode]);

    const cartTotal = getCartTotal();

    const shippingCost = useMemo(() => {
        if (shippingType === 'pickup') return 0;
        if (!formData.address) return 0;
        return calculateShippingCost(items, formData.address);
    }, [formData.address, items, shippingType]);

    const isLocalArea = useMemo(() => {
        if (!formData.address) return false;
        return formData.address.includes('수원시 팔달구') ||
            formData.address.includes('수원시 권선구') ||
            formData.address.includes('수원시 장안구') ||
            formData.address.includes('수원시 영통구');
    }, [formData.address]);

    const totalAmount = cartTotal; // 배송비는 착불이므로 결제 금액에 합산하지 않음

    const orderName = items.length > 0
        ? items.length === 1
            ? items[0].name
            : `${items[0].name} 외 ${items.length - 1}건`
        : '주문상품';

    // Daum Postcode Hook
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

        setFormData(prev => ({
            ...prev,
            zipcode: data.zonecode,
            address: fullAddress
        }));
    };

    const handleAddressSearch = () => {
        open({ onComplete: handleAddressComplete });
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = async () => {
        console.log('[Checkout] handleSubmitOrder started');
        if (shippingType === 'delivery' && (!formData.name || !formData.phone || !formData.password || !formData.address)) {
            console.warn('[Checkout] Validation failed: missing fields');
            alert('배송지를 포함한 필수 정보를 모두 입력해주세요. (이름, 연락처, 비밀번호, 주소)');
            return;
        }

        if (shippingType === 'pickup' && (!formData.name || !formData.phone || !formData.password)) {
            console.warn('[Checkout] Validation failed: missing fields for pickup');
            alert('필수 정보를 모두 입력해주세요. (이름, 연락처, 비밀번호)');
            return;
        }

        try {
            setIsSubmitting(true);
            console.log('[Checkout] Submitting order payload...');

            const finalAddress = shippingType === 'pickup'
                ? '방문 수령 (수원시 팔달구 효원로 209-5 진양건재 본점)'
                : `(${formData.zipcode}) ${formData.address} ${formData.detailAddress}`;

            const orderPayload = {
                name: formData.name,
                phone: formData.phone,
                password: formData.password,
                address: finalAddress,
                requirements: formData.requirements,
                totalAmount: totalAmount,
                items: items.map(item => ({
                    name: item.name,
                    options: item.options?.map(opt => `${opt.name}: ${opt.value}`).join(', ') || '기본',
                    requirements: item.requirements || '',
                    quantity: item.quantity,
                    price: item.totalPrice
                })),
                paymentMethod: 'BANK_TRANSFER'
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                clearCart();
                router.push(`/checkout/success?orderId=${data.orderId}&amount=${totalAmount}&type=${shippingType}`);
            } else {
                alert(data.error || '주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        } catch (error: any) {
            console.error('Order Submit Error:', error);
            alert(`오류가 발생했습니다: ${error.message || '알 수 없는 서버 오류'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">

                {/* Progress Indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
                        <div className={`active-line absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-industrial-600 -z-10 transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>

                        <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-industrial-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 1 ? 'bg-industrial-600' : 'bg-gray-300'}`}>
                                {step > 1 ? <Check className="w-6 h-6" /> : '1'}
                            </div>
                            <span className="text-sm font-medium bg-gray-50 px-2">견적 확인</span>
                        </div>

                        <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-industrial-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 2 ? 'bg-industrial-600' : 'bg-gray-300'}`}>
                                {step > 2 ? <Check className="w-6 h-6" /> : '2'}
                            </div>
                            <span className="text-sm font-medium bg-gray-50 px-2">배송 정보</span>
                        </div>

                        <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-industrial-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors ${step >= 3 ? 'bg-industrial-600' : 'bg-gray-300'}`}>
                                3
                            </div>
                            <span className="text-sm font-medium bg-gray-50 px-2">신청 완료</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Form */}
                    <div className="lg:col-span-2 space-y-6">

                        {step === 1 && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-industrial-600" />
                                    견적 품목 확인
                                </h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-8">
                                    {items.map((item) => (
                                        <div key={item.cartItemId} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50">
                                            <div className="w-20 h-20 bg-white border border-gray-100 rounded-lg shrink-0 relative overflow-hidden">
                                                {item.image ? (
                                                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <ShoppingBag className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                                    <span className="font-bold text-industrial-600">{item.totalPrice.toLocaleString()}원</span>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-2 space-y-1">
                                                    <span className="font-semibold block text-gray-700">옵션:</span>
                                                    {item.options.map((opt, idx) => (
                                                        <div key={idx} className="pl-2 border-l-2 border-industrial-200">
                                                            {opt.name}: {opt.value}
                                                        </div>
                                                    ))}
                                                </div>
                                                {item.requirements && <p className="text-sm text-industrial-600 mt-2 font-medium">요청사항: {item.requirements}</p>}
                                                <p className="text-sm text-gray-500 mt-2">수량: <strong>{item.quantity}개</strong></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-between border-t border-gray-100 pt-6 lg:hidden">
                                    <span className="text-lg font-bold text-gray-900">결제 예정 금액</span>
                                    <span className="text-2xl font-bold text-industrial-600">{cartTotal.toLocaleString()}원</span>
                                </div>
                                <p className="text-right text-xs text-gray-400 mt-1 lg:hidden">* VAT 포함 / 화물 운임 기사님 현장 결제 (착불)</p>

                                <div className="mt-8 flex justify-end">
                                    <button onClick={handleNext} className="bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-industrial-100">
                                        주문 정보 입력하기
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h1 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                    <User className="w-6 h-6 text-industrial-600" />
                                    비회원 주문자 정보
                                </h1>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">수령인 / 담당자명</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-industrial-500 focus:border-transparent font-medium"
                                                placeholder="홍길동"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">연락처</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-industrial-500 focus:border-transparent font-medium"
                                                placeholder="010-1234-5678"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">비회원 주문 비밀번호 (숫자 4자리)</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            maxLength={4}
                                            className="w-40 bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-industrial-500 focus:border-transparent font-medium"
                                            placeholder="****"
                                        />
                                        <p className="text-xs text-gray-400 mt-2">* 주문 조회를 위해 꼭 기억해주세요.</p>
                                    </div>

                                    {shippingType === 'delivery' ? (
                                        <div className="pt-6 border-t border-gray-100">
                                            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <Truck className="w-4 h-4 text-industrial-600" />
                                                배송 주소 (화물 직송)
                                            </label>
                                            <div className="flex gap-2 mb-3">
                                                <input
                                                    type="text"
                                                    name="zipcode"
                                                    value={formData.zipcode}
                                                    readOnly
                                                    className="w-32 bg-gray-100 border border-gray-200 rounded-lg p-3.5 text-gray-600 font-medium"
                                                    placeholder="우편번호"
                                                />
                                                <button
                                                    onClick={handleAddressSearch}
                                                    className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition-colors text-sm"
                                                >
                                                    주소 검색
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                readOnly
                                                className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3.5 mb-3 text-gray-600 font-medium"
                                                placeholder="기본 주소"
                                            />
                                            <input
                                                type="text"
                                                name="detailAddress"
                                                value={formData.detailAddress}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-industrial-500 focus:border-transparent font-medium"
                                                placeholder="상세 주소를 입력해주세요 (예: 101호, 00빌딩)"
                                            />
                                        </div>
                                    ) : (
                                        <div className="pt-6 border-t border-gray-100">
                                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-4">
                                                <div className="flex items-start gap-3">
                                                    <Store className="w-6 h-6 text-industrial-600 shrink-0 mt-1" />
                                                    <div>
                                                        <h4 className="font-bold text-industrial-900 mb-1">매장 방문 수령 안내</h4>
                                                        <p className="text-sm text-industrial-700 leading-relaxed break-keep">
                                                            주문 완료 후 아래 매장으로 직접 방문하여 수령하시는 방식입니다. 별도의 배송비가 발생하지 않습니다.
                                                        </p>
                                                        <div className="mt-3 pt-3 border-t border-blue-200/50 flex flex-col gap-2">
                                                            <div className="flex items-center gap-2 text-sm text-industrial-800">
                                                                <span className="font-bold w-16 shrink-0">매장주소</span>
                                                                <span>수원시 팔달구 효원로 209-5 (진양건재 본점)</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-industrial-800">
                                                                <span className="font-bold w-16 shrink-0">전화번호</span>
                                                                <span>031-236-8227</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">배송/주문 요청사항 (선택)</label>
                                        <textarea
                                            name="requirements"
                                            value={formData.requirements}
                                            onChange={handleInputChange}
                                            rows={2}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-industrial-500 focus:border-transparent font-medium"
                                            placeholder="예: 타공 위치(바닥면으로부터 10cm 지점에 뚫어주세요), 부재 시 경비실 보관 등"
                                        />
                                    </div>
                                </div>

                                {isLocalArea && shippingType === 'delivery' && (
                                    <div className="mt-8 bg-blue-50/50 border border-blue-200 rounded-2xl p-6 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-3 opacity-10">
                                            <Truck className="w-24 h-24 text-industrial-600" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                                                <div className="w-12 h-12 bg-industrial-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-industrial-200 animate-bounce-subtle">
                                                    <Truck className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                                                        <h4 className="font-black text-industrial-900 text-lg tracking-tight">
                                                            [진양건재 인계동 본점] 직접 배송 가능 지역입니다!
                                                        </h4>
                                                    </div>
                                                    <p className="text-[14px] text-industrial-700 leading-relaxed break-keep font-medium">
                                                        현재 입력하신 주소는 매장과 매우 가까운 지역입니다! 수량에 따라 배송비가 전액 면제되거나 대폭 할인되오니, 결제 전 <strong>[운임비 상담]</strong> 버튼을 눌러 가장 저렴한 확정 운임비를 확인받으세요!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-100 pt-6">
                                    <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 order-2 md:order-1 w-full md:w-auto">
                                        이전으로
                                    </button>
                                    <div className="flex flex-col items-center gap-4 order-1 md:order-2 w-full md:w-auto">
                                        {/* Happy Call Promise Box */}
                                        <div className="w-full bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3">
                                            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                                                <PhoneCall className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-orange-900 mb-0.5 leading-tight">[진양건재 해피콜 약속]</p>
                                                <p className="text-[13px] text-orange-700 font-medium leading-relaxed break-keep">
                                                    {shippingType === 'delivery' ? (
                                                        <>
                                                            주문 즉시 <strong className="text-orange-900 underline underline-offset-2">담당 전문가가 직접 전화</strong>드려 고객님께 가장 유리한 <strong className="text-orange-900">최저가 배송비</strong>를 안내해 드립니다. 안심하고 주문하세요!
                                                        </>
                                                    ) : (
                                                        <>
                                                            주문 즉시 <strong className="text-orange-900 underline underline-offset-2">담당 전문가가 직접 전화</strong>드려 수령 일정 및 피팅(타공) 위치 확인 등 세부 사항을 안내해 드립니다. 안심하고 주문하세요!
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                                            <button
                                                onClick={handleSubmitOrder}
                                                disabled={isSubmitting}
                                                className="bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex-1 font-black"
                                            >
                                                {isSubmitting ? '처리중...' : '무통장 입금으로 주문하기'}
                                                <CreditCard className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}





                    </div>

                    {/* Sidebar Summary (Visible on Step 1 & 2) */}
                    {step < 3 && (
                        <div className="hidden lg:block">
                            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-32">
                                <h3 className="font-bold text-lg text-gray-900 mb-5 pb-3 border-b border-gray-200">주문 요약</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center text-[15px]">
                                        <span className="text-gray-600 font-medium">상품 금액</span>
                                        <span className="font-bold text-gray-900">{cartTotal.toLocaleString()}원</span>
                                    </div>
                                    <div className="flex flex-col gap-2 py-4 px-4 bg-orange-50 rounded-xl border border-orange-200">
                                        <div className="flex flex-col gap-1 text-center justify-center relative group">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <span className="text-orange-900 font-extrabold text-[15px]">배송비 (상담 후 확정)</span>
                                                <button className="text-orange-400 hover:text-orange-600 transition-colors" title="수원 인근 지역은 확인 후 0원 환불 가능" type="button">
                                                    <HelpCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <span className="font-black text-orange-600 text-xl tracking-tight">
                                                {shippingType === 'delivery' ? (
                                                    formData.address ? `+ ${shippingCost.toLocaleString()}원` : '주소 필요'
                                                ) : (
                                                    '0원 (방문 수령)'
                                                )}
                                            </span>
                                            {!formData.address && shippingType === 'delivery' && (
                                                <div className="text-[11px] text-orange-500 font-bold mt-1">
                                                    ※ 배송지 입력 시 정확한 운임 노출
                                                </div>
                                            )}

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                                <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 text-center shadow-lg font-medium leading-relaxed">
                                                    수원 인근 직배송 가능 지역은 확인 후 <strong className="text-orange-300">0원 환불 및 운임 감면</strong>이 가능합니다.
                                                    <div className="absolute top-full left-1/2 -translate-x-[6px] border-[6px] border-transparent border-t-gray-900"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[12px] text-orange-700 leading-tight font-medium opacity-90 text-center break-keep border-t border-orange-200/50 pt-2 mt-1">
                                            배송비는 상품 수령 시<br /><strong>기사님께 직접 결제</strong>해주세요.
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl shadow-gray-200/50 mt-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">최종 결제 금액</span>
                                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">VAT 포함</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-2xl font-black tracking-tight text-white">
                                            {totalAmount.toLocaleString()}원
                                        </span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 space-y-1">
                                        <p className="text-[10px] text-gray-400 font-medium">
                                            * 세금계산서 및 현금영수증 발행 가능
                                        </p>

                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                    <div className="flex gap-2.5 items-start">
                                        <User className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                                        <p className="text-sm text-blue-800 font-medium leading-relaxed break-keep">
                                            비회원 주문이 가능합니다.<br />별도의 회원가입 없이 진행하세요.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
