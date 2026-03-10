import { HeroSection } from "@/components/sections/HeroSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <FeaturedProjectsSection />
      <CtaSection />
    </>
  );
}
