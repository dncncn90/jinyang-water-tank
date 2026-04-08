import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';
import ProductClientPage from '@/components/products/ProductClientPage';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return { title: '상품을 찾을 수 없습니다' };

  const isMat = product.category === 'coir-mat';
  const isFitting = product.category === 'fittings';
  const categoryLabel = isMat ? '야자매트·코코넛매트' : isFitting ? '물탱크 부속' : 'PE 물탱크 도매';

  // 부속자재는 지역 키워드 제외, 물탱크와 야자매트는 적극 포함
  const regionKeywords = isFitting ? '' : '수원, 화성, 용인 등 수도권 전 지역 당일 직배송 및 최저가 보장.';

  return {
    title: `${product.name} | ${isFitting ? '' : '수도권 최저가 도매 '} ${categoryLabel} - 진양건재`,
    description: `${product.name} 전문 판매. ${product.description} - 37년 전통의 진양건재에서 ${regionKeywords} 대량 구매 상담 환영!`,
    keywords: [
        product.name, 
        categoryLabel, 
        isFitting ? '' : '수원 물탱크', 
        isFitting ? '' : '화성 물탱크', 
        isFitting ? '' : '용인 야자매트',
        '진양건재'
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} | 진양건재`,
      description: product.description,
      images: [product.images[0] || ''],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return notFound();

  return <ProductClientPage product={product} />;
}
