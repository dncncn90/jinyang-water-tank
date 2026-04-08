import React from 'react';
import { ShoppingCart, Phone, Truck, Shield, Check, MapPin, Leaf, Zap, AlertCircle, Package } from 'lucide-react';

interface CoirMatMarketingProps {
    hidePurchaseGrid?: boolean;
}

export default function CoirMatMarketing({ hidePurchaseGrid = false }: CoirMatMarketingProps) {
    // 2개의 통합 이미지 구성을 지원합니다 (1.png, 2.png)
    const detailImage = { src: '/images/products/yaja/detail_full.jpg', alt: '야자매트 프리미엄 전용 상세안내 (소개, 특장점, 규격 및 시공 가이드)' };

    return (
        <div className="space-y-0 py-0 text-gray-800 font-['Pretendard'] overflow-hidden">

            {/* 1. B2B 대량 구매 타겟 공지사항 (최상단 노출) */}
            <div className="bg-[#003366] text-white py-6 px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                    <div className="bg-yellow-400 text-blue-900 font-black px-4 py-2 rounded-lg shrink-0 animate-bounce">
                        사업자/현장 대량 구매 필독
                    </div>
                    <div>
                        <p className="text-lg md:text-xl font-bold leading-tight">
                            12롤 이상 주문하시나요? <span className="text-yellow-400">1톤 화물차(용달) 단독 직배송</span>으로 현장까지 쏴드립니다!
                        </p>
                        <p className="text-sm opacity-80 mt-1">대량 구매 시 특별 단가 할인이 적용되니 결제 전 고객센터(031-236-8227)로 문의 바랍니다.</p>
                    </div>
                </div>
            </div>

            {/* 통합 상세 이미지 (고화질) */}
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white">
                <img
                    src={detailImage.src}
                    alt={detailImage.alt}
                    className="w-full h-auto block select-none shadow-sm"
                    loading="lazy"
                />
            </div>

            {/* 하단 요약 안내 */}
            <section className="bg-gray-900 text-white py-20 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                            <Package className="w-6 h-6 text-emerald-400" />
                            <span className="text-emerald-400 font-black tracking-widest text-sm uppercase">JINYANG COIR MAT SERIES</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-4 italic">진양건재 야자매트</h3>
                        <p className="text-gray-400 font-medium text-lg max-w-md break-keep">
                            전국 최저가 도전! 대량 발주 관련 문의는 고객센터로 직접 연락주시면 가장 빠른 상담이 가능합니다.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <a href="tel:031-236-8227" className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl shadow-emerald-900/20 text-lg">
                            <Phone className="w-6 h-6 fill-current" />
                            031-236-8227
                        </a>
                        <button onClick={() => window.dispatchEvent(new Event('open-chat'))} className="flex-1 sm:flex-none flex items-center justify-center gap-3 bg-white text-gray-900 font-black px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all text-lg shadow-xl shadow-black/10">
                            실시간 견적 문의
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
