import HeroSection from "@/components/HeroSection";
import MainSection from "@/components/MainSection";
import MethodologySection from "@/components/MethodologySection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MainSection />
      <MethodologySection />
      <FooterSection />
    </div>
  );
}
