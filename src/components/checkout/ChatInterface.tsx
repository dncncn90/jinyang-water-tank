'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, FileText, X } from 'lucide-react';
import ProductCard from './ProductCard';

type Message = {
    id: string;
    role: 'system' | 'user' | 'assistant';
    content: string;
    type?: 'text' | 'product-recommendation' | 'quote-ready';
    productData?: any;
};

const MOCK_PRODUCT = {
    id: 'tank-3t',
    name: '3톤 PE 물탱크 (원형)',
    capacity: '3,000L',
    material: 'PE (Polyehtylene)',
    price: '450,000',
    features: ['3중층 구조로 녹조 방지', 'KS인증 정품 (두께 6mm)', '전국 화물 배송 가능'],
    isRecommended: true,
};

import { calculateShippingCost } from '@/lib/shipping';

export default function ChatInterface() {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: '안녕하세요! 진양건재입니다.\n원형/사각 물탱크 중 어떤 걸 찾으시나요?',
        }
    ]);

    const [showQuoteModal, setShowQuoteModal] = useState(false);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Shipping Cost Table (Distance in km -> Cost)
    // 1 ton truck basis
    const SHIPPING_RATES = [
        { km: 10, cost: 40000 },
        { km: 20, cost: 50000 },
        { km: 30, cost: 60000 },
        { km: 60, cost: 70000 },
        { km: 90, cost: 80000 },
        { km: 110, cost: 90000 },
        { km: 130, cost: 100000 },
        { km: 150, cost: 110000 },
        { km: 170, cost: 120000 },
        { km: 200, cost: 140000 },
        { km: 250, cost: 170000 },
        { km: 300, cost: 180000 },
        { km: 350, cost: 220000 },
        { km: 400, cost: 250000 },
    ];

    const formatPrice = (price: number) => {
        return price.toLocaleString('ko-KR') + '원';
    };

    // Conversation State Management
    const [step, setStep] = useState<'init' | 'ask-usage' | 'ask-location-context' | 'ask-tonnage' | 'ask-shape' | 'ask-location' | 'quote'>('init');
    const [selection, setSelection] = useState({ tonnage: '', shape: '', location: '', quantity: 1, usage: '', locationContext: '' });
    const [quoteDetails, setQuoteDetails] = useState({ productPrice: 0, shippingCost: 0, total: 0 });

    const calculateShipping = (qty: number, tonnageStr: string, shape: string, location: string) => {
        // Calculate shipping using shared logic
        const items = [{
            name: `${shape} 물탱크 ${tonnageStr}톤`,
            quantity: qty
        }];

        return calculateShippingCost(items, location);
    };

    const handleSend = async (manualInput?: string) => {
        const userInput = manualInput || input;
        if (!userInput.trim()) return;

        // Add User Message
        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: userInput,
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Simulate AI Thinking
        setTimeout(() => {
            setIsLoading(false);
            let responseMsg: Message;
            let nextStep = step;

            // Advanced Smart Recommendation Flow
            if (step === 'init') {
                if (userInput.includes('견적') || userInput.includes('가격') || userInput.includes('안녕') || userInput.includes('시작')) {
                    responseMsg = {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: '반갑습니다!\n어떤 형태의 물탱크를 찾으시나요?\n\n① 원형 — 가성비 좋음\n② 사각 — 공간 효율',
                        type: 'text'
                    };
                    nextStep = 'ask-shape';
                } else {
                    responseMsg = { id: Date.now().toString(), role: 'assistant', content: '"견적 시작"이라고 말씀해 주세요.' };
                }
            } else if (step === 'ask-shape') {
                let suggestedShape = 'Round';
                if (userInput.includes('사각') || userInput.includes('2')) suggestedShape = 'Square';

                setSelection(prev => ({ ...prev, shape: suggestedShape }));

                responseMsg = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `${suggestedShape === 'Square' ? '사각' : '원형'} 선택하셨군요!\n필요한 용량(톤)을 알려주세요.\n(예: ${suggestedShape === 'Square' ? '0.2, 1, 2톤' : '0.2, 1, 5톤'})`,
                };
                nextStep = 'ask-tonnage';

            } else if (step === 'ask-tonnage') {
                const tonnageMatch = userInput.match(/(\d+(\.\d)?)/);
                if (tonnageMatch) {
                    setSelection(prev => ({ ...prev, tonnage: tonnageMatch[0] }));
                    responseMsg = {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: `${tonnageMatch[0]}톤으로 진행할게요.\n배송받으실 지역을 알려주세요.\n(예: 서울 강남구, 경기도 수원)`,
                    };
                    nextStep = 'ask-location';
                } else {
                    responseMsg = { id: Date.now().toString(), role: 'assistant', content: '숫자로 용량을 말씀해 주세요.\n(예: 1톤, 2톤)' };
                }
            } else if (step === 'ask-location') {
                setSelection(prev => ({ ...prev, location: userInput }));

                // Calculate Final Logic
                const qty = 1;
                let productPrice = 450000;
                // Simple Price Modifier based on selection
                if (selection.shape === 'Square') productPrice = 500000;
                if (selection.shape === 'Chemical') productPrice = 600000;
                if (selection.shape === 'Underground') productPrice = 550000;

                const shipping = calculateShipping(qty, selection.tonnage, selection.shape === 'Square' ? '사각' : '원형', userInput);
                const total = productPrice;
                setQuoteDetails({ productPrice, shippingCost: shipping, total });

                responseMsg = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `견적이 완료됐습니다!\n\n${selection.shape === 'Round' ? '원형' : '사각'} ${selection.tonnage}톤 · ${userInput}\n예상 운임: ${formatPrice(shipping)} (착불)\n\n아래에서 견적서를 확인하세요.`,
                    type: 'quote-ready'
                };
                nextStep = 'quote';

            } else {
                responseMsg = { id: Date.now().toString(), role: 'assistant', content: '이미 견적이 완료되었습니다. 추가 문의는 고객센터(031-236-8227)로 부탁드립니다.' };
            }

            setStep(nextStep as any);
            setMessages(prev => [...prev, responseMsg]);
        }, 1000);
    };

    const handleReset = () => {
        setMessages([
            {
                id: Date.now().toString(),
                role: 'assistant',
                content: '새 견적을 시작합니다.\n원형/사각 중 어떤 물탱크가 필요하신가요?',
            }
        ]);
        setStep('init');
        setSelection({ tonnage: '', shape: '', location: '', quantity: 1, usage: '', locationContext: '' });
        setShowQuoteModal(false);
    };

    const handleDownloadPDF = () => {
        // PDF Simulation
        const originalText = "견적서 다운로드 (PDF)";
        const btn = document.getElementById('btn-download-pdf');
        if (btn) btn.innerText = "다운로드 중...";

        setTimeout(() => {
            if (btn) btn.innerText = "다운로드 완료!";
            alert(`[시뮬레이션] ${selection.tonnage}톤 ${selection.shape} 물탱크 견적서가 다운로드되었습니다.`);
            setTimeout(() => {
                if (btn) btn.innerText = originalText;
            }, 2000);
        }, 1500);
    }

    return (
        <div id="chat-section" className="flex flex-col h-[560px] w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-industrial-900 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-industrial-700 flex items-center justify-center border-2 border-industrial-500">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold">진양스마트견적</h3>
                        <p className="text-xs text-industrial-300">● 실시간 견적 산출 중</p>
                    </div>
                </div>
                <button
                    onClick={handleReset}
                    className="text-xs bg-industrial-800 hover:bg-industrial-700 text-industrial-200 px-3 py-1.5 rounded-full transition-colors border border-industrial-600"
                >
                    새 견적 내기 ↻
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-6" ref={scrollRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gray-200' : 'bg-industrial-100 text-industrial-600'}`}>
                                {msg.role === 'user' ? <User className="w-5 h-5 text-gray-500" /> : <Bot className="w-5 h-5" />}
                            </div>

                            {/* Bubble */}
                            <div className="space-y-2">
                                {msg.content && (
                                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm font-medium whitespace-pre-wrap leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-industrial-600 text-white rounded-tr-none' : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'}`}>
                                        {msg.content}
                                    </div>
                                )}

                                {/* Special Message Types */}
                                {msg.type === 'product-recommendation' && msg.productData && (
                                    <ProductCard product={msg.productData} onSelect={() => setShowQuoteModal(true)} />
                                )}

                                {msg.type === 'quote-ready' && (
                                    <button
                                        onClick={() => setShowQuoteModal(true)}
                                        className="w-full bg-white border border-industrial-200 text-industrial-700 p-4 rounded-xl flex items-center justify-between hover:bg-industrial-50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-red-100 p-2 rounded-lg text-red-600">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <span className="block font-bold text-gray-900">견적서가 준비되었습니다</span>
                                                <span className="text-xs text-gray-500">클릭하여 미리보기</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-industrial-500" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center shrink-0 text-industrial-600">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-industrial-500" />
                                <span className="text-sm font-medium text-gray-500">견적 산출 중...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="예: 1톤, 원형, 서울 강남구"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-industrial-500 focus:border-industrial-500 block pl-4 py-3 pr-12 transition-all"
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-industrial-900 text-white p-2 rounded-lg hover:bg-industrial-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="mt-1.5 text-center text-[10px] text-gray-300">
                    실시간 단가 기반 · 최종 금액은 전화 확인 후 확정 (배송비 착불)
                </p>
            </div>

            {/* Quote Modal Overlay (Simple implementation for now) */}
            {showQuoteModal && (
                <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="font-bold text-xl text-gray-900">견적서 미리보기</h3>
                            <button onClick={() => setShowQuoteModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6 text-sm">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">품목</span>
                                <span className="font-medium text-gray-900">{selection.tonnage || '3'}톤 PE 물탱크 ({selection.shape || '원형'})</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">수량</span>
                                <span className="font-medium text-gray-900">{selection.quantity}개</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">배송지</span>
                                <span className="font-medium text-gray-900">{selection.location}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">공급가액</span>
                                <span className="font-medium text-gray-900">{formatPrice(quoteDetails.productPrice)}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-400">
                                <span className="text-gray-500">예상 운임 (착불)</span>
                                <span className="font-medium">{formatPrice(quoteDetails.shippingCost)}*</span>
                            </div>
                            <div className="text-right text-xs text-gray-400 mb-2">
                                * 운임은 해피콜 시 확정됩니다.
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                                <span className="font-bold text-gray-900">합계 (VAT 포함, 배송비 별도)</span>
                                <span className="font-bold text-industrial-600 text-lg">{formatPrice(quoteDetails.total)}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                id="btn-download-pdf"
                                onClick={handleDownloadPDF}
                                className="w-full bg-industrial-600 hover:bg-industrial-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex justify-center items-center gap-2"
                            >
                                <FileText className="w-5 h-5" />
                                견적서 다운로드 (PDF)
                            </button>
                            <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors">
                                상담원 연결하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
