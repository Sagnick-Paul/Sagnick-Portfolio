import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Journey from "@/components/sections/Journey";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";
import Extras from "@/components/sections/Extras";

const MotorParallaxSection = dynamic(() => import("@/components/sections/MotorParallaxSection"), {
  ssr: false,
});

const AIParallaxSection = dynamic(() => import("@/components/sections/AIParallaxSection"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <MotorParallaxSection />
      <AIParallaxSection />
      <About />
      <Education />
      <Journey />
      <Projects />
      <Skills />
      <Research />
      <Extras />
      <Contact />
    </div>
  );
}
