'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, Package, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type OrderStatus = 'pending' | 'awaiting_deposit' | 'paid' | 'preparing' | 'shipping' | 'completed' | 'cancelled';

interface OrderItem {
    id: string;
    product_name: string;
    quantity: number;
}

interface Order {
    id: string;
    created_at: string;
    total_amount: number;
    status: OrderStatus;
    order_items: OrderItem[];
}

export default function MyPage() {
    const router = useRouter();
    const supabase = createClient();
    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{
        name: string;
        type: 'individual' | 'business';
        phone: string;
        businessNumber?: string;
        taxEmail?: string;
    } | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                // Not logged in -> redirect to login
                router.push('/login');
                return;
            }

            // Fetch profile data
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (profileError || !profile) {
                console.error("Failed to load profile", profileError);
                setUser({
                    name: session.user.user_metadata?.name || '진양건재 고객님',
                    type: 'individual',
                    phone: session.user.phone || '연락처 미등록',
                });
            } else {
                setUser({
                    name: profile.business_name || profile.contact_name || '진양건재 고객님',
                    type: profile.business_registration_number ? 'business' : 'individual',
                    phone: profile.contact_phone || '연락처 미등록',
                    businessNumber: profile.business_registration_number,
                    taxEmail: profile.tax_email || session.user.email,
                });
            }

            // Fetch orders data
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select(`
                    id,
                    created_at,
                    total_amount,
                    status,
                    order_items (
                        id,
                        product_name,
                        quantity
                    )
                `)
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(5);

            if (ordersError) {
                console.error("Failed to fetch orders:", ordersError);
            } else if (ordersData) {
                setOrders(ordersData as unknown as Order[]);
            }

            setLoading(false);
        };

        fetchUserData();
    }, [router, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-28 pb-12">
                <Loader2 className="w-12 h-12 animate-spin text-industrial-600" />
            </div>
        );
    }

    if (!user) return null;

    const displayName = user.name || '진양건재 고객님';
    const displayInitial = displayName.charAt(0);

    const getStatusText = (status: OrderStatus) => {
        const statuses: Record<OrderStatus, string> = {
            'pending': '결제 대기',
            'awaiting_deposit': '입금 대기',
            'paid': '결제 완료',
            'preparing': '상품 준비중',
            'shipping': '배송 중',
            'completed': '배송 완료',
            'cancelled': '주문 취소'
        };
        return statuses[status] || '알 수 없음';
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Profile */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-20 h-20 bg-industrial-100 rounded-full flex items-center justify-center text-industrial-600 font-bold text-2xl border-4 border-industrial-50 shrink-0">
                        {displayInitial}
                    </div>
                    <div className="text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                            <h1 className="text-2xl font-extrabold text-gray-900">{displayName}</h1>
                            {user.type === 'business' && (
                                <span className="px-2 py-1 bg-industrial-100 text-industrial-700 text-xs font-bold rounded-md whitespace-nowrap">
                                    B2B 사업자 회원
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500">{user.phone}</p>
                        <p className="text-sm text-gray-400 mt-1">
                            {user.type === 'business' && user.businessNumber ? `사업자번호: ${user.businessNumber}` : '일반 회원 계정'}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Sidebar */}
                    <div className="md:col-span-1 space-y-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-900 mb-4 px-2">나의 쇼핑</h3>
                            <nav className="space-y-1">
                                <a href="#" className="block px-3 py-2.5 rounded-xl bg-industrial-50 text-industrial-700 font-bold hover:bg-industrial-100 transition-colors">진행 중인 주문/견적</a>
                                <a href="#" className="block px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-colors">주문 내역</a>
                                <Link href="/cart" className="block px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-colors">장바구니 보기</Link>
                            </nav>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                            <h3 className="font-bold text-gray-900 mb-4 px-2">정보 관리</h3>
                            <nav className="space-y-1">
                                <a href="#" className="block px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 font-medium transition-colors">회원 정보 수정</a>
                                {user.type === 'business' && (
                                    <a href="#" className="block px-3 py-2.5 rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 font-bold flex items-center justify-between transition-colors">
                                        사업자/세무 정보
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    </a>
                                )}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Business Member Section */}
                        {user.type === 'business' && (
                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FileText className="w-6 h-6 text-industrial-600" />
                                    사업자 회원 전용 메뉴
                                </h2>

                                <div className="space-y-6">
                                    {/* Upload License */}
                                    <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
                                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900">사업자 등록증 관리</h3>
                                                <p className="text-sm text-gray-500 mt-1">전자세금계산서 발행을 위해 필수입니다.</p>
                                            </div>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 shrink-0">
                                                <CheckCircle2 className="w-3 h-3" /> 인증 완료
                                            </span>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                            <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                                                <Upload className="w-4 h-4 text-gray-500" />
                                                재등록
                                            </button>
                                            <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors">
                                                사본 확인
                                            </button>
                                        </div>
                                    </div>

                                    {/* Auto Tax Invoice */}
                                    <div className="border border-blue-100 rounded-2xl p-6 bg-blue-50/50 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                            <FileText className="w-24 h-24 text-blue-600" />
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-2">세금계산서 자동 신청 설정</h3>
                                        <p className="text-sm text-gray-600 mb-6">설정을 켜두시면 결제 완료 시 지정된 이메일로 매입 세금계산서가 자동 발행됩니다.</p>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-xl border border-blue-100 shadow-sm gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                    <FileText className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-900 text-sm truncate">{user.taxEmail || '연동 이메일 없음'}</p>
                                                    <p className="text-xs text-green-600 font-medium mt-0.5 whitespace-nowrap">자동 신청 활성화 상태 ✨</p>
                                                </div>
                                            </div>
                                            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 bg-blue-50 rounded-lg transition-colors shrink-0">
                                                설정 변경
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Recent Orders Overview */}
                        <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                                진행 중인 주문 / 견적 내역
                                {orders.length > 0 && (
                                    <a href="#" className="text-sm font-medium text-industrial-600 hover:text-industrial-700 flex items-center gap-1">
                                        전체 보기 <ChevronRight className="w-4 h-4" />
                                    </a>
                                )}
                            </h2>
                            
                            {orders.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                                    <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium break-keep">최근 1개월 내에 진행 중인 주문이나 견적이 없습니다.</p>
                                    <Link href="/" className="inline-block mt-4 bg-industrial-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-industrial-700 transition-colors shadow-md shadow-industrial-200">
                                        상품 둘러보기
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => {
                                        const dateStr = new Date(order.created_at).toLocaleDateString('ko-KR');
                                        const isActiveStatus = ['pending', 'awaiting_deposit', 'paid', 'preparing', 'shipping'].includes(order.status);
                                        const statusColor = isActiveStatus ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-gray-700 bg-gray-50 border-gray-200';
                                        
                                        let summaryStr = '알 수 없는 상품';
                                        if (order.order_items && order.order_items.length > 0) {
                                            const firstItem = order.order_items[0];
                                            if (order.order_items.length > 1) {
                                                summaryStr = `${firstItem.product_name} 외 ${order.order_items.length - 1}건`;
                                            } else {
                                                summaryStr = firstItem.product_name;
                                            }
                                        }

                                        return (
                                            <div key={order.id} className="border border-gray-200 rounded-2xl p-5 hover:border-industrial-300 transition-colors bg-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-sm text-gray-500 font-medium">{dateStr}</span>
                                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${statusColor}`}>
                                                            {getStatusText(order.status)}
                                                        </span>
                                                    </div>
                                                    <p className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-gray-400" />
                                                        {summaryStr}
                                                    </p>
                                                    <p className="text-industrial-700 font-extrabold mt-1">
                                                        {order.total_amount.toLocaleString()}원
                                                    </p>
                                                </div>
                                                <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                                    상세보기
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
}
