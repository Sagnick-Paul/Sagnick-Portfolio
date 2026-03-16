"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { DecorativeFloatingShapes } from "@/components/ui/FloatingElements";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
      <DecorativeFloatingShapes />
      {/* Background gradients for abstract dark/light aesthetic */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-background">
        <motion.div 
          style={{ y: blob1Y }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-accent/20 dark:bg-accent/10 pointer-events-none" 
        />
        <motion.div 
          style={{ y: blob2Y }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] bg-blue-500/20 dark:bg-blue-900/20 pointer-events-none" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-accent font-medium tracking-wide mb-2">
                Electrical Engineering Undergraduate
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-4">
                Hi, I'm <span className="text-accent block mt-2">Sagnick Paul</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light">
                Bridging the gap between software and hardware through
                <span className="text-foreground font-medium"> Artificial Intelligence</span>, 
                <span className="text-foreground font-medium"> Machine Learning</span>, and 
                <span className="text-foreground font-medium"> Robotics</span>.
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
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/resume.pdf" // Placeholder, user will provide actual resume
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
            {/* Minimalist Tech Illustration / Avatar Placeholder */}
            <div className="relative w-[400px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-full border border-border/50 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 bg-background rounded-full border border-accent/20" />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-muted-foreground font-mono text-sm">
                [ AI Researcher ] <br/> [ Control Systems ] <br/> [ Data Science ]
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
        <span className="text-xs text-muted-foreground mb-2 tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground" />
      </div>
    </section>
  );
}
