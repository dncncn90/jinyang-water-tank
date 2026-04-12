import React from 'react';
import { ShoppingCart, Phone, Truck, Shield, Check, MapPin, Leaf, Zap, AlertCircle, Package } from 'lucide-react';
import Image from 'next/image';

interface CoirMatMarketingProps {
    hidePurchaseGrid?: boolean;
}

export default function CoirMatMarketing({ hidePurchaseGrid = false }: CoirMatMarketingProps) {
    // 고화질 원본 이미지 구성을 사용합니다 (1.png, 2.png)
    // 사용자가 요청한 고화질 원본 이미지 조각 구성 (1~5번 먼저 연결)
    const detailImages = [
        { src: '/images/products/yaja/yaja_detail_1.jpg', alt: '야자매트 상세 1' },
        { src: '/images/products/yaja/yaja_detail_2.jpg', alt: '야자매트 상세 2' },
        { src: '/images/products/yaja/yaja_detail_3.png', alt: '야자매트 상세 3' },
        { src: '/images/products/yaja/yaja_detail_4.png', alt: '야자매트 상세 4' },
        { src: '/images/products/yaja/yaja_detail_5.jpg', alt: '야자매트 상세 5' },
        { src: '/images/products/yaja/yaja_detail_6.png', alt: '야자매트 상세 6' },
        { src: '/images/products/yaja/yaja_detail_7.png', alt: '야자매트 상세 7' },
        { src: '/images/products/yaja/yaja_detail_8.png', alt: '야자매트 상세 8' },
        { src: '/images/products/yaja/yaja_detail_9.png', alt: '야자매트 상세 9' }
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

            {/* 통합 상세 이미지 (고화질) - 여러 장을 빈틈없이 순차적으로 렌더링 */}
            <div className="flex flex-col items-center w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100">
                {detailImages.map((img, idx) => (
                    <div key={idx} className="w-full relative">
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={896}
                            height={1200} // Approximate height, responsive via style
                            className="w-full h-auto block select-none border-0 m-0 p-0"
                            style={{ width: '100%', height: 'auto' }}
                            priority={true}
                            unoptimized={true}
                            quality={100}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
