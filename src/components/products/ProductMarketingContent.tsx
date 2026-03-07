import React from 'react';
import { Shield, Check, Ruler, PenTool, Truck, Phone, AlertTriangle, Droplets, Sun, Hammer, Factory, Move } from 'lucide-react';
import Image from 'next/image';
import PERoundMarketing from './PERoundMarketing';
import PESquareMarketing from './PESquareMarketing';

interface ProductMarketingContentProps {
    category: string;
}

export default function ProductMarketingContent({ category }: ProductMarketingContentProps) {
    const isSquare = category === 'pe-square';
    const isRound = category === 'pe-round';

    if (!isSquare && !isRound) {
        return null;
    }

    if (isSquare) {
        return <PESquareMarketing />;
    }

    // 새롭게 디자인된 PE 원형 물탱크 상세페이지 컴포넌트 출력
    if (isRound) {
        return <PERoundMarketing />;
    }

    return (
        <div className="space-y-16 py-8 text-gray-800">

            {/* Section 1: Hero & Intro (메인 훅) */}
            <section className="relative w-full rounded-3xl overflow-hidden bg-industrial-900 text-white min-h-[300px] flex items-center shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-industrial-900 to-industrial-800 opacity-90"></div>
                {/* Background Pattern for dynamic feel */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="relative z-10 px-8 py-12 md:px-12 max-w-4xl">
                    <span className="inline-block px-3 py-1 bg-industrial-500/30 text-industrial-300 text-xs font-bold tracking-widest rounded-full mb-4 uppercase">Premium Quality</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight font-['Pretendard']">
                        대한민국 대표 물탱크,<br />
                        <span className="text-industrial-400">진양건재</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl leading-relaxed break-keep">
                        합리적인 가격과 최고의 품질.<br />
                        농가부터 산업현장까지 믿고 쓰는 1등 물탱크입니다.
                    </p>
                </div>
            </section>

            {/* Section 2: Trust Badges (인증 마크 강조) */}
            <section className="bg-gray-50 border border-gray-100 rounded-3xl p-8 text-center flex flex-col gap-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border-4 border-blue-50">
                            <Shield className="w-10 h-10 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2 tracking-tight">KS 마크 획득</h3>
                        <p className="text-gray-600 font-medium">산업표준화법에 의한<br />철저한 품질 검증 완료</p>
                    </div>
                    <div className="hidden md:block w-px h-24 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border-4 border-green-50">
                            <Droplets className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2 tracking-tight">KC 마크 획득</h3>
                        <p className="text-gray-600 font-medium">수도법 위생안전기준을<br />통과한 안전한 제품</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 mt-2 max-w-4xl mx-auto w-full">
                    <p className="text-sm font-bold text-gray-500 mb-4 tracking-widest uppercase">제품 인증서 및 시험성적서</p>
                    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white">
                        <Image
                            src="/images/certificates-new.jpg"
                            alt="KS, KC, ISO 제품인증서 및 시험성적서"
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                </div>
            </section>

            {/* Section 3: 6 Point USPs (제품 특장점) */}
            <section>
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">왜 진양건재 물탱크인가요?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <UspCard
                        icon={<PenTool className="w-6 h-6 text-industrial-600" />}
                        title="간편·친환경"
                        desc="경제적인 비용과 간편한 시공, 그리고 안심할 수 있는 무공해 제품입니다."
                    />
                    <UspCard
                        icon={<Sun className="w-6 h-6 text-industrial-600" />}
                        title="미생물 완벽 차단"
                        desc="자외선을 완벽하게 막아주어 내부 이끼 등 미생물 발생을 철저히 억제합니다."
                    />
                    <UspCard
                        icon={<Hammer className="w-6 h-6 text-industrial-600" />}
                        title="강력한 내구성"
                        desc="뛰어난 내한성 및 내충격성으로 어떠한 환경에서도 형태 변형이 최소화됩니다."
                    />
                    <UspCard
                        icon={<Droplets className="w-6 h-6 text-industrial-600" />}
                        title="누수 Zero"
                        desc="O-링, 실리콘, 마개 패킹을 통한 정밀한 설계로 완벽한 방수를 자랑합니다."
                    />
                    <UspCard
                        icon={<Factory className="w-6 h-6 text-industrial-600" />}
                        title="산업/농업 최적화"
                        desc="농약 희석 작업은 물론 각종 약품 및 식품 저장 용도로 탁월합니다."
                    />
                    <UspCard
                        icon={<Move className="w-6 h-6 text-industrial-600" />}
                        title="다목적 활용"
                        desc="가정용, 아파트, 농가, 관공서 등 사이즈에 맞게 어디든 사용 가능합니다."
                    />
                </div>
            </section>

            {/* Section 4: Size & Spec (규격 가이드) */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Ruler className="w-6 h-6 text-industrial-600" />
                    <h3 className="text-2xl font-bold text-gray-900">규격 가이드 (Size & Spec)</h3>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex gap-3 items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-red-700 font-bold whitespace-pre-line">
                        ⚠️ 주의: 제품의 특성상 3% 내외의 규격 오차가 발생할 수 있습니다!
                        {"\n"}<span className="text-red-600 font-medium">설치할 곳의 여유 공간(높이 및 가로/세로 폭)을 꼭 넉넉하게 확인해 주세요.</span>
                    </p>
                </div>

                <div className="overflow-x-auto bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100">
                    <table className="w-full text-center whitespace-nowrap">
                        <thead className="bg-gray-50/80 text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                                <th className="py-4 px-6 text-left">용량 (모델명)</th>
                                <th className="py-4 px-6">전고(H)</th>
                                <th className="py-4 px-6">{isSquare ? "가로(W)" : "외경(D)"}</th>
                                <th className="py-4 px-6">{isSquare ? "세로(L)" : "수면고(h)"}</th>
                                <th className="py-4 px-6">맨홀지름</th>
                                <th className="py-4 px-6">{isSquare ? "용도 추천" : "비고"}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-gray-600 bg-white">
                            {isSquare && (
                                <>
                                    <TableRow name="200L (200M)" h="560" w="700" l="610" m="380" note="소형/가정용" />
                                    <TableRow name="400L (400M)" h="660" w="920" l="830" m="380" note="" />
                                    <TableRow name="600L (600M)" h="720" w="910" l="1,060" m="380" note="" />
                                    <TableRow name="1톤 (1,000M)" h="913" w="1,140" l="1,290" m="380" note="★실내 인기 1위" highlight />
                                    <TableRow name="2톤 (2,000M)" h="1,190" w="1,420" l="1,480" m="380" note="대용량 확보" />
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 5: Installation Guide (Do's & Don'ts) */}
            <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 space-y-6">
                        <div className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">필수 확인</div>
                        <h3 className="text-2xl font-bold text-gray-900">설치 가이드 (Installation Guide)</h3>
                        <p className="text-gray-600 font-medium whitespace-pre-line">
                            하자 없이 오래 사용하는 물탱크 설치법!<br />다음 주의사항을 반드시 지켜주세요.
                        </p>

                        <div className="space-y-5 mt-6">
                            <GuideItem
                                title="1. 기초 평탄화 필수 [O]"
                                desc="콘크리트, 철제/목재 베이스 설치 시 물탱크 밑면 전체가 바닥에 완벽히 밀착되도록 수평을 유지해야 합니다. 하중이 쏠릴 경우 파손의 주원인이 됩니다."
                            />
                            <GuideItem
                                title="2. 배관 연결 시 주의 (플렉시블 조인트) [O]"
                                desc="외부 충격 흡수와 배관 파손 방지를 위해 반드시 '플렉시블 조인트(Flexible Joint)'를 사용하고, 별도의 배관 지지대를 설치하세요."
                            />
                            <GuideItem
                                title="3. 플랜지(FLANGE) 수평 체결 [O]"
                                desc="플랜지 연결 시 어긋남 없이 상하 수평을 정확히 맞춰 접속해야 누수를 방지할 수 있습니다."
                            />
                            <GuideItem
                                title="4. 누수 테스트 진행 [O]"
                                desc="설치 직후 바로 사용하지 마시고, 내부에 맑은 물(정수)을 가득 채워 피팅 주변 등 누수 여부를 미리 꼭 확인하세요."
                            />
                        </div>
                    </div>

                    <div className="flex-1 relative w-full flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 h-full min-h-[400px]">
                        {/* Interactive or illustrative visual could go here, for now keeping it focused on the PE fitting image as requested */}
                        <h4 className="font-bold text-gray-900 mb-4 text-center">PE제작피팅 (기본 부속)</h4>
                        <div className="relative w-full max-w-[280px] aspect-square rounded-2xl overflow-hidden bg-white shadow-sm flex items-center justify-center border border-gray-100">
                            <img
                                src="/images/products/pe-fitting.jpg"
                                alt="PE 제작 피팅"
                                className="w-[90%] h-[90%] object-contain mix-blend-multiply transition-transform hover:scale-110 duration-500"
                                style={{
                                    // Using css mix-blend-mode to remove the light background (effectively dropping the green mat context in some cases)
                                    // Alternatively, just crop it down nicely. Since it has a green background, multiply won't make the green transparent natively 
                                    // but it provides an integrated look. To make it perfect we use a soft clip-path.
                                    clipPath: 'circle(48% at 50% 50%)'
                                }}
                            />
                        </div>
                        <p className="mt-4 text-sm text-center text-gray-500 font-medium">깔끔하게 타공하여 부속 연결이 가능합니다.</p>
                    </div>
                </div>
            </section>

            {/* Section 6: Custom Order & CS (맞춤 제작 및 문의) */}
            <section className="bg-gradient-to-br from-industrial-900 to-gray-900 text-white p-8 md:p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
                    <Phone className="w-48 h-48" />
                </div>
                <div className="relative z-10 space-y-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
                            맞춤 제작 및 고객센터 <span className="bg-industrial-500 text-xs px-2 py-1 rounded-md">B2B 대환영</span>
                        </h3>
                        <p className="text-gray-300 text-lg">
                            원형 물탱크 외에도 <strong className="text-white">FRP, SMC</strong> 등 고객님이 원하시는 형태와 용량의 주문 제작이 가능합니다. 언제든 편하게 문의주세요!
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl flex flex-col md:flex-row gap-6 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/20">
                        <div className="flex-1 space-y-2">
                            <h4 className="text-sm text-gray-400 font-medium mb-1">전화 및 팩스</h4>
                            <p className="text-xl font-bold flex items-center gap-2"><Phone className="w-5 h-5 text-industrial-400" /> TEL: 031-236-8227</p>
                            <p className="text-gray-300 font-medium">FAX: 031-237-4435</p>
                        </div>
                        <div className="flex-1 space-y-2 pt-6 md:pt-0 md:pl-12">
                            <h4 className="text-sm text-gray-400 font-medium mb-1">온라인 문의</h4>
                            <p className="text-lg font-bold">E-mail: jy2368227@naver.com</p>
                            <p className="text-gray-300 font-medium">스마트 견적 시스템 24시간 운영</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 7: Policy (배송 및 교환/반품) */}
            <section className="bg-gray-50 border border-gray-200 p-8 rounded-2xl text-sm text-gray-600 space-y-8">
                <h4 className="text-gray-900 font-bold text-xl flex items-center gap-2 border-b border-gray-200 pb-4">
                    <Truck className="w-6 h-6 text-industrial-600" /> 배송 및 교환/반품 안내
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Delivery Info */}
                    <div className="space-y-4">
                        <h5 className="font-bold text-gray-900 text-base">배송 정보</h5>
                        <ul className="space-y-3">
                            <li className="flex gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                <span className="text-blue-600 font-black shrink-0 mt-0.5"><Truck className="w-4 h-4" /></span>
                                <span className="text-sm font-medium text-blue-900"><strong className="font-extrabold">단골 우대 및 대량 구매:</strong> 건설 현장 및 설비 업체 대량 구매 시, 거리에 상관없이 <strong>진양건재만의 전용 화물 루트로 최저가 운임을 보장</strong>합니다.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-industrial-600 font-black shrink-0">•</span>
                                <span><strong className="text-gray-800">원칙:</strong> 화물/대신화물/직송화물을 이용하여 배송되며, 물탱크 특성상 <strong>전 제품 착불 배송</strong>을 원칙으로 합니다.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-industrial-600 font-black shrink-0">•</span>
                                <span><strong className="text-gray-800">배송비 주의:</strong> 부피가 커서 지역별 화물비 편차가 심합니다. 대형 제품은 구매 전 반드시 <strong>사전 운임 문의</strong>를 부탁드립니다.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-industrial-600 font-black shrink-0 mt-0.5"><Truck className="w-4 h-4 text-orange-500" /></span>
                                <span><strong className="text-gray-800">수원 인근 직배송:</strong> 진양건재는 <strong className="text-orange-600">수원시 팔달구 인계동(효원로 209-5)</strong>에 위치하여, 수원 전 지역 및 인근 도시(화성, 용인 등)는 신속하고 저렴한 직접 배송이 가능합니다.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-industrial-600 font-black shrink-0">•</span>
                                <span><strong className="text-gray-800">배송 기간:</strong> 평일 기준 1~2일 소요됩니다. (오후 1시 이전 입금 확인 시, 1,000L 이상 단일 제품 당일 출고 원칙)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Refund Info */}
                    <div className="space-y-4">
                        <h5 className="font-bold text-gray-900 text-base">교환 및 환불 정책</h5>
                        <ul className="space-y-3">
                            <li className="flex gap-2">
                                <span className="text-industrial-600 font-black shrink-0">•</span>
                                <span>제품 자체의 심각한 불량 또는 오배송 시 <strong>100% 무상 교환 처리</strong>해 드립니다.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-industrial-600 font-black shrink-0">•</span>
                                <span>고객 <strong>단순 변심 및 사이즈 오인</strong>으로 인한 교환/반품 시 발생하는 구매 왕복 화물비는 전액 고객님 부담입니다. (구매 전 규격표 확인 필수)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="text-industrial-600 font-black shrink-0">•</span>
                                <span className="text-red-600 font-medium">사용, 오염, 파손, 타공 등 설치가 진행되어 상품 가치가 훼손된 경우에는 어떠한 사유로도 반품 및 교환이불가합니다.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

        </div>
    );
}

