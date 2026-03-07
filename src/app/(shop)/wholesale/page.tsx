import { Phone, Check, Building2, Truck, CreditCard, MessageSquare, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WholesalePage() {
    return (
        <div className="bg-white min-h-screen pt-28 pb-20">
            {/* Hero Section */}
            <section className="relative bg-industrial-900 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-industrial-800 border border-industrial-700 text-xs font-bold mb-6 text-industrial-300">
                        B2B BUSINESS CENTER
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                        사업자 회원님을 위한<br />
                        <span className="text-industrial-400">특별한 도매 혜택</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                        건설사, 설비업체, 관공서 납품 전문.<br />
                        대량 구매 시 전용 견적과 최우선 배차 서비스를 제공합니다.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="tel:031-236-8227"
                            className="flex items-center justify-center gap-2 bg-white text-industrial-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            전화로 도매 견적 받기
                        </a>
                    </div>
                </div>
            </section>

            {/* B2B Delivery Route Guarantee Banner */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-10">
                <div className="bg-white dark:bg-slate-800 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-700 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-black tracking-widest uppercase mb-4">
                            Premium B2B Benefit
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
                            최저가 <span className="text-blue-600">전용 화물 루트</span> 보장
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed break-keep max-w-2xl">
                            건설 현장 및 설비 업체 대량 구매 시, 거리에 상관없이 <br className="hidden md:block" />
                            <strong className="text-slate-900 dark:text-white underline decoration-blue-500 decoration-2 underline-offset-4">진양건재만의 전용 화물 루트</strong>로 최저가 운임을 보장해 드립니다.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <a
                            href="tel:031-236-8227"
                            className="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-xl shadow-blue-200 dark:shadow-none hover:-translate-y-1 active:scale-95 text-lg"
                        >
                            <Phone className="w-6 h-6" />
                            최저가 운임 문의하기
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">B2B 대량 구매 혜택</h2>
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">Business Exclusive Advantages</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Building2 className="w-10 h-10 text-blue-600" />,
                            title: "사업자 전용 단가",
                            desc: "지속 거래 및 대량 발주 시 <br/> 추가 할인 등 파격적인 혜택 제공",
                            bgColor: "bg-blue-50/50"
                        },
                        {
                            icon: <CreditCard className="w-10 h-10 text-emerald-600" />,
                            title: "100% 세금계산서",
                            desc: "투명한 거래 질서 준수, <br/> 전자세금계산서 정식 즉시 발행",
                            bgColor: "bg-emerald-50/50"
                        },
                        {
                            icon: <Truck className="w-10 h-10 text-orange-600" />,
                            title: "전국 현장 직배송",
                            desc: "원하시는 날짜와 시간에 맞춰 <br/> 전국 현장으로 신속하게 화물 배송",
                            bgColor: "bg-orange-50/50"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="relative bg-white dark:bg-slate-800 p-10 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col items-center text-center group">
                            <div className={`w-20 h-20 ${item.bgColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Content Body */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">자주 묻는 질문 (FAQ)</h2>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="text-industrial-600">Q.</span>
                                견적서는 어떻게 받나요?
                            </h3>
                            <p className="text-gray-600 pl-6">
                                전화(031-236-8227) 주시면 즉시 이메일이나 팩스로 견적서를 보내드립니다.
                                또는 우측 하단 <span className="font-bold">채팅 상담</span>을 통해서도 간편 견적이 가능합니다.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="text-industrial-600">Q.</span>
                                현장 납품 결제는 어떻게 하나요?
                            </h3>
                            <p className="text-gray-600 pl-6">
                                법인카드 결제, 전자세금계산서 발행 후 입금 등 원하시는 방법으로 처리해 드립니다.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <span className="text-industrial-600">Q.</span>
                                급하게 물건이 필요한데 당일 출고 되나요?
                            </h3>
                            <p className="text-gray-600 pl-6">
                                오전 발주 시 대부분 당일 출고가 가능합니다. 재고 상황에 따라 다르니 전화주시면 가장 빠른 배차를 알아봐 드립니다.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 mb-6">더 궁금한 점이 있으신가요?</p>
                        <a
                            href="tel:031-236-8227"
                            className="inline-flex items-center gap-2 text-industrial-600 font-bold hover:text-industrial-800 transition-colors border-b-2 border-industrial-600 hover:border-industrial-800 pb-1"
                        >
                            <Phone className="w-4 h-4" />
                            031-236-8227 전화 문의하기
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
