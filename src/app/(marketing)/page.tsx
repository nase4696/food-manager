import { FeatureSection } from "@/components/home/feature-section";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <HeroSection />
      <FeatureSection />
      {/* CTA ボタン設置する */}
    </div>
  );
}
