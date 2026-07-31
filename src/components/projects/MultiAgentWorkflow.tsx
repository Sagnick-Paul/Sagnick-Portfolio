"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  Globe,
  FileCode2,
  PenTool,
  ShieldCheck,
  FileText,
  FileDown,
  FileArchive,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Info,
  X,
  Sparkles,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type AccentColor =
  | "indigo"
  | "blue"
  | "cyan"
  | "purple"
  | "amber"
  | "emerald"
  | "green";

export interface AgentNode {
  id: string;
  title: string;
  subtitle: string;
  stepIndex: number;
  branch?: "main" | "export";
  icon: React.ElementType;
  purpose: string;
  inputs: string;
  outputs: string;
  tech: string[];
  accent: AccentColor;
}

// ─── Node Data ─────────────────────────────────────────────────────────────────
const NODES: AgentNode[] = [
  {
    id: "user-topic",
    title: "User Inputs Topic",
    subtitle: "Query Entry Point",
    stepIndex: 0,
    branch: "main",
    icon: Search,
    purpose: "Receives the research topic from the user via a form input and seeds the entire multi-agent pipeline.",
    inputs: "User text query",
    outputs: "Topic string",
    tech: ["React", "Form Input"],
    accent: "indigo",
  },
  {
    id: "web-search",
    title: "Deep Web Search Agent",
    subtitle: "Multi-Source Discovery",
    stepIndex: 1,
    branch: "main",
    icon: Globe,
    purpose: "Searches multiple web sources concurrently for relevant information using specialised search APIs.",
    inputs: "Topic",
    outputs: "Raw URLs, Search results",
    tech: ["Tavily", "SerpAPI", "Search APIs"],
    accent: "blue",
  },
  {
    id: "scraper",
    title: "Source Scraper Agent",
    subtitle: "Content Extraction",
    stepIndex: 2,
    branch: "main",
    icon: FileCode2,
    purpose: "Downloads and extracts clean, readable article content from the collected URLs.",
    inputs: "URLs",
    outputs: "Clean article text",
    tech: ["BeautifulSoup", "Requests", "Newspaper3k"],
    accent: "cyan",
  },
  {
    id: "writer",
    title: "Research Writer Agent",
    subtitle: "Synthesis & Structuring",
    stepIndex: 3,
    branch: "main",
    icon: PenTool,
    purpose: "Synthesises all gathered source information into a well-structured Markdown research report.",
    inputs: "Clean source text",
    outputs: "Markdown research draft",
    tech: ["LangGraph", "LLM", "Prompt Templates"],
    accent: "purple",
  },
  {
    id: "critic",
    title: "Academic Critic Agent",
    subtitle: "Peer Review & Reflection",
    stepIndex: 4,
    branch: "main",
    icon: ShieldCheck,
    purpose: "Reviews the generated draft and applies academic-grade critique, suggestions and improvements.",
    inputs: "Draft report",
    outputs: "Improved report, Critique, Suggestions",
    tech: ["LLM Reviewer", "Reflection Agent"],
    accent: "amber",
  },
  {
    id: "final-report",
    title: "Final Report",
    subtitle: "Document Finalization",
    stepIndex: 5,
    branch: "main",
    icon: FileText,
    purpose: "Assembles the critically revised markdown into a polished, finalized research document ready for export.",
    inputs: "Revised markdown",
    outputs: "Final document",
    tech: ["Markdown", "Document Generator"],
    accent: "emerald",
  },
  {
    id: "download-pdf",
    title: "Download PDF",
    subtitle: "Vector Document Export",
    stepIndex: 6,
    branch: "export",
    icon: FileDown,
    purpose: "Renders the final document as a formatted, downloadable PDF file.",
    inputs: "Final document",
    outputs: "PDF file (.pdf)",
    tech: ["ReportLab"],
    accent: "green",
  },
  {
    id: "download-docx",
    title: "Download DOCX",
    subtitle: "Editable Word Export",
    stepIndex: 6,
    branch: "export",
    icon: FileArchive,
    purpose: "Converts the final document into a fully editable Microsoft Word DOCX file.",
    inputs: "Final document",
    outputs: "DOCX file (.docx)",
    tech: ["python-docx"],
    accent: "green",
  },
];

const MAX_STEPS = 6;

