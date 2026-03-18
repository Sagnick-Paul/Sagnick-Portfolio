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
        <div className="relative flex flex-col items-center justify-center min-w-[320px] md:min-w-[400px] px-8 md:px-12 h-[500px]">
            {/* Timeline Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <motion.div
                    style={{ scale, opacity }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                >
                    <div className="h-3 w-3 rounded-full bg-white shadow-inner animate-pulse" />
                </motion.div>
            </div>

            {/* Content Card */}
            <motion.div
                style={{ opacity, scale, y: isEven ? -130 : 150 }}
                className="w-full relative z-20"
            >
                <div
                    className="relative bg-background/60 border border-white/10 rounded-3xl p-5 cursor-pointer overflow-hidden group/card hover:border-accent hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-500 backdrop-blur-2xl"
                    onClick={() => toggleExpand(milestone.id)}
                >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center justify-center p-3 rounded-xl bg-accent/20 text-accent group-hover/card:bg-accent/30 transition-colors duration-300">
                            <Icon className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-accent/20 tracking-widest text-accent mb-1 uppercase italic">
                                {milestone.year}
                            </span>
                            <h3 className="text-base md:text-lg font-bold tracking-tight leading-tight">{milestone.title}</h3>
                        </div>
                    </div>

                    <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-3 group-hover/card:line-clamp-none transition-all duration-300">
                        {milestone.shortDesc}
                    </p>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="overflow-hidden"
                            >
                                <ul className="space-y-3 mt-4 pt-4 border-t border-white/10">
                                    {milestone.longDesc.map((desc, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            className="text-xs text-muted-foreground/90 flex gap-3 items-start"
                                        >
                                            <span className="text-accent mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                            <span>{desc}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-accent uppercase tracking-widest group-hover:gap-3 transition-all">
                        {isExpanded ? (
                            <>Collapse <ChevronUp className="w-3.5 h-3.5" /></>
                        ) : (
                            <>Details <ChevronDown className="w-3.5 h-3.5" /></>
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
                {/* Immersive Background */}
                <div className="absolute inset-0 pointer-events-none -z-10 bg-background">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:80px_80px]" />
                </div>

                {/* Sticky Top Header */}
                <div className="absolute top-0 left-0 w-full z-30 pt-20 md:pt-24 text-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center gap-3"
                    >
                        <h2 className="text-6xl md:text-8xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/80 to-foreground/20 leading-none select-none">
                            JOURNEY
                        </h2>
                        <div className="flex items-center gap-5 text-muted-foreground/60 mt-4 px-6 py-2 bg-background/50 backdrop-blur-sm rounded-full border border-white/5">
                            <div className="h-px w-6 md:w-10 bg-accent/40" />
                            <p className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase italic">
                                Navigate the Timeline
                            </p>
                            <div className="h-px w-6 md:w-10 bg-accent/40" />
                        </div>
                    </motion.div>
                </div>

                {/* Main Timeline Layer - Shifted down for header clearance */}
                <div className="flex-1 flex items-center justify-start relative w-full h-full z-10 px-[15vw] translate-y-[8vh]">
                    <motion.div
                        style={{ x }}
                        className="flex flex-row items-center w-max relative h-full py-16"
                    >
                        {/* Horizontal Track - Full breadth */}
                        <div className="absolute left-0 right-0 h-1 bg-white/5 top-1/2 -translate-y-1/2 rounded-full mx-[-200vw]" />

                        {/* Animated Progress Track */}
                        <motion.div
                            className="absolute left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] top-1/2 -translate-y-1/2 rounded-full origin-left z-20"
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