import { FileText, Zap, ShieldCheck } from 'lucide-react';

export default function TrustIndicators() {
    return (
        <section className="py-16 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
                    <div className="flex flex-col items-center text-center pt-8 md:pt-0">
                        <div className="text-slate-300 dark:text-slate-700 mb-4">
                            <FileText strokeWidth={1.5} className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-light tracking-tight text-slate-900 dark:text-white mb-2">10,000+</h3>
                        <p className="text-slate-500 text-sm font-medium tracking-wide">누적 견적 및 발주 처리 건수</p>
                    </div>

                    <div className="flex flex-col items-center text-center pt-8 md:pt-0">
                        <div className="text-slate-300 dark:text-slate-700 mb-4">
                            <Zap strokeWidth={1.5} className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-light tracking-tight text-slate-900 dark:text-white mb-2">10초</h3>
                        <p className="text-slate-500 text-sm font-medium tracking-wide">진양스마트견적 기반 평균 견적 답변</p>
                    </div>

                    <div className="flex flex-col items-center text-center pt-8 md:pt-0">
                        <div className="text-slate-300 dark:text-slate-700 mb-4">
                            <ShieldCheck strokeWidth={1.5} className="w-10 h-10" />
                        </div>
                        <h3 className="text-3xl font-light tracking-tight text-slate-900 dark:text-white mb-2">100%</h3>
                        <p className="text-slate-500 text-sm font-medium tracking-wide">전국 직배송 및 품질 보증 시공 파트너</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
