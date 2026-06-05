import Link from 'next/link';
import { ArrowRight, BookOpen, ShieldCheck, Droplet, Sprout } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전문 자재 선택 가이드 | 야자매트·농업용·매립형 물탱크 구매 팁 - 진양건재',
  description: '진양건재의 37년 업력 노하우가 담긴 실무 자재 선택 가이드. 친환경 야자매트 규격 및 시공법, 농업용 백색 물탱크 특징, 지하 매립형 물탱크 설치 요령 등 알짜배기 정보를 확인하세요.',
  keywords: [
    '야자매트 선택 가이드', '농업용 물탱크 고르는법', '매립형 물탱크 설치방법', '물탱크 단가비교', '진양건재 가이드'
  ]
};

const GUIDES = [
  {
    slug: 'yaja-mat',
    title: '친환경 야자매트(코코넛 보행매트) 셀프 시공법 및 규격별 추천 가이드',
    description: '공사 현장, 등산로, 정원 조경에 사용되는 야자매트의 두께와 규격 선택 요령부터 고정핀을 활용한 튼튼한 셀프 시공 꿀팁까지 모두 공개합니다.',
    category: '친환경 야자매트',
    icon: Sprout,
    iconBg: 'bg-emerald-50 text-emerald-600',
    readTime: '5분 소요'
  },
  {
    slug: 'agricultural-tank',
    title: '농업용·농약용 물탱크 고르는 법 (일반 청색 PE탱크 vs 백색 경운기용 탱크)',
    description: '농작물 방제와 농약 희석용 물탱크를 구매할 때 잔량 확인이 쉬운 백색 탱크의 장점과 밭, 경운기에 최적화된 용량 및 사이즈 결정법을 쉽게 설명해 드립니다.',
    category: '농업용 물탱크',
    icon: Droplet,
    iconBg: 'bg-blue-50 text-blue-600',
    readTime: '4분 소요'
  },
  {
    slug: 'underground-tank',
    title: '지하 매립형(매설용) 물탱크 시공 수칙 (토압에 의한 찌그러짐 예방법)',
    description: '흙의 압력을 견디도록 설계된 특수 매설용 U시리즈 물탱크의 규격과 토압에 따른 파손을 방지하기 위한 전문 시공 핵심 포인트들을 짚어드립니다.',
    category: '지하 매설용 물탱크',
    icon: ShieldCheck,
    iconBg: 'bg-amber-50 text-amber-600',
    readTime: '6분 소요'
  }
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 sm:py-24 font-['Pretendard']">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 상단 타이틀 영역 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#003366] font-black text-sm uppercase tracking-wider px-4 py-1.5 bg-[#003366]/10 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            진양건재 실무 노하우
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4 break-keep">
            실패 없는 전문 자재 선택 가이드
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 font-bold max-w-2xl mx-auto break-keep">
            야자매트 설치부터 용도별 물탱크(농업용, 지하매설용) 선택까지 검색창에서 가장 많이 찾는 꿀팁을 전해드립니다.
          </p>
        </div>

        {/* 가이드 리스트 */}
        <div className="space-y-8">
          {GUIDES.map((guide) => {
            const Icon = guide.icon;
            return (
              <article 
                key={guide.slug}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className={`p-4 rounded-2xl ${guide.iconBg} shrink-0`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black text-[#003366] px-3 py-1 bg-[#003366]/5 rounded-md">
                      {guide.category}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">
                      {guide.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug hover:text-[#003366] transition-colors break-keep">
                    <Link href={`/guides/${guide.slug}`}>
                      {guide.title}
                    </Link>
                  </h2>
                  
                  <p className="text-base text-gray-500 font-bold leading-relaxed break-keep">
                    {guide.description}
                  </p>
                  
                  <div className="pt-2">
                    <Link 
                      href={`/guides/${guide.slug}`}
                      className="inline-flex items-center gap-1.5 text-[#003366] hover:text-[#002855] text-base font-black group"
                    >
                      가이드 읽어보기
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* 하단 홈 바로가기 */}
        <div className="mt-16 text-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#003366] text-white font-black text-lg rounded-2xl hover:bg-[#002855] transition-all shadow-md"
          >
            진양건재 실실시간 스마트 견적 홈으로 가기
          </Link>
        </div>

      </div>
    </main>
  );
}
