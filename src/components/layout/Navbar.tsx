"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "Generator", path: "/" },
  { name: "Quiz", path: "/quiz" },
  { name: "Vault", path: "/vault" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-16 py-4 md:py-6 transition-all duration-700 ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/90 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.8)]" 
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        {/* Background ambient glow line when scrolled */}
        {(isScrolled || isMobileMenuOpen) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        )}

        {/* Logo Area */}
        <Link href="/" className="relative group flex items-center gap-3 md:gap-4 z-[70] shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          {/* Cinematic abstract mark */}
          <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center overflow-hidden">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-white/20 rounded-full" />
             <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-4 h-4 md:w-5 md:h-5 border-[2px] border-transparent border-t-white/80 rounded-full" />
             <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] group-hover:scale-150 transition-transform duration-500" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-serif tracking-[0.2em] text-white uppercase leading-none drop-shadow-md group-hover:text-white/80 transition-colors">
              Multiverse
            </span>
            <span className="text-[0.5rem] md:text-[0.6rem] font-sans tracking-[0.4em] text-white/40 uppercase mt-1 pl-1 group-hover:text-white/60 transition-colors">
              Experimental Lab
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-12 text-sm font-sans tracking-[0.2em] text-white/50 uppercase">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`relative px-2 py-1 transition-colors duration-500 hover:text-white group ${isActive ? 'text-white' : ''}`}
              >
                {link.name}
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Hover sweep effect */}
                {!isActive && (
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu indicator */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-[5px] items-end justify-center w-10 h-10 z-[70] focus:outline-none"
        >
          <motion.div animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-6 h-[1.5px] bg-white/90 transform origin-center transition-all duration-300" />
          <motion.div animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-4 h-[1.5px] bg-white/90 transition-all duration-300" />
          <motion.div animate={isMobileMenuOpen ? { rotate: -45, y: -6, width: 24 } : { rotate: 0, y: 0, width: 8 }} className="h-[1.5px] bg-white/90 transform origin-center transition-all duration-300" />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[50] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-24"
          >
             <div className="flex flex-col items-center gap-10 w-full px-6">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div 
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                      className="w-full text-center"
                    >
                      <Link 
                        href={link.path} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-3xl font-serif tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
                      >
                        {link.name}
                      </Link>
                      {isActive && <div className="h-[1px] w-12 bg-white mx-auto mt-4" />}
                    </motion.div>
                  );
                })}
             </div>
             
             {/* Decorative UI in mobile menu */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="mt-auto pb-12 flex flex-col items-center gap-4"
             >
                <div className="text-[0.6rem] font-sans tracking-[0.4em] uppercase text-white/20">Secure Channel Established</div>
                <div className="w-full flex items-center justify-center gap-2">
                  <div className="h-[1px] w-8 bg-white/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  <div className="h-[1px] w-8 bg-white/10" />
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
