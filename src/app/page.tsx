import { HeroSection } from "@/components/home/hero-section";
import { Dashboard } from "@/components/home/dashboard";
import { TokenEconomyPanel } from "@/components/home/token-economy-panel";
import { SustainabilityScoreboard } from "@/components/home/sustainability-scoreboard";
import { GeoMappedImpactTracker } from "@/components/home/geo-mapped-impact-tracker";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Dashboard />
      <div className="container mx-auto py-16 sm:py-24 space-y-24">
        <TokenEconomyPanel />
        <SustainabilityScoreboard />
        <GeoMappedImpactTracker />
      </div>
    </div>
  );
}
