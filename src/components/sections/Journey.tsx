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

const TimelineItem = ({ milestone, index, expandedId, toggleExpand }: { milestone: Milestone, index: number, expandedId: number | null, toggleExpand: (id: number) => void }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"],
    });

    const isEven = index % 2 === 0;
    const isExpanded = expandedId === milestone.id;
    const Icon = milestone.icon;

    // Continuous scroll-based transforms
    // Sync opacity and scale with the item's position in the viewport
    // It should be fully visible when it's near the center
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const xOffset = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [isEven ? -50 : 50, 0, 0, isEven ? -50 : 50]);

    return (
        <div ref={itemRef} className="relative flex md:justify-between items-center w-full group py-8">
            {/* Timeline Node - Positioned relative to the item container for perfect alignment */}
            <div className="absolute left-[28px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                    style={{ scale, opacity }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform duration-300"
                >
                    <div className="h-4 w-4 rounded-full bg-white animate-pulse" />
                </motion.div>
            </div>

            {/* Content Logic */}
            <div className={`hidden md:block w-5/12 ${isEven ? 'order-2' : 'order-1'}`} />

            <motion.div
                style={{ opacity, scale, x: xOffset }}
                className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right order-1' : 'md:pl-16 md:text-left order-2'}`}
            >
                <div
                    className={`relative bg-background/40 border border-border/50 rounded-2xl p-6 cursor-pointer overflow-hidden group/card text-left hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 backdrop-blur-md`}
                    onClick={() => toggleExpand(milestone.id)}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex items-center justify-center p-3 rounded-xl bg-accent/10 text-accent group-hover/card:bg-accent/20 transition-colors duration-300">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-accent/10 tracking-wider text-accent mb-1 uppercase">
                                {milestone.year}
                            </span>
                            <h3 className="text-xl md:text-2xl font-bold tracking-tight">{milestone.title}</h3>
                        </div>
                    </div>

                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
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
                                <ul className="space-y-3 mt-4 pt-4 border-t border-border/50">
                                    {milestone.longDesc.map((desc, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="text-sm text-muted-foreground/90 flex gap-2 items-start"
                                        >
                                            <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                            <span>{desc}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className={`flex items-center gap-2 mt-4 text-xs font-bold text-accent uppercase tracking-wider group-hover/card:gap-3 transition-all ${isEven ? 'md:justify-end' : ''}`}>
                        {isExpanded ? (
                            <>Show Less <ChevronUp className="w-4 h-4" /></>
                        ) : (
                            <>Read More <ChevronDown className="w-4 h-4" /></>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function Journey() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={sectionRef} id="journey" className="py-24 relative overflow-hidden bg-background">
            {/* Background glowing effects */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        AI & Engineering Journey
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
                        Tracing the path from software fundamentals to advanced robotics and machine learning research.
                    </p>
                </motion.div>

                <div className="relative max-w-5xl mx-auto" ref={containerRef}>
                    {/* Main vertical line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-muted/20 -translate-x-1/2 rounded-full" />

                    {/* Glowing progress line */}
                    <motion.div
                        className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.5)] -translate-x-1/2 rounded-full origin-top z-10"
                        style={{ scaleY, height: '100%' }}
                    />

                    <div className="flex flex-col">
                        {milestones.map((milestone, index) => (
                            <TimelineItem
                                key={milestone.id}
                                milestone={milestone}
                                index={index}
                                expandedId={expandedId}
                                toggleExpand={toggleExpand}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}