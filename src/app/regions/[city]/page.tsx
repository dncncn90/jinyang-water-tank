import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, Truck, Calculator } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import TrustIndicators from '@/components/home/TrustIndicators';
import CategoryGrid from '@/components/checkout/CategoryGrid';

import RegionCTA from './RegionCTA';

const regionData: Record<string, { name: string; title: string; description: string; keywords: string[] }> = {
  suwon: {
    name: '수원',
    title: '수원 물탱크 도매 | PE 물탱크, 정화조 당일 배송 - 진양건재',
    description: '수원 전 지역 물탱크 직배송. 1분 만에 확인하는 스마트 견적 시스템! 1989년 설립된 37년 전통의 진양건재에서 정직한 가격으로 만나보세요.',
    keywords: ['수원 물탱크', '수원 PE물탱크', '수원 정화조', '수원 물탱크 도매', '수원 물탱크 가격'],
  },
  hwaseong: {
    name: '화성',
    title: '화성 물탱크 판매 | PE 물탱크, 정화조 당일 배송 - 진양건재',
    description: '화성 전 지역 물탱크 직배송. 1분 만에 확인하는 스마트 견적 시스템! 1989년 설립된 37년 전통의 진양건재가 화성 지역 물탱크 정보를 전문적으로 제공합니다.',
    keywords: ['화성 물탱크', '화성 PE물탱크', '화성 정화조', '화성 물탱크 판매', '화성 물탱크 단가'],
  },
  yongin: {
    name: '용인',
    title: '용인 PE물탱크 도매 | 물탱크, 정화조 당일 배송 - 진양건재',
    description: '용인 전 지역 물탱크 직배송. 1분 만에 확인하는 스마트 견적 시스템! 37년 전통 진양건재에서 용인 지역 물탱크 최저가 견적을 확인하세요.',
    keywords: ['용인 물탱크', '용인 PE물탱크', '용인 정화조', '용인 물탱크 도매', '용인 물탱크 구매'],
  },
  ansan: {
    name: '안산',
    title: '안산 정화조·물탱크 도매 | 수도권 당일 배송 - 진양건재',
    description: '안산 전 지역 물탱크 및 정화조 직배송. 1분 스마트 견적 시스템으로 안산 지역 최저가 단가를 지금 확인해 보세요.',
    keywords: ['안산 정화조', '안산 물탱크', '안산 PE물탱크', '안산 정화조 가격', '안산 물탱크 도매'],
  },
  pyeongtaek: {
    name: '평택',
    title: '평택 물탱크 도매 | PE/사각 물탱크 당일 배송 - 진양건재',
    description: '평택 전 지역 물탱크 직배송. 37년 전통의 신뢰, 진양건재에서 평택 지역 물탱크 단가표를 확인하세요.',
    keywords: ['평택 물탱크', '평택 PE물탱크', '평택 정화조', '평택 물탱크 도매', '평택 물탱크 가격'],
  },
  osan: {
    name: '오산',
    title: '오산 물탱크 도매 | PE 물탱크, 정화조 당일 배송 - 진양건재',
    description: '오산 전 지역 물탱크 직배송. 복잡한 전화 없이 1분 만에 확인하는 오산 지역 전용 스마트 견적 시스템.',
    keywords: ['오산 물탱크', '오산 PE물탱크', '오산 정화조', '오산 물탱크 도매', '오산 물탱크 구매'],
  },
};

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = regionData[city] || regionData.suwon;

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
  };
}

export default async function RegionPage({ params }: Props) {
  const { city } = await params;
  const data = regionData[city];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">해당 지역 정보를 찾을 수 없습니다.</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Region Specific Hero */}
      <section className="bg-industrial-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-industrial-700 rounded-full text-sm font-bold mb-6">
                {data.name} 지역 서비스 센터
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                {data.name} 물탱크·정화조<br />
                <span className="text-[#FFD400]">도매가 직배송</span>
              </h1>
              <p className="text-xl text-industrial-300 mb-8 leading-relaxed break-keep">
                {data.name} 전 지역 어디든 당일 배송 원칙! 
                37년 전통의 진양건재가 정직한 가격과 신속한 서비스를 보장합니다. 
                전화 한 통으로 견적부터 배송까지 한 번에 해결하세요.
              </p>
              <div className="flex flex-wrap gap-4">
                <RegionCTA />
                <a 
                  href="tel:031-236-8227"
                  className="inline-flex items-center justify-center border-2 border-industrial-700 text-white hover:bg-industrial-800 font-bold h-16 px-8 rounded-2xl text-xl transition-all active:scale-95"
                >
                  <Phone className="w-6 h-6 mr-2" />
                  전화 문의
                </a>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden border-4 border-industrial-800 aspect-video lg:aspect-square">
              <Image 
                src="/images/hero-main-warehouse.jpg" 
                alt={`${data.name}-PE물탱크-도매-진양건재`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Region Context Content */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-industrial-900 mb-4">
              왜 {data.name} 고객님들이 진양건재를 선택할까요?
            </h2>
            <div className="w-20 h-1.5 bg-industrial-900 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:translate-y-[-8px] transition-all border border-gray-100">
                <Truck className="w-12 h-12 text-industrial-900 mb-6" />
                <h3 className="text-xl font-bold mb-4">{data.name} 전 지역 신속 배송</h3>
                <p className="text-industrial-600 leading-relaxed text-sm">
                  {data.name} 시내 및 외곽 지역까지 직영 배송팀과 전문 화물 네트워크를 통해 가장 효율적으로 전달합니다. 
                  현장 위치와 제품 규격에 최적화된 배송 수단으로 신속하고 안전하게 자재를 받으실 수 있습니다.
                </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:translate-y-[-8px] transition-all border border-gray-100">
                <CheckCircle2 className="w-12 h-12 text-industrial-900 mb-6" />
                <h3 className="text-xl font-bold mb-4">1989년부터 이어진 신뢰</h3>
                <p className="text-industrial-600 leading-relaxed text-sm">
                  {data.name} 지역의 수많은 건설 현장과 농가에 납품해 온 37년의 노하우. 
                  품질 문제 없는 검증된 제품만을 엄선하여 공급합니다.
                </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:translate-y-[-8px] transition-all border border-gray-100">
                <Calculator className="w-12 h-12 text-industrial-900 mb-6" />
                <h3 className="text-xl font-bold mb-4">정직한 공장 직영가</h3>
                <p className="text-industrial-600 leading-relaxed text-sm">
                  중간 유통 단계를 줄여 {data.name} 지역 어디보다 합리적인 가격대를 제안합니다. 
                  전화 없이도 확인 가능한 실시간 단가표를 이용해 보세요.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* Re-use main home components for consistency and functional features */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-4">{data.name} 지역 물탱크 카테고리</h2>
            <p className="text-gray-500 font-medium">원하시는 규격을 선택하여 즉시 견적을 확인하세요.</p>
        </div>
        <CategoryGrid />
      </div>

      <TrustIndicators />
      
      <div className="h-24"></div>
    </main>
  );
}
