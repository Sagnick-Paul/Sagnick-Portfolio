"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { Code, Zap, Database, Brain, Bot, Network, X, Sparkles } from "lucide-react";

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

function MilestonePanel({
    milestone,
    index,
    isExpanded,
    toggleExpand,
}: {
    milestone: Milestone;
    index: number;
    isExpanded: boolean;
    toggleExpand: (id: number) => void;
}) {
    const Icon = milestone.icon;

    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
            className={`relative glass-card p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-500 rounded-3xl border w-[320px] sm:w-[380px] md:w-[420px] shrink-0 flex flex-col justify-between ${
                isExpanded
                    ? "border-blue-500 dark:border-cyan-400 shadow-[0_0_50px_rgba(37,99,235,0.35)] dark:shadow-[0_0_50px_rgba(6,182,212,0.25)] ring-2 ring-blue-500/40 dark:ring-cyan-400/40 bg-gradient-to-br from-blue-500/[0.09] via-white/90 dark:via-[#090d16]/95 to-cyan-500/[0.07] scale-[1.02]"
                    : "border-slate-200/80 dark:border-white/[0.08] hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
            }`}
            onClick={() => toggleExpand(milestone.id)}
        >
            {isExpanded && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-blue-500/15 blur-2xl pointer-events-none" />
            )}

            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />

            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center p-3 rounded-2xl border transition-all duration-500 shrink-0 ${
                            isExpanded
                                ? "bg-blue-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.8)] scale-110"
                                : "bg-blue-500/10 text-blue-500 border-blue-500/20 group-hover:bg-blue-500/20"
                        }`}>
                            <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-xs font-black uppercase tracking-[0.35em] font-mono italic transition-colors ${
                            isExpanded ? "text-cyan-500 dark:text-cyan-300" : "text-blue-600 dark:text-blue-400"
                        }`}>
                            {milestone.year}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-500/40 font-mono tracking-tighter">0{milestone.id}</span>
                        <motion.div
                            animate={isExpanded ? { scale: 1.25, rotate: 180 } : { scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isExpanded
                                    ? "border-cyan-400 bg-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                                    : "border-blue-500/30 bg-background"
                            }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? "bg-white" : "bg-blue-500"}`} />
                        </motion.div>
                    </div>
                </div>

                <h3 className={`text-xl md:text-2xl font-black tracking-tight leading-tight mb-3 transition-colors ${
                    isExpanded ? "text-blue-600 dark:text-cyan-300" : "text-slate-900 dark:text-white"
                }`}>
                    {milestone.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-relaxed mb-6">
                    {milestone.shortDesc}
                </p>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t border-blue-500/10 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                isExpanded ? "text-cyan-500 dark:text-cyan-300" : "text-blue-600 dark:text-blue-400"
            }`}>
                <span>{isExpanded ? "Collapse Log" : "View Extended Log"}</span>
            </div>
        </motion.div>
    );
}

