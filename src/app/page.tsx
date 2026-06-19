import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Philosophy from "@/components/sections/Philosophy";
import Benefits from "@/components/sections/Benefits";
import Pillars from "@/components/sections/Pillars";
import Programs from "@/components/sections/Programs";
import Approach from "@/components/sections/Approach";
import Founder from "@/components/sections/Founder";
import JournalPreview from "@/components/sections/JournalPreview";
import Contact from "@/components/sections/Contact";

// Journal preview pulls the latest published posts at request time.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Philosophy />
        <Benefits />
        <Pillars />
        <Programs />
        <Approach />
        <Founder />
        <JournalPreview />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