// Helper Components

function UspCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all border border-gray-100 hover:border-industrial-200 group">
            <div className="w-12 h-12 bg-industrial-50 group-hover:bg-industrial-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                <div className="text-industrial-600 group-hover:text-white transition-colors">{icon}</div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 truncate">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed min-h-[40px] break-keep">{desc}</p>
        </div>
    );
}

function GuideItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="bg-white p-4 justify-start rounded-xl border border-gray-100 flex gap-4">
            <div className="w-6 h-6 mt-0.5 shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-blue-600 font-black" />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

function TableRow(props: any) {
    const { name, h, w, d, l, wa, m, note, highlight } = props;
    return (
        <tr className={`border-b border-gray-100 hover:bg-gray-50/80 transition-colors ${highlight ? 'bg-blue-50/30' : ''}`}>
            <td className="py-4 px-6 text-left font-bold text-gray-900">{name}</td>
            <td className="py-4 px-6">{h}mm</td>
            <td className="py-4 px-6">{w || d}mm</td>
            <td className="py-4 px-6">{l || wa}mm</td>
            <td className="py-4 px-6 text-gray-500 text-sm">Ø{m}</td>
            <td className="py-4 px-6">
                {note && <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${highlight ? 'bg-industrial-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{note}</span>}
            </td>
        </tr>
    );
}
