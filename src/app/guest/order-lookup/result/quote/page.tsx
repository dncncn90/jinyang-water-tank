'use client';

import Link from 'next/link';

export default function DetailedQuotePage() {
    return (
        <div className="bg-slate-50 dark:bg-slate-900 font-sans min-h-screen flex flex-col items-center">
            {/* Main Content Area */}
            <main className="flex-grow flex justify-center py-12 px-4 sm:px-6 w-full">
                {/* A4 Paper Container */}
                <div className="print:shadow-none print:m-0 print:p-0 print:w-full print:max-w-none bg-white dark:bg-slate-800 w-full max-w-[900px] shadow-lg rounded-sm p-10 sm:p-14 border border-slate-100 dark:border-slate-700 flex flex-col gap-8 relative overflow-hidden">
                    {/* Watermark / Background decoration (Abstract) */}
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none select-none overflow-hidden h-full w-full">
                        <svg className="w-full h-full text-slate-900 dark:text-white" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54.5,19.1C51.6,30.2,41.8,40.3,31.2,48.1C20.6,55.9,9.2,61.4,-0.6,62.2C-10.4,63,-19.2,59.1,-28.6,52.8C-38,46.5,-48,37.8,-56.3,26.8C-64.6,15.8,-71.2,2.5,-68.9,-9.4C-66.6,-21.3,-55.4,-31.8,-43.8,-41.2C-32.2,-50.6,-20.2,-58.9,-6.2,-50.4L0,-42Z" fill="currentColor" transform="translate(100 100)"></path>
                        </svg>
                    </div>

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-industrial-900 dark:border-industrial-700 pb-6 relative z-10">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-industrial-600">
                                <div className="size-8">
                                    <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                                        <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Jinyang PVC</span>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                <p><span className="font-semibold w-20 inline-block">주소:</span> 서울특별시 강남구 테헤란로 123, 진양빌딩 5층</p>
                                <p><span className="font-semibold w-20 inline-block">사업자번호:</span> 123-45-67890</p>
                                <p><span className="font-semibold w-20 inline-block">대표전화:</span> 02-1234-5678</p>
                                <p><span className="font-semibold w-20 inline-block">담당자:</span> 김영업 팀장 (sales@jinyang.com)</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-2 text-right">
                            <h1 className="text-4xl font-extrabold text-industrial-900 dark:text-sky-300 mb-2">견적서 (Quotation)</h1>
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-100 dark:border-slate-600 w-full md:w-auto text-left md:text-right">
                                <p className="text-base text-slate-900 dark:text-white font-medium mb-1">
                                    <span className="text-slate-500 mr-2 font-normal">귀하:</span>
                                    김고객 님 (010-1234-5678)
                                </p>
                                <p className="text-base text-slate-900 dark:text-white font-medium">
                                    <span className="text-slate-500 mr-2 font-normal">발행일:</span>
                                    2024년 10월 20일
                                </p>
                                <p className="text-base text-slate-900 dark:text-white font-medium mt-1">
                                    <span className="text-slate-500 mr-2 font-normal">유효기간:</span>
                                    발행일로부터 14일
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Project Title Box */}
                    <div className="bg-industrial-900/5 dark:bg-industrial-900/20 border-l-4 border-industrial-900 dark:border-industrial-500 p-5 rounded-r-md">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 uppercase tracking-wider">Project Name</p>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">산업용 대형 물탱크 10톤 (SMC) 외 부속자재</h2>
                    </div>

                    {/* Itemized Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                            <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-700 border-t-2 border-industrial-900 dark:border-industrial-500">
                                <tr>
                                    <th className="px-6 py-4 rounded-tl-lg font-semibold text-industrial-900 dark:text-white" scope="col">품목 (Item)</th>
                                    <th className="px-6 py-4 font-semibold text-industrial-900 dark:text-white" scope="col">규격 (Spec)</th>
                                    <th className="px-6 py-4 text-center font-semibold text-industrial-900 dark:text-white" scope="col">수량 (Qty)</th>
                                    <th className="px-6 py-4 text-right font-semibold text-industrial-900 dark:text-white" scope="col">단가 (Unit Price)</th>
                                    <th className="px-6 py-4 rounded-tr-lg text-right font-semibold text-industrial-900 dark:text-white" scope="col">공급가액 (Amount)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700">
                                <tr className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">SMC 물탱크 본체</td>
                                    <td className="px-6 py-4">10 Ton (3000x3000x1500)</td>
                                    <td className="px-6 py-4 text-center">1</td>
                                    <td className="px-6 py-4 text-right tabular-nums">2,500,000</td>
                                    <td className="px-6 py-4 text-right tabular-nums font-semibold text-slate-900 dark:text-white">2,500,000</td>
                                </tr>
                                <tr className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">내부식성 배관 및 부속</td>
                                    <td className="px-6 py-4">PVC/STS304 Mixed</td>
                                    <td className="px-6 py-4 text-center">1 Set</td>
                                    <td className="px-6 py-4 text-right tabular-nums">350,000</td>
                                    <td className="px-6 py-4 text-right tabular-nums font-semibold text-slate-900 dark:text-white">350,000</td>
                                </tr>
                                <tr className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">운반비</td>
                                    <td className="px-6 py-4">서울/경기 지역 (5톤 화물)</td>
                                    <td className="px-6 py-4 text-center">1</td>
                                    <td className="px-6 py-4 text-right tabular-nums">150,000</td>
                                    <td className="px-6 py-4 text-right tabular-nums font-semibold text-slate-900 dark:text-white">150,000</td>
                                </tr>
                                <tr className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap">현장 설치 및 시운전비</td>
                                    <td className="px-6 py-4">전문 기술인력 2인</td>
                                    <td className="px-6 py-4 text-center">1</td>
                                    <td className="px-6 py-4 text-right tabular-nums">181,818</td>
                                    <td className="px-6 py-4 text-right tabular-nums font-semibold text-slate-900 dark:text-white">181,818</td>
                                </tr>
                                <tr className="bg-white dark:bg-slate-800 h-16">
                                    <td className="px-6 py-4"></td><td className="px-6 py-4"></td><td className="px-6 py-4"></td><td className="px-6 py-4"></td><td className="px-6 py-4"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Summary & Totals */}
                    <div className="flex flex-col md:flex-row justify-end mt-4">
                        <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-700/30 p-6 rounded-lg border border-slate-100 dark:border-slate-700">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-slate-600 dark:text-slate-300 font-medium">총 공급가액 (Subtotal)</span>
                                <span className="text-slate-900 dark:text-white font-semibold tabular-nums">3,181,818 원</span>
                            </div>
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200 dark:border-slate-600">
                                <span className="text-slate-600 dark:text-slate-300 font-medium">부가가치세 (VAT 10%)</span>
                                <span className="text-slate-900 dark:text-white font-semibold tabular-nums">318,182 원</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg font-bold text-industrial-900 dark:text-sky-300">최종 결제 금액</span>
                                <span className="text-2xl font-extrabold text-industrial-900 dark:text-sky-400 tabular-nums">3,500,000 원</span>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions Footer */}
                    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">결제 계좌 안내</h4>
                            <p className="mb-1">예금주: (주)진양피브이씨</p>
                            <p className="mb-1">은행명: 신한은행 110-000-000000</p>
                            <p className="mt-2 text-slate-400">* 세금계산서는 입금 확인 후 즉시 발행됩니다.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase">유의사항 (Terms)</h4>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>본 견적서는 발행일로부터 14일간 유효합니다.</li>
                                <li>납기일은 발주 및 입금 확인 후 7일 이내입니다. (공휴일 제외)</li>
                                <li>설치 현장의 상황에 따라 추가 비용이 발생할 수 있습니다.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="hidden print:flex justify-end mt-12 pt-12">
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-900 mb-8">(인)</p>
                            <div className="border-t border-slate-400 w-32"></div>
                            <p className="text-xs text-slate-500 mt-1">Authorized Signature</p>
                        </div>
                    </div>

                </div>
            </main>

            {/* Sticky Action Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-xl py-4 px-6 z-50 print:hidden">
                <div className="max-w-[900px] mx-auto flex items-center justify-between gap-4">
                    <div className="hidden md:flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Total Amount</span>
                        <span className="text-xl font-bold text-industrial-900 dark:text-sky-400 tabular-nums">3,500,000 원</span>
                    </div>
                    <div className="flex flex-1 md:flex-none gap-3 justify-end">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">print</span>
                            <span>인쇄하기</span>
                        </button>
                        <Link
                            href="/checkout"
                            className="flex flex-1 md:flex-none items-center justify-center gap-2 px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all transform active:scale-[0.98]"
                        >
                            <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                            <span>결제 및 발주 진행하기</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom spacing for sticky footer */}
            <div className="h-24 print:hidden"></div>
        </div>
    );
}
