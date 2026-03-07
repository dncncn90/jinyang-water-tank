"use client";

import { useState, useEffect } from "react";
import { Check, Info, Minus, Plus, ChevronDown, ChevronUp, Droplets, Tractor, Factory, ThumbsUp, X, HeartHandshake } from "lucide-react";
import Image from "next/image";
import VisualBundleGuide from "./VisualBundleGuide";

interface BundleOption {
    id: string;
    label: string;
    description: string;
    price: number;
    spec: string; // e.g., '15mm (16ø)'
    icon: React.ElementType;
    recommendation: string;
    components: string[];
}

const BUNDLE_OPTIONS: BundleOption[] = [
    {
        id: 'home',
        label: '가정/텃밭용',
        description: '수도꼭지에 바로 연결',
        price: 35000,
        spec: '13mm (16ø)',
        icon: Droplets,
        recommendation: '일반 가정용 수도 호스와 호환됩니다.',
        components: [
            'KS인증 13mm 수도관 (4m)',
            '13mm 밸브소켓 x 2',
            '13mm 수전소켓 x 1',
            '13mm 엘보 x 2',
            '13mm 티 x 1',
            'PVC 볼밸브',
            '나사식 연결 밸브 (서비스)',
            '테프론 테이프 + 본드'
        ]
    },
    {
        id: 'farm',
        label: '농업/비닐하우스',
        description: '펌프 연결 / 많은 물',
        price: 45000,
        spec: '25mm (27ø)',
        icon: Tractor,
        recommendation: '농업용 펌프나 굵은 호스를 사용할 때 적합합니다.',
        components: [
            'KS인증 25mm 수도관 (4m)',
            '25mm 밸브소켓 x 2',
            '25mm 엘보 x 3',
            '25mm 티 x 1',
            '대형 PVC 볼밸브',
            '테프론 테이프 + 본드',
            '수위계 호스 세트 (서비스)'
        ]
    },
    {
        id: 'factory',
        label: '공장/축사 청소',
        description: '빠른 배수 / 전문가용',
        price: 65000,
        spec: '40mm',
        icon: Factory,
        recommendation: '단시간에 많은 물을 빼내야 하는 현장에 필수입니다.',
        components: [
            'KS인증 40mm 배관 (4m)',
            '40mm 대구경 밸브소켓',
            '40mm 엘보/티 세트',
            '산업용 PVC 볼밸브',
            '테프론 테이프 + 대용량 본드',
            '수위계 호스 세트 (서비스)'
        ]
    }
];

interface Props {
    onSelect: (price: number, optionId: string | null) => void;
}

