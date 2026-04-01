"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "C", level: 85 },
        { name: "Java", level: 75 },
        { name: "JavaScript", level: 80 },
      ],
    },
    {
      title: "Machine Learning & Data Science",
      skills: [
        { name: "PyTorch", level: 85 },
        { name: "TensorFlow", level: 80 },
        { name: "Scikit-Learn", level: 85 },
        { name: "NumPy & Pandas", level: 90 },
      ],
    },
    {
      title: "Embedded Systems & Hardware",
      skills: [
        { name: "Arduino", level: 90 },
        { name: "ESP32", level: 85 },
        { name: "MPU6050 & IMUs", level: 85 },
        { name: "Motor Drivers (L298N)", level: 90 },
      ],
    },
    {
      title: "Tools & Frameworks",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "MATLAB / Simulink", level: 75 },
        { name: "Kaggle", level: 80 },
        { name: "Streamlit", level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white uppercase italic">
            Neural <span className="neon-text">Capabilities</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">
            Multi-disciplinary expertise across software architecture, artificial intelligence, and physical systems engineering.
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent rounded-full mt-6 mx-auto md:mx-0" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-10 hover:border-blue-500/30 transition-all duration-500 group"
            >
              <h3 className="text-xl font-black mb-10 flex items-center text-slate-900 dark:text-white uppercase tracking-[0.2em] italic border-b border-blue-500/10 pb-4">
                <span className="text-blue-500 mr-4 font-mono">0{categoryIndex + 1}</span>
                {category.title}
              </h3>
              <div className="space-y-8">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex justify-between items-end text-xs font-bold uppercase tracking-widest">
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-blue-500 transition-colors">{skill.name}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-mono italic opacity-60">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-500/5 dark:bg-white/5 rounded-full overflow-hidden border border-blue-500/10 p-[1px]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] relative"
                      >
                        <div className="absolute top-0 right-0 w-2 h-full bg-white opacity-40 blur-[1px] animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
