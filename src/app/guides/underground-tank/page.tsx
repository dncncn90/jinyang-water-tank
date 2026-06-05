import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '지하 매립형(매설용) 물탱크 시공 수칙 및 U시리즈 찌그러짐 방지법 - 진양건재',
  description: '지하수 저장 및 빗물 재활용을 위한 매설용 물탱크(지하 물탱크) 설치 가이드. 토압에 강한 U시리즈 물탱크 단가와 찌그러짐 파손을 방지하는 현장 기초 콘크리트 및 모래 다짐 시공 수칙을 쉽게 해설합니다.',
  keywords: [
    '매립형 물탱크', '매설용 물탱크', '지하 물탱크', '매설탱크', '지하수 물탱크', '정화조 매설', '토압 방지 물탱크', 'U시리즈 물탱크', '매립형 물탱크 가격', '지하 물탱크 설치', '수원 매립 물탱크', '화성 지하 물탱크', '용인 매설용 저수조'
  ]
};

export default function UndergroundTankGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 sm:py-20 font-['Pretendard']">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* 상단 네비게이션 */}
        <Link 
          href="/guides"
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#003366] text-base font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          가이드 목록으로 돌아가기
        </Link>

        {/* 아티클 헤더 */}
        <header className="mb-12">
          <span className="text-sm font-black text-amber-600 px-3 py-1.5 bg-amber-50 rounded-lg mb-4 inline-block">
            지하 매설용 자재 가이드
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-6 break-keep">
            매립형(지하 매설용) 물탱크 찌그러짐 방지를 위한 4대 필수 시공 요령
          </h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed break-keep">
            지하수 저장, 빗물 재활용, 또는 옥외 미관상의 이유로 물탱크를 땅속에 묻는 <strong>지하 매립형 물탱크(매설용 저수조)</strong> 시공이 늘고 있습니다. 하지만 일반 물탱크를 그냥 땅에 묻었다가 흙의 강한 압력(토압)이나 지하수 부력에 의해 탱크가 힘없이 찌그러지거나 땅 위로 붕 뜨는 하자가 매우 빈번하게 발생합니다. 진양건재에서 하자를 100% 예방하는 올바른 매설 물탱크 고르는 법과 시공 팁을 전해드립니다!
          </p>
        </header>

        {/* 본문 영역 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 space-y-10 text-gray-800 text-base sm:text-lg leading-relaxed">
          
          {/* 섹션 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-600 text-base font-black">1</span>
              지하 매설 전용 물탱크(U시리즈)를 반드시 써야 하는 이유
            </h2>
            <p className="break-keep font-medium text-gray-600">
              일반 지상용 원형 PE 물탱크는 상하수도 수압에 맞춰 외벽이 원형으로 매끄럽게 설계되어 있습니다. 반면, <strong>매설용 U시리즈 물탱크</strong>는 외벽에 마치 주름관이나 기둥처럼 튀어나온 두꺼운 <strong>‘토압 분산 보강벽’</strong> 구조를 가지고 있습니다.
            </p>
            <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100/50">
              <h3 className="font-black text-amber-950 mb-2">⭐ 매설용 U시리즈의 차별화된 구조</h3>
              <ul className="list-disc list-inside space-y-1.5 text-base text-gray-700 font-bold">
                <li><strong>파형 리브(Rib) 보강 구조</strong>: 탱크 외부에 수평/수직의 두꺼운 요철 리브를 만들어 토압이 외벽 전체로 골고루 분산되도록 설계되어 있습니다.</li>
                <li><strong>고밀도 신재 이중벽 구조</strong>: 흙의 장기적인 압력을 지탱하기 위해 지상용보다 더 무거운 중량의 최고급 고강도 폴리에틸렌 수지로 이중 생산됩니다.</li>
                <li><strong>맨홀 부분 보강</strong>: 매립 후 지상 노출부에 흙이나 이물질이 들어가지 않도록 맨홀 입구를 견고하게 높인 특수 디자인을 사용합니다.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 섹션 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-600 text-base font-black">2</span>
              매립형 물탱크 시공 시 절대 놓쳐선 안 될 4대 수칙
            </h2>
            <p className="break-keep font-medium text-gray-600">
              매설 작업 시 사소한 부주의로 물탱크가 파손되면 땅을 다시 파내어 재공사해야 하므로 비용이 배로 듭니다. 다음 네 가지 요령을 완벽히 준수해야 안전합니다.
            </p>
            <div className="space-y-6 mt-4">
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">1</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">바닥 기초 평탄화 및 모래 포설</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    굴착 작업 후 탱크가 놓일 바닥에 자갈이나 큰 돌이 뾰족하게 튀어나와 있으면 누수가 발생합니다. 흙을 고르고 반드시 10~20cm 이상의 <strong>고운 모래를 깔아 완충층</strong>을 만들거나, 대용량(3톤 이상)의 경우 콘크리트 기초 패드를 친 후 수평을 맞춥니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">2</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">되메우기 전 물탱크에 반드시 물 가득 채우기 (가장 중요!)</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    빈 물탱크 주변에 바로 흙을 메워버리면 토압을 견디지 못하고 탱크가 즉시 찌그러집니다. <strong>반드시 탱크 내부에 물을 100% 가득 채운 후</strong>, 물의 내부 압력이 버티고 있는 상태에서 탱크 주변을 메워야 찌그러짐을 예방할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">3</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">고운 모래로 1차 되메우기 및 층다짐</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    포크레인으로 주변에 흙과 돌이 섞인 토사를 쏟아부으면 돌멩이가 외벽을 찌르고 압력이 한곳으로 쏠려 파손됩니다. 탱크 주변 약 30cm 구역은 **돌이 전혀 없는 고운 모래**를 사용해 메우고, 조금씩 채울 때마다 물다짐이나 층다짐으로 촘촘히 메워주어야 찌그러지지 않습니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">4</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">상단 슬래브 콘크리트 마감</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    매설된 위쪽으로 사람이 지나다니거나 주차장 용도로 차량이 밟을 가능성이 있다면, 탱크 상단부에 토압 및 하중이 직접 전달되지 않도록 **철근 콘크리트 슬래브(지붕 패드)**를 쳐서 하중을 주위 땅으로 분산시켜 주어야 합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 섹션 3 */}
          <section className="space-y-4 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#003366]" />
              자주 묻는 질문 (FAQ)
            </h2>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-black text-gray-900 text-base sm:text-lg">Q. 일반 물탱크와 U시리즈 매설용 물탱크 단가 차이는 얼마나 나나요?</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  A. U시리즈 매설용 물탱크는 고강도 토압 분산 구조로 더 많은 고품질 PE 원료가 들어가므로 지상용 일반 탱크 대비 단가가 약 1.5배~2배 정도 높게 형성됩니다. 하지만 매설 하자로 인한 재공사 비용(토목 장비비, 재구매비 등)을 감안하면 반드시 매설 전용을 구매하시는 것이 최상의 절약 방법입니다.
                </p>
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-base sm:text-lg">Q. 지하수가 차올라 물탱크가 위로 뜨는 경우는 어쩌나요?</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  A. 물기가 많고 지하수 수위가 높은 점토성 토양에 매설할 때, 탱크 내부가 비면 부력에 의해 땅 밖으로 솟구쳐 오르는 경우가 있습니다. 이를 방지하기 위해 바닥 기초 콘크리트에 앵커 볼트를 박고 철 와이어나 밴드로 물탱크 본체를 단단히 고정하는 부력 방지 조치를 취해야 합니다.
                </p>
              </div>
            </div>
          </section>

          {/* CTA 버튼 */}
          <div className="pt-6 text-center">
            <Link 
              href="/#products"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-5 bg-[#003366] hover:bg-[#002855] text-white font-black text-lg sm:text-xl rounded-2xl transition-all shadow-xl shadow-blue-900/10 active:scale-95"
            >
              매설용 U시리즈 지하 물탱크 규격 및 견적 즉시 확인하기
              <ChevronRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-gray-400 font-bold mt-3">
              * 진양건재는 지하 매설 안전성이 공식 검증된 최상급 매설용(U시리즈) 정품 물탱크를 직송 공급합니다.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
