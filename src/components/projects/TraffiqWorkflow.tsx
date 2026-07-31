"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Server,
  Plug,
  Camera,
  FileCode,
  Binary,
  Layers,
  Cpu,
  Compass,
  Maximize2,
  Brain,
  Filter,
  Radar,
  Box,
  Sliders,
  ShieldAlert,
  Gauge,
  Zap,
  Send,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Info,
  CheckCircle2,
  X,
  Sparkles,
  ArrowDown,
} from "lucide-react";

// --- Node Data Structure ---
export interface WorkflowNode {
  id: string;
  title: string;
  subtitle: string;
  phase: "ingestion" | "steering" | "yolo" | "decision" | "control" | "emission";
  branch?: "steering" | "yolo" | "main" | "control_steering" | "control_throttle";
  stepIndex: number; // Logical sequence index (0 to 6)
  icon: React.ElementType;
  purpose: string;
  inputs: string;
  outputs: string;
  tech: string[];
}

const NODES: WorkflowNode[] = [
  // Phase 0: Ingestion (Steps 0 & 1)
  {
    id: "start-server",
    title: "Start Server",
    subtitle: "Init Socket & Comms",
    phase: "ingestion",
    branch: "main",
    stepIndex: 0,
    icon: Server,
    purpose: "Initializes high-frequency TCP/WebSocket socket listener for real-time simulator connection.",
    inputs: "Configuration flags, Port (4567)",
    outputs: "Active socket server instance",
    tech: ["Python", "Socket.IO", "Eventlet"],
  },
  {
    id: "connect-sim",
    title: "Connect to Simulator",
    subtitle: "CARLA / Udacity Handshake",
    phase: "ingestion",
    branch: "main",
    stepIndex: 0,
    icon: Plug,
    purpose: "Establishes bi-directional communication with vehicle simulation engine.",
    inputs: "Socket connection handshake",
    outputs: "Active session pipeline",
    tech: ["WebSockets", "CARLA API"],
  },
  {
    id: "receive-telemetry",
    title: "Receive Telemetry",
    subtitle: "Raw Video & Telemetry Packet",
    phase: "ingestion",
    branch: "main",
    stepIndex: 1,
    icon: Camera,
    purpose: "Captures high-speed camera frames and current velocity vector from vehicle telemetry.",
    inputs: "Base64 camera string, Speed float",
    outputs: "Raw frame packet",
    tech: ["JSON", "Base64 Feed"],
  },
  {
    id: "decode-image",
    title: "Decode Base64 Image",
    subtitle: "Buffer Conversion",
    phase: "ingestion",
    branch: "main",
    stepIndex: 1,
    icon: FileCode,
    purpose: "Parses base64 telemetry stream into uncompressed byte buffer.",
    inputs: "Base64 string stream",
    outputs: "RGB Bytes array",
    tech: ["BytesIO", "PIL Image"],
  },
  {
    id: "numpy-array",
    title: "Convert to NumPy Array",
    subtitle: "Tensor Prep",
    phase: "ingestion",
    branch: "main",
    stepIndex: 1,
    icon: Binary,
    purpose: "Transforms RGB image matrix into numerical float array tensor.",
    inputs: "RGB Bytes",
    outputs: "NumPy Array (H×W×C)",
    tech: ["NumPy", "OpenCV"],
  },

  // Phase 1: Branch 1 - Steering Preprocessing & Inference (Step 2)
  {
    id: "steering-preprocess",
    title: "Steering Preprocess",
    subtitle: "Crop → YUV → Gray → Resize",
    phase: "steering",
    branch: "steering",
    stepIndex: 2,
    icon: Layers,
    purpose: "Crops horizon/car hood, converts color space, applies Gaussian blur and resizing.",
    inputs: "NumPy Frame (160×320×3)",
    outputs: "Preprocessed Matrix (66×200×3)",
    tech: ["OpenCV", "YUV Conversion"],
  },
  {
    id: "onnx-steering",
    title: "ONNX Steering Model",
    subtitle: "NVIDIA Dave-2 CNN Engine",
    phase: "steering",
    branch: "steering",
    stepIndex: 2,
    icon: Cpu,
    purpose: "Runs high-speed CNN model to evaluate optimal continuous steering angle.",
    inputs: "Preprocessed Tensor",
    outputs: "Raw Steering Float",
    tech: ["ONNX Runtime", "PyTorch", "NVIDIA Dave-2"],
  },
  {
    id: "steering-output",
    title: "Steering Angle Output",
    subtitle: "Raw Prediction Stream",
    phase: "steering",
    branch: "steering",
    stepIndex: 2,
    icon: Compass,
    purpose: "Yields raw predicted steering angle value in range [-1.0, 1.0].",
    inputs: "Model output logits",
    outputs: "Steering Angle (-0.14 rad)",
    tech: ["Math Vector"],
  },

  // Phase 1: Branch 2 - YOLO Preprocessing & Detection (Step 2 - Executed in Parallel)
  {
    id: "yolo-preprocess",
    title: "YOLO Preprocess",
    subtitle: "Resize 640×640 + Norm",
    phase: "yolo",
    branch: "yolo",
    stepIndex: 2,
    icon: Maximize2,
    purpose: "Letterboxes frame to 640×640 dimensions and normalizes pixel values to [0,1].",
    inputs: "NumPy Frame",
    outputs: "Tensor (1×3×640×640)",
    tech: ["OpenCV", "CUDA/ARM Tensor"],
  },
  {
    id: "yolo-onnx",
    title: "YOLO ONNX Model",
    subtitle: "YOLOv8 Object Detection",
    phase: "yolo",
    branch: "yolo",
    stepIndex: 2,
    icon: Brain,
    purpose: "Runs quantized YOLOv8 object detector for real-time obstacle segmentation.",
    inputs: "Normalized Tensor",
    outputs: "Raw Bounding Boxes & Confidence",
    tech: ["YOLOv8", "ONNX Execution Engine"],
  },
  {
    id: "detection-outputs",
    title: "Detection Outputs",
    subtitle: "BBoxes & Confidence Scores",
    phase: "yolo",
    branch: "yolo",
    stepIndex: 2,
    icon: Box,
    purpose: "Extracts box coordinates, object class labels, and confidence metrics.",
    inputs: "Feature Map Tensors",
    outputs: "Raw Detections List",
    tech: ["Tensor Operations"],
  },
  {
    id: "filter-confidence",
    title: "Filter by Confidence",
    subtitle: "NMS & Threshold Cutoff",
    phase: "yolo",
    branch: "yolo",
    stepIndex: 2,
    icon: Filter,
    purpose: "Applies Non-Maximum Suppression (NMS) with 0.45 confidence threshold.",
    inputs: "Raw Detections",
    outputs: "Filtered Target Objects",
    tech: ["NMS Filter Algorithm"],
  },
  {
    id: "analyze-obstacles",
    title: "Analyze Obstacles",
    subtitle: "Proximity & Threat Assessment",
    phase: "yolo",
    branch: "yolo",
    stepIndex: 2,
    icon: Radar,
    purpose: "Calculates spatial bounding box area and relative lane position of detected obstacles.",
    inputs: "Filtered Objects List",
    outputs: "Threat Vector & Distances",
    tech: ["Spatial Geometry Engine"],
  },
  {
    id: "obstacle-metadata",
    title: "Obstacle Position + Area",
    subtitle: "Safety Telemetry",
    phase: "yolo",
    branch: "yolo",
    stepIndex: 2,
    icon: ShieldAlert,
    purpose: "Formulates obstacle position metrics for real-time safety layer overrides.",
    inputs: "Threat Vectors",
    outputs: "Obstacle Alert Object",
    tech: ["Data Struct"],
  },

  // Phase 2: Decision Layer (Step 3)
  {
    id: "decision-layer",
    title: "Decision Layer",
    subtitle: "Sensor Fusion & Fail-Safe Engine",
    phase: "decision",
    branch: "main",
    stepIndex: 3,
    icon: Zap,
    purpose: "Fuses continuous neural steering predictions with YOLO obstacle safety analysis.",
    inputs: "Steering Angle & Obstacle Metadata",
    outputs: "Arbitrated Driving Directives",
    tech: ["Sensor Fusion Protocol", "Control State Machine"],
  },

  // Phase 3: Control Execution (Step 4)
  {
    id: "adjust-steering",
    title: "Adjust Steering",
    subtitle: "Smoothing & Offset",
    phase: "control",
    branch: "control_steering",
    stepIndex: 4,
    icon: Sliders,
    purpose: "Applies exponential moving average smoothing to prevent erratic steering jitter.",
    inputs: "Arbitrated Steering",
    outputs: "Smoothed Angle",
    tech: ["Low-Pass Filter"],
  },
  {
    id: "clamp-steering",
    title: "Clamp Steering",
    subtitle: "Mechanical Limits Guard",
    phase: "control",
    branch: "control_steering",
    stepIndex: 4,
    icon: Compass,
    purpose: "Constrains steering angle strictly within physical actuator limits [-25°, +25°].",
    inputs: "Smoothed Angle",
    outputs: "Clamped Steering Value",
    tech: ["Safety Boundary Guard"],
  },
  {
    id: "compute-throttle",
    title: "Compute Throttle",
    subtitle: "Speed Curve & PID Loop",
    phase: "control",
    branch: "control_throttle",
    stepIndex: 4,
    icon: Gauge,
    purpose: "Calculates target acceleration/brake duty cycle based on turn severity and obstacles.",
    inputs: "Steering Severity, Speed Telemetry",
    outputs: "Target Throttle Output",
    tech: ["PID Loop Engine"],
  },
  {
    id: "speed-limiting",
    title: "Speed Limiting + Clamp",
    subtitle: "Obstacle Brake Governor",
    phase: "control",
    branch: "control_throttle",
    stepIndex: 4,
    icon: ShieldAlert,
    purpose: "Executes emergency brake override if obstacle area exceeds safety threshold.",
    inputs: "Target Throttle, Obstacle Alert",
    outputs: "Safe Clamped Throttle",
    tech: ["Emergency Override"],
  },

  // Phase 4: Merge & Emit Control Commands (Steps 5 & 6)
  {
    id: "send-control",
    title: "Send Control",
    subtitle: "Formulate Command Packet",
    phase: "emission",
    branch: "main",
    stepIndex: 5,
    icon: Send,
    purpose: "Packages sanitized steering and throttle commands into vehicle payload.",
    inputs: "Clamped Steering & Throttle",
    outputs: "Control JSON Payload",
    tech: ["JSON Serializer"],
  },
  {
    id: "emit-commands",
    title: "Emit Steering + Throttle",
    subtitle: "Actuator Loop Handshake",
    phase: "emission",
    branch: "main",
    stepIndex: 6,
    icon: CheckCircle2,
    purpose: "Transmits real-time steering/throttle directives back to simulator or hardware CAN bus.",
    inputs: "Control JSON Payload",
    outputs: "Vehicle Actuator Pulse",
    tech: ["Socket.IO Transmit", "CAN Bus"],
  },
];

