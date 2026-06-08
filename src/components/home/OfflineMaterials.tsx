'use client';

import React from 'react';
import { Phone, CheckCircle2 } from 'lucide-react';

export default function OfflineMaterials() {
  const materials = [
    {
      title: '수도관 / 급수배관',
      icon: '🚰',
      desc: '깨끗하고 안전한 생활용수/농업용수 공급을 위한 고품질 수도 배관자재',
      items: [
        'PE 수도관 (농업용, 농사용, 지하수 인입용)',
        'VP 수도관 (일반 배관 및 고충격 HI-VP 수도관)',
        'CPVC 소방배관 및 내열 특수 배관자재'
      ],
      color: 'border-blue-100 bg-blue-50/20 text-blue-900 hover:border-blue-300'
    },
    {
      title: '하수관 / 우수배관',
      icon: '🚽',
      desc: '원활한 생활하수 및 빗물 배출을 위한 고강도 PVC 하수 배관자재',
      items: [
        'VG1 PVC 하수관 (두꺼운 두께의 고압용 규격 파이프)',
        'VG2 PVC 하수관 (일반 하수 및 배수 배관용)',
        '이중벽관 / 이중관 (토목 공사용 고강도 우수관)'
      ],
      color: 'border-emerald-100 bg-emerald-50/20 text-emerald-900 hover:border-emerald-300'
    },
    {
      title: '냉온수 / 난방배관',
      icon: '🔥',
      desc: '보일러 바닥 온돌 난방 및 건물 내부 온수 공급용 설비 전문 자재',
      items: [
        'XL 파이프 (난방 배관용 에이콘 엑셀 파이프)',
        'PB 에이콘 파이프 (간편 시공 및 난방용 조인트 배관)',
        '몰코관 / SR조�  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white font-['Pretendard']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
            오프라인 매장 취급 품목
          </span>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight leading-tight" style={{ wordBreak: 'keep-all' }}>
            물탱크·야자매트와 함께 <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              배관 및 기초 자재
            </span>도 한 번에 해결하세요!
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto" style={{ wordBreak: 'keep-all' }}>
            수원 37년 전통의 진양건재(진양PVC건재총판) 오프라인 매장에 상시 보유 중인 품목입니다. <br className="hidden md:inline" />
            전화 한 통으로 물탱크, 정화조, 야자매트와 함께 수도권 전역에 <strong>묶음 당일 직배송</strong>을 지원합니다.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {materials.map((mat, idx) => (
            <div 
              key={idx} 
              className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${mat.color}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl">{mat.icon}</span>
                <h3 className="text-xl font-bold text-slate-950">{mat.title}</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6" style={{ wordBreak: 'keep-all' }}>{mat.desc}</p>
              <ul className="space-y-3">
                {mat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start space-x-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-800 text-[15px] font-semibold leading-normal" style={{ wordBreak: 'keep-all' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA (Call To Action) Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-14 shadow-xl text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight" style={{ wordBreak: 'keep-all' }}>
              원하시는 규격이나 자재가 있으신가요?
            </h3>
            <p className="text-blue-100 mb-8 text-sm sm:text-base md:text-lg leading-relaxed" style={{ wordBreak: 'keep-all' }}>
              홈페이지에 등록되지 않은 특수 규격의 PVC 파이프, 배관자재, 부속품도 대량 보유하고 있습니다.<br className="hidden md:inline" />
              전화로 문의주시면 도소매 최저가 단가 견적을 즉시 뽑아드립니다!
            </p>
            <div className="flex flex-col items-center gap-3">
              <a 
                href="tel:031-236-8227" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-blue-700 bg-white hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200 shadow-md"
              >
                <Phone className="w-5 h-5 mr-3 animate-pulse text-blue-600" />
                배관자재 견적 전화 문의 (031-236-8227)
              </a>
              <span className="text-xs text-blue-100/90 font-medium">
                * 모바일 기기에서는 버튼 클릭 시 즉시 매장으로 통화 연결됩니다.
              </span>
            </div>
          </div>
        </div>elaxed break-keep">
              홈페이지에 등록되지 않은 특수 규격의 PVC 파이프, 배관자재, 부속품도 대량 보유하고 있습니다.<br className="hidden md:inline" />
              전화로 문의주시면 도소매 최저가 단가 견적을 즉시 뽑아드립니다!
            </p>
            <div className="flex flex-col items-center gap-3">
              <a 
                href="tel:031-236-8227" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-blue-700 bg-white hover:bg-blue-50 hover:scale-[1.03] transition-all duration-200 shadow-md"
              >
                <Phone className="w-5 h-5 mr-3 animate-pulse text-blue-600" />
                배관자재 견적 전화 문의 (031-236-8227)
              </a>
              <span className="text-xs text-blue-100/90 font-medium">
                * 모바일 기기에서는 버튼 클릭 시 즉시 매장으로 통화 연결됩니다.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
