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
    <section id="research" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Research Interests & <br/><span className="text-accent text-opacity-90">Current Focus</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My core philosophy lies in synthesizing software algorithms with physical platforms. 
              I am constantly exploring new dimensions in autonomous systems and applied AI.
            </p>
            <div className="pt-4 space-y-3">
              <h4 className="font-semibold text-foreground uppercase tracking-widest text-sm mb-4">Core Competencies</h4>
              <p className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                <span className="w-2 h-2 rounded-full bg-accent"></span> Artificial Intelligence
              </p>
              <p className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                <span className="w-2 h-2 rounded-full bg-accent"></span> AI for Physical Systems
              </p>
              <p className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                <span className="w-2 h-2 rounded-full bg-accent"></span> Autonomous Systems
              </p>
              <p className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                <span className="w-2 h-2 rounded-full bg-accent"></span> Data Structures & Algorithms
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {interests.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border/50 p-6 rounded-2xl hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all"
              >
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
