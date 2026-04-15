"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden backdrop-blur-[6px] dark:backdrop-blur-[10px] transition-all duration-1000">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-8 md:p-16 relative overflow-hidden border-white/20 dark:border-blue-500/20 shadow-2xl"
        >
          {/* Header with neon underline */}
          <div className="relative mb-12 inline-block">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              About Me<span className="text-blue-500">_</span>
            </h2>
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
          </div>
          
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-8">
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">
                I am an <span className="text-blue-600 dark:text-blue-400 font-bold border-b border-blue-500/30">Electrical Engineering</span> undergraduate at 
                <span className="text-slate-900 dark:text-white font-semibold"> Jadavpur University</span>. 
                My mission is to architect the future of autonomous systems through the synthesis of intelligence and control.
              </p>
              
              <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium space-y-6">
                <p>
                  Specializing at the nexus of <span className="text-blue-500">Artificial Intelligence</span>, 
                  <span className="text-blue-500"> Control Systems</span>, and <span className="text-blue-500">Robotics</span>, 
                  I focus on transforming theoretical algorithms into capable physical agents.
                </p>
                <p>
                  My research interests lean towards <span className="italic text-cyan-500">Computer Vision</span> for navigation, 
                  <span className="italic text-cyan-500">Reinforcement Learning</span> for complex task execution, 
                  and <span className="italic text-cyan-500">Embedded Systems</span> optimization.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
              {[
                { label: "Education", value: "B.E. EE, Jadavpur University", icon: "01" },
                { label: "Interests", value: "Deep Learning, Embedded Systems, Robotics", icon: "02" },
                { label: "Location", value: "Kolkata, India", icon: "03" },
                { label: "Available for", value: "Internships & Research", icon: "04" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-blue-500/10 dark:bg-blue-500/5 hover:bg-blue-500/10 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-blue-500 font-bold">{item.icon}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</h3>
                  <p className="text-slate-900 dark:text-white font-semibold text-sm">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
