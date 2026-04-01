"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MotorParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress 0 -> 1 to y: "10%" -> "-10%"
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden py-32 lg:py-48"
    >
      {/* Background Orbital Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] -z-10 pointer-events-none animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 lg:gap-24 items-center h-full relative z-10">

        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-10"
        >
          <div className="space-y-4">
             <div className="flex items-center gap-4">
              <div className="h-0.5 w-12 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono italic">Physical_Core</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-[0.9]">
              The Machine <br /> <span className="neon-text animate-glow-pulse">Behind</span> <br /> the Engineer
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 space-x-2 rounded-full mt-6" />
          </div>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
            Before neural networks and high-level code, there was the <span className="text-blue-600 dark:text-blue-400 font-bold border-b border-blue-500/20">AC Induction Motor</span>. 
            It is the foundation of Electrical Engineering and the very catalyst for my obsession with complex physical systems.
          </p>

          <div className="flex gap-8 items-center pt-6 border-t border-blue-500/10">
             {[
                { label: "Voltage", val: "220V" },
                { label: "Phase", val: "Single" },
                { label: "Freq", val: "50Hz" }
             ].map((spec) => (
                <div key={spec.label}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                    <p className="text-lg font-mono font-bold text-blue-500/80">{spec.val}</p>
                </div>
             ))}
          </div>
        </motion.div>

        {/* Right Column - Parallax Image with Glass/Neon Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-2xl mx-auto rounded-[32px] overflow-hidden glass-card p-4 border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.1)] group"
        >
          {/* Parallax Container with scan-line effect */}
          <div className="relative rounded-[20px] overflow-hidden">
            <div className="absolute inset-x-0 h-[2px] bg-blue-500/30 top-0 z-20 animate-[scan_3s_linear_infinite] shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
            
            <img
                src="/motor.png"
                alt=""
                className="w-full h-auto opacity-0 pointer-events-none"
                aria-hidden="true"
            />

            <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]), scale: 1.1 }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src="/motor.png"
                    alt="AC Induction Motor"
                    fill
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 contrast-125 brightness-110"
                />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
