import { HeroSection } from "@/components/home/hero-section";
import { Dashboard } from "@/components/home/dashboard";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Dashboard />
    </div>
  );
}
