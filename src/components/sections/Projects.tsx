"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  const projects = [
    {
      title: "Brain MRI Tumor Segmentation",
      description: "CNN-based medical image segmentation with preprocessing, augmentation, and model evaluation using Dice coefficient. Deployed via Streamlit.",
      tags: ["Deep Learning", "CNN", "Streamlit", "Medical AI"],
      github: "https://github.com/Sagnick-Paul/NeuroSeg-Brain-MRI-Segmentation",
      live: "https://neuroseg-brain-mri-segmentation-krmujvucnpbhpyw4coyjgy.streamlit.app/",
      featured: true,
    },
    {
      title: "Self Balancing Robot",
      description: "Designed a two-wheel self-balancing robot utilizing MPU6050 IMU sensors and implemented PID-based real-time stabilization using embedded control systems.",
      tags: ["Robotics", "PID Control", "Embedded C", "Arduino", "IMU"],
      github: "https://github.com/Sagnick-Paul", // Placeholder, add specific link if available
      featured: true,
    },
    {
      title: "Jet Image Classification & Anomaly Detection",
      description: "Built a Convolutional Neural Network (CNN) classifier for jet image data. Applied PCA for dimensionality reduction and utilized an autoencoder for advanced anomaly detection.",
      tags: ["Machine Learning", "Autoencoders", "PCA", "CNN"],
      github: "https://github.com/Sagnick-Paul/Jet-Image-Classification-CNN",
    },
    {
      title: "Employee Turnover Analytics",
      description: "Developed classification models and performed Exploratory Data Analysis (EDA) to predict employee attrition and identify key driving factors.",
      tags: ["Data Science", "Classification", "EDA", "Python"],
      github: "https://github.com/Sagnick-Paul",
    },
    {
      title: "Song Cohort Analysis",
      description: "Performed cohort and clustering-based analysis to study music consumption behavior, utilizing unsupervised learning techniques.",
      tags: ["Clustering", "Unsupervised Learning", "Data Analysis"],
      github: "https://github.com/Sagnick-Paul",
    },
  ];

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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className={`group relative flex flex-col justify-between bg-background border border-border/50 rounded-2xl p-6 hover:-translate-y-2 hover:border-accent/50 transition-all ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg text-accent">
                    {/* Folder Icon Equivalent */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  </div>
                  <div className="flex gap-3">
                    {project.github && (
                      <Link href={project.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub Repo</span>
                      </Link>
                    )}
                    {project.live && (
                      <Link href={project.live} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        <span className="sr-only">Live Demo</span>
                      </Link>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
