'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [memberType, setMemberType] = useState<'individual' | 'business'>('individual');

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-28">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    회원가입
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    진양건재에 오신 것을 환영합니다
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">

                    {/* Member Type Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">회원 유형 수정</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setMemberType('individual')}
                                className={"py-3 px-4 rounded-xl border-2 font-bold text-sm transition-colors " + (memberType === 'individual' ? 'border-industrial-600 bg-industrial-50 text-industrial-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}
                            >
                                일반 회원
                            </button>
                            <button
                                type="button"
                                onClick={() => setMemberType('business')}
                                className={"py-3 px-4 rounded-xl border-2 font-bold text-sm transition-colors " + (memberType === 'business' ? 'border-industrial-600 bg-industrial-50 text-industrial-700' : 'border-gray-200 text-gray-500 hover:border-gray-300')}
                            >
                                사업자 회원
                            </button>
                        </div>
                    </div>

                    <form className="space-y-6" action="#" method="POST" onSubmit={(e) => { e.preventDefault(); alert('회원가입 완료(데모)'); window.location.href = '/'; }}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                이름 (담당자명)
                            </label>
                            <div className="mt-1">
                                <input id="name" name="name" type="text" required
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-industrial-500 focus:border-industrial-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                연락처
                            </label>
                            <div className="mt-1">
                                <input id="phone" name="phone" type="tel" required
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-industrial-500 focus:border-industrial-500 sm:text-sm"
                                    placeholder="010-0000-0000"
                                />
                            </div>
                        </div>

                        {memberType === 'business' && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                        상호명 (법인명)
                                    </label>
                                    <div className="mt-1">
                                        <input id="companyName" name="companyName" type="text" required
                                            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-industrial-500 focus:border-industrial-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">
                                        사업자 등록번호
                                    </label>
                                    <div className="mt-1">
                                        <input id="businessNumber" name="businessNumber" type="text" required
                                            className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-industrial-500 focus:border-industrial-500 sm:text-sm"
                                            placeholder="000-00-00000"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-gray-500">* B2B 단가 적용 및 세금계산서 발행을 위해 정확히 입력해주세요.</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-industrial-600 hover:bg-industrial-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-500 transition-colors"
                            >
                                가입하기
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    또는 간편하게 시작하기
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => { alert('카카오 로그인 연동 준비중입니다.'); }}
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-[#000000] bg-[#FEE500] hover:bg-[#FDD800] focus:outline-none transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3C6.477 3 2 6.545 2 10.916c0 2.822 1.83 5.3 4.618 6.702-.15.539-.539 2.016-.615 2.327-.098.398.14.39.297.288.121-.078 1.94-1.33 2.73-1.895A10.669 10.669 10.669 0 0012 18.832c5.522 0 10-3.545 10-7.916S17.522 3 12 3z" />
                                </svg>
                                카카오로 1초 시작하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
