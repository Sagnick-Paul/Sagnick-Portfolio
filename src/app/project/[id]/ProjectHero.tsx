"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Project } from "@/data/projects";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none opacity-40" />

      {/* Glass Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden"
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="p-8 sm:p-12 md:p-16 flex flex-col items-center text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-wide uppercase">Back to Projects</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 text-xs font-medium tracking-wide rounded-full bg-white/10 text-gray-200 border border-white/10 backdrop-blur-md"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl leading-relaxed"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 w-full sm:w-auto"
          >
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                <Github className="w-5 h-5" />
                View Source Code
              </Link>
            )}
            {project.links.live && (
              <Link
                href={project.links.live}
                target="_blank"
                className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/10 w-full sm:w-auto"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
      {/* Gradient fade to white */}
      <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />
    </div>
  );
}
