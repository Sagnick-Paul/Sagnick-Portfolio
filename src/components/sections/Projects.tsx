"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Eye, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { projects, Project } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  // The projects data is now imported from @/data/projects

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative overflow-hidden">
      {/* Dynamic Tech Orbs */}
      <motion.div style={{ y: blob1Y }} className="absolute top-[10%] -left-[5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-[10%] -right-[5%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-0.5 w-12 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono">Systems Catalog</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
            Featured <span className="neon-text">Research</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium mt-6">
            Engineering robust architectures at the intersection of Machine Learning and physical control systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 5).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className={`group relative flex flex-col justify-between glass-card p-8 hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(37,99,235,0.15)] transition-all duration-700 ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              {/* Card Glow Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/15 transition-all opacity-0 group-hover:opacity-100" />
              
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div className="flex gap-4 z-10">
                    {project.links.github && (
                      <Link href={project.links.github} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-xl border border-blue-500/10 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                        <Github className="w-5 h-5" />
                      </Link>
                    )}
                    {project.links.live && (
                      <Link href={project.links.live} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-xl border border-blue-500/10 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
                
                <h3 className="text-2xl font-black tracking-tight mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase italic">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto space-y-8">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-[10px] font-black uppercase tracking-widest text-blue-600/70 dark:text-blue-400/60 bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/10 group-hover:border-blue-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-500/5 px-3 py-1.5 rounded-lg border border-slate-500/10">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-blue-500/10">
                  <Link 
                    href={`/project/${project.id}`}
                    className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 group-hover:gap-5 transition-all"
                  >
                    Analysis Report <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProject(project);
                    }}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
                  >
                    <Eye className="w-4 h-4" /> Quick Scan
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20 text-center z-10 relative"
        >
          <Link href="/projects" className="inline-flex items-center gap-4 px-10 py-4 rounded-xl bg-blue-600 text-white font-black tracking-[0.2em] text-xs uppercase hover:bg-blue-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] group">
            Access Full Archive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 bg-slate-900/70 dark:bg-black/80 backdrop-blur-lg"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[hsl(var(--background))] dark:bg-slate-950 border border-blue-500/20 rounded-[32px] shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden z-10"
            >
              <div className="p-10 relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-8 right-8 p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-0.5 w-8 bg-blue-600" />
                  <span className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase font-mono italic">Diagnostic Report</span>
                </div>
                
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-8 pr-12 uppercase italic">{selectedProject.title}</h3>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-8 mb-12">
                  <div>
                    <h4 className="text-[10px] font-black text-blue-500/60 uppercase tracking-[0.3em] mb-3">Overview</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-blue-500/60 uppercase tracking-[0.3em] mb-3">Target Objective</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                      {selectedProject.problem}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-200 dark:border-white/5">
                  <Link 
                    href={`/project/${selectedProject.id}`}
                    className="flex-1 min-w-[200px] flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-black tracking-[0.2em] text-xs uppercase hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                  >
                    Examine Architecture
                  </Link>
                  <div className="flex gap-4">
                    {selectedProject.links.github && (
                      <Link 
                        href={selectedProject.links.github}
                        target="_blank"
                        className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                      >
                        <Github className="w-6 h-6" />
                      </Link>
                    )}
                    {selectedProject.links.live && (
                      <Link 
                        href={selectedProject.links.live}
                        target="_blank"
                        className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                      >
                        <ExternalLink className="w-6 h-6" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
