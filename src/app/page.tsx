import HeroSection from '@/components/home/HeroSection';
import TrustIndicators from '@/components/home/TrustIndicators';
import CategoryGrid from '@/components/checkout/CategoryGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <TrustIndicators />

      {/* Restored E-Commerce Product Listing */}
      <CategoryGrid />

      <div className="h-24"></div> {/* Spacer for floating button */}
    </main>
  );
}
