'use client';

import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingCallButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div 
            className={`fixed bottom-6 right-6 z-40 transition-all duration-300 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
        >
            <a
                href="tel:031-236-8227"
                className="flex items-center gap-3 bg-[#FFD400] text-[#003366] px-6 py-4 rounded-full shadow-2xl hover:bg-yellow-400 hover:scale-110 active:scale-95 transition-all group border-2 border-white"
            >
                <div className="bg-[#003366] text-white p-2 rounded-full group-hover:rotate-12 transition-transform">
                    <Phone className="w-6 h-6 fill-current" />
                </div>
                <span className="text-xl font-black tracking-tight">031-236-8227</span>
            </a>
        </div>
    );
}