const MAX_STEPS = 6;

export default function TraffiqWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  // Auto-play step timer
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 3200 / speedMultiplier;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (MAX_STEPS + 1));
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speedMultiplier]);

  // Branch Badges & Theme Styling
  const getBranchBadgeStyle = (branch?: string, phase?: string) => {
    if (branch === "steering") {
      return "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400";
    }
    if (branch === "yolo") {
      return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    }
    if (phase === "decision") {
      return "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400";
    }
    if (phase === "emission") {
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    }
    return "border-accent/30 bg-accent/10 text-accent";
  };

  const getBranchCardGlow = (node: WorkflowNode, isActive: boolean, isVisited: boolean) => {
    if (!isActive && !isVisited) {
      return "bg-surface/90 border-border/60 text-muted-foreground opacity-60 hover:opacity-100 hover:border-accent/40";
    }

    if (isActive) {
      if (node.branch === "steering") {
        return "bg-surface border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.35)] text-foreground scale-[1.03] ring-2 ring-blue-500/40 z-20";
      }
      if (node.branch === "yolo") {
        return "bg-surface border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.35)] text-foreground scale-[1.03] ring-2 ring-amber-500/40 z-20";
      }
      if (node.phase === "decision") {
        return "bg-surface border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.35)] text-foreground scale-[1.03] ring-2 ring-purple-500/40 z-20";
      }
      if (node.phase === "emission") {
        return "bg-surface border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.35)] text-foreground scale-[1.03] ring-2 ring-emerald-500/40 z-20";
      }
      return "bg-surface border-accent shadow-[0_0_30px_rgba(37,99,235,0.35)] text-foreground scale-[1.03] ring-2 ring-accent/40 z-20";
    }

    return "bg-surface border-border text-foreground shadow-sm opacity-95";
  };

  // Node Filters
  const step0Nodes = NODES.filter((n) => n.stepIndex === 0);
  const step1Nodes = NODES.filter((n) => n.stepIndex === 1);
  const steeringNodes = NODES.filter((n) => n.branch === "steering");
  const yoloNodes = NODES.filter((n) => n.branch === "yolo");
  const decisionNode = NODES.find((n) => n.phase === "decision")!;
  const controlSteeringNodes = NODES.filter((n) => n.branch === "control_steering");
  const controlThrottleNodes = NODES.filter((n) => n.branch === "control_throttle");
  const emissionNodes = NODES.filter((n) => n.phase === "emission");

  return (
    <div className="w-full my-6 p-6 sm:p-8 lg:p-10 rounded-3xl bg-surface/50 backdrop-blur-xl border border-border/80 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Control Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-accent/10 border border-accent/20 text-accent">
              <Sparkles className="w-4 h-4" /> System Architecture Canvas
            </span>
            <span className="text-xs text-muted-foreground font-mono">Traffiq Autopilot</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            End-to-End Dual-Model Autonomous Architecture
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time inference pipeline fusing continuous CNN steering predictions with parallel YOLOv8 safety segmentation.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center flex-wrap gap-2.5 bg-surface/90 border border-border p-2.5 rounded-2xl shadow-lg backdrop-blur-md self-start md:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground font-semibold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md"
            title={isPlaying ? "Pause Pipeline" : "Play Pipeline"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            onClick={() => setActiveStep(0)}
            className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            title="Reset Workflow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-5 w-[1px] bg-border mx-1" />

          {/* Speed Toggle */}
          <button
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-border bg-muted/50 hover:bg-muted text-foreground transition-colors"
            title="Speed Rate"
          >
            <FastForward className="w-3.5 h-3.5 text-accent" />
            <span>{speedMultiplier}x Speed</span>
          </button>

          <div className="h-5 w-[1px] bg-border mx-1" />

          {/* Step Badges */}
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4, 5, 6].map((step) => {
              const isActive = activeStep === step;
              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-md scale-110"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  {step}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- DESKTOP & TABLET HORIZONTAL CANVAS LAYOUT (md and up) --- */}
      <div className="hidden md:block relative z-10 w-full overflow-x-auto pb-6 pt-2 no-scrollbar">
        <div className="min-w-[1280px] w-full flex items-stretch gap-6 lg:gap-8 xl:gap-10 relative">

          {/* Step 0: Ingestion */}
          <div className="flex-1 min-w-[200px] flex flex-col justify-center gap-4">
            <div className="text-xs font-bold font-mono text-muted-foreground tracking-wider uppercase mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              1. Telemetry Ingestion
            </div>
            {step0Nodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>

          <ConnectionArrow isActive={activeStep >= 1} />

          {/* Step 1: Tensor Matrix Prep */}
          <div className="flex-1 min-w-[200px] flex flex-col justify-center gap-4">
            <div className="text-xs font-bold font-mono text-muted-foreground tracking-wider uppercase mb-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              2. Tensor Matrix Prep
            </div>
            {step1Nodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>

          <ConnectionArrow isActive={activeStep >= 2} isSplit />

          {/* Step 2: Dual Parallel Processing Branches */}
          <div className="flex-[2.5] min-w-[500px] flex flex-col gap-6 justify-center">
            
            {/* Steering Branch */}
            <div className="p-4 rounded-3xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 relative shadow-inner">
              <div className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Branch 1: NVIDIA Dave-2 Steering CNN Engine
              </div>
              <div className="grid grid-cols-3 gap-3">
                {steeringNodes.map((node) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    isActive={activeStep === node.stepIndex}
                    isVisited={activeStep > node.stepIndex}
                    onClick={() => setSelectedNode(node)}
                    branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                    glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
                  />
                ))}
              </div>
            </div>

            {/* YOLO Branch */}
            <div className="p-4 rounded-3xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 relative shadow-inner">
              <div className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400 tracking-wider uppercase mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Branch 2: YOLOv8 Obstacle Safety Engine
              </div>
              <div className="grid grid-cols-3 gap-3">
                {yoloNodes.map((node) => (
                  <NodeCard
                    key={node.id}
                    node={node}
                    isActive={activeStep === node.stepIndex}
                    isVisited={activeStep > node.stepIndex}
                    onClick={() => setSelectedNode(node)}
                    branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                    glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
                  />
                ))}
              </div>
            </div>

          </div>

          <ConnectionArrow isActive={activeStep >= 3} isMerge />

          {/* Step 3: Decision Fusion Engine */}
          <div className="flex-1 min-w-[210px] flex flex-col justify-center gap-4">
            <div className="text-xs font-bold font-mono text-purple-600 dark:text-purple-400 tracking-wider uppercase mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              3. Sensor Fusion
            </div>
            <NodeCard
              node={decisionNode}
              isActive={activeStep === decisionNode.stepIndex}
              isVisited={activeStep > decisionNode.stepIndex}
              onClick={() => setSelectedNode(decisionNode)}
              branchStyle={getBranchBadgeStyle(decisionNode.branch, decisionNode.phase)}
              glowStyle={getBranchCardGlow(decisionNode, activeStep === decisionNode.stepIndex, activeStep > decisionNode.stepIndex)}
            />
          </div>

          <ConnectionArrow isActive={activeStep >= 4} isSplit />

          {/* Step 4: Control Arbitrators */}
          <div className="flex-[1.8] min-w-[340px] flex flex-col justify-center gap-4">
            <div className="text-xs font-bold font-mono text-muted-foreground tracking-wider uppercase mb-1 flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              4. Control Arbitrator
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {controlSteeringNodes.map((node) => (
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={activeStep === node.stepIndex}
                  isVisited={activeStep > node.stepIndex}
                  onClick={() => setSelectedNode(node)}
                  branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                  glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {controlThrottleNodes.map((node) => (
                <NodeCard
                  key={node.id}
                  node={node}
                  isActive={activeStep === node.stepIndex}
                  isVisited={activeStep > node.stepIndex}
                  onClick={() => setSelectedNode(node)}
                  branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                  glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
                />
              ))}
            </div>
          </div>

          <ConnectionArrow isActive={activeStep >= 5} isMerge />

          {/* Steps 5 & 6: Command Output & Actuation */}
          <div className="flex-1 min-w-[210px] flex flex-col justify-center gap-4">
            <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 tracking-wider uppercase mb-1 flex items-center gap-2">
              <Send className="w-4 h-4" />
              5. Actuation Loop
            </div>
            {emissionNodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>

        </div>
      </div>

      {/* --- MOBILE ADAPTIVE VERTICAL STACK LAYOUT (sm & mobile) --- */}
      <div className="block md:hidden relative z-10 space-y-6">
        {/* Step 0: Ingestion */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-mono text-muted-foreground uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> 1. Telemetry Ingestion (Step 0 & 1)
          </div>
          <div className="grid gap-3">
            {[...step0Nodes, ...step1Nodes].map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>
        </div>

        <VerticalConnector isActive={activeStep >= 2} />

        {/* Step 2: Steering Branch */}
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-3">
          <div className="text-xs font-bold font-mono text-blue-500 uppercase flex items-center gap-2">
            <Compass className="w-4 h-4" /> Steering Branch (Step 2)
          </div>
          <div className="grid gap-3">
            {steeringNodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>
        </div>

        <VerticalConnector isActive={activeStep >= 2} />

        {/* Step 2: YOLO Branch */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
          <div className="text-xs font-bold font-mono text-amber-500 uppercase flex items-center gap-2">
            <Brain className="w-4 h-4" /> YOLOv8 Safety Branch (Step 2)
          </div>
          <div className="grid gap-3">
            {yoloNodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>
        </div>

        <VerticalConnector isActive={activeStep >= 3} />

        {/* Step 3: Fusion Engine */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-mono text-purple-500 uppercase flex items-center gap-2">
            <Zap className="w-4 h-4" /> Sensor Fusion Engine (Step 3)
          </div>
          <NodeCard
            node={decisionNode}
            isActive={activeStep === decisionNode.stepIndex}
            isVisited={activeStep > decisionNode.stepIndex}
            onClick={() => setSelectedNode(decisionNode)}
            branchStyle={getBranchBadgeStyle(decisionNode.branch, decisionNode.phase)}
            glowStyle={getBranchCardGlow(decisionNode, activeStep === decisionNode.stepIndex, activeStep > decisionNode.stepIndex)}
          />
        </div>

        <VerticalConnector isActive={activeStep >= 4} />

        {/* Step 4: Control Processing */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-mono text-muted-foreground uppercase flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Control Processing (Step 4)
          </div>
          <div className="grid gap-3">
            {[...controlSteeringNodes, ...controlThrottleNodes].map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>
        </div>

        <VerticalConnector isActive={activeStep >= 5} />

        {/* Step 5 & 6: Actuation Output */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-mono text-emerald-500 uppercase flex items-center gap-2">
            <Send className="w-4 h-4" /> Actuation Output (Step 5 & 6)
          </div>
          <div className="grid gap-3">
            {emissionNodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeStep === node.stepIndex}
                isVisited={activeStep > node.stepIndex}
                onClick={() => setSelectedNode(node)}
                branchStyle={getBranchBadgeStyle(node.branch, node.phase)}
                glowStyle={getBranchCardGlow(node, activeStep === node.stepIndex, activeStep > node.stepIndex)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="mt-8 pt-5 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground relative z-10">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="font-medium text-foreground">Steering Branch (CNN)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="font-medium text-foreground">Safety Branch (YOLOv8)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="font-medium text-foreground">Decision Fusion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="font-medium text-foreground">Actuator Output</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono bg-muted/50 px-3 py-1.5 rounded-xl border border-border">
          <Info className="w-4 h-4 text-accent" />
          <span>Click any card to inspect technical specifications</span>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-surface border border-border rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500" />

              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-accent/10 text-accent border border-accent/20">
                  <selectedNode.icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-foreground">{selectedNode.title}</h4>
                  <p className="text-sm text-muted-foreground">{selectedNode.subtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <h5 className="text-xs font-bold uppercase text-accent font-mono mb-1">Purpose</h5>
                  <p className="text-sm text-foreground leading-relaxed">{selectedNode.purpose}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <h5 className="text-xs font-bold uppercase text-muted-foreground font-mono mb-1">Inputs</h5>
                    <p className="text-xs font-mono text-foreground">{selectedNode.inputs}</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60">
                    <h5 className="text-xs font-bold uppercase text-muted-foreground font-mono mb-1">Outputs</h5>
                    <p className="text-xs font-mono text-foreground">{selectedNode.outputs}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold uppercase text-muted-foreground font-mono mb-2">Technologies Used</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-accent/10 text-accent border border-accent/20"
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

// --- Node Card Component ---
interface NodeCardProps {
  node: WorkflowNode;
  isActive: boolean;
  isVisited: boolean;
  onClick: () => void;
  branchStyle: string;
  glowStyle: string;
}

function NodeCard({ node, isActive, isVisited, onClick, branchStyle, glowStyle }: NodeCardProps) {
  const Icon = node.icon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 relative ${glowStyle}`}
    >
      {isActive && (
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent" />
        </span>
      )}

      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className={`p-2.5 rounded-xl border ${branchStyle}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-border/80 bg-muted/60 text-muted-foreground">
          Step {node.stepIndex}
        </span>
      </div>

      <h5 className="text-xs sm:text-sm font-bold tracking-tight text-foreground line-clamp-1">{node.title}</h5>
      <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1 mt-0.5">{node.subtitle}</p>
    </motion.div>
  );
}

// --- Horizontal Flowing SVG Connection Arrow Component ---
function ConnectionArrow({ isActive, isSplit, isMerge }: { isActive: boolean; isSplit?: boolean; isMerge?: boolean }) {
  return (
    <div className="flex items-center justify-center relative w-10 shrink-0">
      <svg className="w-full h-24 overflow-visible" viewBox="0 0 40 80" fill="none">
        <path
          d={
            isSplit
              ? "M 0 40 C 20 40, 20 12, 40 12 M 0 40 C 20 40, 20 68, 40 68"
              : isMerge
              ? "M 0 12 C 20 12, 20 40, 40 40 M 0 68 C 20 68, 20 40, 40 40"
              : "M 0 40 L 40 40"
          }
          className={`transition-all duration-500 ${
            isActive
              ? "stroke-accent dark:stroke-accent/90 stroke-[2.5]"
              : "stroke-border/80 stroke-1"
          }`}
          strokeDasharray={isActive ? "none" : "4 4"}
        />

        {isActive && (
          <circle r="4" className="fill-accent shadow-glow">
            <animateMotion
              path={
                isSplit
                  ? "M 0 40 C 20 40, 20 12, 40 12"
                  : isMerge
                  ? "M 0 12 C 20 12, 20 40, 40 40"
                  : "M 0 40 L 40 40"
              }
              dur="1.2s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
    </div>
  );
}

// --- Vertical Connector Component for Mobile Stack ---
function VerticalConnector({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex justify-center my-2">
      <div
        className={`p-2 rounded-full border transition-all ${
          isActive
            ? "border-accent text-accent bg-accent/10 shadow-[0_0_15px_rgba(37,99,235,0.4)] animate-bounce"
            : "border-border text-muted-foreground bg-muted/40"
        }`}
      >
        <ArrowDown className="w-4 h-4" />
      </div>
    </div>
  );
}
