export default function CoreServices() {
    return (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">어떤 제품을 찾으시나요?</h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium break-keep">가정용부터 산업용 대형 탱크까지, 모든 용도의 제품이 준비되어 있습니다.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <a className="group block relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-2xl hover:shadow-industrial-500/10 hover:border-industrial-400/50 transition-all duration-500 transform hover:-translate-y-2" href="#residential">
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md shadow-sm border border-slate-200/50 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <span>⭐</span> BEST
                        </div>
                        <img alt="Residential and small commercial water tank" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9-YsYHGhCHxrKg80dkBS0sezmi3O99kF60ChZDaaz5iu4-ksWTvPKERdQ9zVNc-cqHjKu5tldAygkl5x_wrpoXxI2yXVJtsYTqsIEPBvPcK50_P6fs-_29NefLSqTt-3wY8KlWtqIGETOVgf3ugS-LRSTjB1puIDWRcFC9Ls21rV2K_sTzcXCxfAnZnuEBSRhcxm1VnD59D_boBKaCMIYDYdoikkE_4BkQc4kzt-3ZnQlnk8Wfo895umQCWuJiZKV-FBhtuN-lBs" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-industrial-600 transition-colors">가정용/상업용 물탱크</h3>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-industrial-600 transition-colors">arrow_forward</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">빌라, 상가, 전원주택에 적합한 내구성 강한 소형/중형 탱크</p>
                    </div>
                </a>

                <a className="group block relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-2xl hover:shadow-industrial-500/10 hover:border-industrial-400/50 transition-all duration-500 transform hover:-translate-y-2" href="#industrial">
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                        <div className="absolute top-4 left-4 z-10 bg-industrial-600/95 backdrop-blur-md shadow-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <span>🏭</span> INDUSTRIAL
                        </div>
                        <img alt="Large industrial scale water tanks factory setting" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkduLx4Q8W_Ed3WVmeIYugaMoqRXdn18UMTEbsDWYAzyLwcmuXt350Md4ruz5bLq4LQ7QactDMvv1z6rejyZNGrOE_c6rJrMIomklBqZRnBvOvyFC94GVgGcLYSeGgp-XKf94q_NhexmXCobAfdpHQlV5R8l1EAP0Y-HDnT2GmZbYHsClG1n8QNf_KKZvO1mTjYL0cPOCRUGe9L2BlSsvADAf6m-rHCEyKfsZ6pMN-l6Nzsvn4vvUpQjlaNzTrHWAjSWGfVfONI74" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-industrial-600 transition-colors">산업용 대형 물탱크</h3>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-industrial-600 transition-colors">arrow_forward</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">공장, 대형 빌딩, 소방용수에 최적화된 대용량 맞춤 제작</p>
                    </div>
                </a>

                <a className="group block relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/60 dark:border-slate-700/60 hover:shadow-2xl hover:shadow-industrial-500/10 hover:border-industrial-400/50 transition-all duration-500 transform hover:-translate-y-2" href="#pipes">
                    <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                        <div className="absolute top-4 left-4 z-10 bg-slate-800/95 backdrop-blur-md shadow-sm border border-slate-700/50 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                            <span>🔧</span> FITTINGS
                        </div>
                        <img alt="Various plumbing pipes and fittings" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtk3LLmjAUjxn9pqa58gveyOmudah7KQhbNETkUaDr1dGW-vqDLy2Q-qTlE7L-z307vvOl1nCCBNYBddmYJyzUinA03mi9qGu0zUCVsv14iIHAeooMN5BSAemJculSvxJvKzgmuZ-3jD-XrZWWJHuQtcxSiPRbFPnBe7ziiE9HSl0SLvFkl8wVRoPrIisgWy8ajWoqQ7Kc3a-ZdGssLLhuxwVryGdDWYRBUVkILm1F7OtX74W3JdwTQrgioOd9e6GgQuQG2XuIloI" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-industrial-600 transition-colors">배관 자재 및 부속품</h3>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-industrial-600 transition-colors">arrow_forward</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">PVC 파이프, 이음관, 밸브 등 고품질 배관 자재 총망라</p>
                    </div>
                </a>
            </div>
        </section>
    );
}
