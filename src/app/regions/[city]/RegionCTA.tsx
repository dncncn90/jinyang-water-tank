'use client';

import { Calculator } from 'lucide-react';

export default function RegionCTA() {
  return (
    <button 
      onClick={() => window.dispatchEvent(new Event('open-chat'))}
      className="inline-flex items-center justify-center bg-[#FFD400] text-industrial-950 hover:bg-[#E6BF00] font-black h-16 px-8 rounded-2xl text-xl shadow-lg transition-all active:scale-95"
    >
      <Calculator className="w-6 h-6 mr-2" />
      스마트 견적 확인
    </button>
  );
}
