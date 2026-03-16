'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
    const router = useRouter();
    const supabase = createClient();
    const [memberType, setMemberType] = useState<'individual' | 'business'>('individual');

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleOAuthLogin = async (provider: 'kakao' | 'naver') => {
        setLoading(true);
        setErrorMsg('');
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider as any,
                options: {
                    redirectTo: `${window.location.origin}/api/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setErrorMsg(err.message || '소셜 계정 연동 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (password !== passwordConfirm) {
            setErrorMsg('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (password.length < 6) {
            setErrorMsg('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        setLoading(true);

        try {
            // 1. Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) {
                console.error("Auth error:", authError);
                throw new Error(authError.message === 'User already registered' ? '이미 가입된 이메일입니다.' : '회원가입에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
            }

            if (!authData.user) {
                throw new Error('회원가입 중 오류가 발생했습니다.');
            }

            // 2. Insert into public.profiles
            const profileData = {
                id: authData.user.id,
                contact_name: name,
                contact_phone: phone,
                ...(memberType === 'business' ? {
                    business_name: companyName,
                    business_registration_number: businessNumber
                } : {})
            };

            const { error: profileError } = await supabase
                .from('profiles')
                .upsert(profileData);

            if (profileError) {
                console.error("Profile error:", profileError);
                // If profile creation fails, it's a soft error but we should log it
                throw new Error('회원 메타데이터 저장에 실패했습니다. 관리자에게 문의해주세요.');
            }

            alert('회원가입이 완료되었습니다!');
            router.push('/');
        } catch (err: any) {
            setErrorMsg(err.message || '알 수 없는 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

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
                        <label className="block text-sm font-medium text-gray-700 mb-2">회원 유형</label>
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

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {errorMsg && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                                {errorMsg}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                이메일 (아이디)
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" required
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-industrial-500 focus:border-industrial-500 sm:text-sm"
                                    placeholder="example@jinyang.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                비밀번호
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" required
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-industrial-500 focus:border-industrial-500 sm:text-sm"
                                    placeholder="6자 이상 입력"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                                비밀번호 확인
                            </label>
                            <div className="mt-1">
                                <input id="passwordConfirm" name="passwordConfirm" type="password" required
                                    value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-industrial-500 focus:border-industrial-500 sm:text-sm"
                                    placeholder="비밀번호 다시 입력"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-gray-200 w-full my-4"></div>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                이름
                            </label>
                            <div className="mt-1">
                                <input id="name" name="name" type="text" required
                                    value={name} onChange={(e) => setName(e.target.value)}
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
                                    value={phone} onChange={(e) => setPhone(e.target.value)}
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
                                            value={companyName} onChange={(e) => setCompanyName(e.target.value)}
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
                                            value={businessNumber} onChange={(e) => setBusinessNumber(e.target.value)}
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
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-industrial-600 hover:bg-industrial-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? '처리 중...' : '가입하기'}
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

                        <div className="mt-6 space-y-3">
                            <button
                                type="button"
                                onClick={() => handleOAuthLogin('kakao')}
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-[#000000] bg-[#FEE500] hover:bg-[#FDD800] focus:outline-none transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3C6.477 3 2 6.545 2 10.916c0 2.822 1.83 5.3 4.618 6.702-.15.539-.539 2.016-.615 2.327-.098.398.14.39.297.288.121-.078 1.94-1.33 2.73-1.895A10.669 10.669 10.669 0 0012 18.832c5.522 0 10-3.545 10-7.916S17.522 3 12 3z" />
                                </svg>
                                카카오로 1초 시작하기
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOAuthLogin('naver')}
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#03C75A] hover:bg-[#02b351] focus:outline-none transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
                                </svg>
                                네이버로 1초 시작하기
                            </button>

                            <div className="mt-4 text-center">
                                <span className="text-sm text-gray-600">이미 계정이 있으신가요? </span>
                                <Link href="/login" className="text-sm font-bold text-industrial-600 hover:text-industrial-500">
                                    로그인하기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
