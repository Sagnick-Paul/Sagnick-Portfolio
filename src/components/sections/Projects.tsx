"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Eye, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { projects, Project } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  // The projects data is now imported from @/data/projects

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Dynamic Parallax Background shapes specific to Projects */}
      <motion.div style={{ y: blob1Y }} className="absolute top-[20%] -left-[10%] w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-[20%] -right-[10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Featured Research & Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            A selection of my recent work focusing on Machine Learning applications and Intelligent Control Systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 5).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`group relative flex flex-col justify-between bg-background border border-border/50 rounded-2xl p-6 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div className="flex gap-3 z-10">
                    {project.links.github && (
                      <Link href={project.links.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub Repo</span>
                      </Link>
                    )}
                    {project.links.live && (
                      <Link href={project.links.live} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        <span className="sr-only">Live Demo</span>
                      </Link>
                    )}
                  </div>
                </div>
                
                <Link href={`/project/${project.id}`} className="absolute inset-0 z-0">
                  <span className="sr-only">View full case study of {project.title}</span>
                </Link>

                <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 4).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border/50">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm font-semibold mt-4">
                  <div className="flex items-center text-accent group-hover:gap-2 transition-all gap-1">
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedProject(project);
                    }}
                    className="relative z-20 flex items-center gap-1.5 text-muted-foreground hover:text-white transition-colors bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center z-10 relative"
        >
          <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium hover:bg-accent hover:text-white transition-all duration-300">
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-secondary/80 border border-border/50 rounded-2xl shadow-2xl overflow-hidden z-10 backdrop-blur-md"
            >
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-background/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h3 className="text-2xl font-bold mb-2 pr-8">{selectedProject.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-1 bg-accent/10 text-accent rounded-md border border-accent/20">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                  <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">The Problem</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4 border-t border-border/50">
                  <Link 
                    href={`/project/${selectedProject.id}`}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent/90 transition-colors w-full sm:w-auto"
                  >
                    Read Full Case Study
                  </Link>
                  {selectedProject.links.github && (
                    <Link 
                      href={selectedProject.links.github}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-background border border-border text-foreground hover:bg-secondary transition-colors w-full sm:w-auto"
                    >
                      <Github className="w-4 h-4" />
                      Source
                    </Link>
                  )}
                  {selectedProject.links.live && (
                    <Link 
                      href={selectedProject.links.live}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-background border border-border text-foreground hover:bg-secondary transition-colors w-full sm:w-auto"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
