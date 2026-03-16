"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
          viewport={{ once: false }}
=======
          viewport={{ once: false, margin: "-50px" }}
>>>>>>> genai
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            About Me
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-6">
            <p>
              I am an Electrical Engineering undergraduate at Jadavpur University (2024–2028),
              passionate about building intelligent systems. My academic journey is driven by
              a deep curiosity for the intersection of <strong>Artificial Intelligence</strong>, 
              <strong> Intelligent Control Systems</strong>, and <strong>Robotics</strong>.
            </p>
            <p>
              With a strong foundation in both software algorithms and hardware integration,
              I specialize in bridging the gap between digital intelligence and physical execution.
              My work focuses on applying AI to real-world applications, autonomous platforms, 
              and intelligent sensing systems.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-8 border-t border-border">
              <div>
                <h3 className="text-foreground font-semibold mb-2">Education</h3>
                <p className="text-sm">B.E. Electrical Engineering, Jadavpur University</p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Interests</h3>
                <p className="text-sm">Deep Learning, Embedded Systems, Autonomous Platforms</p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Location</h3>
                <p className="text-sm">Kolkata, India</p>
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-2">Available for</h3>
                <p className="text-sm">Internships, Research Opportunities</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
