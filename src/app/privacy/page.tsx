'use client';

export default function PrivacyPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">개인정보처리방침</h1>

                    <div className="prose prose-sm max-w-none text-gray-600 space-y-8">
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">1. 개인정보의 처리 목적</h2>
                            <p>
                                진양건재(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다.
                                처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며
                                이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>제품 견적 상담 및 주문 처리</li>
                                <li>고객 문의 응대 및 A/S 접수</li>
                                <li>마케팅 및 광고 활용 (동의 시)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">2. 수집하는 개인정보 항목</h2>
                            <p>회사는 진양스마트견적 상담 및 해피콜 진행을 위해 아래와 같은 개인정보를 수집합니다.</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li><strong>수집항목:</strong> 이름, 연락처(휴대전화번호), 주소(배송지), 상담 내용, 견적 요청 상세 내역</li>
                                <li><strong>수집목적:</strong> 정확한 견적 산출, 제품 배송, 해피콜(주문 확정 상담)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">3. 개인정보의 보유 및 이용기간</h2>
                            <p>
                                회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li><strong>견적 상담 및 주문 기록:</strong> 3년 (전자상거래법에 의거 소비자 불만 또는 분쟁 처리에 관한 기록)</li>
                                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">4. 개인정보의 파기절차 및 방법</h2>
                            <p>
                                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-2">5. 개인정보 보호책임자</h2>
                            <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                            <div className="bg-gray-50 p-4 rounded-lg mt-2">
                                <ul className="space-y-1 text-sm">
                                    <li><strong>책임자:</strong> 진양건재 관리팀</li>
                                    <li><strong>연락처:</strong> 031-236-8227</li>
                                    <li><strong>이메일:</strong> jy2368227@naver.com</li>
                                </ul>
                            </div>
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
