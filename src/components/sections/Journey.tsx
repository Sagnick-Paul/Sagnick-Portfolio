"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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

function MilestoneCard({
    milestone,
    index,
    expandedId,
    toggleExpand,
}: {
    milestone: Milestone;
    index: number;
    expandedId: number | null;
    toggleExpand: (id: number) => void;
}) {
    const isLeft = index % 2 === 0;
    const isExpanded = expandedId === milestone.id;
    const cardAlign = isLeft ? "right" : "left";

    return (
        <div className="relative grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-start gap-0 w-full">
            {/* Left column — desktop */}
            <div className="hidden md:flex justify-end items-start pr-4 md:pr-6 w-full">
                {isLeft && (
                    <div className="w-full max-w-lg">
                        <MilestoneContent
                            milestone={milestone}
                            isExpanded={isExpanded}
                            toggleExpand={toggleExpand}
                            align={cardAlign}
                        />
                    </div>
                )}
            </div>

            {/* Center Node */}
            <div className="flex flex-col items-center relative z-10 pt-2 px-0">
                <motion.div
                    animate={isExpanded ? { scale: 1.25, rotate: 180 } : { scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    className={`relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl border transition-all duration-500 ${
                        isExpanded
                            ? "border-cyan-400 bg-blue-600 shadow-[0_0_30px_rgba(6,182,212,0.8)]"
                            : "border-blue-500/30 bg-background shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    }`}
                >
                    <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        isExpanded
                            ? "bg-white shadow-[0_0_15px_rgba(255,255,255,1)]"
                            : "bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,1)] animate-pulse"
                    }`} />
                    <div className="absolute -inset-2 border border-blue-500/10 rounded-3xl animate-[spin_10s_linear_infinite] pointer-events-none" />
                </motion.div>
            </div>

            {/* Right column — desktop & mobile */}
            <div className="pl-4 md:pl-6 w-full">
                {/* Mobile view */}
                <div className="md:hidden">
                    <MilestoneContent
                        milestone={milestone}
                        isExpanded={isExpanded}
                        toggleExpand={toggleExpand}
                        align="left"
                    />
                </div>

                {/* Desktop view */}
                {!isLeft && (
                    <div className="hidden md:block w-full max-w-lg">
                        <MilestoneContent
                            milestone={milestone}
                            isExpanded={isExpanded}
                            toggleExpand={toggleExpand}
                            align={cardAlign}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function MilestoneContent({
    milestone,
    isExpanded,
    toggleExpand,
    align,
}: {
    milestone: Milestone;
    isExpanded: boolean;
    toggleExpand: (id: number) => void;
    align: "left" | "right";
}) {
    const Icon = milestone.icon;

    return (
        <motion.div
            layout
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
            className={`relative glass-card p-4 md:p-6 cursor-pointer overflow-hidden transition-all duration-500 rounded-2xl border ${
                isExpanded
                    ? "border-blue-500 dark:border-cyan-400 shadow-[0_0_50px_rgba(37,99,235,0.35)] dark:shadow-[0_0_50px_rgba(6,182,212,0.25)] ring-2 ring-blue-500/40 dark:ring-cyan-400/40 bg-gradient-to-br from-blue-500/[0.09] via-white/90 dark:via-[#090d16]/95 to-cyan-500/[0.07]"
                    : "border-slate-200/80 dark:border-white/[0.08] hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            }`}
            onClick={() => toggleExpand(milestone.id)}
        >
            {/* Exploded background glow overlay when expanded */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-blue-500/15 blur-2xl pointer-events-none"
                />
            )}

            <div className={`absolute ${align === "right" ? "-top-10 -left-10" : "-top-10 -right-10"} w-28 h-28 bg-blue-500/10 blur-3xl pointer-events-none`} />

            <div className={`flex items-start gap-4 mb-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
                <div className={`flex items-center justify-center p-3 rounded-xl border transition-all duration-500 shrink-0 ${
                    isExpanded
                        ? "bg-blue-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.8)] scale-110"
                        : "bg-blue-500/10 text-blue-500 border-blue-500/20 group-hover/card:bg-blue-500/20 group-hover/card:scale-110"
                }`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className={`flex items-center justify-between mb-1 ${align === "right" ? "flex-row-reverse" : ""}`}>
                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] font-mono italic transition-colors ${
                            isExpanded ? "text-cyan-500 dark:text-cyan-300" : "text-blue-600 dark:text-blue-400"
                        }`}>
                            {milestone.year}
                        </span>
                        <div className="text-[9px] font-bold text-blue-500/40 font-mono tracking-tighter">ID: 00{milestone.id}</div>
                    </div>
                    <h3 className={`text-lg md:text-xl font-black tracking-tight leading-tight transition-colors ${
                        isExpanded ? "text-blue-600 dark:text-cyan-300" : "text-slate-900 dark:text-white"
                    }`}>
                        {milestone.title}
                    </h3>
                </div>
            </div>

            <p className={`text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed ${align === "right" ? "text-right" : ""}`}>
                {milestone.shortDesc}
            </p>

            {/* Extended Details — rendered directly BELOW the block */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="overflow-hidden pt-4 mt-4 border-t border-blue-500/20 dark:border-cyan-500/30"
                    >
                        <div className={`flex items-center justify-between mb-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
                            <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.35em] font-mono italic flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                                Extended_Log
                            </span>
                        </div>

                        <div className="space-y-3">
                            {milestone.longDesc.map((desc, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.3, delay: i * 0.06 }}
                                    className={`text-sm text-slate-700 dark:text-slate-200 flex gap-3 items-start font-medium ${
                                        align === "right" ? "flex-row-reverse text-right" : ""
                                    }`}
                                >
                                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] shrink-0" />
                                    <span className="leading-relaxed">{desc}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`flex items-center gap-2 mt-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                isExpanded ? "text-cyan-500 dark:text-cyan-300" : "text-blue-600 dark:text-blue-400"
            } ${align === "right" ? "justify-end" : ""}`}>
                {isExpanded ? (
                    <>Collapse Details <ChevronUp className="w-4 h-4" /></>
                ) : (
                    <>View Details <ChevronDown className="w-4 h-4" /></>
                )}
            </div>
        </motion.div>
    );
}

export default function Journey() {
    const sectionRef = useRef<HTMLElement>(null);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section ref={sectionRef} id="journey" className="relative py-12 lg:py-16 bg-transparent z-10">
            {/* Background Glow removed to keep it 'just black' */}

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-10 lg:mb-12 text-center"
                >
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="h-0.5 w-12 bg-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono italic">Chronicle</span>
                        <div className="h-0.5 w-12 bg-blue-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-[0.9]">
                        The <span className="neon-text">Journey</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-base font-medium mt-3 max-w-xl mx-auto">
                        A narrative of progress — from first principles to frontier research.
                    </p>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative">
                    {/* Track line — centered on desktop, aligned to node column on mobile */}
                    {/* Desktop: absolute center */}
                    <div className="hidden md:block">
                        {/* Static background track */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-blue-500/10 rounded-full" />
                        {/* Animated progress track */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)] rounded-full origin-top"
                            style={{ scaleY, height: "100%" }}
                        />
                    </div>

                    {/* Mobile: track aligned to the node (left edge + half node width ~30px) */}
                    <div className="md:hidden">
                        <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-blue-500/10 rounded-full" />
                        <motion.div
                            className="absolute left-[23px] top-0 w-[2px] bg-gradient-to-b from-blue-600 via-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.6)] rounded-full origin-top"
                            style={{ scaleY, height: "100%" }}
                        />
                    </div>

                    {/* Milestone items */}
                    <div className="flex flex-col gap-8 md:gap-10 relative">
                        {milestones.map((milestone, index) => (
                            <MilestoneCard
                                key={milestone.id}
                                milestone={milestone}
                                index={index}
                                expandedId={expandedId}
                                toggleExpand={toggleExpand}
                            />
                        ))}
                    </div>

                    {/* End cap */}
                    <div className="flex justify-center md:justify-center justify-start pl-[17px] md:pl-0 mt-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="w-5 h-5 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)] border-2 border-blue-400"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}