export default function BundleKitWizard({ onSelect }: Props) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSelect = (id: string) => {
        if (selectedId === id) {
            setSelectedId(null);
            onSelect(0, null);
        } else {
            setSelectedId(id);
            const option = BUNDLE_OPTIONS.find(o => o.id === id);
            if (option) onSelect(option.price, id);
        }
    };

    const selectedOption = BUNDLE_OPTIONS.find(o => o.id === selectedId);

    return (
        <div id="bundle-kit" className="my-12 scroll-mt-24">
            <div className={`border-2 rounded-3xl overflow-hidden transition-colors duration-300 ${selectedId ? 'border-industrial-600 bg-industrial-50/30' : 'border-gray-200 bg-white'}`}>
                {/* Header Section */}
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold mb-3">
                                <ThumbsUp className="w-3.5 h-3.5" />
                                인기 옵션 (철물점 갈 필요 없음)
                            </span>
                            <h2 className="text-2xl font-bold text-gray-900">
                                🚀 설치 걱정 제로! 올인원 배관 키트
                            </h2>
                            <p className="text-gray-500 mt-2">
                                복잡한 부속 이름 몰라도 괜찮습니다. <strong className="text-industrial-700">용도만 선택하세요.</strong><br className="hidden sm:block" />
                                전문가가 꼼꼼하게 챙긴 <span className="underline decoration-industrial-300 decoration-2">풀세트가 물탱크와 함께 도착</span>합니다.
                            </p>
                        </div>
                        <div className="w-full md:w-48 lg:w-64 shrink-0 mt-4 md:mt-0">
                            <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden border border-industrial-100 shadow-sm bg-white">
                                <Image
                                    src="/images/products/bundle-kit-fullset.jpg"
                                    alt="올인원 배관 설치 풀세트 구성품"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-industrial-600/90 text-white text-[10px] font-bold rounded">
                                    구성품 예시
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block text-right">
                            <div className="text-sm text-gray-400 mb-1">총 예상 추가 금액</div>
                            <div className="text-3xl font-extrabold text-industrial-900">
                                {selectedOption ? `+${selectedOption.price.toLocaleString()}원` : '0원'}
                            </div>
                        </div>
                    </div>

                    {/* NEW: Visual Guide Infographics (Trigger) */}
                    <VisualBundleGuide />

                    {/* Selector Tabs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                        {BUNDLE_OPTIONS.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                className={`relative flex flex-col items-start p-4 md:p-5 rounded-xl border-2 transition-all text-left group ${selectedId === option.id
                                    ? 'border-industrial-600 bg-white shadow-lg shadow-industrial-100 ring-2 ring-industrial-600/10'
                                    : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${selectedId === option.id ? 'bg-industrial-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                                    }`}>
                                    <option.icon className="w-6 h-6" />
                                </div>
                                <h3 className={`font-bold text-lg mb-1 ${selectedId === option.id ? 'text-industrial-900' : 'text-gray-900'}`}>
                                    {option.label}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium mb-4">{option.description}</p>

                                <div className="mt-auto w-full pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {option.spec}
                                    </span>
                                    <span className={`font-bold ${selectedId === option.id ? 'text-industrial-600' : 'text-gray-400'}`}>
                                        +{option.price.toLocaleString()}원
                                    </span>
                                </div>

                                {selectedId === option.id && (
                                    <div className="absolute top-3 right-3 text-industrial-600 animate-in fade-in zoom-in duration-300">
                                        <Check className="w-6 h-6 bg-industrial-100 rounded-full p-1" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Details (Accordion-like expansion when selected) */}
                <div className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${selectedOption ? 'max-h-[2000px] opacity-100 border-t border-industrial-100' : 'max-h-0 opacity-0'}`}>
                    {selectedOption && (
                        <div className="p-6 md:p-8 bg-white">

                            {/* Component Grid */}
                            <div className="mb-8">
                                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <HeartHandshake className="w-5 h-5 text-industrial-600" />
                                    '{selectedOption.label}' 세트 구성품
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {selectedOption.components.map((item, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 p-3 rounded-lg flex items-center gap-3 shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-industrial-50 text-industrial-600 flex items-center justify-center text-xs font-bold shrink-0">
                                                {idx + 1}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 leading-snug">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ Toggle */}
                            <div className="border-t border-gray-100 pt-6">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="flex w-full items-center justify-between text-left text-gray-500 hover:text-industrial-700 transition-colors"
                                >
                                    <span className="font-bold text-sm">💡 자주 묻는 질문 (FAQ)</span>
                                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {isExpanded && (
                                    <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="font-bold text-sm text-gray-900 mb-1">Q. 호스를 꼈다 뺐다 하고 싶어요.</div>
                                            <div className="text-sm text-gray-600">A. 걱정 마세요! 세트에 포함된 <strong className="text-industrial-600">나사식 밸브(서비스)</strong>가 있으면 일반 세탁기 호스나 원터치 커플러를 바로 끼울 수 있습니다.</div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="font-bold text-sm text-gray-900 mb-1">Q. 집 옥상 물탱크인데 몇 mm 써요?</div>
                                            <div className="text-sm text-gray-600">A. 고민하지 마시고 <strong className="text-industrial-600">[가정용 - 13mm]</strong> 옵션을 선택하세요. 수압이 중요하시다면 1단계 위인 농업용(25mm)을 쓰셔도 되지만, 가정용이면 충분합니다.</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
