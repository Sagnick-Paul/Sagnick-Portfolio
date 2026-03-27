export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
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
    description: "CNN-based medical image segmentation with preprocessing, augmentation, and model evaluation using Dice coefficient. Deployed via Streamlit.",
    techStack: ["Deep Learning", "CNN", "Streamlit", "Medical AI", "PyTorch", "OpenCV"],
    images: [
      "/projects/mri-1.jpg",
      "/projects/mri-2.jpg"
    ],
    problem: "Accurate segmentation of brain tumors in MRI scans is crucial for clinical diagnosis and treatment planning. Manual segmentation is time-consuming and prone to human error, highlighting the need for automated and reliable AI assist tools.",
    approach: "Developed an end-to-end pipeline starting with skull stripping and contrast enhancement, followed by data augmentation. A deep Convolutional Neural Network (U-Net architecture) was trained to predict pixel-wise tumor masks.",
    architecture: "The system relies on a U-Net based encoder-decoder architecture with skip connections. The model was trained using a custom Dice Loss function to handle class imbalance, and the frontend is served using a Streamlit Python web app.",
    challenges: [
      "Handling severe class imbalance where background pixels overwhelmingly outnumber tumor pixels.",
      "Optimizing the model's inference time to ensure the Streamlit web app remains highly responsive.",
      "Ensuring generalization across varying MRI scan resolutions and brightness levels."
    ],
    results: [
      "Achieved a Dice Similarity Coefficient of over 85% on the validation set.",
      "Reduced the time required to generate segmentation masks from minutes to under 5 seconds.",
      "Successfully deployed a user-friendly clinical prediction web interface."
    ],
    links: {
      github: "https://github.com/Sagnick-Paul/NeuroSeg-Brain-MRI-Segmentation",
      live: "https://neuroseg-brain-mri-segmentation-krmujvucnpbhpyw4coyjgy.streamlit.app/"
    },
    featured: true,
    documents: [
      {
        title: "Problem Statement",
        url: "/brain-tumor-ps.pdf"
      },
      {
        title: "Project Report",
        url: "/brain-tumor-report.pdf"
      }
    ],
  },
  {
    id: "self-balancing-robot",
    title: "Self Balancing Robot",
    description: "Designed a two-wheel self-balancing robot utilizing MPU6050 IMU sensors and implemented PID-based real-time stabilization using embedded control systems.",
    techStack: ["Robotics", "PID Control", "Embedded C", "Arduino", "IMU", "Hardware Design"],
    images: [
      "/projects/robot-1.jpg"
    ],
    problem: "Maintaining stability in an inherently unstable inverted pendulum system (a two-wheeled robot) requires rapid, precise sensor feedback and real-time control to prevent the platform from tipping over.",
    approach: "Engineered a custom chassis and integrated an MPU6050 6-axis IMU to read tilt angles. Implemented a complementary filter for sensor fusion to mitigate accelerometer noise and gyroscope drift. A PID control loop was programmed to continuously adjust motor speeds based on the tilt error.",
    architecture: "Hardware: Arduino Nano, MPU6050, L298N Motor Driver, High-torque DC Gear Motors. Software: Bare-metal Embedded C utilizing interrupt-driven timer routines to maintain a strict 10ms control loop for calculating the PID output.",
    challenges: [
      "Tuning the Proportional, Integral, and Derivative (PID) constants accurately without a mathematical simulation model.",
      "Managing power fluctuations when the motors instantaneously changed direction.",
      "Dealing with sensor noise and vibration feedback from the physical chassis."
    ],
    results: [
      "Successfully achieved stable upright balancing capable of resisting moderate external perturbations.",
      "Developed a robust embedded codebase with modular hardware abstraction layers.",
      "Demonstrated practical application of control theory principles on physical hardware."
    ],
    links: {
      github: "https://github.com/Sagnick-Paul",
    },
    featured: true,
  },
  {
    id: "jet-image-classification",
    title: "Jet Image Classification & Anomaly Detection",
    description: "Built a Convolutional Neural Network (CNN) classifier for jet image data. Applied PCA for dimensionality reduction and utilized an autoencoder for advanced anomaly detection.",
    techStack: ["Machine Learning", "Autoencoders", "PCA", "CNN", "TensorFlow", "Pandas"],
    images: [
      "/projects/jet-1.jpg"
    ],
    problem: "In high-energy physics, distinguishing between different types of particle jets and detecting rare, anomalous signatures in collider data is a massive computational bottleneck that traditional algorithms struggle to process efficiently.",
    approach: "Treated the calorimeter energy deposits as 2D images. Utilized Principal Component Analysis (PCA) to reduce background noise, followed by training a CNN to classify jet signatures. Additionally, implemented an unsupervised Autoencoder to flag anomalous, out-of-distribution events based on reconstruction error.",
    architecture: "Data pipeline built with NumPy/Pandas. The autoencoder features a symmetrical bottleneck architecture, while the CNN utilizes stacked spatial convolutions and max-pooling layers. Both models were implemented and trained using TensorFlow/Keras.",
    challenges: [
      "Handling extremely sparse matrices, as most of a jet image consists of zero-energy pixels.",
      "Determining the optimal reconstruction error threshold to reliably separate signal anomalies from background noise.",
      "Training complex models on a high volume of scientific data with limited compute resources."
    ],
    results: [
      "Achieved 92% accuracy in classifying distinct jet flavor categories.",
      "The autoencoder successfully isolated 85% of injected anomalous signal patterns.",
      "Significantly reduced inference computational load comparing to traditional physics simulation techniques."
    ],
    links: {
      github: "https://github.com/Sagnick-Paul/Jet-Image-Classification-CNN",
    },
    featured: true,
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
