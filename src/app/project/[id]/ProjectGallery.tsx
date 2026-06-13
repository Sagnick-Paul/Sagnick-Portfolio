"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Maximize2, Image as ImageIcon } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export default function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, images.length]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  return (
    <section className="relative z-10">
      <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="p-2 rounded-lg bg-accent/10 text-accent">
          <ImageIcon className="w-5 h-5" />
        </span>
        Project Gallery & Visuals
      </h2>

      <div className={`grid gap-6 ${images.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"}`}>
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setLightboxIndex(index)}
            className="group relative cursor-zoom-in rounded-2xl overflow-hidden border border-border/50 bg-secondary/30 aspect-video shadow-lg hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition-all duration-500"
          >
            {/* The Image */}
            <Image
              src={img}
              alt={`${projectTitle} screenshot ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              unoptimized // Ensure dynamic custom local user images load properly
            />

            {/* Premium Hover Overlay */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                className="w-12 h-12 bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Screen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 select-none"
          >
            {/* Top Bar Info & Controls */}
            <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 sm:px-12 text-white/80 bg-gradient-to-b from-slate-950/80 to-transparent">
              <span className="text-sm font-medium tracking-wide">
                {projectTitle} &bull; Image {lightboxIndex + 1} of {images.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Left/Right navigation for large screens */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-6 sm:left-12 p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 z-[101]"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-6 sm:right-12 p-4 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 z-[101]"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Interactive Image Frame */}
            <div
              className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900/40"
                >
                  <Image
                    src={images[lightboxIndex]}
                    alt={`${projectTitle} gallery image ${lightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Pagination Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-8 flex gap-2" onClick={(e) => e.stopPropagation()}>
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === lightboxIndex ? "w-8 bg-accent" : "w-2.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
