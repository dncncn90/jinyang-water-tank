"use client";

import { Check, X, Truck, Package, Wrench, ArrowRight, Droplets, Tractor, Factory } from "lucide-react";

export default function VisualBundleGuide() {
    return (
        <div className="flex flex-col gap-12 mb-12">

            {/* 1. Comparison View (USP) */}
            <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Bad Case */}
                    <div className="bg-gray-100 p-8 relative grayscale opacity-90">
                        <div className="absolute top-4 left-4 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">타사 일반 택배</div>
                        <div className="h-48 flex items-center justify-center mb-6">
                            <div className="relative w-full max-w-xs aspect-video bg-gray-300 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                                <div className="space-y-2">
                                    <div className="flex gap-1 justify-center">
                                        <div className="w-2 h-16 bg-gray-500 rounded rotate-12"></div>
                                        <div className="w-2 h-16 bg-gray-500 rounded -rotate-6"></div>
                                        <div className="w-2 h-16 bg-gray-500 rounded rotate-45"></div>
                                    </div>
                                    <X className="w-12 h-12 text-gray-400 mx-auto" />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white/80 px-2 py-1 text-xs font-bold text-gray-600">절단된 1m 배관</span>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-500 mb-2 flex items-center gap-2">
                            <X className="w-6 h-6 text-red-500" />
                            택배 때문에 잘라 쓴다?
                        </h3>
                        <p className="text-gray-500">연결 부위마다 물 샐까 조마조마...<br />부속비용 추가 발생 + 누수 위험 🔺</p>
                    </div>

                    {/* Good Case */}
                    <div className="bg-blue-50 p-8 relative border-l-4 border-industrial-500">
                        <div className="absolute top-4 left-4 bg-industrial-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">진양 화물 직배송</div>
                        <div className="h-48 flex items-center justify-center mb-6">
                            <div className="relative w-full max-w-xs aspect-video bg-white rounded-lg flex items-end justify-center border border-blue-100 shadow-lg overflow-hidden pb-4">
                                <Truck className="w-full h-24 text-industrial-200 absolute bottom-0 left-0" strokeWidth={1} />
                                <div className="z-10 w-3/4 h-3 bg-industrial-500 rounded-full shadow-md mb-8 relative">
                                    {/* Pipe shine */}
                                    <div className="absolute top-[2px] left-2 right-2 h-[2px] bg-industrial-300 rounded-full"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center pt-4">
                                    <span className="bg-white/90 px-3 py-1 text-sm font-bold text-industrial-700 shadow-sm rounded border border-industrial-100">
                                        4m 원본 파이프 (Long Pipe)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-industrial-900 mb-2 flex items-center gap-2">
                            <Check className="w-6 h-6 text-green-500" />
                            화물 직배송이라 가능합니다!
                        </h3>
                        <p className="text-industrial-700">전문가용 원본 장배관(4m) 통째로 도착.<br /><strong>연결 없이 한 번에 시공 완료. 누수 걱정 제로!</strong></p>
                    </div>
                </div>
            </div>

            {/* 2. Assembly Guide (Exploded View) */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-bl-lg">ASSEMBLY GUIDE</div>
                <h3 className="text-center text-xl font-bold text-gray-900 mb-8">
                    "고민하지 마세요. 이 순서대로 돌려 끼우면 설치 끝!"
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative">
                    {/* Step 1: Tank */}
                    <div className="flex flex-col items-center group z-10 bg-white p-2">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-3 relative">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg"></div>
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                        </div>
                        <span className="font-bold text-sm text-gray-700">물탱크 타공</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

                    {/* Step 2: Tank Socket */}
                    <div className="flex flex-col items-center group z-10 bg-white p-2">
                        <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-yellow-200 shadow-lg mb-3 relative">
                            <div className="w-10 h-10 border-4 border-yellow-600 rounded-full"></div>
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                        </div>
                        <span className="font-bold text-sm text-gray-700">신주 탱크 소켓</span>
                        <span className="text-[10px] text-yellow-600 font-bold">황동(Brass) 재질</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

                    {/* Step 3: Teflon */}
                    <div className="flex flex-col items-center group z-10 bg-white p-2">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-200 mb-3 relative">
                            <div className="w-8 h-8 rounded-full border-4 border-white ring-4 ring-gray-300"></div>
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                        </div>
                        <span className="font-bold text-sm text-gray-700">테프론 테이프</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

                    {/* Step 4: Valve Socket */}
                    <div className="flex flex-col items-center group z-10 bg-white p-2">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-3 relative">
                            <div className="w-4 h-10 bg-gray-400 rounded"></div>
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                        </div>
                        <span className="font-bold text-sm text-gray-700">밸브 소켓</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

                    {/* Step 5: Ball Valve */}
                    <div className="flex flex-col items-center group z-10 bg-white p-2">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-4 border-red-100 shadow-lg mb-3 relative">
                            <div className="w-10 h-6 bg-red-500 rounded-t mb-1"></div>
                            <div className="w-8 h-8 bg-gray-400 rounded-b"></div>
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                        </div>
                        <span className="font-bold text-sm text-gray-700">PVC 볼밸브</span>
                    </div>

                    <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

                    {/* Step 6: Pipe */}
                    <div className="flex flex-col items-center group z-10 bg-white p-2">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-3 relative">
                            <div className="w-16 h-4 bg-gray-400 rounded-full"></div>
                            <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span>
                        </div>
                        <span className="font-bold text-sm text-gray-700">PVC 파이프 (4m)</span>
                    </div>

                    {/* Connecting Line (Mobile overlap fix) */}
                    <div className="absolute top-10 left-10 right-10 h-0.5 bg-gray-200 -z-0 hidden md:block"></div>
                </div>
            </div>

            {/* 3. Selection Guide (Grid Cards) */}
            <div>
                <h3 className="text-center text-xl font-bold text-gray-900 mb-8">
                    "내 물탱크에 맞는 배관 사이즈는?"
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* A. Home */}
                    <div className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-blue-200 hover:shadow-lg transition-all text-center">
                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                            <Droplets className="w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">가정 / 텃밭용</h4>
                        <p className="text-sm text-gray-500 mb-4 h-10">일반 수도 호스 연결,<br />식수대 사용</p>
                        <div className="bg-gray-100 rounded-lg py-2 font-bold text-gray-700">
                            15mm (16ø)
                        </div>
                    </div>

                    {/* B. Farm */}
                    <div className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-blue-200 hover:shadow-lg transition-all text-center relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 text-gray-600 text-[11px] font-bold px-3 py-1 rounded-full border border-gray-200">
                            Basic (농업 표준)
                        </div>
                        <div className="w-16 h-16 mx-auto bg-industrial-100 rounded-full flex items-center justify-center text-industrial-600 mb-4">
                            <Tractor className="w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">농업 / 비닐하우스</h4>
                        <p className="text-sm text-gray-500 mb-4 h-10">많은 물이 필요할 때,<br />양수기(펌프) 연결</p>
                        <div className="bg-gray-100 rounded-lg py-2 font-bold text-gray-700">
                            25mm (27ø)
                        </div>
                    </div>

                    {/* C. Factory */}
                    <div className="bg-white p-6 rounded-2xl border-2 border-transparent hover:border-blue-200 hover:shadow-lg transition-all text-center">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
                            <Factory className="w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 mb-2">공장 / 축사 청소</h4>
                        <p className="text-sm text-gray-500 mb-4 h-10">빠른 급배수,<br />청소용 대구경</p>
                        <div className="bg-gray-100 rounded-lg py-2 font-bold text-gray-700">
                            40mm ~ 100mm
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
