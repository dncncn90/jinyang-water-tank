'use client';

export default function TermsPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">이용약관</h1>

                    <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">제1조 (목적)</h2>
                            <p>
                                본 약관은 진양건재(이하 "회사")가 운영하는 웹사이트 및 관련 제반 서비스(이하 "서비스")를 이용함에 있어
                                회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">제2조 (정의)</h2>
                            <ol className="list-decimal pl-5 space-y-1">
                                <li>"서비스"란 회사가 제공하는 모든 웹사이트 및 그와 관련된 제반 서비스를 의미합니다.</li>
                                <li>"이용자"란 회사 웹사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">제3조 (서비스의 제공 및 변경)</h2>
                            <p>
                                회사는 다음과 같은 업무를 수행합니다:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>건축자재 및 관련 상품에 대한 정보 제공</li>
                                <li>견적 상담 및 주문 중개</li>
                                <li>기타 회사가 정하는 업무</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">제4조 (면책조항)</h2>
                            <p>
                                회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
                                또한, 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">제5조 (교환/반품/환불 정책)</h2>
                            <div className="bg-red-50 border border-red-100 p-4 rounded-lg space-y-3">
                                <p className="font-bold text-red-700">
                                    [필독] 물탱크 및 관련 제품 반품 규정
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-red-800">
                                    <li>
                                        <strong>단순 변심:</strong> 제품 하자 외 단순 변심에 의한 반품 시,
                                        <span className="underline decoration-red-500 decoration-2 underline-offset-2 ml-1">왕복 화물비 및 상하차 비용은 전액 고객 부담입니다.</span>
                                        (부피가 커서 배송비가 매우 비쌀 수 있습니다.)
                                    </li>
                                    <li>
                                        <strong>주문 제작품:</strong> 타공(구멍 뚫기)이나 특수 규격 등으로 제작된 제품은
                                        <span className="font-bold">절대 반품이 불가합니다.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">제6조 (분쟁해결)</h2>
                            <p>
                                회사와 이용자 간에 발생한 분쟁에 대해서는 관계 법령 및 상관례에 따르며, 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 전속 관할법원으로 합니다.
                            </p>
                        </section>

                        <div className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-500">
                            <p>공고일자: 2024년 1월 1일</p>
                            <p>시행일자: 2024년 1월 1일</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
