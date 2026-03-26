"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, Download } from "lucide-react";

interface Document {
  title: string;
  url: string;
}

export default function ProjectDocumentation({ documents }: { documents: Document[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!documents || documents.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <span className="p-2 rounded-lg bg-accent/10 text-accent">
          <FileText className="w-5 h-5" />
        </span>
        Documentation
      </h2>

      <div className="bg-secondary/20 rounded-2xl border border-border/50 overflow-hidden shadow-sm">
        {/* Tabs Header */}
        <div className="flex border-b border-border/50 overflow-x-auto scrollbar-hide bg-background/50">
          {documents.map((doc, index) => (
            <button
              key={index}
              onClick={() => {
                if (activeTab !== index) {
                  setIsLoading(true);
                  setActiveTab(index);
                }
              }}
              className={`relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === index 
                  ? "text-accent" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <FileText className="w-4 h-4" />
              {doc.title}
              {activeTab === index && (
                <motion.div
                  layoutId="activeDocTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center p-3 sm:p-4 bg-background/80 border-b border-border/50 backdrop-blur-sm">
          <div className="text-xs sm:text-sm text-muted-foreground font-medium flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
            <span className="truncate">Viewing: {documents[activeTab].title}</span>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={documents[activeTab].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors border border-border/50"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in New Tab</span>
              <span className="sm:hidden">Open</span>
            </a>
            <a
              href={documents[activeTab].url}
              download
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </a>
          </div>
        </div>

        {/* PDF Viewer Area */}
        <div className="relative w-full h-[500px] sm:h-[600px] bg-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 z-10 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                    <p className="text-sm text-muted-foreground animate-pulse font-medium">Loading Document...</p>
                  </div>
                </div>
              )}
              
              <iframe
                src={`${documents[activeTab].url}#toolbar=0&navpanes=0&view=FitH`}
                className="w-full h-full border-0 absolute inset-0 rounded-b-2xl bg-white"
                onLoad={() => setIsLoading(false)}
                title={documents[activeTab].title}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
