'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

// Mock Data for Search
const SEARCH_DATA = [
    { id: 'pe-vertical-3t', name: 'PE 원형 물탱크 3톤', category: '물탱크', url: '/products/pe-vertical-3t' },
    { id: 'pe-square', name: 'PE 사각 물탱크', category: '물탱크', url: '/products/pe-square' },
    { id: 'septic-5', name: '정화조 5인용', category: '정화조', url: '/products/septic-5' },
    { id: 'septic-10', name: '정화조 10인용', category: '정화조', url: '/products/septic-10' },
    { id: 'toilet', name: '이동식 화장실', category: '화장실', url: '/products/toilet' },
    { id: 'fit-bronze', name: '청동 피팅 (구찌)', category: '부속자재', url: '/products/fit-bronze' },
    { id: 'fit-pe', name: 'PE 피팅 (구찌)', category: '부속자재', url: '/products/fit-pe' },
    { id: 'lid', name: '물탱크 뚜껑', category: '부속자재', url: '/products/lid' },
];

export default function PredictiveSearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(SEARCH_DATA);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const filtered = SEARCH_DATA.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.includes(query)
        );
        setResults(filtered);
    }, [query]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="예: 3톤 물탱크, 정화조..."
                    className="w-full bg-industrial-900 border border-industrial-700 text-white text-sm rounded-full py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-industrial-500 focus:border-transparent placeholder-industrial-400 transition-all"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-industrial-400" />
            </div>

            {/* Results Dropdown */}
            {isOpen && query.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {results.length > 0 ? (
                        <ul>
                            {results.slice(0, 5).map((result) => (
                                <li key={result.id}>
                                    <Link
                                        href={result.url}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                    >
                                        <div className="bg-industrial-50 p-2 rounded-lg text-industrial-600">
                                            <Package className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{result.name}</p>
                                            <p className="text-xs text-gray-500">{result.category}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-gray-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-sm text-gray-500">
                            검색 결과가 없습니다.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
