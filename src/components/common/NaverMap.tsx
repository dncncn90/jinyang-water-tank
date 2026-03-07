'use client';

import { MapPin, ExternalLink } from 'lucide-react';

export default function NaverMap() {
    // Static Map Embed using Iframe (No API Key Required for simple view)
    // Coordinates: 37.263579, 127.028711 (Suwon City Hall Area)
    return (
        <div className="w-full h-full relative group overflow-hidden bg-gray-100">
            {/* Map Iframe */}
            <iframe
                title="JinYang PVC Location"
                src="https://maps.google.com/maps?q=경기도 수원시 팔달구 효원로 209-5&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay for "View on Naver Map" (Visible on Hover) */}
            <div className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto`}>
                <div className="text-center p-6 text-white">
                    <MapPin className="w-10 h-10 mx-auto mb-3 text-white" />
                    <h3 className="text-lg font-bold mb-2">진양건재</h3>
                    <p className="text-sm text-gray-200 mb-4">경기도 수원시 팔달구 효원로 209-5</p>

                    <a
                        href="https://map.naver.com/p/search/경기도 수원시 팔달구 효원로 209-5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                        <span>큰 지도로 보기</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
