"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, BookOpen, ExternalLink, X, Eye } from "lucide-react";
import { useState } from "react";

export default function Education() {
  const education = [
    {
      institution: "Jadavpur University",
      degree: "B.E. in Electrical Engineering",
      period: "2024–2028",
      details: "GPA: 9.24 / 10",
      description: "Focus on Control Systems, Signals and Systems, Probability and Statistics, and Data Structures.",
    },
    {
      institution: "Don Bosco Liluah",
      degree: "ISC (Class XII) Science",
      period: "Completed",
      details: "Score: 92.5%",
      description: "Strong foundation in Physics, Chemistry, and Mathematics.",
    },
  ];

  const [selectedCert, setSelectedCert] = useState<{ name: string; url: string } | null>(null);

  const certifications = [
    {
      name: "Generative AI, Machine Learning & Intelligent Automation",
      issuer: "IIT Delhi",
      status: "Ongoing",
    },
    {
      name: "Professional Certificate Course in Data Science",
      issuer: "IIT Kanpur",
      status: "Completed",
      url: "/Certificate - E&ICT Academy, IIT Kanpur.pdf",
    },
    {
      name: "Applied Data Science with Python",
      issuer: "Simplilearn",
      status: "Completed",
      url: "/data analysis certificate.pdf",
    },
    {
      name: "Machine Learning",
      issuer: "Simplilearn",
      status: "Completed",
      url: "/Machine Learning Certificate.pdf",
    },
    {
      name: "SQL Foundations",
      issuer: "Simplilearn",
      status: "Completed",
      url: "/SQL certficate.pdf",
    },
  ];

  return (
    <section id="education" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Education & Certifications
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            My academic background and continuous learning journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold flex items-center gap-2 mb-6">
              <GraduationCap className="h-6 w-6 text-accent" />
              Academic Background
            </h3>
            
            <div className="space-y-6 flex flex-col h-full border-l-2 border-muted pl-6 ml-3">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute w-3 h-3 bg-accent rounded-full -left-[31px] top-1.5" />
                  <div className="bg-background border border-border/50 p-6 rounded-2xl hover:border-accent/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-semibold text-foreground">{item.institution}</h4>
                      <span className="text-sm text-accent bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-foreground font-medium mb-1">{item.degree}</p>
                    <p className="text-sm font-semibold text-muted-foreground mb-3">{item.details}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-accent" />
              Professional Certifications
            </h3>
            
            <div className="grid gap-4">
              {certifications.map((cert, index) => (
                <CertificationItem 
                  key={index} 
                  cert={cert} 
                  index={index} 
                  onSelect={(c) => setSelectedCert(c)} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-sm"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[80vh] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-border bg-card/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground line-clamp-1">
                    {selectedCert.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-muted-foreground" />
                </button>
              </div>

              {/* Modal Content - PDF Viewer */}
              <div className="flex-1 bg-muted/30 relative">
                <iframe
                  src={selectedCert.url}
                  className="w-full h-full border-none"
                  title={selectedCert.name}
                />
                
                {/* Fallback link */}
                <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-none">
                  <a 
                    href={selectedCert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Backdrop close area */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={() => setSelectedCert(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CertificationItem({ cert, index, onSelect }: { cert: any, index: number, onSelect: (c: any) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => cert.url && onSelect({ name: cert.name, url: cert.url })}
      className={`group relative flex flex-col bg-background border border-border/50 rounded-2xl transition-all duration-500 ease-in-out ${
        cert.url ? 'cursor-pointer hover:border-accent/50' : ''
      } ${isHovered && cert.url ? 'shadow-[0_0_30px_-5px_hsl(var(--accent)/0.15)] bg-accent/[0.02]' : ''}`}
    >
      <div className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-start gap-4">
          <div className={`p-2 bg-background rounded-lg border border-border transition-colors shrink-0 ${
            isHovered && cert.url ? 'bg-accent/10 border-accent/20' : ''
          }`}>
            <BookOpen className={`h-5 w-5 transition-colors ${
              isHovered && cert.url ? 'text-accent' : 'text-muted-foreground'
            }`} />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1 leading-tight">{cert.name}</h4>
            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
          <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-bold ${
            cert.status === 'Completed' 
              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
              : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
          }`}>
            {cert.status}
          </span>
          {cert.url && (
            <div className="sm:hidden text-accent/50">
              <ExternalLink className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isHovered && cert.url && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center gap-2 text-accent font-semibold text-sm group/btn"
              >
                <div className="flex-1 h-[1px] bg-border transition-colors group-hover/btn:bg-accent/20" />
                <span className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-accent/5 hover:bg-accent/10 transition-all border border-accent/10 hover:border-accent/20 hover:scale-105 active:scale-95">
                  <Eye className="h-4 w-4" />
                  View Certificate
                </span>
                <div className="flex-1 h-[1px] bg-border transition-colors group-hover/btn:bg-accent/20" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
