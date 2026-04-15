import dynamic from "next/dynamic";
import Image from "next/image";
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
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Persistent Background Texture - Dark Mode Only */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden dark:block opacity-45 transition-opacity duration-1000">
        <Image
          src="/scroll-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-10">
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
    </div>
  );
}
