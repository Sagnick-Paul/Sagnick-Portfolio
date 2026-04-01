"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, LocateFixed, Network } from "lucide-react";

export default function Research() {
  const interests = [
    {
      title: "Machine Learning & Deep Learning",
      icon: <Brain className="w-6 h-6" />,
      description: "Developing robust neural architectures for complex pattern recognition, computer vision, and predictive analytics.",
    },
    {
      title: "Intelligent Robotics",
      icon: <LocateFixed className="w-6 h-6" />,
      description: "Applying AI methodologies to physical systems to enable autonomous navigation, perception, and decision making.",
    },
    {
      title: "Control Systems & Optimization",
      icon: <Network className="w-6 h-6" />,
      description: "Bridging classical control theory (PID, state-space) with modern intelligent control algorithms.",
    },
    {
      title: "Embedded AI",
      icon: <Cpu className="w-6 h-6" />,
      description: "Deploying lightweight ML models on resource-constrained hardware and microcontrollers for real-time edge computing.",
    },
  ];

  return (
    <section id="research" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-10"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-0.5 w-12 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono italic">Investigation Scope</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
              Research <span className="neon-text">Focus</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
              Developing a unified framework for intelligent autonomy by bridging advanced neural architectures with precision physical control.
            </p>
            <div className="pt-8 space-y-4 border-t border-blue-500/10">
              <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Core Competencies</h4>
              {[
                "Artificial Intelligence",
                "Kinematics & Control",
                "Autonomous Navigation",
                "Embedded Optimization"
              ].map((comp) => (
                <div key={comp} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-blue-500/30 group-hover:bg-blue-500 group-hover:scale-125 transition-all" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors uppercase tracking-widest">{comp}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
            {interests.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] transition-all duration-500 group"
              >
                <div className="w-14 h-14 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/10 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-slate-900 dark:text-white uppercase italic tracking-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
