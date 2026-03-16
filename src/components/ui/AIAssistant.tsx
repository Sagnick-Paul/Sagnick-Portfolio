"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { portfolioKnowledge } from "@/lib/knowledge";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Sagnick's AI assistant. Ask me anything about his projects, skills, or experience!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const generateResponse = (input: string): string => {
    const lowInput = input.toLowerCase();

    // Project related
    if (lowInput.includes("project") || lowInput.includes("work")) {
      const projectTitles = portfolioKnowledge.projects.map(p => p.title).join(", ");
      return `Sagnick has worked on several interesting projects like ${projectTitles}. His featured work includes Brain MRI Tumor Segmentation and a Self-Balancing Robot. Would you like more details on any of these?`;
    }

    // Skills related
    if (lowInput.includes("skill") || lowInput.includes("technology") || lowInput.includes("tech") || lowInput.includes("language")) {
      const languages = portfolioKnowledge.skills.programming.join(", ");
      const ml = portfolioKnowledge.skills.ml_data_science.join(", ");
      return `Sagnick is proficient in ${languages}. His AI/ML expertise includes ${ml}. He also works with embedded systems like Arduino and ESP32.`;
    }

    // Education related
    if (lowInput.includes("education") || lowInput.includes("study") || lowInput.includes("college") || lowInput.includes("university")) {
      const edu = portfolioKnowledge.developer.education[0];
      return `Sagnick is currently pursuing a B.E. in Electrical Engineering at ${edu.institution} (${edu.period}). He has an impressive GPA of ${edu.gpa}!`;
    }

    // Contact related
    if (lowInput.includes("contact") || lowInput.includes("email") || lowInput.includes("reach") || lowInput.includes("hire")) {
      return `You can reach Sagnick via email at ${portfolioKnowledge.developer.email} or call him at ${portfolioKnowledge.developer.phone}. He is currently open to internships and research opportunities!`;
    }

    // Background/Developer info
    if (lowInput.includes("who") || lowInput.includes("about") || lowInput.includes("sagnick") || lowInput.includes("developer")) {
      return `Sagnick Paul is an ${portfolioKnowledge.developer.role} based in ${portfolioKnowledge.developer.location}. He specializes in bridging the gap between software algorithms and physical hardware systems.`;
    }

    // FAQ or general
    for (const item of portfolioKnowledge.faq) {
      if (lowInput.includes(item.question.toLowerCase())) {
        return item.answer;
      }
    }

    return "That's a great question! While I'm just a simple assistant, I can tell you about Sagnick's AI projects, his skills in Python/PyTorch, or his education at Jadavpur University. What would you like to know more about?";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] max-w-[90vw] h-[500px] bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 bg-accent/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Portfolio Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-muted-foreground">Always active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-1 ${msg.sender === "user" ? "bg-accent/20" : "bg-muted"}`}>
                      {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === "user" 
                        ? "bg-accent text-white rounded-tr-none" 
                        : "bg-muted/50 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-1 bg-muted">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-background/50">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-muted/50 border border-border/50 rounded-xl py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-accent hover:bg-accent/10 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-tighter">
                Sagnick Paul Assistant v1.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? "bg-muted text-foreground rotate-90" : "bg-accent text-white"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
