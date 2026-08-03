"use client";

import { motion, useReducedMotion, type Variants, type Transition } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const EASE_OUT_QUART = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

  const springTransition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 24,
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.12,
        ease: EASE_OUT_QUART,
      },
    },
  };

  const imageVariants: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.05,
      transition: { duration: 0.5, ease: EASE_OUT_QUART },
    },
  };

  const hoverCardStyle = {
    rest: {
      y: 0,
      boxShadow:
        "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
    },
    hover: {
      y: prefersReducedMotion ? 0 : -8,
      boxShadow:
        "0 8px 32px rgba(37,99,235,0.12), 0 20px 60px rgba(0,0,0,0.15)",
    },
  } as const;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      viewport={{ once: false, amount: 0.2 }}
      whileInView="visible"
      animate={isHovered ? "hover" : "rest"}
      whileHover={isHovered ? "hover" : undefined}
      transition={isHovered ? springTransition : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={hoverCardStyle[isHovered ? "hover" : "rest"]}
      className={`
        group relative flex flex-col overflow-hidden rounded-[22px]
        bg-white dark:bg-[hsl(223,17%,8%)]
        border border-slate-200/80 dark:border-white/[0.07]
        transition-colors duration-300
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        ${isHovered ? "border-blue-400/40 dark:border-blue-500/30" : ""}
      `}
      aria-label={`Project: ${project.title}`}
    >
      {/* ── Thumbnail ─────────────────────────────────── */}
      <div className="relative w-full overflow-hidden aspect-video">
        <motion.div
          variants={imageVariants}
          animate={isHovered ? "hover" : "rest"}
          className="w-full h-full"
        >
          <Image
            src={project.thumbnail}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Gradient fade bottom of image into card content */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-[hsl(223,17%,8%)] to-transparent pointer-events-none" />
      </div>

      {/* ── Content ───────────────────────────────────── */}
      <div className="flex flex-col flex-1 px-7 pb-7 pt-5 gap-4">
        {/* Title */}
        <h3
          className={`
            text-2xl md:text-[1.6rem] font-black tracking-tight leading-tight
            transition-colors duration-300
            ${isHovered
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-900 dark:text-white"
            }
          `}
        >
          {project.title}
        </h3>

        {/* Short description — 2-line clamp */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Metric chips */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex flex-col items-center px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/[0.08] border border-blue-100 dark:border-blue-500/20"
              >
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-500/70 dark:text-blue-400/60">
                  {metric.label}
                </span>
                <span className="text-sm font-black text-blue-700 dark:text-blue-300 mt-0.5">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.05] px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/[0.08] transition-colors group-hover:border-blue-300/50 dark:group-hover:border-blue-500/20"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.04] px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/[0.06]">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action row */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/[0.06]">
          {/* Icon actions */}
          <div className="flex items-center gap-2">
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {project.links.live && (
              <Link
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500/40 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* View Case Study CTA */}
          <Link
            href={`/project/${project.id}`}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-200 focus:outline-none focus-visible:underline"
            aria-label={`View case study for ${project.title}`}
          >
            Case Study <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
