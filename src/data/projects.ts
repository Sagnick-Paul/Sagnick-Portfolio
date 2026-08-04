export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  metrics: ProjectMetric[];
  thumbnail: string;
  images: string[];
  imageFolder?: string;
  problem: string;
  approach: string;
  architecture: string;
  challenges: string[];
  results: string[];
  links: {
    github?: string;
    live?: string;
  };
  featured?: boolean;
  documents?: {
    title: string;
    url: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "brain-mri-segmentation",
    title: "Brain MRI Tumor Segmentation",
    shortDescription:
      "CNN-based medical image segmentation achieving Dice 0.85+ on LGG MRI dataset, deployed via Streamlit.",
    description:
      "CNN-based medical image segmentation with preprocessing, augmentation, and model evaluation using Dice coefficient. Deployed via Streamlit.",
    metrics: [
      { label: "Dice Score", value: "0.85+" },
      { label: "Inference", value: "<5s" },
      { label: "Architecture", value: "U-Net" },
    ],
    thumbnail: "/projects/brain-mri-card.png",
    techStack: ["Deep Learning", "CNN", "Streamlit", "Medical AI", "PyTorch", "OpenCV"],
    images: [
      "/Brain tumour segmentation/download.png",
      "/Brain tumour segmentation/my_plot1.png",
      "/Brain tumour segmentation/my_plot1 (1).png",
      "/Brain tumour segmentation/my_plot3.png",
      "/Brain tumour segmentation/my_plot4.png",
    ],
    imageFolder: "Brain tumour segmentation",
    problem:
      "Accurate segmentation of brain tumors in MRI scans is crucial for clinical diagnosis and treatment planning. Manual segmentation is time-consuming and prone to human error, highlighting the need for automated and reliable AI assist tools.",
    approach:
      "Developed an end-to-end pipeline starting with skull stripping and contrast enhancement, followed by data augmentation. A deep Convolutional Neural Network (U-Net architecture) was trained to predict pixel-wise tumor masks.",
    architecture:
      "The system relies on a U-Net based encoder-decoder architecture with skip connections. The model was trained using a custom Dice Loss function to handle class imbalance, and the frontend is served using a Streamlit Python web app.",
    challenges: [
      "Handling severe class imbalance where background pixels overwhelmingly outnumber tumor pixels.",
      "Optimizing the model's inference time to ensure the Streamlit web app remains highly responsive.",
      "Ensuring generalization across varying MRI scan resolutions and brightness levels.",
    ],
    results: [
      "Achieved a Dice Similarity Coefficient of over 85% on the validation set.",
      "Reduced the time required to generate segmentation masks from minutes to under 5 seconds.",
      "Successfully deployed a user-friendly clinical prediction web interface.",
    ],
    links: {
      github: "https://github.com/Sagnick-Paul/NeuroSeg-Brain-MRI-Segmentation",
      live: "https://neuroseg-brain-mri-segmentation-krmujvucnpbhpyw4coyjgy.streamlit.app/",
    },
    featured: true,
    documents: [
      { title: "Problem Statement", url: "/brain-tumor-ps.pdf" },
      { title: "Project Report", url: "/brain-tumor-report.pdf" },
    ],
  },
  {
    id: "traffiq-2025-self-driving",
    title: "Behavioral Cloning Self-Driving System",
    shortDescription:
      "End-to-end autonomous vehicle navigation using Behavioral Cloning and YOLOv8 on Raspberry Pi 4B.",
    description:
      "End-to-end AI system for autonomous vehicle navigation using Behavioral Cloning (Dave-2) and YOLOv8 for real-time obstacle detection on Raspberry Pi.",
    metrics: [
      { label: "Val MSE", value: "0.0809" },
      { label: "Latency", value: "300ms" },
      { label: "Platform", value: "RPi 4B" },
    ],
    thumbnail: "/projects/traffiq-card.png",
    techStack: ["PyTorch", "ONNX", "YOLOv8", "CARLA", "Raspberry Pi", "Computer Vision"],
    images: ["/projects/traffiq-1.jpg"],
    problem:
      "Navigating a complex physical arena autonomously requires high-frequency processing of visual data and reliable inference on constrained edge hardware like the Raspberry Pi 4B.",
    approach:
      "Combined Behavioral Cloning for lane following with a YOLO-based safety layer. Trained the CNN on Udacity simulation data and fine-tuned it on photorealistic CARLA environments to bridge the sim-to-real gap.",
    architecture:
      "Dual-model architecture: NVIDIA Dave-2 (CNN) for continuous steering prediction and YOLOv8n for parallel obstacle detection. Exported to ONNX for 20+ FPS inference on 8GB Raspberry Pi 4B.",
    challenges: [
      "Optimizing model latency to maintain a high control frequency on ARM-based hardware.",
      "Bridging the sim-to-real gap using domain adaptation via photorealistic CARLA data.",
      "Developing a fail-safe override mechanism for real-time obstacle avoidance.",
    ],
    results: [
      "Achieved stable autonomous navigation with a validation MSE of 0.0809.",
      "Successfully integrated a real-time YOLOv8 safety layer with 300ms latency on CPU.",
      "Full compliance with TRAFFIQ competition rules and local execution requirements.",
    ],
    links: {
      github: "https://github.com/Sagnick-Paul/TraffIQ-Self-Driving-Car",
    },
    featured: true,
    documents: [
      { title: "Problem Statement", url: "/traffiq-ps.pdf" },
      { title: "Project Report", url: "/traffiq-report.pdf" },
    ],
  },
  {
    id: "self-balancing-robot",
    title: "Self Balancing Robot",
    shortDescription:
      "MPU6050-driven inverted pendulum stabilization with PID control running at a strict 10ms loop on Arduino Nano.",
    description:
      "Designed a two-wheel self-balancing robot utilizing MPU6050 IMU sensors and implemented PID-based real-time stabilization using embedded control systems.",
    metrics: [
      { label: "Control Loop", value: "10ms" },
      { label: "Algorithm", value: "PID" },
      { label: "MCU", value: "Arduino" },
    ],
    thumbnail: "/projects/robot-card.png",
    techStack: ["Robotics", "PID Control", "Embedded C", "Arduino", "IMU", "Hardware Design"],
    images: ["/projects/robot-1.jpg"],
    problem:
      "Maintaining stability in an inherently unstable inverted pendulum system (a two-wheeled robot) requires rapid, precise sensor feedback and real-time control to prevent the platform from tipping over.",
    approach:
      "Engineered a custom chassis and integrated an MPU6050 6-axis IMU to read tilt angles. Implemented a complementary filter for sensor fusion to mitigate accelerometer noise and gyroscope drift. A PID control loop was programmed to continuously adjust motor speeds based on the tilt error.",
    architecture:
      "Hardware: Arduino Nano, MPU6050, L298N Motor Driver, High-torque DC Gear Motors. Software: Bare-metal Embedded C utilizing interrupt-driven timer routines to maintain a strict 10ms control loop for calculating the PID output.",
    challenges: [
      "Tuning the Proportional, Integral, and Derivative (PID) constants accurately without a mathematical simulation model.",
      "Managing power fluctuations when the motors instantaneously changed direction.",
      "Dealing with sensor noise and vibration feedback from the physical chassis.",
    ],
    results: [
      "Successfully achieved stable upright balancing capable of resisting moderate external perturbations.",
      "Developed a robust embedded codebase with modular hardware abstraction layers.",
      "Demonstrated practical application of control theory principles on physical hardware.",
    ],
    links: {
      github: "https://github.com/Sagnick-Paul",
    },
    featured: true,
  },
  {
    id: "jet-image-classification",
    title: "Jet Image Classification & Anomaly Detection",
    shortDescription:
      "CNN classifier and unsupervised autoencoder for particle jet anomaly detection at collider scale, achieving 92% accuracy.",
    description:
      "Built a Convolutional Neural Network (CNN) classifier for jet image data. Applied PCA for dimensionality reduction and utilized an autoencoder for advanced anomaly detection.",
    metrics: [
      { label: "Accuracy", value: "92%" },
      { label: "Anomaly Recall", value: "85%" },
      { label: "Method", value: "Autoencoder" },
    ],
    thumbnail: "/projects/jet-card.png",
    techStack: ["Machine Learning", "Autoencoders", "PCA", "CNN", "TensorFlow", "Pandas"],
    images: ["/projects/jet-1.jpg"],
    problem:
      "In high-energy physics, distinguishing between different types of particle jets and detecting rare, anomalous signatures in collider data is a massive computational bottleneck that traditional algorithms struggle to process efficiently.",
    approach:
      "Treated the calorimeter energy deposits as 2D images. Utilized Principal Component Analysis (PCA) to reduce background noise, followed by training a CNN to classify jet signatures. Additionally, implemented an unsupervised Autoencoder to flag anomalous, out-of-distribution events based on reconstruction error.",
    architecture:
      "Data pipeline built with NumPy/Pandas. The autoencoder features a symmetrical bottleneck architecture, while the CNN utilizes stacked spatial convolutions and max-pooling layers. Both models were implemented and trained using TensorFlow/Keras.",
    challenges: [
      "Handling extremely sparse matrices, as most of a jet image consists of zero-energy pixels.",
      "Determining the optimal reconstruction error threshold to reliably separate signal anomalies from background noise.",
      "Training complex models on a high volume of scientific data with limited compute resources.",
    ],
    results: [
      "Achieved 92% accuracy in classifying distinct jet flavor categories.",
      "The autoencoder successfully isolated 85% of injected anomalous signal patterns.",
      "Significantly reduced inference computational load comparing to traditional physics simulation techniques.",
    ],
    links: {
      github: "https://github.com/Sagnick-Paul/Jet-Image-Classification-CNN",
    },
    featured: false,
  },
  {
    id: "multi-agent-research-lab",
    title: "Multi-Agent Research Laboratory",
    shortDescription:
      "4-agent LangGraph pipeline automating deep web research with live SSE streaming to a React dashboard.",
    description:
      "Full-stack AI application automating deep research workflows via specialized LangChain/LangGraph agents streaming live over Server-Sent Events (SSE).",
    metrics: [
      { label: "Agents", value: "4" },
      { label: "Transport", value: "SSE" },
      { label: "KG Coverage", value: "93%" },
    ],
    thumbnail: "/projects/multi-agent-card.png",
    techStack: [
      "FastAPI",
      "React",
      "TypeScript",
      "LangChain",
      "LangGraph",
      "Mistral AI",
      "Tavily API",
      "TailwindCSS",
    ],
    images: ["/projects/multi-agent-research-lab.jpg"],
    problem:
      "Conducting deep, structured web research and synthesizing multi-source findings into accurate, evaluated reports is highly manual, inefficient, and time-consuming.",
    approach:
      "Built a 4-step autonomous multi-agent pipeline using LangChain/LangGraph and Mistral AI. The system orchestrates web search via Tavily API, content extraction via BeautifulSoup web scraping, structured report drafting with specialized prompts, and automated critic scoring.",
    architecture:
      "Decoupled architecture comprising a FastAPI Python backend serving an SSE (Server-Sent Events) endpoint, and a Vite/React 18 frontend dashboard. The pipeline streams asynchronous status updates, logs, and generated Markdown payloads in real time directly to the browser.",
    challenges: [
      "Orchestrating asynchronous agent state transitions and preventing event-loop bottlenecks by delegating blocking tool calls to threads.",
      "Ensuring smooth real-time stream buffering across Nginx/Render proxy layers by configuring custom SSE headers.",
      "Establishing robust wire protocol data contracts between Python Pydantic enums/models and TypeScript interfaces.",
    ],
    results: [
      "Successfully automated end-to-end research workflows from query submission to critical evaluation.",
      "Delivered live progress monitoring and instant Markdown export (PDF/DOCX) on a responsive dashboard.",
      "Achieved 93% knowledge graph extraction density across system architecture nodes via Graphify analysis.",
    ],
    links: {
      github: "https://github.com/Sagnick-Paul/Multi-AI-Agent-System",
      live: "https://multi-ai-agent-system.onrender.com/",
    },
    featured: true,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
