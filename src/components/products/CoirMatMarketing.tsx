import React from 'react';
import { ShoppingCart, Phone, Truck, Shield, Check, MapPin, Leaf, Zap, AlertCircle, Package } from 'lucide-react';

interface CoirMatMarketingProps {
    hidePurchaseGrid?: boolean;
}

export default function CoirMatMarketing({ hidePurchaseGrid = false }: CoirMatMarketingProps) {
    // 2개의 통합 이미지 구성을 지원합니다 (1.png, 2.png)
    const images = [
        { src: '/images/products/yaja/1.png', alt: '야자매트 상세안내 1 (소개 및 특장점)' },
        { src: '/images/products/yaja/2.png', alt: '야자매트 상세안내 2 (규격 및 시공가이드)' },
    ];

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

            {/* 2. 메인 강조 문구 섹션 */}
            <section className="bg-emerald-50 py-16 px-6 text-center border-b border-emerald-100">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block bg-white text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                        진양건재의 솔직한 약속
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                        "철근핀 추가금 장난, 이제 그만!<br />
                        진양건재는 처음부터 <span className="text-emerald-600 font-black">'풀세트'</span>로 보내드립니다."
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto break-keep">
                        별도 구매의 번거로움을 없앴습니다. 시공에 꼭 필요한 두껍고 튼튼한 '철근핀'을 현장 용도에 맞게 꽉 채워 드립니다.
                    </p>
                </div>
            </section>

            {/* 3. 이미지 1번 (인트로 및 제조공정) */}
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                <img 
                    src={images[0].src} 
                    alt={images[0].alt} 
                    className="w-full h-auto block select-none"
                    onError={(e) => { (e.target as any).style.display = 'none'; }}
                />
            </div>

            {/* 4. 3가지 핵심 포인트 섹션 (디자인 강화) */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-black text-gray-900">3 CORE POINTS</h3>
                        <div className="w-16 h-1 w-24 bg-emerald-500 mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Point 1 */}
                        <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 relative group hover:border-emerald-200 transition-all">
                            <div className="absolute -top-6 left-10 w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center font-black text-2xl text-emerald-600">1</div>
                            <div className="mb-6 mt-2">
                                <Shield className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold mb-4">얇고 휘어지는 일반 핀은 NO!</h4>
                            <p className="text-gray-600 leading-relaxed text-[15px] break-keep">
                                "현장에서 몇 번 치면 구부러지는 약한 핀이 아닙니다. 토목/조경 현장에서 실제로 사용하는 <span className="font-bold text-gray-900">두껍고 튼튼한 진짜 철근핀</span>만 취급합니다."
                            </p>
                        </div>

                        {/* Point 2 */}
                        <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 relative group hover:border-emerald-200 transition-all">
                            <div className="absolute -top-6 left-10 w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center font-black text-2xl text-emerald-600">2</div>
                            <div className="mb-6 mt-2">
                                <Zap className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold mb-4">현장 맞춤형 구성 세트</h4>
                            <p className="text-gray-600 leading-relaxed text-[15px] break-keep">
                                "일반 평지라면 15개 세트를, 단단한 고정이 필요한 <span className="font-bold text-gray-900">경사지라면 30개 세트</span>를 선택하세요. 현장에 꼭 맞는 수량으로 넉넉하게 챙겨드립니다."
                            </p>
                        </div>

                        {/* Point 3 */}
                        <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 relative group hover:border-emerald-200 transition-all">
                            <div className="absolute -top-6 left-10 w-12 h-12 bg-white shadow-lg rounded-2xl flex items-center justify-center font-black text-2xl text-emerald-600">3</div>
                            <div className="mb-6 mt-2">
                                <Truck className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h4 className="text-xl font-bold mb-4">무통장 입금 전용 도매가</h4>
                            <p className="text-gray-600 leading-relaxed text-[15px] break-keep">
                                "플랫폼 수수료를 100% 없앴습니다. <span className="font-bold text-gray-900">그 혜택을 무료배송과 철근핀 풀세트 구성</span>으로 고객님께 돌려드립니다." (무통장 특가 적용 완료)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. 이미지 2번 (규격 및 시공방법) */}
            <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
                <img 
                    src={images[1].src} 
                    alt={images[1].alt} 
                    className="w-full h-auto block select-none"
                    onError={(e) => { (e.target as any).style.display = 'none'; }}
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
