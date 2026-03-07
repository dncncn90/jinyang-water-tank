import React from 'react';
import { ShieldCheck, Award, ThumbsUp, CheckCircle, Droplet, Sun, Wrench, AlertTriangle, FileText } from 'lucide-react';

export default function TankFactoryDetails() {
    return (
        <div className="w-full bg-white">
            {/* Hero Badge Section */}
            <section className="py-16 border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-bold text-sm mb-6 border border-blue-200">
                        <Award className="w-4 h-4" />
                        대한민국 대표 물탱크
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 font-['Pretendard']">
                        진양건재
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        KS, KC 인증은 기본. FDA 승인 원료를 사용하여<br className="hidden md:block" />
                        가족이 안심하고 마실 수 있는 깨끗한 물을 보관합니다.
                    </p>
                </div>
            </section>

            {/* Certifications Grid */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">KS 인증마크</h3>
                            <p className="text-xs text-gray-500">한국산업표준 인증</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">KC 인증마크</h3>
                            <p className="text-xs text-gray-500">위생안전기준 인증</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">ISO 인증</h3>
                            <p className="text-xs text-gray-500">9001, 14001 획득</p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">KTR 시험합격</h3>
                            <p className="text-xs text-gray-500">한국화학융합시험연구원</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Material Innovation */}
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                {/* Abstract background graphics */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-industrial-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-blue-400 font-bold tracking-widest text-sm mb-2 block uppercase">Premium Material</span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">비교할 수 없는 100% 정품 PE</h2>
                        <p className="text-gray-400 text-lg">진양건재만의 특수 코팅 기술과 고밀도 폴리에틸렌 소재의 강력한 결합</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                    <Droplet className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">FDA 승인 식품용 원료</h3>
                                    <p className="text-gray-400 leading-relaxed">무독성, 무취의 최고급 PE(폴리에틸렌) 원료만을 사용하여, 식수뿐만 아니라 식품 가공용으로도 안전하게 사용할 수 있습니다.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">완벽한 자외선 차단 및 완벽한 위생</h3>
                                    <p className="text-gray-400 leading-relaxed">빛의 투과를 100% 차단하는 특수 3중 구조 설계로 내부 이끼 발생을 원천적으로 억제하여 언제나 깨끗한 수질을 유지합니다.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                                    <ThumbsUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">뛰어난 내약품성과 초경량</h3>
                                    <p className="text-gray-400 leading-relaxed">각종 화학약품에도 부식되지 않는 강력한 내약품성을 지니며, 금속이나 FRP 탱크에 비해 가벼워 운반과 설치가 매우 용이합니다.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                    <Sun className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">혹독한 환경에서도 견디는 내구성</h3>
                                    <p className="text-gray-400 leading-relaxed">영하의 추위나 한여름의 폭염에도 쉽게 파손되거나 변형되지 않는 탁월한 내구성을 자랑합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Installation Guide */}
            <section className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">시공/설치 가이드 및 주의사항</h2>
                        <p className="text-gray-500">안전하고 오래 사용하기 위해 반드시 확인해주세요.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Guide 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">평평한 기초 공사 필수</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                설치 장소의 바닥은 반드시 평탄(수평)해야 하며, 뾰족한 돌이나 철재 등이 없는지 확인 후 수평 기초 패드 위에 안착시켜야 합니다. 모래나 고운 흙으로 다진 후 설치하면 더욱 좋습니다.
                            </p>
                        </div>

                        {/* Guide 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">배관 연결 시 하중 주의</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                탱크와 파이프라인 연결 시 급격한 굴곡은 피해주시고, 피팅(연결구) 부위에 과도한 하중 및 인장력이 가해지지 않도록 배관을 반드시 고정(서포트 설치)해주십시오.
                            </p>
                        </div>

                        {/* Guide 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
                            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-3">올바른 설치 환경 구성</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                벽면에서 15~20cm 이상의 여유 공간을 두고 설치를 권장합니다. 화기에 직접 노출되지 않도록 주의하고, 온수용은 별도 문의 바랍니다 (기본 PE탱크는 사용 온도 제한이 있습니다).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Return & Refund Info Strip */}
            <div className="bg-gray-100 border-t border-gray-200 py-6">
                <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
                    <p className="font-medium">반품 및 교환 주의사항</p>
                    <p className="mt-1">제품의 특성상(대형 화물) 단순 변심에 의한 교환/반품 시 높은 왕복 운임이 발생할 수 있습니다.</p>
                    <p>수령 직후 파손 여부를 반드시 기사님과 함께 확인해주시기 바랍니다.</p>
                </div>
            </div>
        </div>
    );
}
