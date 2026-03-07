import { Check, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        capacity: string;
        material: string;
        price: string | number; // Support number from lib/products.ts
        image?: string;
        features: string[];
        hasOptions?: boolean;
        isRecommended?: boolean;
        specs?: { dimensions?: string };
        detailedSpecs?: {
            diameter?: number;
            height?: number;
            width?: number;
        };
    };
    onSelect: () => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
    const isBest = product.id === 'pe-v-1'; // 1-ton round tank is BEST
    const isBuried = product.name.includes('매설');

    // Construct detailed specs string
    let specString = "";
    if (product.detailedSpecs) {
        const specs = [];
        if (product.detailedSpecs.height) specs.push(`높이 ${product.detailedSpecs.height.toLocaleString()}mm`);
        if (product.detailedSpecs.diameter) specs.push(`지름 ${product.detailedSpecs.diameter.toLocaleString()}mm`);
        if (product.detailedSpecs.width) specs.push(`폭 ${product.detailedSpecs.width.toLocaleString()}mm`);
        specString = specs.join(' · ');
    } else if (product.specs?.dimensions) {
        specString = product.specs.dimensions;
    }

    return (
        <div className={`group relative w-full max-w-sm rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${isBuried ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'
            }`}>
            <Link href={`/products/${product.id}`} className="block relative p-6">
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {isBest && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                            BEST
                        </span>
                    )}
                    {product.isRecommended && (
                        <div className="bg-industrial-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            AI 추천
                        </div>
                    )}
                    {isBuried && (
                        <span className="bg-gray-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                            매설전용
                        </span>
                    )}
                </div>

                {/* Image */}
                <div className="aspect-square flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">IMG</div>
                    )}
                </div>

                {/* Info */}
                <div>
                    <h3 className="font-black text-xl sm:text-2xl text-gray-900 mb-1 group-hover:text-industrial-600 transition-colors line-clamp-2 tracking-tight">
                        {product.name}
                    </h3>

                    {/* Tech Spec Preview */}
                    <p className="text-xs text-gray-500 font-medium mb-3 h-4">
                        {specString}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4 min-h-[1.5rem]">
                        {product.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                #{feature}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>

            {/* Bottom Action Area */}
            <div className="p-4 pt-0">
                <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-black text-2xl sm:text-3xl text-red-600 tracking-tight">{Number(product.price).toLocaleString()}원{product.hasOptions ? '~' : ''}</span>
                    <span className="text-xs text-gray-400 font-bold tracking-tighter">(VAT.포함)</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    <Link
                        href={`/products/${product.id}`}
                        className="col-span-4 bg-industrial-900 hover:bg-industrial-800 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center transition-colors"
                    >
                        자세히 보기
                    </Link>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onSelect();
                        }}
                        className="col-span-1 border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-industrial-600 rounded-xl flex items-center justify-center transition-colors"
                        aria-label="견적서 담기"
                    >
                        <ShieldCheck className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
