export default function QuoteTicker() {
    const tickerItems = [
        { status: '견적완료', bg: 'bg-slate-200 text-slate-700', text: 'A빌딩 10톤 물탱크 - 15분 전' },
        { status: '주문접수', bg: 'bg-slate-200 text-slate-700', text: 'B공장 배관 자재 일괄 - 22분 전' },
        { status: '배송중', bg: 'bg-slate-200 text-slate-700', text: 'C상가 5톤 물탱크 - 1시간 전' },
        { status: '견적완료', bg: 'bg-slate-200 text-slate-700', text: 'D아파트 단지 급수탱크 - 방금 전' },
        { status: '상담중', bg: 'bg-slate-200 text-slate-700', text: 'E물류센터 소방탱크 - 5분 전' },
    ];

    return (
        <section className="bg-slate-50 border-b border-slate-100 overflow-hidden py-3">
            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="flex animate-marquee min-w-full">
                    <div className="flex items-center gap-8 px-4">
                        {tickerItems.map((item, idx) => (
                            <div key={`ticker-${idx}`} className="flex items-center gap-3 text-slate-600">
                                <span className={`${item.bg} text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider`}>
                                    {item.status}
                                </span>
                                <span className="text-sm font-medium">{item.text}</span>
                                {idx < tickerItems.length - 1 && <div className="w-1 h-1 bg-slate-300 rounded-full mx-4"></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
