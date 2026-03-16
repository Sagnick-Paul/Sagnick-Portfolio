"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "C", level: 85 },
        { name: "Java", level: 75 },
        { name: "JavaScript", level: 80 },
      ],
    },
    {
      title: "Machine Learning & Data Science",
      skills: [
        { name: "PyTorch", level: 85 },
        { name: "TensorFlow", level: 80 },
        { name: "Scikit-Learn", level: 85 },
        { name: "NumPy & Pandas", level: 90 },
      ],
    },
    {
      title: "Embedded Systems & Hardware",
      skills: [
        { name: "Arduino", level: 90 },
        { name: "ESP32", level: 85 },
        { name: "MPU6050 & IMUs", level: 85 },
        { name: "Motor Drivers (L298N)", level: 90 },
      ],
    },
    {
      title: "Tools & Frameworks",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "MATLAB / Simulink", level: 75 },
        { name: "Kaggle", level: 80 },
        { name: "Streamlit", level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-muted/30">
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
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            A comprehensive overview of my technical expertise across software, artificial intelligence, and hardware domains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
              viewport={{ once: false }}
=======
              viewport={{ once: false, margin: "-50px" }}
>>>>>>> genai
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-background border border-border/50 p-8 rounded-2xl hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center text-foreground">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
<<<<<<< HEAD
                        viewport={{ once: false }}
=======
                        viewport={{ once: false, margin: "-50px" }}
>>>>>>> genai
                        transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
