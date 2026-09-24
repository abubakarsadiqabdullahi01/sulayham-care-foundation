import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { VisionMission } from "@/components/VisionMission";
import { ThematicAreas } from "@/components/ThematicAreas";
import { ContextData } from "@/components/ContextData";
import { CoverageMap } from "@/components/CoverageMap";
import { Organogram } from "@/components/Organogram";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <VisionMission />
        <ThematicAreas />
        <ContextData />
        <CoverageMap />
        <Organogram />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
