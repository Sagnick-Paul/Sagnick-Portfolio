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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled
        ? "bg-white/80 dark:bg-background/80 backdrop-blur-md shadow-md text-gray-900 dark:text-foreground border-b border-border"
        : isProjectPage
          ? "bg-transparent text-white"
          : "bg-transparent text-foreground"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ease-in-out ${isScrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-tighter group">
            <div className={`relative w-8 h-8 rounded-lg overflow-hidden border transition-colors ${isScrolled || !isProjectPage ? "border-accent/20 group-hover:border-accent/40 bg-background/50 backdrop-blur-sm" : "border-white/20 group-hover:border-white/40 bg-white/10 backdrop-blur-sm"
              }`}>
              <Image
                src="/favicon.png"
                alt="Sagnick Paul Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="group-hover:text-accent transition-colors">
              Sagnick Paul<span className="text-accent">.</span>
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-300 hover:text-accent hover:-translate-y-0.5 inline-block ${isScrolled
                    ? "text-gray-600 dark:text-gray-300 hover:text-accent"
                    : isProjectPage
                      ? "text-white/90 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div aria-label="Theme toggle wrapper" className={`transition-colors ${!isScrolled && isProjectPage ? "text-white [&>button]:hover:bg-white/10" : ""}`}>
                <ThemeToggle />
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <div aria-label="Theme toggle wrapper" className={`transition-colors ${!isScrolled && isProjectPage ? "text-white [&>button]:hover:bg-white/10" : ""}`}>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`hover:text-accent focus:outline-none transition-colors ${!isScrolled && isProjectPage ? "text-white" : ""}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 border-b" : "max-h-0"
          } ${isScrolled ? "bg-white dark:bg-background border-border" : isProjectPage ? "bg-black/90 backdrop-blur-md border-white/10" : "bg-background backdrop-blur-md border-border"}`}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isScrolled
                ? "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-accent"
                : isProjectPage
                  ? "text-white hover:bg-white/10 hover:text-accent"
                  : "text-foreground hover:bg-secondary hover:text-accent"
                }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
