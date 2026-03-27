"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, MouseEvent } from "react";
import { DecorativeFloatingShapes } from "@/components/ui/FloatingElements";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12.5deg", "-12.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12.5deg", "12.5deg"]);

  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <DecorativeFloatingShapes />
      {/* Background for vibrant glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-slate-50 dark:bg-slate-950/20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            x: shouldReduceMotion ? 0 : translateX,
            y: shouldReduceMotion ? 0 : translateY,
            transformStyle: "preserve-3d",
          }}
          className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/60 dark:border-white/20 rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] will-change-transform"
        >

          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-slate-600 dark:text-cyan-400 font-medium tracking-wide mb-2">
                Electrical Engineering Undergraduate
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-4 text-slate-800 dark:text-white">
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent block mt-2 pb-2">Sagnick Paul</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl font-light">
                Bridging the gap between software and hardware through
                <span className="text-slate-800 dark:text-slate-200 font-medium"> Artificial Intelligence</span>,
                <span className="text-slate-800 dark:text-slate-200 font-medium"> Machine Learning</span>, and
                <span className="text-slate-800 dark:text-slate-200 font-medium"> Robotics</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#projects"
                className="relative inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-all group overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                {/* Constant Blue Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-accent animate-pulse-slow blur-xl opacity-40 mix-blend-screen pointer-events-none" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <style jsx>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.05); }
                  }
                `}</style>
              </Link>
              <Link
                href="/Sagnick_CV.pdf"
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background hover:bg-muted font-medium transition-colors gap-2"
              >
                <Download className="w-4 h-4" /> Download CV
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-6 items-center pt-4"
            >
              <Link href="https://github.com/Sagnick-Paul" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com/in/sagnick-paul-9aa30a352" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors p-2">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:sp.professional2005@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors p-2">
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 hidden lg:flex justify-end"
          >
            {/* Minimalist Tech Illustration / Placeholder */}
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 dark:from-cyan-500/20 to-transparent rounded-full border border-slate-200 dark:border-slate-800 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 bg-white/40 dark:bg-slate-950/60 backdrop-blur-md rounded-full border border-white dark:border-slate-800 shadow-[0_0_30px_rgba(31,38,135,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.3)]" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-slate-500 dark:text-cyan-400/80 font-mono text-sm">
                [ AI Researcher ] <br /> [ Control Systems ] <br /> [ Data Science ]
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
        <span className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </section>
  );
}
