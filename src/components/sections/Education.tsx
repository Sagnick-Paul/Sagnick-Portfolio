"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

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
    },
    {
      name: "Applied Data Science with Python",
      issuer: "Simplilearn",
      status: "Completed",
    },
    {
      name: "Machine Learning",
      issuer: "Simplilearn",
      status: "Completed",
    },
    {
      name: "SQL Foundations",
      issuer: "Simplilearn",
      status: "Completed",
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
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex flex-col sm:flex-row justify-between sm:items-center bg-background border border-border/50 p-5 rounded-2xl gap-4 hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-background rounded-lg border border-border group-hover:bg-accent/10 transition-colors shrink-0">
                      <BookOpen className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1 leading-tight">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap self-start sm:self-auto ${
                    cert.status === 'Completed' 
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                      : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {cert.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
