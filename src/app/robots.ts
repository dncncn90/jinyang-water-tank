import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/mypage/', '/cart/'],
            },
            {
                // 네이버 봇 전용 허용
                userAgent: 'Yeti',
                allow: '/',
            },
        ],
        sitemap: 'https://www.진양건재.com/sitemap.xml',
        host: 'https://www.진양건재.com',
    };
}
