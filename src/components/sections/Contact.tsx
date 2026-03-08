"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              Let's Connect
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-md">
              I am currently open to research internships, AI/ML engineering roles, and collaborative projects. Feel free to reach out.
            </p>
            
            <div className="space-y-8">
              <a href="mailto:sp.professional2005@gmail.com" className="group flex items-center gap-6">
                <div className="w-14 h-14 bg-muted flex items-center justify-center rounded-2xl group-hover:bg-accent/10 transition-colors">
                  <Mail className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-muted-foreground">sp.professional2005@gmail.com</p>
                </div>
              </a>

              <a href="tel:+919123835498" className="group flex items-center gap-6">
                <div className="w-14 h-14 bg-muted flex items-center justify-center rounded-2xl group-hover:bg-accent/10 transition-colors">
                  <Phone className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-muted-foreground">+91 9123835498</p>
                </div>
              </a>

              <div className="group flex items-center gap-6">
                <div className="w-14 h-14 bg-muted flex items-center justify-center rounded-2xl group-hover:bg-accent/10 transition-colors">
                  <MapPin className="w-6 h-6 text-foreground group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-muted-foreground">Kolkata, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-muted/30 p-8 rounded-3xl border border-border"
          >
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <div className="space-y-4">
              <Link
                href="https://linkedin.com/in/sagnick-paul-9aa30a352"
                target="_blank"
                className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="font-medium">LinkedIn Profile</div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
              <Link
                href="https://github.com/Sagnick-Paul"
                target="_blank"
                className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="font-medium">GitHub Repository</div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </Link>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="flex items-center justify-between p-4 bg-accent text-accent-foreground rounded-2xl shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="font-semibold">Download Resume</div>
                </div>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
