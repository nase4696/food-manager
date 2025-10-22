import { CtaSection } from "@/components/home/cta-section";
import { FeatureSection } from "@/components/home/feature-section";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-8 bg-gradient-to-b from-green-50 to-white">
      <HeroSection />
      <FeatureSection />
      <CtaSection />
    </div>
  );
}
