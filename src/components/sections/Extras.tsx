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
    <section id="extras" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Beyond the Classroom
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg mx-auto lg:mx-0">
            Open source contributions and extracurricular activities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-background border border-border/50 p-6 md:p-8 rounded-3xl"
          >
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              GitHub Activity
            </h3>
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[800px]">
                {mounted ? (
                  <GitHubCalendar 
                    username="Sagnick-Paul"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                  />
                ) : (
                  <div className="h-[150px] w-full animate-pulse bg-muted/50 rounded-lg"></div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Extra Activities */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Activities & Engagement
            </h3>
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 bg-background rounded-2xl border border-border/50 hover:border-accent/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  {activity.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">{activity.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
