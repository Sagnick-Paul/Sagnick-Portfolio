"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // lower means slower (further away) e.g., 0.5 to 1.5
  direction?: "up" | "down";
}

export function ParallaxElement({ children, className, depth = 1, direction = "up" }: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = direction === "up" ? -100 * depth : 100 * depth;
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Pre-defined decorative elements for the background
export function DecorativeFloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <ParallaxElement depth={1.2} direction="up" className="absolute top-[15%] right-[10%] text-primary/10">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </ParallaxElement>
      <ParallaxElement depth={0.8} direction="down" className="absolute top-[45%] left-[5%] text-accent/10">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </ParallaxElement>
      <ParallaxElement depth={1.5} direction="up" className="absolute bottom-[20%] left-[15%] text-blue-500/10">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect width="8" height="8" x="8" y="8" transform="rotate(45 12 12)"></rect>
        </svg>
      </ParallaxElement>
      <ParallaxElement depth={1.1} direction="down" className="absolute top-[70%] right-[15%] text-purple-500/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 22 22 2 22"></polygon>
        </svg>
      </ParallaxElement>
    </div>
  );
}
