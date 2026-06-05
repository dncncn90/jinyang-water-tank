import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, Droplet } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '농업용·농약용 물탱크 고르는 법 (일반 청색 PE vs 백색 경운기용) - 진양건재',
  description: '과수원, 비닐하우스, 농막 물탱크 구매 팁! 액체 잔량 확인이 쉬운 백색 농약 물탱크의 장점과 1톤/2톤 규격 추천, 경운기 적재 요령 및 안전한 고정 방법을 쉽게 안내해 드립니다.',
  keywords: [
    '농업용 물탱크', '농사용 물탱크', '농약 물탱크', '경운기 물탱크', '경운기 농약탱크', '백색 물탱크', '약품 물탱크', '화학 물탱크', '밭 물탱크 1톤', '농사용 2톤 물탱크', '수원 물탱크 도매', '화성 농업용 물탱크', '용인 농사용 물탱크'
  ]
};

export default function AgriculturalTankGuidePage() {
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
          <span className="text-sm font-black text-blue-600 px-3 py-1.5 bg-blue-50 rounded-lg mb-4 inline-block">
            농업용·농가 자재 가이드
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-6 break-keep">
            농업용·농약용 물탱크 제대로 고르는 법: 청색 vs 백색 경운기용 완벽 비교
          </h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed break-keep">
            본격적인 영농 철이 시작되면 과수원 방제용, 비닐하우스 용수 보관용, 농막용 물탱크(PE탱크) 문의가 쏟아집니다. 많은 분들이 대충 파란색 물탱크만 생각하시지만, <strong>농약 살포나 경운기 적재 용도</strong>라면 전혀 다른 제품을 선택하셔야 작업이 훨씬 수월해집니다. 진양건재가 용도에 꼭 맞는 최적의 농사용 물탱크 선택 팁을 소개해 드립니다!
          </p>
        </header>

        {/* 본문 영역 */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 space-y-10 text-gray-800 text-base sm:text-lg leading-relaxed">
          
          {/* 섹션 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-base font-black">1</span>
              일반 청색 PE 물탱크 vs 농약용 백색 물탱크
            </h2>
            <p className="break-keep font-medium text-gray-600">
              시중에서 흔히 볼 수 있는 파란색(청색) 물탱크는 차광성이 탁월하여 내부에 녹조가 끼는 것을 예방해 줍니다. 따라서 **일반 지하수나 농업용수 장기 보관용**으로 매우 적합합니다. 반면, 몸체가 하얀색에 가까운 **백색(반투명) 물탱크**는 농약 살포 및 희석 작업에 특화되어 있습니다.
            </p>
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 space-y-2">
              <h3 className="font-black text-blue-900 mb-1">📢 백색(반투명) 농약탱크의 압도적인 장점</h3>
              <ul className="list-disc list-inside space-y-1.5 text-base text-gray-600 font-bold">
                <li><strong>약액의 잔량 눈으로 확인</strong>: 탱크 몸체가 반투명하여 뚜껑을 열지 않아도 농약이 얼마나 남았는지 외부에서 바로 보입니다.</li>
                <li><strong>정확한 약품 희석비 조절</strong>: 눈금이 외부에 표시되어 있어 물과 농약 혼합 비율을 완벽하게 조절할 수 있습니다.</li>
                <li><strong>경운기 적재 설계</strong>: 0.6톤(600L) 및 1톤(1,000L) 모델은 일반 경운기 적재함 폭에 정확하게 들어가도록 가로/세로 비율이 최적화되어 있습니다.</li>
              </ul>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 섹션 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-base font-black">2</span>
              용도별 물탱크 추천 규격 (용량별 비교)
            </h2>
            <p className="break-keep font-medium text-gray-600">
              농막이나 밭에 물을 받아두고 쓰실 때 재배 규모와 용도에 맞지 않는 크기를 사면 낭비가 심하거나 물이 모자랄 수 있습니다.
            </p>
            <div className="space-y-4">
              <div className="border border-gray-100 p-5 rounded-2xl">
                <h4 className="font-black text-[#003366] text-lg">💡 소형 밭 & 주말농장 농막 (0.4톤 ~ 1.0톤)</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  일주일에 몇 번 들러 작물에 물을 주거나 가볍게 손발을 씻는 용도라면 400L(0.4톤) ~ 1000L(1톤) 원형 PE 물탱크가 무난합니다. 공간이 협소하다면 벽면에 바짝 붙여 놓을 수 있는 **사각 물탱크(M시리즈)**도 최고의 선택입니다.
                </p>
              </div>
              <div className="border border-gray-100 p-5 rounded-2xl">
                <h4 className="font-black text-[#003366] text-lg">💡 본격 농경지 & 과수원 살포용 (2.0톤 ~ 3.5톤)</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  지하수 관정이 없어 1톤 트럭 화물칸에 싣고 물을 길어와야 하거나, 스프링클러를 작동시켜야 한다면 2톤(2000L) 또는 3톤(3000L)급 이상의 대형 원형 물탱크가 필요합니다.
                </p>
              </div>
              <div className="border border-gray-100 p-5 rounded-2xl">
                <h4 className="font-black text-[#003366] text-lg">💡 경운기/트럭 적재 및 약제 방제 (0.6톤 ~ 1.0톤 백색 탱크)</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  경운기 적재함에 딱 맞춘 **백색 농약탱크 0.6톤(600L)** 또는 1톤 화물트럭에 싣고 방제 호스를 연결하는 **백색 1톤 탱크**를 사용하십시오. 잔여 농약 배출이 쉽도록 하단부에 드레인 피팅(구찌) 가공을 하시면 작업이 매우 편리해집니다.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 섹션 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-base font-black">3</span>
              농사용 물탱크 안전 시공 및 동파방지 요령
            </h2>
            <p className="break-keep font-medium text-gray-600">
              야외나 밭에 노출되어 설치하는 경우가 많으므로 안전 시공과 동결 파손 관리가 필수적입니다.
            </p>
            <div className="space-y-4 mt-2">
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-black shrink-0">✓</span>
                <p className="text-sm sm:text-base text-gray-600 font-bold">
                  <strong>평평하고 단단한 바닥</strong>: 물탱크는 물이 가득 차면 수 톤의 압력이 수평으로 작용합니다. 자갈이나 비포장 경사지에 그냥 올리면 바닥이 찢어지므로, 반드시 평평하게 고른 땅에 시멘트 보도블록이나 두꺼운 목재판을 단단히 대고 올리셔야 합니다.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-black shrink-0">✓</span>
                <p className="text-sm sm:text-base text-gray-600 font-bold">
                  <strong>겨울철 완전 퇴수</strong>: 겨울에는 물탱크 내부의 물이 얼면서 팽창해 탱크와 황동 볼밸브 배관이 100% 동파 파손됩니다. 겨울 영농이 끝난 뒤에는 반드시 배관 아래쪽 퇴수용 밸브(구찌)를 열어 내부 물을 완전히 빼내 주셔야 합니다.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-black shrink-0">✓</span>
                <p className="text-sm sm:text-base text-gray-600 font-bold">
                  <strong>자외선 노출 방지</strong>: PE 플라스틱 특성상 직사광선을 수년 동안 계속 받으면 미세하게 경화될 수 있습니다. 차광막(햇빛 가리개)이나 비닐하우스 내부에 설치하시면 물탱크의 수명을 곱절로 늘릴 수 있습니다.
                </p>
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
                <h4 className="font-black text-gray-900 text-base sm:text-lg">Q. 백색 경운기용 탱크에 일반 지하수나 약품을 담아도 되나요?</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  A. 네, 가능합니다. 진양건재에서 공급하는 물탱크는 인체에 무해한 무독성 신재 PE로 제작되며 내식성과 화학 반응 저항성이 높아 어떤 액체(식수, 지하수, 액체비료, 농약 등)도 안심하고 보관하실 수 있습니다.
                </p>
              </div>
              <div>
                <h4 className="font-black text-gray-900 text-base sm:text-lg">Q. 타공(구멍 뚫기) 및 밸브 부속 조립은 어떻게 해야 하나요?</h4>
                <p className="text-sm sm:text-base text-gray-600 font-bold mt-1">
                  A. 주문 전 가공 위치(상단 오버플로우, 하단 퇴수구 등)를 말씀해 주시면, 진양건재 매장에서 <strong>구멍 타공 및 황동/PE 피팅 결합 서비스를 무료</strong>로 진행해 드립니다. 직접 뚫으실 필요가 전혀 없습니다!
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
              용량별 농사용 PE 물탱크 가격 비교 및 스마트 견적내기
              <ChevronRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-gray-400 font-bold mt-3">
              * 진양건재는 엄격한 품질(KS)을 만족하는 무독성 정품 친환경 원료 PE 물탱크만을 엄선하여 취급합니다.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}
