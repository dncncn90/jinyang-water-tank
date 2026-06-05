import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

const HOME_GUIDES = [
  {
    slug: 'yaja-mat',
    title: '야자매트 셀프 시공법',
    description: '코코넛 보행매트 규격 선택 및 U자형 철근 고정핀 설치 요령'
  },
  {
    slug: 'agricultural-tank',
    title: '농사용 물탱크 고르는 법',
    description: '일반 PE 물탱크와 농약 방제용 백색 경운기 물탱크 차이점 비교'
  },
  {
    slug: 'underground-tank',
    title: '매설용 물탱크 설치 요령',
    description: '지하 매립형 U시리즈 물탱크 찌그러짐 하자를 예방하는 4대 수칙'
  }
];

export default function GuideLinks() {
  return (
    <section className="py-12 bg-white border-t border-gray-100 font-['Pretendard']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-black text-[#003366] flex items-center justify-center sm:justify-start gap-2">
              <BookOpen className="w-5 h-5" />
              진양건재 실무 자재 가이드
            </h3>
            <p className="text-sm text-gray-500 font-bold mt-1">
              야자매트 규격 단가 및 농사용·매설용 물탱크 실패 없는 시공 정보
            </p>
          </div>
          <Link 
            href="/guides"
            className="flex items-center gap-1.5 text-sm font-black text-[#003366] hover:text-[#002855] group"
          >
            가이드 전체보기
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOME_GUIDES.map((guide) => (
            <Link 
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group p-5 rounded-2xl border border-gray-100 hover:border-[#003366]/30 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-black text-gray-900 group-hover:text-[#003366] transition-colors text-base sm:text-lg mb-1 leading-snug">
                  {guide.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-bold leading-normal">
                  {guide.description}
                </p>
              </div>
              <span className="text-xs font-black text-[#003366] mt-3 inline-flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                읽어보기
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
