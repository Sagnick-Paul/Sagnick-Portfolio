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

    return (
        // Mobile: 2-col (node | card). Desktop: 3-col (card | node | card) alternating
        <div className="relative grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] items-start gap-0 w-full">

            {/* Left card — desktop only, even items */}
            <div className="hidden md:flex justify-end pr-8">
                {isLeft && (
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-md"
                    >
                        <MilestoneContent
                            milestone={milestone}
                            isExpanded={isExpanded}
                            toggleExpand={toggleExpand}
                            align="right"
                        />
                    </motion.div>
                )}
            </div>

            {/* Center Node */}
            <div className="flex flex-col items-center relative z-10 pt-6 px-0">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl border border-blue-500/30 bg-background shadow-[0_0_25px_rgba(37,99,235,0.3)]"
                >
                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,1)] animate-pulse" />
                    <div className="absolute -inset-2 border border-blue-500/10 rounded-3xl animate-[spin_10s_linear_infinite] pointer-events-none" />
                </motion.div>
            </div>

            {/* Right card — always on mobile, odd items on desktop */}
            <div className="pl-6 md:pl-8">
                {/* Mobile: always show card here */}
                <div className="md:hidden">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <MilestoneContent
                            milestone={milestone}
                            isExpanded={isExpanded}
                            toggleExpand={toggleExpand}
                            align="left"
                        />
                    </motion.div>
                </div>

                {/* Desktop odd items */}
                {!isLeft && (
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden md:block w-full max-w-md"
                    >
                        <MilestoneContent
                            milestone={milestone}
                            isExpanded={isExpanded}
                            toggleExpand={toggleExpand}
                            align="left"
                        />
                    </motion.div>
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
        <div
            className="relative glass-card p-6 md:p-8 cursor-pointer overflow-hidden group/card hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(37,99,235,0.15)] transition-all duration-700"
            onClick={() => toggleExpand(milestone.id)}
        >
            {/* Glow corner */}
            <div className={`absolute ${align === "right" ? "-top-10 -left-10" : "-top-10 -right-10"} w-24 h-24 bg-blue-500/10 blur-3xl group-hover/card:bg-blue-500/20 transition-colors`} />

            <div className={`flex items-start gap-5 mb-5 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
                <div className="flex items-center justify-center p-4 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover/card:bg-blue-500/20 group-hover/card:scale-110 transition-all duration-500 shrink-0">
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                    <div className={`flex items-center justify-between mb-1 ${align === "right" ? "flex-row-reverse" : ""}`}>
                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] font-mono italic">
                            {milestone.year}
                        </span>
                        <div className="text-[8px] font-bold text-blue-500/30 font-mono tracking-tighter">ID: 00{milestone.id}</div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">{milestone.title}</h3>
                </div>
            </div>

            <p className={`text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6 ${align === "right" ? "text-right" : ""}`}>
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
                        <div className="space-y-4 mt-4 pt-6 border-t border-blue-500/10">
                            {milestone.longDesc.map((desc, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`text-xs text-slate-500 dark:text-slate-400 flex gap-4 items-start font-medium ${align === "right" ? "flex-row-reverse text-right" : ""}`}
                                >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 shadow-[0_0_8px_rgba(37,99,235,0.5)] shrink-0" />
                                    <span className="leading-relaxed">{desc}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`flex items-center gap-3 mt-6 text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] transition-all group-hover/card:gap-5 ${align === "right" ? "justify-end" : ""}`}>
                {isExpanded ? (
                    <>Close Logic <ChevronUp className="w-4 h-4" /></>
                ) : (
                    <>Initialize Detail <ChevronDown className="w-4 h-4" /></>
                )}
            </div>
        </div>
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
        <section ref={sectionRef} id="journey" className="relative py-32 bg-background">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,124,240,0.08),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-0.5 w-12 bg-blue-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono italic">Chronicle</span>
                        <div className="h-0.5 w-12 bg-blue-600" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">
                        The <span className="neon-text">Journey</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mt-6 max-w-xl mx-auto">
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
                    <div className="flex flex-col gap-14 md:gap-20 relative">
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
                    <div className="flex justify-center md:justify-center justify-start pl-[17px] md:pl-0 mt-12">
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