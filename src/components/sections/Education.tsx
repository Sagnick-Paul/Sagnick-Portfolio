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

  return (    <section id="education" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
            Educational <span className="neon-text">Vector</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">
            Academic milestones and specialized certifications in intelligent systems.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-transparent rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education Column */}
          <div className="space-y-10">
            <h3 className="text-xl font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <GraduationCap className="h-5 w-5" />
              </div>
              Academics
            </h3>
            
            <div className="space-y-12 relative pl-16 before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-blue-600 before:via-blue-400 before:to-transparent dark:before:from-blue-500 dark:before:via-blue-500/50 dark:before:to-transparent">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute w-4 h-4 bg-blue-600 dark:bg-blue-500 rounded-full left-[-48px] top-3 shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:scale-125 transition-transform z-10" />
                  <div className="glass-card p-8 group-hover:border-blue-500/30 transition-all duration-500 relative z-0">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.institution}
                      </h4>
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/10 px-4 py-2 rounded-lg border border-blue-500/20 shadow-sm">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">{item.degree}</p>
                    <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mb-4">{item.details}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="space-y-10">
            <h3 className="text-xl font-bold uppercase tracking-[0.3em] flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Award className="h-5 w-5" />
              </div>
              Certifications
            </h3>
            
            <div className="grid gap-6">
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

      {/* Modal remains same but with updated glass-card styles */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-[#030712]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#030712] border border-blue-500/20 rounded-[32px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-blue-500/10 bg-blue-500/5">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Award className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white line-clamp-1 italic tracking-tight">
                    {selectedCert.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-all active:scale-90"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedCert.url}
                  className="w-full h-full border-none"
                  title={selectedCert.name}
                />
                
                <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none">
                  <a 
                    href={selectedCert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pointer-events-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 transition-all flex items-center gap-3"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Expand View
                  </a>
                </div>
              </div>
            </motion.div>
            <div className="absolute inset-0 -z-10" onClick={() => setSelectedCert(null)} />
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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => cert.url && onSelect({ name: cert.name, url: cert.url })}
      className={`group relative flex flex-col glass-card border-blue-500/10 transition-all duration-500 overflow-hidden ${
        cert.url ? 'cursor-pointer' : ''
      } ${isHovered && cert.url ? 'border-blue-500/40 shadow-[0_0_40px_rgba(37,99,235,0.1)] -translate-y-1' : ''}`}
    >
      <div className="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-6">
        <div className="flex items-start gap-5">
          <div className={`p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 transition-all duration-500 ${
            isHovered && cert.url ? 'bg-blue-500/20 border-blue-500/40 scale-110 rotate-3' : ''
          }`}>
            <BookOpen className={`h-6 w-6 transition-colors ${
              isHovered && cert.url ? 'text-blue-400' : 'text-slate-400'
            }`} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight mb-1">{cert.name}</h4>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{cert.issuer}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg border-2 ${
            cert.status === 'Completed' 
              ? 'border-green-500/20 text-green-600 dark:text-green-400 bg-green-500/5' 
              : 'border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5'
          }`}>
            {cert.status}
          </span>
          {cert.url && (
            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              <Eye className="h-5 w-5 text-blue-500" />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isHovered && cert.url && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ width: 0 }}
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-400"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

