'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            setErrorMsg(err.message || '소셜 로그인 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error("Login error:", error);
                throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
            }

            // Successfully logged in
            router.push('/');
            router.refresh(); // Refresh the layout to update auth state
        } catch (err: any) {
            setErrorMsg(err.message || '로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-28">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    로그인
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    진양건재 온라인(B2B) 견적 시스템
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">

                    <form className="space-y-6" onSubmit={handleLogin}>
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
                                    placeholder="비밀번호 입력"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-industrial-600 focus:ring-industrial-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    로그인 상태 유지
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-industrial-600 hover:text-industrial-500">
                                    비밀번호를 잊으셨나요?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-industrial-600 hover:bg-industrial-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-industrial-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? '로그인 중...' : '로그인'}
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
                                카카오 간편 로그인
                            </button>

                            <button
                                type="button"
                                onClick={() => handleOAuthLogin('naver')}
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#03C75A] hover:bg-[#02b351] focus:outline-none transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
                                </svg>
                                네이버 간편 로그인
                            </button>

                            <div className="mt-4 text-center">
                                <span className="text-sm text-gray-600">아직 계정이 없으신가요? </span>
                                <Link href="/register" className="text-sm font-bold text-industrial-600 hover:text-industrial-500">
                                    회원가입하기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
