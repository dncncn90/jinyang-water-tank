import { Metadata } from 'next';
import CategoryClientPage from '@/components/checkout/CategoryClientPage';

const CATEGORY_INFO: Record<string, { title: string; description: string; emoji: string; keywords: string[] }> = {
    'pe-round': {
        title: '원형 물탱크 도매 전문',
        description: '수원·수도권 최저가 원형 PE 물탱크 전문 도매. 37년 전통의 진양건재에서 고품질 식수용/공업용 물탱크를 당일 직배송으로 만나보세요.',
        emoji: '🔵',
        keywords: ['수원 물탱크', '수원 원형물탱크', '화성 물탱크', '용인 물탱크', 'PE 물탱크 가격', '물탱크 도매'],
    },
    'pe-square': {
        title: '사각 물탱크 도매 전문',
        description: '좁은 공간 맞춤형 사각 물탱크 전문 공급. 공간 활용이 뛰어난 사각 탱크를 수원, 화성, 용인 등 수도권 어디든 당일 직송해 드립니다.',
        emoji: '🟦',
        keywords: ['사각 물탱크', '사각 물탱크 가격', '수원 사각물탱크', '화성 사각물탱크', '공간활용 물탱크'],
    },
    'fittings': {
        title: '물탱크 부속',
        description: '물탱크용 각종 피팅, 볼탑, 밸브 등 관련 부자재를 공급합니다.',
        emoji: '🔧',
        keywords: ['물탱크 부속', '물탱크 피팅', '물탱크 볼탑'],
    },
    'chemical-tank': {
        title: '약품탱크',
        description: '내화학성이 우수한 고성능 산업용 약품 탱크 도매 판매.',
        emoji: '🧪',
        keywords: ['약품탱크', '화학탱크', '산업용탱크'],
    },
    'coir-mat': {
        title: '친환경 야자매트 도매 전문',
        description: '수원·수도권 야자매트 보행매트 최저가 도매 공급. 등산로, 산책로용 고강도 천연 코코넛 매트를 현장까지 당일 직배송해 드립니다.',
        emoji: '🌴',
        keywords: ['수원 야자매트', '화성 야자매트', '용인 야자매트', '야자매트 가격', '코코넛매트', '보행매트'],
    },
};

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const info = CATEGORY_INFO[slug];

    if (!info) return { title: '카테고리를 찾을 수 없습니다' };

    // 부속자재는 지역 키워드 비중을 낮춤
    const isFitting = slug === 'fittings';
    const title = `${info.title} | ${isFitting ? '' : '수도권 당일 직배송 '} 최저가 견적 - 진양건재`;

    return {
        title,
        description: `${info.description} 37년 전통의 신뢰로 정직한 가격과 신속한 서비스를 약속합니다.`,
        keywords: info.keywords,
        openGraph: {
            title,
            description: info.description,
            type: 'website',
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const info = CATEGORY_INFO[slug];

    return <CategoryClientPage params={params} categoryInfo={info} />;
}
