import { getProjectById, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { CheckCircle2, Layout, Database, Server, Cpu, TriangleAlert } from "lucide-react";
import { Metadata } from "next";
import ProjectHero from "./ProjectHero";
import ProjectDocumentation from "./ProjectDocumentation";
import ProjectGallery from "./ProjectGallery";
import fs from "fs";
import path from "path";

// Helper function to dynamically read images from public folders with fallbacks
function getProjectImages(project: any): string[] {
  const foldersToTry = [];
  if (project.imageFolder) {
    foldersToTry.push(project.imageFolder);
  }
  // Try ID and Title
  foldersToTry.push(project.id);
  foldersToTry.push(project.title);

  const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];

  for (const folder of foldersToTry) {
    if (!folder) continue;
    const dirPath = path.join(process.cwd(), "public", folder);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      try {
        const files = fs.readdirSync(dirPath);
        const images = files
          .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
          .map((file) => `/${folder}/${file}`);
        if (images.length > 0) {
          return images;
        }
      } catch (e) {
        console.error(`Error reading directory public/${folder}:`, e);
      }
    }
  }

  // Fallback to static list in project.images if we found nothing in folders
  return project.images || [];
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = getProjectById(params.id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const projectImages = getProjectImages(project);

  return (
    <article className="min-h-screen bg-background pb-24 text-foreground selection:bg-accent/30 tracking-tight">
      <ProjectHero project={project} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 z-10 relative">
        <div className="space-y-20">
          {/* Main Content Sections */}
          
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><TriangleAlert className="w-5 h-5" /></span>
              The Problem
            </h2>
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed p-6 rounded-2xl bg-secondary/50 border border-border/50 text-lg">
              {project.problem}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Cpu className="w-5 h-5" /></span>
              Approach & Methodology
            </h2>
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed p-6 rounded-2xl bg-secondary/50 border border-border/50 text-lg">
              {project.approach}
            </div>
          </section>

          {/* Architecture / System Design */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Layout className="w-5 h-5" /></span>
              Architecture & System Design
            </h2>
            <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed p-6 rounded-2xl bg-secondary/50 border border-border/50 border-l-4 border-l-accent text-lg">
              {project.architecture}
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Database className="w-5 h-5" /></span>
              Challenges Faced
            </h2>
            <div className="grid gap-4">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-colors">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-muted-foreground">{challenge}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Results & Impact */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="p-2 rounded-lg bg-accent/10 text-accent"><Server className="w-5 h-5" /></span>
              Results & Impact
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="flex gap-3 p-6 rounded-2xl bg-gradient-to-br from-secondary/50 to-background border border-border/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <p className="text-foreground font-medium">{result}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Documentation Section */}
          {project.documents && project.documents.length > 0 && (
            <ProjectDocumentation documents={project.documents} />
          )}

          {/* Screenshots Section */}
          {projectImages.length > 0 && (
            <ProjectGallery images={projectImages} projectTitle={project.title} />
          )}

        </div>
      </div>
    </article>
  );
}
