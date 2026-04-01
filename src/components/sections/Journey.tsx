"use client";

import { useRef, useState, useEffect } from "react";
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

const TimelineItem = ({
    milestone,
    index,
    progress,
    expandedId,
    toggleExpand
}: {
    milestone: Milestone,
    index: number,
    progress: any,
    expandedId: number | null,
    toggleExpand: (id: number) => void
}) => {
    const isEven = index % 2 === 0;
    const isExpanded = expandedId === milestone.id;
    const Icon = milestone.icon;

    // Progressive appearance thresholds
    const startTrigger = index / milestones.length;
    // We shift the trigger slightly so items are visible BEFORE they reach the "index" point.
    // For index 0, this means it starts at 1.
    const opacity = useTransform(progress, [startTrigger - 0.1, startTrigger], [0, 1]);
    const scale = useTransform(progress, [startTrigger - 0.1, startTrigger], [0.9, 1]);

    return (
        <div className="relative flex flex-col items-center justify-center min-w-[350px] md:min-w-[450px] px-12 md:px-16 h-[600px]">
            {/* Moving Node on the Track */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <motion.div
                    style={{ scale, opacity }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/30 bg-[#030712] shadow-[0_0_20px_rgba(37,99,235,0.3)] group/node"
                >
                    <div className="h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,1)] animate-pulse" />
                    <div className="absolute -inset-2 border border-blue-500/10 rounded-3xl animate-[spin_10s_linear_infinite] pointer-events-none" />
                </motion.div>
            </div>

            {/* Content Card */}
            <motion.div
                style={{ opacity, scale, y: isEven ? -180 : 180 }}
                className="w-full relative z-40"
            >
                <div
                    className="relative glass-card p-6 md:p-8 cursor-pointer overflow-hidden group/card hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(37,99,235,0.15)] transition-all duration-700"
                    onClick={() => toggleExpand(milestone.id)}
                >
                    {/* Glowing highlight corner */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 blur-3xl group-hover/card:bg-blue-500/20 transition-colors" />

                    <div className="flex items-start gap-5 mb-5">
                        <div className="flex items-center justify-center p-4 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover/card:bg-blue-500/20 group-hover/card:scale-110 transition-all duration-500">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] font-mono italic">
                                    {milestone.year}
                                </span>
                                <div className="text-[8px] font-bold text-blue-500/30 font-mono tracking-tighter">ID: 00{milestone.id}</div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">{milestone.title}</h3>
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
                        {milestone.shortDesc}
                    </p>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-4 mt-6 pt-6 border-t border-blue-500/10">
                                    {milestone.longDesc.map((desc, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="text-xs text-slate-500 dark:text-slate-400 flex gap-4 items-start font-medium"
                                        >
                                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 shadow-[0_0_8px_rgba(37,99,235,0.5)] shrink-0" />
                                            <span className="leading-relaxed">{desc}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-3 mt-6 text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] group-hover/card:translate-x-2 transition-transform">
                        {isExpanded ? (
                            <>Close Logic <ChevronUp className="w-4 h-4" /></>
                        ) : (
                            <>Initialize Detail <ChevronDown className="w-4 h-4" /></>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function Journey() {
    const sectionRef = useRef<HTMLElement>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Mapping for a more compact timeline. Total width (~2400) vs Screen (~1900)
    // Means we only need to move about 20-30% to reveal everything.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    if (isMobile) {
        return (
            <section id="journey" className="py-20 bg-background px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4 tracking-tight italic uppercase">Path</h2>
                    <p className="text-muted-foreground text-sm tracking-widest uppercase">Chronicle of Progress</p>
                </div>
                <div className="relative space-y-12 max-w-xl mx-auto">
                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-accent opacity-20" />
                    {milestones.map((milestone) => (
                        <div key={milestone.id} className="relative pl-14">
                            <div className="absolute left-0 top-1 w-12 h-12 rounded-2xl bg-accent/10 border border-accent flex items-center justify-center text-accent z-10">
                                <milestone.icon className="w-6 h-6" />
                            </div>
                            <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                                <span className="text-[10px] font-black text-accent uppercase tracking-widest mb-1 block">{milestone.year}</span>
                                <h3 className="text-xl font-bold mb-2 tracking-tight">{milestone.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{milestone.shortDesc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
    <section ref={sectionRef} id="journey" className="relative h-[800vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-background">
        {/* Immersive Background Grid/Glow */}
        <div className="absolute inset-0 pointer-events-none -z-10 bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,124,240,0.15),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        {/* Sticky UI Header */}
        <div className="absolute top-0 left-0 w-full z-20 pt-24 px-8 flex justify-between items-end pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2 relative z-10"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-200/10 dark:text-white/5 uppercase leading-none select-none absolute -top-10 -left-4 -z-10">
              Timeline
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-12 bg-blue-600" />
              <p className="text-[10px] md:text-sm font-black tracking-[0.5em] uppercase text-blue-600 dark:text-blue-500 italic">
                The Narrative of Progress
              </p>
            </div>
          </motion.div>
          <div className="hidden md:flex flex-col items-end gap-2 text-right">
            <span className="text-[10px] font-mono text-blue-500/50 uppercase tracking-widest whitespace-nowrap">Scroll to Navigate</span>
            <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                    style={{ width: `${(expandedId ? (expandedId / milestones.length) * 100 : 0)}%` }}
                />
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="flex-1 flex items-center justify-start relative w-full h-full z-10 px-[15vw] translate-y-[5vh]">
          <motion.div
            style={{ x }}
            className="flex flex-row items-center w-max relative h-full py-16"
          >
            {/* Background Track line */}
            <div className="absolute left-0 right-0 h-[2px] bg-blue-500/5 top-1/2 -translate-y-1/2 rounded-full mx-[-200vw]" />

            {/* Glowing Active Track */}
            <motion.div
              className="absolute left-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)] top-1/2 -translate-y-1/2 rounded-full origin-left z-0"
              style={{ scaleX, width: "100%" }}
            />

            <div className="flex items-center gap-0">
              {milestones.map((milestone, index) => (
                <TimelineItem
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  progress={scrollYProgress}
                  expandedId={expandedId}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    );
}