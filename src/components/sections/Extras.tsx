"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { Activity, Trophy, Code2 } from "lucide-react";

export default function Extras() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activities = [
    {
      title: "Self-Balancing Robot Workshop",
      description: "Participated in an intensive hands-on workshop focused on designing and programming self-balancing robots using IMU sensors and PID control.",
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      title: "Technical Competitions",
      description: "Active participant in various robotics and AI/ML competitions, continuously applying theoretical knowledge to practical challenges.",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      title: "Science Exhibitions",
      description: "Showcased engineering projects and intelligent systems at local science exhibitions, promoting technology and innovation.",
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <section id="extras" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center lg:text-left"
        >
          <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start">
            <div className="h-0.5 w-12 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono italic">Extended Operations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
            Beyond the <span className="neon-text">Classroom</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium mt-6 mx-auto lg:mx-0">
            Open source contributions and high-impact extracurricular engagement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-10 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all opacity-0 group-hover:opacity-100" />
            
            <h3 className="text-xl font-black mb-10 flex items-center gap-4 text-slate-900 dark:text-white uppercase italic tracking-widest font-mono">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-glow-pulse" />
              OSS_CONTRIBUTIONS
            </h3>
            <div className="overflow-x-auto pb-6 custom-scrollbar">
              <div className="min-w-[800px] filter saturate-150 brightness-110">
                {mounted ? (
                  <GitHubCalendar
                    username="Sagnick-Paul"
                    colorScheme={theme === "dark" || theme === "system" ? "dark" : "light"}
                    fontSize={12}
                    blockRadius={4}
                  />
                ) : (
                  <div className="h-[150px] w-full animate-pulse bg-blue-500/5 rounded-2xl border border-blue-500/10" />
                )}
              </div>
            </div>
            <p className="mt-6 text-[10px] font-black text-blue-500/40 uppercase tracking-[0.4em] text-right">Commit History Streamed</p>
          </motion.div>

          {/* Extra Activities */}
          <div className="space-y-8">
            <h3 className="text-xl font-black mb-6 flex items-center gap-4 text-slate-900 dark:text-white uppercase italic tracking-widest font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              ENGAGEMENT_DATA
            </h3>
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-8 p-8 glass-card hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-500 transition-all duration-500">
                  <div className="text-blue-600 dark:text-blue-400">{activity.icon}</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 uppercase italic tracking-tight">{activity.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
