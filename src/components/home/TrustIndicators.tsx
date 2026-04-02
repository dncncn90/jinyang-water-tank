import { FileText, Zap, ShieldCheck } from 'lucide-react';

export default function TrustIndicators() {
    return (
        <section className="py-12 sm:py-20 bg-white border-b border-gray-200 font-['Pretendard']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x-2 divide-gray-100">
                    <div className="flex flex-col items-center text-center p-6 sm:p-10 transition-transform hover:scale-105 duration-300">
                        <div className="bg-[#003366]/5 p-5 rounded-2xl mb-6">
                            <FileText strokeWidth={2.5} className="w-10 h-10 text-[#003366]" />
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-black text-[#003366] mb-3 tabular-nums tracking-tighter">10,000+</h3>
                        <p className="text-gray-600 text-lg sm:text-xl font-bold leading-tight break-keep">누적 견적 및 발주 처리 건수</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 sm:p-10 transition-transform hover:scale-105 duration-300">
                        <div className="bg-[#003366]/5 p-5 rounded-2xl mb-6">
                            <Zap strokeWidth={2.5} className="w-10 h-10 text-[#003366]" />
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-black text-[#003366] mb-3 tabular-nums tracking-tighter">10초</h3>
                        <p className="text-gray-600 text-lg sm:text-xl font-bold leading-tight break-keep">스마트견적 기반 평균 답변 시간</p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 sm:p-10 transition-transform hover:scale-105 duration-300">
                        <div className="bg-[#003366]/5 p-5 rounded-2xl mb-6">
                            <ShieldCheck strokeWidth={2.5} className="w-10 h-10 text-[#003366]" />
                        </div>
                        <h3 className="text-4xl sm:text-5xl font-black text-[#003366] mb-3 tabular-nums tracking-tighter">100%</h3>
                        <p className="text-gray-600 text-lg sm:text-xl font-bold leading-tight break-keep">전국 직배송 및 품질 보증 파트너</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
