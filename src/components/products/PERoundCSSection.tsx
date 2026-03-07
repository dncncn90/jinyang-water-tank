import React from 'react';
import { Phone, Mail, FileText, CheckCircle2, Truck } from 'lucide-react';

export default function PERoundCSSection() {
    return (
        <div className="w-full bg-[#f4f8fc] px-4 sm:px-6 lg:px-12 py-12 -mt-1 relative z-10 border-t border-[#e2ecf5] overflow-hidden">
            {/* 맞춤 제작 및 고객센터 */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] mb-8 border border-white/80 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003366] tracking-tight">맞춤 제작 및 고객센터</h2>
                        <span className="bg-[#007ade] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">B2B 대환영</span>
                    </div>

                    <p className="text-[#333333] text-lg sm:text-xl mb-10 leading-relaxed font-semibold">
                        원형 물탱크 외에도 <span className="text-[#003366] font-black">FRP, SMC</span> 등 고객님이 원하시는 형태와 용량의 주문 제작이 가능합니다. 언제든 편하게 문의주세요!
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 pb-2">
                        {/* Contact Box (Phone) */}
                        <div className="bg-[#f8fafd] border-2 border-[#d5e2f0] rounded-2xl p-5 sm:p-8 flex flex-col group hover:border-[#003366] transition-colors duration-300">
                            <div className="text-sm text-[#555555] mb-2 font-bold">전화 및 팩스</div>
                            <div className="flex items-center gap-2 mb-3 text-[#003366]">
                                <Phone className="w-5 h-5 shrink-0" />
                                <a href="tel:031-236-8227" className="text-xl sm:text-2xl font-black tracking-tight hover:underline break-all">TEL: 031-236-8227</a>
                            </div>
                            <div className="text-[#666666] font-bold text-base pl-7">
                                FAX: 031-237-4435
                            </div>
                        </div>

                        {/* Contact Box (Online) */}
                        <div className="bg-[#f8fafd] border-2 border-[#d5e2f0] rounded-2xl p-5 sm:p-8 flex flex-col justify-center group hover:border-[#003366] transition-colors duration-300">
                            <div className="text-sm text-[#555555] mb-2 font-bold">온라인 문의</div>
                            <div className="flex items-start gap-2 mb-3 text-[#333333]">
                                <Mail className="w-5 h-5 text-[#003366] shrink-0 mt-0.5" />
                                <a href="mailto:jy2368227@naver.com" className="text-sm sm:text-base font-bold break-all hover:underline">jy2368227@naver.com</a>
                            </div>
                            <div className="flex items-center gap-2 text-[#666666] font-bold text-sm sm:text-base">
                                <FileText className="w-5 h-5 text-[#003366] shrink-0" />
                                <span className="break-keep">스마트 견적 시스템 24시간 운영</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 배송 및 교환/반품 안내 */}
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white/80">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003366] tracking-tight mb-10 pb-6 border-b border-[#e2ecf5]">배송 및 교환/반품 안내</h2>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <h3 className="text-xl font-black text-[#111111] mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-[#003366] rounded-full inline-block"></span>
                            배송 정보
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 shadow-sm">
                                <Truck className="w-8 h-8 text-[#003366] shrink-0 mt-1" />
                                <div>
                                    <strong className="font-extrabold text-[#111111] text-lg block mb-1">단골 우대 및 대량 구매</strong>
                                    <div className="text-[#333333] leading-relaxed break-keep font-medium">건설 현장 및 설비 업체 대량 구매 시, 거리에 상관없이 <span className="text-[#003366] font-extrabold underline underline-offset-4 decoration-[#003366]/30">진양건재만의 전용 화물 루트로 최저가 운임을 보장</span>합니다.</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-[#333333] text-lg leading-relaxed font-medium">
                                <CheckCircle2 className="w-6 h-6 text-[#003366] shrink-0 fill-[#003366]/10" />
                                <div><strong className="font-extrabold text-[#111111]">원칙:</strong> 화물/대신화물/직송화물을 이용하여 배송되며, 물탱크 특성상 전 제품 착불 배송을 원칙으로 합니다.</div>
                            </li>
                            <li className="flex items-start gap-3 text-[#333333] text-lg leading-relaxed font-medium">
                                <CheckCircle2 className="w-6 h-6 text-[#003366] shrink-0 fill-[#003366]/10" />
                                <div><strong className="font-extrabold text-[#111111]">배송비 주의:</strong> 부피가 커서 지역별 화물비 편차가 심합니다. 대형 제품은 구매 전 반드시 사전 운임 문의를 부탁드립니다.</div>
                            </li>
                            <li className="flex items-start gap-3 text-[#333333] text-lg leading-relaxed font-medium">
                                <Truck className="w-6 h-6 text-orange-600 shrink-0" />
                                <div><strong className="font-extrabold text-[#111111]">수원 인근 직배송:</strong> 진양건재는 <strong className="text-orange-600">수원시 팔달구 인계동(효원로 209-5)</strong>에 위치하여, 수원 전 지역 및 인근 도시(화성, 용인 등)는 신속하고 저렴한 직접 배송이 가능합니다.</div>
                            </li>
                            <li className="flex items-start gap-3 text-[#333333] text-lg leading-relaxed font-medium">
                                <CheckCircle2 className="w-6 h-6 text-[#003366] shrink-0 fill-[#003366]/10" />
                                <div><strong className="font-extrabold text-[#111111]">배송 기간:</strong> 평일 기준 1~2일 소요됩니다. (오후 1시 이전 입금 확인 시, 1,000L 이상 단일 제품 당일 출고 원칙)</div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-[#111111] mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-[#003366] rounded-full inline-block"></span>
                            교환 및 환불 정책
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3 text-[#333333] text-lg leading-relaxed font-medium">
                                <CheckCircle2 className="w-6 h-6 text-[#003366] shrink-0 fill-[#003366]/10" />
                                <div>제품 자체의 심각한 불량 또는 오배송 시 <strong className="font-extrabold text-[#111111]">100% 무상 교환</strong> 처리해 드립니다.</div>
                            </li>
                            <li className="flex items-start gap-3 text-[#333333] text-lg leading-relaxed font-medium">
                                <CheckCircle2 className="w-6 h-6 text-[#003366] shrink-0 fill-[#003366]/10" />
                                <div>고객 단순 변심 및 사이즈 오인으로 인한 교환/반품 시 발생하는 구매 왕복 화물비는 전액 고객님 부담입니다. (구매 전 규격표 확인 필수)</div>
                            </li>
                            <li className="flex items-start gap-3 text-red-600 font-bold text-base leading-relaxed mt-4 bg-red-50 p-4 rounded-xl border border-red-100 break-keep">
                                <div>사용, 오염, 파손, 타공 등 설치가 진행되어 상품 가치가 훼손된 경우에는 어떠한 사유로도 반품 및 교환이 불가합니다.</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
