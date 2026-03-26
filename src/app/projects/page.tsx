import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | Portfolio",
  description: "A complete list of my featured and past projects.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[10%] left-[20%] w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            All Projects
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            A comprehensive overview of my work ranging from intelligent control systems and machine learning to software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
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
                  {project.techStack.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-sm font-semibold text-accent group-hover:gap-2 transition-all gap-1 cursor-pointer">
                  <span>View Case Study</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
