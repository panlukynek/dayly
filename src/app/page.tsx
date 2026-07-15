import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Vision from "@/components/home/Vision";
import ProductTeaser from "@/components/home/ProductTeaser";
import DayTimeline from "@/components/home/DayTimeline";
import StatsBand from "@/components/home/StatsBand";
import CtaSection from "@/components/ui/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Vision />
      <ProductTeaser />
      <DayTimeline />
      <StatsBand />
      <CtaSection />
    </>
  );
}
