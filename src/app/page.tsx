import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <FeaturedProjectsSection />
    </div>
  );
}

