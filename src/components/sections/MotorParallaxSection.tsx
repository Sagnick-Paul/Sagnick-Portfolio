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
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center h-full">

        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-6 z-10"
        >
          <div className="space-y-2">
            <span className="text-sm font-bold tracking-[0.2em] text-blue-600 dark:text-cyan-400 uppercase">
              ENGINEERING IDENTITY
            </span>
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                The Machine Behind <br /> the Engineer
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                className="h-1 bg-blue-500/50 dark:bg-cyan-500/50 mt-2 rounded-full"
              />
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-light">
            Before AI and code, there was the motor. The AC induction motor is the foundation of Electrical Engineering — and the reason I chose this field. Every winding, every bearing, every lamination has a purpose.
          </p>
        </motion.div>

        {/* Right Column - Parallax Image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-white/5"
        >
          {/* Hidden image to size the container to the image's intrinsic aspect ratio */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/motor.png"
            alt=""
            className="w-full h-auto opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Absolute parallax container */}
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]), scale: 1.06 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/motor.png"
              alt="AC Induction Motor"
              fill
              className="object-cover object-center"
            />
            {/* Soft dark gradient overlay on the left edge - Reduced opacity */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-50/0 dark:from-slate-950/20 via-transparent to-transparent hidden lg:block" />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative Element - Even more subtle */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/[0.02] dark:bg-cyan-500/[0.02] blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
}
