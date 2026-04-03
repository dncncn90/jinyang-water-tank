/**
 * JSON-LD 구조화 데이터 컴포넌트
 * Google이 업체 정보, 상품 정보를 구조적으로 이해할 수 있게 해줍니다.
 * 검색 결과에서 별점, 주소, 전화번호 등의 '리치 스니펫'이 노출됩니다.
 */

// 업체 기본 정보 (사이트 전역)
export function LocalBusinessJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: '진양건재',
        alternateName: ['진양탱크', '진양수조', '진양물탱크'],
        description: '수원 30년 경력의 PE 물탱크 및 저수조 전문 판매업체. 원형/사각 물탱크, 정화조, 배관 피팅 자재 도소매 전문 건재상.',
        url: 'https://www.진양건재.com',
        logo: 'https://www.진양건재.com/images/products/pe-round-src/1.jpg',
        image: 'https://www.진양건재.com/images/hero-tanks.jpg',
        telephone: '031-236-8227',
        faxNumber: '031-237-4435',
        email: 'jy2368227@naver.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '효원로 209-5',
            addressLocality: '팔달구',
            addressRegion: '수원시',
            addressCountry: 'KR',
            postalCode: '16467',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 37.2636,
            longitude: 127.0286,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday'],
                opens: '09:00',
                closes: '14:00',
            },
        ],
        priceRange: '₩₩',
        currenciesAccepted: 'KRW',
        paymentAccepted: '현금, 계좌이체, 카드',
        areaServed: {
            '@type': 'Country',
            name: '대한민국',
        },
        sameAs: [],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

// 상품 구조화 데이터 (상품 상세 페이지에서 사용)
export function ProductJsonLd({
    name,
    description,
    price,
    image,
    productId,
}: {
    name: string;
    description: string;
    price: number;
    image: string;
    productId: string;
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        image: `https://www.진양건재.com${image}`,
        brand: {
            '@type': 'Brand',
            name: '대한민국 국산 PE 물탱크',
        },
        manufacturer: {
            '@type': 'Organization',
            name: '진양건재',
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.진양건재.com/products/${productId}`,
            priceCurrency: 'KRW',
            price: price,
            priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: '진양건재',
            },
            shippingDetails: {
                '@type': 'OfferShippingDetails',
                shippingRate: {
                    '@type': 'MonetaryAmount',
                    value: '0',
                    currency: 'KRW',
                },
                shippingDestination: {
                    '@type': 'DefinedRegion',
                    addressCountry: 'KR',
                },
                deliveryTime: {
                    '@type': 'ShippingDeliveryTime',
                    handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 0,
                        maxValue: 1,
                        unitCode: 'd',
                    },
                    transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 2,
                        unitCode: 'd',
                    },
                },
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

// FAQ 구조화 데이터 (검색 결과에 Q&A가 직접 노출!)
export function FaqJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '물탱크 배송비는 얼마인가요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '물탱크는 화물 착불 배송으로, 지역과 제품 규격에 따라 배송비가 달라집니다. 수원 인근(화성, 용인 등) 지역은 직배송으로 운임 절감이 가능합니다. 구매 전 문의주시면 최저가 운임을 안내해 드립니다.',
                },
            },
            {
                '@type': 'Question',
                name: '물탱크 맞춤 제작이 가능한가요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '네, 가능합니다. PE, FRP, SMC 등 다양한 소재로 원하는 형태와 용량으로 맞춤 제작이 가능합니다. 전화(031-236-8227)나 이메일로 문의해 주시면 견적을 안내해 드립니다.',
                },
            },
            {
                '@type': 'Question',
                name: '물탱크 교환/반품이 가능한가요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '제품 자체 결함이나 오배송의 경우 100% 무상 교환 처리합니다. 단순 변심의 경우 왕복 화물비를 고객님이 부담하시며, 설치/개봉 후에는 교환/반품이 불가합니다.',
                },
            },
            {
                '@type': 'Question',
                name: '1톤 원형 물탱크 가격은 얼마인가요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '1톤(1000L) 원형 PE 물탱크는 부가세 포함 기준으로 가격이 책정되어 있습니다. 정확한 가격은 홈페이지 상품 상세 페이지 또는 AI 견적 시스템에서 바로 확인하실 수 있습니다.',
                },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
