import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, Sprout } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '친환경 야자매트(코코넛 보행매트) 셀프 시공법 및 규격별 단가 가이드 - 진양건재',
  description: '정원 조경, 농막 진입로, 등산로 미끄럼 방지에 최적화된 야자매트(코코넛매트)의 모든 것. 규격별 단가 비교, U자형 고정핀 셀프 시공법, 보행매트 관리 요령을 쉽게 설명해 드립니다.',
  keywords: [
    '야자매트', '코코넛매트', '보행매트', '식생매트', '롤매트', '야자매트 단가', '야자매트 가격', '야자매트 시공', '야자매트 설치', '미끄럼방지 매트', '친환경 매트', '조경 매트', '수원 야자매트', '화성 야자매트', '용인 야자매트'
  ]
};

export default function YajaMatGuidePage() {
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
          <span className="text-sm font-black text-emerald-600 px-3 py-1.5 bg-emerald-50 rounded-lg mb-4 inline-block">
            친환경 보행매트 가이드
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-6 break-keep">
            야자매트(코코넛매트) 셀프 시공 가이드 & 규격별 단가 비교
          </h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed break-keep">
            최근 전원주택 정원 조경, 주말농장 농막 진입로, 펜션 보행로, 등산로 등에 친환경 야자매트(코코넛 보행매트)를 까는 분들이 굉장히 많아졌습니다. 미끄럼을 막아주고 흙이 묻지 않아 쾌적하지만, 처음 설치할 때는 어떤 규격을 사야 할지, 철근 핀은 몇 개나 박아야 할지 헷갈리기 마련입니다. 진양건재에서 알기 쉽게 총정리해 드립니다!
          </p>
        </header>

        {/* 본문 영역 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 space-y-10 text-gray-800 text-base sm:text-lg leading-relaxed">
          
          {/* 섹션 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-base font-black">1</span>
              야자매트(코코넛매트)란 무엇인가요?
            </h2>
            <p className="break-keep font-medium text-gray-600">
              야자매트는 <strong>100% 천연 코코넛 열매 섬유질</strong>을 이용해 꼬아 만든 친환경 보행 보조 매트입니다. 토양 침식을 방지하고 미끄러운 길의 마찰력을 극대화하여 보행 안전을 돕습니다. 시간이 흘러 내구 연한(약 5~6년)이 지나면 자연스럽게 흙 속으로 생분해되어 환경오염 우려가 전혀 없는 지속 가능한 자재입니다.
            </p>
            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50">
              <h3 className="font-black text-emerald-800 mb-2">💡 주요 용도</h3>
              <ul className="list-disc list-inside space-y-1.5 text-base text-gray-600 font-bold">
                <li>전원주택 정원 및 마당 디딤돌 대용 보행로</li>
                <li>눈·비가 올 때 진흙탕이 되는 비포장 도로 및 농막 진입로</li>
                <li>경사가 가파르거나 물기가 많아 미끄러운 등산로, 산책로</li>
                <li>잡초 성장을 막고 흙먼지 날림을 방지하고 싶을 때</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 섹션 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-base font-black">2</span>
              설치 장소에 맞는 규격(너비) 선택 요령
            </h2>
            <p className="break-keep font-medium text-gray-600">
              보행매트는 보통 롤 형태로 출고되며, <strong>길이는 10m가 표준</strong>입니다. 따라서 필요한 너비(폭)에 맞춰 주문하시면 됩니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-slate-50 font-black text-[#003366]">
                    <th className="border border-gray-200 p-3 text-center">폭(너비)</th>
                    <th className="border border-gray-200 p-3 text-center">적합한 용도</th>
                    <th className="border border-gray-200 p-3 text-center">특징</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 font-bold">
                  <tr>
                    <td className="border border-gray-200 p-3 text-center bg-slate-50/30">0.6m</td>
                    <td className="border border-gray-200 p-3">좁은 정원 오솔길, 밭고랑 사이 통로</td>
                    <td className="border border-gray-200 p-3">1인 보행에 딱 맞음</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 text-center bg-slate-50/30">0.8m</td>
                    <td className="border border-gray-200 p-3">주택 마당, 일반적인 보행로, 과수원 통로</td>
                    <td className="border border-gray-200 p-3">대중적인 조경용 너비</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 text-center bg-slate-50/30">1.0m</td>
                    <td className="border border-gray-200 p-3">펜션 진입로, 공공 등산로, 캠핑장 사이트 통로</td>
                    <td className="border border-gray-200 p-3"><strong>가장 선호도가 높은 표준 규격</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 text-center bg-slate-50/30">1.2m ~ 1.5m</td>
                    <td className="border border-gray-200 p-3">2인 이상 교행이 잦은 산책로, 휠체어 통로</td>
                    <td className="border border-gray-200 p-3">넉넉한 보행 폭 제공</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 text-center bg-slate-50/30">2.0m</td>
                    <td className="border border-gray-200 p-3">공원 광장 진입로, 차량 이동이 드문 임도</td>
                    <td className="border border-gray-200 p-3">대면적 포장 및 공공 설계용</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 섹션 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 text-base font-black">3</span>
              누구나 쉽게 하는 셀프 시공 4단계
            </h2>
            <p className="break-keep font-medium text-gray-600">
              야자매트는 무게감(10m 1롤당 약 20kg~60kg)이 있어 바람에 날리지 않지만, 밟거나 이동할 때 밀리는 현상을 막기 위해 <strong>U자형 고정 철근핀</strong>으로 꼼꼼히 고정해야 합니다.
            </p>
            <div className="space-y-4 mt-2">
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">1</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">바닥 정리 (기초 다지기)</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    매트가 울퉁불퉁해지지 않도록 설치할 경로의 돌멩이나 나뭇가지를 치우고 평평하게 골라줍니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">2</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">매트 롤 펼치기</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    시작 지점에서부터 방향을 맞춰 야자매트를 끝까지 굴리며 펼칩니다. 코너가 있다면 칼로 잘라 맞춰 겹쳐줍니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">3</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">U자 고정핀 고정 (중요!)</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    매트 양끝과 중앙에 지그재그 방향으로 U자 핀을 꽂아 망치로 때려 박습니다. <strong>10m 매트 한 장당 보통 15개</strong>(양 가장자리 6개씩, 중앙 3개)를 고정합니다. 경사가 있거나 단단한 고정을 원하시면 30개 설치를 권장합니다.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-black shrink-0">4</span>
                <div>
                  <h4 className="font-black text-gray-900 text-base sm:text-lg">이음새 겹치기 처리</h4>
                  <p className="text-sm sm:text-base text-gray-500 font-bold mt-1">
                    롤과 롤이 만나는 지점은 약 10~20cm 정도 겹치게 배치한 뒤, 겹쳐진 두 레이어를 뚫고 고정핀을 깊게 박아 발이 걸려 넘어지지 않도록 마감합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 섹션 4 */}
          <section className="space-y-4 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#003366]" />
              자주 묻는 질문 (FAQ)
            </h2>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-black text-gray-900 text-base sm:text-lg">Q. 비가 많이 오면 매트가 썩거나 냄새나지 않나요?</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  A. 천연 코코넛 섬유는 배수성과 통풍성이 매우 탁월해 빗물이 고이지 않고 바로 빠져나갑니다. 건조가 빨라 곰팡이나 악취 걱정 없이 쾌적하게 사용 가능합니다.
                </p>
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-base sm:text-lg">Q. 야자매트 수명은 보통 얼마나 되나요?</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  A. 통행량이 많은 공공 등산로는 약 3~4년, 전원주택 등 개인 정원은 통행량이 적어 5~7년 이상 반영구적으로 튼튼하게 유지됩니다.
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
              진양 야자매트 롤당 단가 및 가격 실시간 계산하기
              <ChevronRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-gray-400 font-bold mt-3">
              * 진양건재는 품질이 공인된 정품 천연 베트남산 고강도 야자매트만을 직공급합니다.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
