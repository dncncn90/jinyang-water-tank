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
        alternateName: ['진양PVC건재총판', '진양PVC건재', '진양배관자재', '진양PVC배관', '진양탱크', '진양수조', '진양물탱크'],
        description: '수원 30년 경력의 PE 물탱크, 저수조 및 친환경 야자매트 공식 판매처 진양건재(진양PVC건재총판). PVC 배관자재(VG1/VG2하수관, 이중벽관), PE수도관(VP/CPVC), CD/ELP전선관, XL/PB냉온수관, 배관 부속 자재 전국 최저가 및 당일 직배송 도소매 전문 건재상.',
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
                name: '농업용 및 농약용 백색 물탱크의 장점은 무엇인가요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '농약용 백색 물탱크는 몸체가 투명/백색에 가까워 외부에서 액체의 잔량을 쉽게 육안으로 확인할 수 있어 농약 희석 및 방제 작업 시 매우 편리합니다. 내화학성이 우수한 고밀도 PE 재질로 제작되어 약품 보관에 최적화되어 있습니다.',
                },
            },
            {
                '@type': 'Question',
                name: '지하 매립형(매설용) 물탱크 설치 시 찌그러짐을 방지하려면 어떻게 하나요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '매설용 물탱크는 강력한 토압을 견디도록 설계된 특수 U시리즈 이중 보강벽 탱크를 사용해야 합니다. 시공 시 바닥에 콘크리트 기초 및 모래 포설을 진행하고, 탱크 내부에 물을 가득 채운 상태에서 주변을 고운 모래로 메워 토압이 골고루 분산되도록 시공해야 장기적인 찌그러짐을 예방할 수 있습니다.',
                },
            },
            {
                '@type': 'Question',
                name: '야자매트(코코넛 보행매트) 규격과 고정핀 설치 개수는 어떻게 되나요?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '친환경 야자매트는 보통 너비 0.6m, 0.8m, 1.0m, 1.2m, 1.5m, 2.0m 규격에 길이는 10m 단위로 판매됩니다. 보행로 상태에 따라 매트가 밀리지 않도록 고정하는 U자형 철근핀(고정핀)을 10m당 최소 15개에서 최대 30개까지 사용하여 꼼꼼하게 설치해야 안전하게 사용하실 수 있습니다.',
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
