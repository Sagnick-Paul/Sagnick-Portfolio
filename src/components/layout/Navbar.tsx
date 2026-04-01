"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we are on a project page which has a dark hero section
  const isProjectPage = pathname?.startsWith("/project/");
  // Check if we are on a page with a dark hero section

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Education", href: "/#education" },
    { name: "Journey", href: "/#journey" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Research", href: "/#research" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
        ? "bg-white/70 dark:bg-[#030712]/40 backdrop-blur-xl border-b border-gray-200/50 dark:border-blue-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(0,124,240,0.1)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ease-in-out ${isScrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-tighter group relative">
            <div className={`relative w-9 h-9 rounded-xl overflow-hidden border transition-all duration-500 ${isScrolled || !isProjectPage 
              ? "border-blue-500/20 group-hover:border-blue-400 dark:bg-blue-500/10 backdrop-blur-md" 
              : "border-white/20 group-hover:border-white/40 bg-white/10 backdrop-blur-md"
              } group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
              <Image
                src="/favicon.png"
                alt="Sagnick Paul Logo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 transition-all duration-300 group-hover:from-blue-600 group-hover:to-cyan-400">
                Sagnick Paul
              </span>
              <span className="text-blue-500 animate-pulse">.</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500" />
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-lg hover:bg-blue-500/5 relative group ${isScrolled
                    ? "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                    : isProjectPage
                      ? "text-white/80 hover:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              ))}
              <div className="pl-4 ml-4 border-l border-gray-200 dark:border-gray-800 h-6 flex items-center">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl border transition-all duration-300 ${isScrolled 
                ? "border-blue-500/20 text-gray-900 dark:text-white" 
                : isProjectPage ? "border-white/20 text-white" : "border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
              } hover:bg-blue-500/10 active:scale-95`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } ${isScrolled ? "bg-white/95 dark:bg-[#030712]/95 backdrop-blur-2xl" : isProjectPage ? "bg-black/90 backdrop-blur-2xl" : "bg-white/95 dark:bg-[#030712]/90 backdrop-blur-2xl"}`}
      >
        <div className="px-6 py-8 space-y-4">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block text-2xl font-bold tracking-tight transition-all duration-300 ${isScrolled
                ? "text-gray-900 dark:text-gray-100 hover:text-blue-500"
                : isProjectPage
                  ? "text-white hover:text-blue-400"
                  : "text-gray-900 dark:text-white hover:text-blue-500"
                }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-blue-500 mr-2 text-sm font-mono">0{idx + 1}.</span>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
