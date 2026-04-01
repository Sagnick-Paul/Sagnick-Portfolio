"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, MouseEvent } from "react";
import { GridBackground } from "@/components/ui/GridBackground";

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

  const roles = ["AI Researcher", "Control Systems", "Data Science"];

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <GridBackground />
      
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
          className="flex flex-col lg:flex-row items-center justify-between gap-12 glass-card p-8 md:p-16 relative overflow-hidden group/card transition-all duration-700"
        >
          {/* Subtle Internal Glow */}
          <div className="absolute -inset-[100%] bg-gradient-to-tr from-blue-500/5 via-transparent to-cyan-500/5 group-hover/card:animate-pulse -z-10" />

          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {roles.map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full"
                  >
                    {role}
                  </motion.span>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9] mb-4 text-slate-900 dark:text-white">
                Hi, I'm <br />
                <span className="neon-text animate-glow-pulse block py-2 drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                  Sagnick Paul
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
                Engineering intelligent systems with 
                <span className="text-blue-600 dark:text-blue-400 font-bold mx-1">Advanced AI</span>, 
                <span className="text-cyan-600 dark:text-cyan-400 font-bold mx-1">Control Theory</span>, 
                and <span className="text-indigo-600 dark:text-indigo-400 font-bold mx-1">Scalable Software</span> architectures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link
                href="#projects"
                className="relative inline-flex items-center justify-center px-10 py-4 rounded-xl bg-blue-600 text-white font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] overflow-hidden group/btn"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Systems <ArrowDown className="w-4 h-4 transition-transform group-hover/btn:translate-y-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              </Link>
              <Link
                href="/Sagnick_CV.pdf"
                target="_blank"
                className="inline-flex items-center justify-center px-10 py-4 rounded-xl border-2 border-blue-500/30 dark:border-blue-400/20 bg-transparent text-slate-700 dark:text-slate-300 font-bold tracking-widest text-sm uppercase transition-all duration-300 hover:bg-blue-500/5 hover:border-blue-500/50 gap-2"
              >
                <Download className="w-4 h-4" /> Download Resume
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex gap-4 items-center pt-8 border-t border-blue-500/10"
            >
              {[
                { icon: Github, href: "https://github.com/Sagnick-Paul", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/sagnick-paul-9aa30a352", label: "LinkedIn" },
                { icon: Mail, href: "mailto:sp.professional2005@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <Link 
                  key={label}
                  href={href} 
                  target="_blank" 
                  className="w-12 h-12 flex items-center justify-center rounded-xl border border-blue-500/10 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/30 dark:hover:bg-blue-500/10 transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-125 group-hover:rotate-6" />
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
            className="flex-1 hidden lg:flex justify-end relative"
          >
            {/* Holographic AI Terminal Background */}
            <div className="relative w-[450px] h-[450px] flex items-center justify-center">
              {/* Spinning Orbital Rings */}
              <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-blue-400/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border-[2px] border-dashed border-cyan-400/15 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full border border-indigo-400/10 animate-[spin_30s_linear_infinite]" />
              
              {/* Central Core */}
              <div className="relative z-10 w-64 h-64 bg-[#030712] dark:bg-[#030712] rounded-3xl border-2 border-blue-500/30 shadow-[0_0_50px_rgba(37,99,235,0.2)] dark:shadow-[0_0_80px_rgba(37,99,235,0.4)] overflow-hidden flex flex-col p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <div className="ml-auto text-[10px] font-mono text-blue-500 opacity-50 uppercase tracking-tighter">Status: Active</div>
                </div>
                <div className="flex-1 font-mono text-[11px] space-y-2 text-blue-400/80 overflow-hidden leading-tight">
                  <p className="animate-pulse">_initializing system...</p>
                  <p className="text-cyan-400">Loading Neural_Architecture</p>
                  <p className="text-white/40">{">>"} SCANNING HARDWARE...</p>
                  <p className="text-green-400/60">{">"} MOTOR_CONTROL: OK</p>
                  <p className="text-green-400/60">{">"} PID_LOOP: STABLE</p>
                  <p className="text-green-400/60">{">"} COMPUTER_VISION: READY</p>
                  <div className="w-full h-1 bg-blue-900/50 rounded-full overflow-hidden mt-4">
                    <motion.div 
                      animate={{ width: ["0%", "85%", "40%", "100%"] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                  <p className="pt-4 text-[9px] opacity-30">HEX_DUMP 0xFF3102 - 0x00A1BC</p>
                </div>
              </div>

              {/* Float Effect for the Core */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-blue-500 font-bold tracking-[0.4em] uppercase">Initialize Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