export default function Journey() {
    const sectionRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [maxTranslate, setMaxTranslate] = useState(0);

    const prefersReducedMotion = useReducedMotion();

    // High performance MotionValue tracking horizontal progress (0.0 to 1.0)
    const journeyProgress = useMotionValue(0);

    // Map journeyProgress directly to maxTranslate horizontal offset
    const rawX = useTransform(journeyProgress, [0, 1], [0, -maxTranslate]);
    const smoothX = useSpring(rawX, { damping: 32, stiffness: 240, mass: 0.1 });
    const x = prefersReducedMotion ? 0 : smoothX;

    // Content-aware geometry calculation using ResizeObserver
    useLayoutEffect(() => {
        const updateGeometry = () => {
            if (trackRef.current && viewportRef.current) {
                const trackWidth = trackRef.current.scrollWidth;
                const viewportWidth = viewportRef.current.clientWidth;
                const overflow = Math.max(0, trackWidth - viewportWidth);
                setMaxTranslate(overflow);
            }
        };

        updateGeometry();

        const resizeObserver = new ResizeObserver(updateGeometry);
        if (trackRef.current) resizeObserver.observe(trackRef.current);
        if (viewportRef.current) resizeObserver.observe(viewportRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    // Non-passive wheel & touch event handler converting deltaY to horizontal progress
    useEffect(() => {
        if (prefersReducedMotion) return;

        const sectionEl = sectionRef.current;
        if (!sectionEl) return;

        let touchStartY = 0;
        const scrollSensitivity = 1400; // Smooth 1:1 wheel/trackpad scaling

        const handleWheel = (e: WheelEvent) => {
            const rect = sectionEl.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if section is centered/active in viewport
            const isCentered = rect.top <= 100 && rect.bottom >= viewportHeight - 100;
            if (!isCentered) return;

            const deltaY = e.deltaY;
            const current = journeyProgress.get();

            if (deltaY > 0) {
                // Downward scroll input -> advance horizontal progress rightward
                if (current < 1) {
                    e.preventDefault();
                    if (Math.abs(rect.top) > 5) {
                        window.scrollTo({ top: window.scrollY + rect.top, behavior: "instant" as ScrollBehavior });
                    }
                    const next = Math.min(1, current + deltaY / scrollSensitivity);
                    journeyProgress.set(next);
                }
            } else if (deltaY < 0) {
                // Upward scroll input -> advance horizontal progress leftward
                if (current > 0) {
                    e.preventDefault();
                    if (Math.abs(rect.top) > 5) {
                        window.scrollTo({ top: window.scrollY + rect.top, behavior: "instant" as ScrollBehavior });
                    }
                    const next = Math.max(0, current + deltaY / scrollSensitivity);
                    journeyProgress.set(next);
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            const rect = sectionEl.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const isCentered = rect.top <= 100 && rect.bottom >= viewportHeight - 100;
            if (!isCentered) return;

            const currentY = e.touches[0].clientY;
            const deltaY = touchStartY - currentY;
            const current = journeyProgress.get();

            if (deltaY > 0 && current < 1) {
                e.preventDefault();
                const next = Math.min(1, current + deltaY / 400);
                journeyProgress.set(next);
                touchStartY = currentY;
            } else if (deltaY < 0 && current > 0) {
                e.preventDefault();
                const next = Math.max(0, current + deltaY / 400);
                journeyProgress.set(next);
                touchStartY = currentY;
            }
        };

        sectionEl.addEventListener("wheel", handleWheel, { passive: false });
        sectionEl.addEventListener("touchstart", handleTouchStart, { passive: true });
        sectionEl.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            sectionEl.removeEventListener("wheel", handleWheel);
            sectionEl.removeEventListener("touchstart", handleTouchStart);
            sectionEl.removeEventListener("touchmove", handleTouchMove);
        };
    }, [prefersReducedMotion, journeyProgress]);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const selectedMilestone = milestones.find((m) => m.id === expandedId);

    // Accessible vertical fallback for reduced motion
    if (prefersReducedMotion) {
        return (
            <section id="journey" className="py-20 relative bg-transparent z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono italic">Chronicle</span>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic mt-2">
                            The <span className="neon-text">Journey</span>
                        </h2>
                    </div>
                    <div className="space-y-6">
                        {milestones.map((milestone) => (
                            <div key={milestone.id} className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/10">
                                <span className="text-xs font-mono text-blue-500 font-black">{milestone.year}</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{milestone.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">{milestone.shortDesc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="journey"
            className="h-screen min-h-[650px] relative flex flex-col justify-between py-12 lg:py-16 bg-transparent z-10 overflow-hidden select-none"
        >
            {/* Viewport Container */}
            <div
                ref={viewportRef}
                className="w-full h-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
            >
                {/* Header Chrome */}
                <div className="w-full z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-0.5 w-10 bg-blue-600" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono italic">Chronicle</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-[0.9]">
                                The <span className="neon-text">Journey</span>
                            </h2>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                                Scroll Down To Traverse
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Horizontal Storytelling Track */}
                <div className="relative w-full my-auto py-4">
                    {/* Glowing horizontal connector line passing behind nodes */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-25 pointer-events-none" />

                    {/* Translating Track */}
                    <motion.div
                        ref={trackRef}
                        style={{ x }}
                        className="flex gap-6 lg:gap-8 w-max px-4"
                    >
                        {milestones.map((milestone, index) => (
                            <MilestonePanel
                                key={milestone.id}
                                milestone={milestone}
                                index={index}
                                isExpanded={expandedId === milestone.id}
                                toggleExpand={toggleExpand}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Footer Scrubber & Journey Progress Indicator */}
                <div className="w-full z-10">
                    <div className="flex items-center justify-between gap-4 mb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <span>2023 Start</span>
                        <span>Horizontal Journey Progress</span>
                        <span>2026 Frontier</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden p-[1px]">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] origin-left"
                            style={{ scaleX: journeyProgress }}
                        />
                    </div>
                </div>

                {/* Extended Log Details Modal Overlay */}
                <AnimatePresence>
                    {selectedMilestone && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xl"
                            onClick={() => setExpandedId(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                                transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
                                className="glass-card max-w-2xl w-full p-6 md:p-8 rounded-3xl border border-blue-500/40 dark:border-cyan-400/40 shadow-[0_0_80px_rgba(37,99,235,0.3)] bg-white/95 dark:bg-[#090d16]/95 relative overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between mb-6 border-b border-blue-500/10 pb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-400 font-mono italic">
                                            {selectedMilestone.year} Extended_Log
                                        </span>
                                        <span className="text-lg font-black text-slate-900 dark:text-white border-l border-blue-500/20 pl-3">
                                            {selectedMilestone.title}
                                        </span>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setExpandedId(null)}
                                        className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors"
                                        aria-label="Close modal"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                </div>

                                <div className="space-y-4">
                                    {selectedMilestone.longDesc.map((desc, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            className="flex gap-3 items-start text-sm text-slate-700 dark:text-slate-200 font-medium p-4 rounded-2xl bg-blue-500/[0.04] dark:bg-white/[0.03] border border-blue-500/10 dark:border-white/[0.06]"
                                        >
                                            <div className="mt-1.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] shrink-0" />
                                            <span className="leading-relaxed">{desc}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}