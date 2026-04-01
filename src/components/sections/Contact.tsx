"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Cyber-lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-blue-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <div className="flex items-center gap-4 mb-4">
              <div className="h-0.5 w-12 bg-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 font-mono">Channel Open</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic leading-none mb-8">
              Establish <span className="neon-text">Liaison</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-12 max-w-md font-medium leading-relaxed">
              Initiate communication for research collaborations, engineering opportunities, or technical inquiries.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Neural Mail", value: "sp.professional2005@gmail.com", href: "mailto:sp.professional2005@gmail.com" },
                { icon: Phone, label: "Direct Line", value: "+91 9123835498", href: "tel:+919123835498" },
                { icon: MapPin, label: "Nodes", value: "Kolkata, India", href: null },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href || "#"}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-blue-500/5 transition-all border border-transparent hover:border-blue-500/10"
                >
                  <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center rounded-xl border border-blue-500/20 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                    <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.label}</h4>
                    <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12 relative overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-blue-500/10">
              <h3 className="text-xl font-black uppercase tracking-[0.2em] italic text-slate-900 dark:text-white">Secure Terminal</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-500/60 ml-2">Origin_Name</label>
                  <input 
                    type="text" 
                    placeholder="IDENTIFY YOURSELF"
                    className="w-full bg-blue-500/5 border border-blue-500/10 rounded-xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400/30 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/10 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-500/60 ml-2">Return_Channel</label>
                  <input 
                    type="email" 
                    placeholder="EMAIL_ADDRESS"
                    className="w-full bg-blue-500/5 border border-blue-500/10 rounded-xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400/30 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/10 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-500/60 ml-2">Transmission_Payload</label>
                <textarea 
                  rows={4}
                  placeholder="INPUT_MESSAGE_DATA..."
                  className="w-full bg-blue-500/5 border border-blue-500/10 rounded-xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400/30 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/10 transition-all resize-none"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black tracking-[0.3em] uppercase text-xs py-5 rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden relative">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Transmit Data <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </form>

            <div className="mt-10 flex items-center justify-center gap-6">
               {[
                { icon: Phone, href: "https://linkedin.com/in/sagnick-paul-9aa30a352", label: "LI" },
                { icon: Mail, href: "https://github.com/Sagnick-Paul", label: "GH" },
              ].map((social) => (
                <Link key={social.label} href={social.href} target="_blank" className="text-[10px] font-black text-slate-400 hover:text-blue-500 tracking-widest uppercase transition-colors">
                  {social.label}
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
