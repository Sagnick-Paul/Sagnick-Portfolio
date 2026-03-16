"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Code, Zap, Database, Brain, Bot, Network, ChevronDown, ChevronUp } from "lucide-react";

interface Milestone {
    id: number;
    year: string;
    title: string;
    shortDesc: string;
    longDesc: string[];
    icon: React.ElementType;
}

const milestones: Milestone[] = [
    {
        id: 1,
        year: "2023",
        title: "Started Programming",
        shortDesc: "Began learning programming fundamentals and explored Python.",
        longDesc: [
            "Mastered core programming concepts including data structures and object-oriented programming.",
            "Developed foundational Python skills that would later support advanced AI/ML work."
        ],
        icon: Code,
    },
    {
        id: 2,
        year: "2024",
        title: "Entered Electrical Engineering",
        shortDesc: "Joined Jadavpur University as an EE undergraduate. Started exploring ML.",
        longDesc: [
            "Began a rigorous academic journey in Electrical Engineering at one of India's premier engineering institutes.",
            "Initiated self-directed study into Machine Learning and Data Science fundamentals."
        ],
        icon: Zap,
    },
    {
        id: 3,
        year: "2024",
        title: "First AI Projects",
        shortDesc: "Built machine learning models using Python, NumPy, and Scikit-learn.",
        longDesc: [
            "Successfully implemented and evaluated predictive models.",
            "Completed comprehensive foundational courses in Data Science, bridging theoretical knowledge with practical coding."
        ],
        icon: Database,
    },
    {
        id: 4,
        year: "2025",
        title: "Deep Learning & Computer Vision",
        shortDesc: "Developed CNN-based projects including brain MRI tumor segmentation.",
        longDesc: [
            "Designed and trained Convolutional Neural Networks (CNNs) for medical image analysis.",
            "Gained hands-on experience with image preprocessing, data augmentation, and model evaluation metrics like Dice coefficient."
        ],
        icon: Brain,
    },
    {
        id: 5,
        year: "2025",
        title: "Robotics & Control Systems",
        shortDesc: "Built a self-balancing robot using MPU6050 and PID control.",
        longDesc: [
            "Successfully integrated complex embedded systems hardware with real-time feedback control algorithms.",
            "Applied theoretical control system knowledge to a physical, tangible robotics project."
        ],
        icon: Bot,
    },
    {
        id: 6,
        year: "2026",
        title: "Advanced AI Development",
        shortDesc: "Working on ML research, robotics systems, and intelligent control.",
        longDesc: [
            "Focusing on the intersection of deep learning and physical systems.",
            "Pushing the boundaries of intelligent control applications in real-world scenarios."
        ],
        icon: Network,
    },
];

const TimelineNode = ({ isEven, isLast }: { isEven: boolean; isLast: boolean }) => (
    <div className={`absolute top-0 w-full flex justify-center mt-6 ${isEven ? 'md:justify-center' : 'md:justify-center'}`}>
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
            <div className="h-3 w-3 rounded-full bg-white" />
        </motion.div>
    </div>
);

