import React from 'react';
import PERoundCSSection from './PERoundCSSection';

export default function PERoundMarketing() {
    return (
        <div className="w-full bg-white flex flex-col items-center pb-20">
            {/* Container size adjusted to balance image quality and size, background changed to white to remove black borders */}
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center shadow-lg border border-gray-100 rounded-2xl overflow-hidden mt-8 bg-white">
                <img
                    src="/images/products/pe-round-details/round-detail-hq.jpg"
                    alt="원형 PE 물탱크 상세정보"
                    className="w-full h-auto block"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
            </div>

            <div className="w-full max-w-7xl mx-auto mt-12 bg-white rounded-[2rem] overflow-hidden">
                <PERoundCSSection />
            </div>
        </div>
    );
}
