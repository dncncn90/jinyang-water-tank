import HeroSection from '@/components/home/HeroSection';
import TrustIndicators from '@/components/home/TrustIndicators';
import CategoryGrid from '@/components/checkout/CategoryGrid';
import GuideLinks from '@/components/home/GuideLinks';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <TrustIndicators />

      {/* Restored E-Commerce Product Listing */}
      <CategoryGrid />

      {/* 실무 자재 가이드 북 섹션 */}
      <GuideLinks />

      <div className="h-24"></div> {/* Spacer for floating button */}
    </main>
  );
}
