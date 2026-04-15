"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AIParallaxSection() {
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
      {/* Background Orbital Glow - Cyan/Indigo hybrid for AI feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[150px] -z-10 pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 lg:gap-24 items-center h-full relative z-10">

        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-12 bg-cyan-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600 dark:text-cyan-400 font-mono italic">Neural_Foundation</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-[0.9]">
              The Ghost <br /> <span className="neon-text animate-glow-pulse">In The</span> <br /> Machine
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 space-x-2 rounded-full mt-6" />
          </div>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
            Beyond physical rotors lies the architecture of the mind. From <span className="text-cyan-600 dark:text-cyan-400 font-bold border-b border-cyan-500/20">Transformers</span> to <span className="text-blue-600 dark:text-blue-400 font-bold border-b border-blue-500/20">Generative Adversarial Networks</span>, I explore the frontier where silicon meets cognition.
          </p>

          <div className="flex gap-8 items-center pt-6 border-t border-cyan-500/10">
            {[
              { label: "Layers", val: "96+" },
              { label: "Parameters", val: "175B" },
              { label: "Latency", val: "<50ms" }
            ].map((spec) => (
              <div key={spec.label}>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                <p className="text-lg font-mono font-bold text-cyan-500/80">{spec.val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Parallax Image with Glass/Neon Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-2xl mx-auto rounded-[32px] overflow-hidden glass-card p-4 border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)] group"
        >
          {/* Parallax Container with scan-line effect */}
          <div className="relative rounded-[20px] overflow-hidden">
            <div className="absolute inset-x-0 h-[2px] bg-cyan-500/30 top-0 z-20 animate-[scan_3s_linear_infinite] shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

            {/* Aspect Ratio Sizer */}
            <img
              src="/ai-section.png"
              alt=""
              className="w-full h-auto opacity-0 pointer-events-none"
              aria-hidden="true"
            />

            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]), scale: 1.1 }}
              whileHover={{ scale: 1.15 }}
              className="absolute inset-0 w-full h-full transition-transform duration-500"
            >
              <Image
                src="/ai-section.png"
                alt="Modern AI Architecture"
                fill
                className="object-cover object-center contrast-125 brightness-120 saturate-110"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