export default function Journey() {
<<<<<<< HEAD
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const [expandedId, setExpandedId] = useState<number | null>(null);
=======
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const { scrollYProgress: sectionScrollY } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blob1Y = useTransform(sectionScrollY, [0, 1], ["-50%", "50%"]);
  const blob2Y = useTransform(sectionScrollY, [0, 1], ["50%", "-50%"]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
>>>>>>> genai

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

<<<<<<< HEAD
    return (
        <section id="journey" className="py-20 relative overflow-hidden bg-background">
            {/* Background glowing effects to enhance tech aesthetic */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                        AI & Engineering Journey
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Tracing the path from software fundamentals to advanced robotics and machine learning research.
                    </p>
                </motion.div>
=======
  return (
    <section ref={sectionRef} id="journey" className="py-20 relative overflow-hidden bg-background">
      {/* Background glowing effects to enhance tech aesthetic */}
      <motion.div style={{ y: blob1Y }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <motion.div style={{ y: blob2Y }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            AI & Engineering Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tracing the path from software fundamentals to advanced robotics and machine learning research.
          </p>
        </motion.div>
>>>>>>> genai

                <div className="relative max-w-5xl mx-auto" ref={containerRef}>
                    {/* Main vertical line */}
                    <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-1 bg-muted/30 -translate-x-1/2 rounded-full hidden md:block" />
                    <div className="absolute left-[28px] top-4 bottom-4 w-1 bg-muted/30 rounded-full md:hidden" />

                    {/* Glowing progress line */}
                    <motion.div
                        className="absolute left-[20px] md:left-1/2 top-4 w-1 bg-gradient-to-b from-blue-500 to-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)] -translate-x-1/2 rounded-full hidden md:block origin-top"
                        style={{ scaleY, height: 'calc(100% - 2rem)' }}
                    />
                    <motion.div
                        className="absolute left-[28px] top-4 w-1 bg-gradient-to-b from-blue-500 to-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)] rounded-full md:hidden origin-top"
                        style={{ scaleY, height: 'calc(100% - 2rem)' }}
                    />

                    <div className="flex flex-col gap-12 md:gap-8">
                        {milestones.map((milestone, index) => {
                            const Icon = milestone.icon;
                            const isEven = index % 2 === 0;
                            const isExpanded = expandedId === milestone.id;

<<<<<<< HEAD
                            return (
                                <div key={milestone.id} className="relative flex md:justify-between items-center w-full group">
                                    {/* Timeline Node overlay logic */}
                                    <div className="absolute left-[28px] md:left-1/2 top-0 mt-6 md:-mt-2 -translate-x-1/2 -translate-y-1/2 z-10">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: false, margin: "-100px" }}
                                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform duration-300"
                                        >
                                            <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
                                        </motion.div>
                                    </div>
=======
                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right order-1' : 'md:pl-12 md:text-left order-2'}`}
                  >
                    <div
                      className={`relative bg-background border border-border/50 rounded-2xl p-6 cursor-pointer overflow-hidden group/card text-left hover:border-accent/50 transition-colors`}
                      onClick={() => toggleExpand(milestone.id)}
                    >
                      {/* Subtle hover gradient behind content */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
>>>>>>> genai

                                    {/* Desktop Empty Space for alignment */}
                                    <div className={`hidden md:block w-5/12 ${isEven ? 'order-2' : 'order-1'}`} />

                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, margin: "-50px" }}
                                        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                                        className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-12 md:text-right order-1' : 'md:pl-12 md:text-left order-2'}`}
                                    >
                                        <div
                                            className={`relative bg-card border border-border/50 rounded-2xl p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/10 cursor-pointer overflow-hidden group/card text-left`}
                                            onClick={() => toggleExpand(milestone.id)}
                                        >
                                            {/* Subtle hover gradient behind content */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                            <div className={`flex items-center gap-4 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                                <div className="flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary group-hover/card:bg-primary/20 transition-colors duration-300">
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 tracking-wider text-primary mb-1">
                                                        {milestone.year}
                                                    </span>
                                                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                                {milestone.shortDesc}
                                            </p>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <ul className="space-y-2 mt-4 pt-4 border-t border-border/50">
                                                            {milestone.longDesc.map((desc, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.1 * i + 0.2 }}
                                                                    className="text-sm text-muted-foreground/90 flex gap-2 items-start"
                                                                >
                                                                    <span className="text-primary mt-1">•</span>
                                                                    <span>{desc}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <div className={`flex items-center gap-2 mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors ${isEven ? 'md:justify-end' : ''}`}>
                                                {isExpanded ? (
                                                    <>Show Less <ChevronUp className="w-3 h-3" /></>
                                                ) : (
                                                    <>Read More <ChevronDown className="w-3 h-3" /></>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}