// ─── Accent helpers ────────────────────────────────────────────────────────────
function badgeClass(accent: AccentColor) {
  const map: Record<AccentColor, string> = {
    indigo: "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    blue:   "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    cyan:   "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400",
    amber:  "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    emerald:"border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    green:  "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  };
  return map[accent];
}

function glowClass(accent: AccentColor) {
  const map: Record<AccentColor, string> = {
    indigo: "border-indigo-500 shadow-[0_0_28px_rgba(99,102,241,0.4)] ring-2 ring-indigo-500/40",
    blue:   "border-blue-500 shadow-[0_0_28px_rgba(59,130,246,0.4)] ring-2 ring-blue-500/40",
    cyan:   "border-cyan-500 shadow-[0_0_28px_rgba(6,182,212,0.4)] ring-2 ring-cyan-500/40",
    purple: "border-purple-500 shadow-[0_0_28px_rgba(168,85,247,0.4)] ring-2 ring-purple-500/40",
    amber:  "border-amber-500 shadow-[0_0_28px_rgba(245,158,11,0.4)] ring-2 ring-amber-500/40",
    emerald:"border-emerald-500 shadow-[0_0_28px_rgba(16,185,129,0.4)] ring-2 ring-emerald-500/40",
    green:  "border-green-500 shadow-[0_0_28px_rgba(34,197,94,0.4)] ring-2 ring-green-500/40",
  };
  return map[accent];
}

function cardClass(node: AgentNode, isActive: boolean, isVisited: boolean) {
  if (!isActive && !isVisited)
    return "bg-surface/90 border-border/60 text-muted-foreground opacity-55 hover:opacity-90 hover:border-accent/40";
  if (isActive)
    return `bg-surface ${glowClass(node.accent)} text-foreground scale-[1.03] z-20`;
  return "bg-surface border-border text-foreground shadow-sm opacity-90";
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function MultiAgentWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selected, setSelected] = useState<AgentNode | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(
      () => setActiveStep((s) => (s + 1) % (MAX_STEPS + 1)),
      3000 / speed
    );
    return () => clearInterval(id);
  }, [isPlaying, speed]);

  const mainNodes = NODES.filter((n) => n.branch === "main");
  const exportNodes = NODES.filter((n) => n.branch === "export");

  return (
    <div className="w-full my-6 p-4 sm:p-6 lg:p-8 rounded-3xl bg-surface/50 backdrop-blur-xl border border-border/80 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Toolbar ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-accent">
              <Sparkles className="w-3.5 h-3.5" /> Multi-Agent Pipeline
            </span>
            <span className="text-xs text-muted-foreground font-mono">LangGraph · SSE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            AI Deep Research Agent Architecture
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            End-to-end orchestration from user query → web search → scraping → LLM synthesis → academic review → export.
          </p>
        </div>

        {/* Playback controls */}
        <div className="flex items-center flex-wrap gap-2 bg-surface/90 border border-border p-2 rounded-2xl shadow-lg backdrop-blur-md self-start md:self-auto shrink-0">
          {/* Prev */}
          <button
            onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-accent-foreground font-semibold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          {/* Next */}
          <button
            onClick={() => setActiveStep((s) => Math.min(MAX_STEPS, s + 1))}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={() => setActiveStep(0)}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-border mx-0.5" />

          {/* Speed */}
          <button
            onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-border bg-muted/50 hover:bg-muted text-foreground transition-colors"
          >
            <FastForward className="w-3.5 h-3.5 text-accent" />
            {speed}x
          </button>

          <div className="h-5 w-px bg-border mx-0.5" />

          {/* Step dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: MAX_STEPS + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`w-6 h-6 rounded-lg text-[11px] font-mono font-bold transition-all ${
                  activeStep === i
                    ? "bg-accent text-accent-foreground shadow-md scale-110"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP HORIZONTAL CANVAS ─────────────────────────────────────────── */}
      <div className="hidden md:block relative z-10 w-full pt-1 pb-4">
        {/* Main linear pipeline */}
        <div className="flex items-stretch justify-between gap-1 lg:gap-2 xl:gap-3">
          {mainNodes.map((node, idx) => {
            const isActive  = activeStep === node.stepIndex;
            const isVisited = activeStep > node.stepIndex;
            const isLast    = idx === mainNodes.length - 1;
            const accentDots: Record<AccentColor, string> = {
              indigo: "bg-indigo-500", blue: "bg-blue-500", cyan: "bg-cyan-500",
              purple: "bg-purple-500", amber: "bg-amber-500", emerald: "bg-emerald-500", green: "bg-green-500",
            };

            return (
              <React.Fragment key={node.id}>
                {/* Column */}
                <div className="flex-1 min-w-0 flex flex-col">
                  {/* Label */}
                  <div className="flex items-center gap-1.5 mb-1.5 truncate">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "animate-pulse" : ""} ${accentDots[node.accent]}`} />
                    <span className="text-[9px] xl:text-[10px] font-bold font-mono tracking-wider uppercase truncate" style={{ color: "var(--tw-text-opacity)" }}>
                      Step {node.stepIndex + 1}
                    </span>
                  </div>
                  <NodeCard
                    node={node}
                    isActive={isActive}
                    isVisited={isVisited}
                    onClick={() => setSelected(node)}
                  />
                </div>

                {/* Arrow connector (between nodes, split on last) */}
                {!isLast && (
                  <HorizontalArrow isActive={activeStep > node.stepIndex} />
                )}

                {/* Final branch arrows to export nodes */}
                {isLast && (
                  <>
                    <HorizontalArrow isActive={activeStep >= 6} isSplit />
                    {/* Export column */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2 justify-center">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                        <span className="text-[9px] xl:text-[10px] font-bold font-mono tracking-wider uppercase text-green-600 dark:text-green-400">
                          Export
                        </span>
                      </div>
                      {exportNodes.map((en) => (
                        <NodeCard
                          key={en.id}
                          node={en}
                          isActive={activeStep === 6}
                          isVisited={activeStep > 6}
                          onClick={() => setSelected(en)}
                          compact
                        />
                      ))}
                    </div>
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE VERTICAL STACK ──────────────────────────────────────────────── */}
      <div className="block md:hidden relative z-10 space-y-3">
        {mainNodes.map((node) => {
          const isActive  = activeStep === node.stepIndex;
          const isVisited = activeStep > node.stepIndex;
          return (
            <React.Fragment key={node.id}>
              <NodeCard node={node} isActive={isActive} isVisited={isVisited} onClick={() => setSelected(node)} />
              <VerticalConnector isActive={activeStep > node.stepIndex} />
            </React.Fragment>
          );
        })}

        {/* Export branch */}
        <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 space-y-2">
          <p className="text-[10px] font-bold font-mono text-green-600 dark:text-green-400 uppercase tracking-wider">
            Export Outputs
          </p>
          {exportNodes.map((en) => (
            <NodeCard
              key={en.id}
              node={en}
              isActive={activeStep === 6}
              isVisited={activeStep > 6}
              onClick={() => setSelected(en)}
            />
          ))}
        </div>
      </div>

      {/* ── Legend ────────────────────────────────────────────────────────────── */}
      <div className="mt-6 pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground relative z-10">
        <div className="flex flex-wrap items-center gap-4">
          {(
            [
              { label: "Input",     color: "bg-indigo-500"  },
              { label: "Discovery", color: "bg-blue-500"    },
              { label: "Scraping",  color: "bg-cyan-500"    },
              { label: "Synthesis", color: "bg-purple-500"  },
              { label: "Review",    color: "bg-amber-500"   },
              { label: "Report",    color: "bg-emerald-500" },
              { label: "Export",    color: "bg-green-500"   },
            ] as const
          ).map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
              <span className="font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono bg-muted/50 px-3 py-1.5 rounded-xl border border-border shrink-0">
          <Info className="w-3.5 h-3.5 text-accent" />
          <span>Click any node to expand specs</span>
        </div>
      </div>

      {/* ── Detail Modal ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="bg-surface border border-border rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-green-500" />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3.5 rounded-2xl border shrink-0 ${badgeClass(selected.accent)}`}>
                  <selected.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted border border-border">
                      Step {selected.stepIndex}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">{selected.subtitle}</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{selected.title}</h4>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <h5 className="text-xs font-bold uppercase text-accent font-mono mb-1.5">Purpose</h5>
                  <p className="text-sm text-foreground leading-relaxed">{selected.purpose}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <h5 className="text-xs font-bold uppercase text-muted-foreground font-mono mb-1">Input</h5>
                    <p className="text-xs font-mono text-foreground">{selected.inputs}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <h5 className="text-xs font-bold uppercase text-muted-foreground font-mono mb-1">Output</h5>
                    <p className="text-xs font-mono text-foreground">{selected.outputs}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase text-muted-foreground font-mono mb-2">Technology</h5>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${badgeClass(selected.accent)}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── NodeCard ──────────────────────────────────────────────────────────────────
interface NodeCardProps {
  node: AgentNode;
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
  compact?: boolean;
}

function NodeCard({ node, isActive, isVisited, onClick, compact }: NodeCardProps) {
  const Icon = node.icon;
  const reduced = useReducedMotion();

  return (
    <motion.div
      whileHover={reduced ? {} : { y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border p-2.5 xl:p-3 transition-all duration-300 relative ${cardClass(node, isActive, isVisited)}`}
    >
      {/* Active pulse dot */}
      {isActive && (
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent" />
        </span>
      )}

      <div className="flex items-center justify-between gap-1.5 mb-2">
        <div className={`p-2 rounded-xl border ${badgeClass(node.accent)}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-border/70 bg-muted/60 text-muted-foreground shrink-0">
          S{node.stepIndex}
        </span>
      </div>

      <h5 className="text-[11px] xl:text-xs font-bold tracking-tight text-foreground truncate leading-tight">
        {node.title}
      </h5>
      {!compact && (
        <p className="text-[9px] xl:text-[10px] text-muted-foreground truncate mt-0.5">{node.subtitle}</p>
      )}
    </motion.div>
  );
}

// ─── HorizontalArrow ──────────────────────────────────────────────────────────
function HorizontalArrow({ isActive, isSplit }: { isActive: boolean; isSplit?: boolean }) {
  return (
    <div className="flex items-center justify-center w-4 sm:w-5 lg:w-7 xl:w-9 shrink-0 self-stretch">
      <svg className="w-full h-20 overflow-visible" viewBox="0 0 36 80" fill="none">
        {/* Path(s) */}
        {isSplit ? (
          <>
            <path
              d="M 0 40 C 18 40, 18 20, 36 20"
              className={`transition-all duration-500 ${isActive ? "stroke-accent stroke-[2.5]" : "stroke-border/70 stroke-[1.5]"}`}
              strokeDasharray={isActive ? "none" : "4 4"}
            />
            <path
              d="M 0 40 C 18 40, 18 60, 36 60"
              className={`transition-all duration-500 ${isActive ? "stroke-accent stroke-[2.5]" : "stroke-border/70 stroke-[1.5]"}`}
              strokeDasharray={isActive ? "none" : "4 4"}
            />
          </>
        ) : (
          <path
            d="M 0 40 L 36 40"
            className={`transition-all duration-500 ${isActive ? "stroke-accent stroke-[2.5]" : "stroke-border/70 stroke-[1.5]"}`}
            strokeDasharray={isActive ? "none" : "4 4"}
          />
        )}

        {/* Animated particles */}
        {isActive && !isSplit && (
          <circle r="4" className="fill-accent">
            <animateMotion path="M 0 40 L 36 40" dur="1.1s" repeatCount="indefinite" />
          </circle>
        )}
        {isActive && isSplit && (
          <>
            <circle r="3.5" className="fill-accent">
              <animateMotion path="M 0 40 C 18 40, 18 20, 36 20" dur="1.1s" repeatCount="indefinite" />
            </circle>
            <circle r="3.5" className="fill-accent">
              <animateMotion path="M 0 40 C 18 40, 18 60, 36 60" dur="1.4s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

// ─── VerticalConnector (mobile) ────────────────────────────────────────────────
function VerticalConnector({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex justify-center my-0.5">
      <div
        className={`p-1.5 rounded-full border transition-all duration-300 ${
          isActive
            ? "border-accent text-accent bg-accent/10 shadow-[0_0_12px_rgba(37,99,235,0.4)] animate-bounce"
            : "border-border text-muted-foreground bg-muted/40"
        }`}
      >
        <ArrowDown className="w-3.5 h-3.5" />
      </div>
    </div>
  );
}
