"use client";
import { motion, AnimatePresence, useTransform } from "framer-motion";
import { Movie } from "@/lib/constants";
import { useParallax } from "@/hooks/useParallax";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { DustParticles } from "../effects/DustParticles";

export default function HeroSection({ activeMovie }: { activeMovie: Movie }) {
  const { x, y } = useParallax();
  
  const bgX = useTransform(x, [-1, 1], ["-2%", "2%"]);
  const bgY = useTransform(y, [-1, 1], ["-2%", "2%"]);
  const objectX = useTransform(x, [-1, 1], ["-4%", "4%"]);
  const objectY = useTransform(y, [-1, 1], ["-4%", "4%"]);

  return (
    <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden bg-black pb-10 md:pb-0">
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeMovie.id}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            animate={{ opacity: 0.3, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} // smooth expensive cinematic curve
            className="absolute inset-0"
            style={{ x: bgX, y: bgY }}
          >
            <Image 
              src={activeMovie.bgUrl}
              alt={activeMovie.title}
              fill
              className="object-cover opacity-80"
              priority
              sizes="100vw"
            />
            {/* Extremely dark cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent w-full md:w-3/4 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10" />
          </motion.div>
        </AnimatePresence>
        
        <DustParticles />
      </div>

      {/* Main Composition Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center h-full pt-28 md:pt-16">
        
        {/* Left Side: Massive Typography Block */}
        <motion.div 
          className="w-full md:w-[65%] flex flex-col justify-center items-start relative z-20"
        >
          {/* Super title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="flex items-center gap-6 mb-8 md:mb-10"
          >
            <motion.div 
              className="h-[1px] w-16 md:w-24 bg-white"
              animate={{ backgroundColor: activeMovie.accent, boxShadow: `0 0 20px ${activeMovie.accent}` }}
              transition={{ duration: 2 }}
            />
            <span className="text-xs md:text-sm font-sans tracking-[0.4em] uppercase text-white/50">
              The Multiverse Protocol
            </span>
          </motion.div>

          {/* Headline - Split for drama */}
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
             className="text-white w-full"
          >
            <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-serif uppercase leading-[0.85] tracking-tighter mb-2 md:mb-4 text-white hover:scale-[1.01] transition-transform duration-700 origin-left">
              Rewrite
            </h1>
            <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-serif uppercase leading-[0.85] tracking-tighter mb-8 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
              Reality
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-2xl font-sans text-white/40 mb-12 md:mb-16 max-w-xl leading-[1.6] font-light"
          >
            Harness the power of timeline fractures. Generate deeply emotional, cinematic MCU realities based solely on your distinct choices.
          </motion.p>

           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-5 md:px-12 md:py-6 bg-white text-black font-sans text-[0.65rem] md:text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-4 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-shadow duration-700 w-full sm:w-auto rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10 font-bold uppercase tracking-[0.2em]">Enter The Lab</span> 
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 transform group-hover:translate-x-2 transition-transform duration-500" />
            </motion.button>
            
            <a href="/vault" className="text-white/40 text-[0.65rem] md:text-sm uppercase tracking-[0.3em] font-sans hover:text-white transition-colors duration-500 underline underline-offset-8 decoration-white/10 hover:decoration-white/50 text-center sm:text-left pt-2 sm:pt-0">
              View Archives
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Visual Focal Point (Abstract Energy Sphere) */}
        <motion.div 
           className="hidden lg:flex w-[35%] h-[600px] justify-center items-center relative z-20 pointer-events-none"
           style={{ x: objectX, y: objectY }}
        >
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 3, ease: "easeOut", delay: 0.5 }}
             className="relative w-full h-full flex items-center justify-center"
           >
              {/* Outer Core Glow */}
              <motion.div 
                className="absolute w-[400px] h-[400px] rounded-full mix-blend-screen blur-[100px] opacity-40"
                animate={{ backgroundColor: activeMovie.accent, scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Inner Focus */}
              <motion.div 
                className="absolute w-[200px] h-[200px] rounded-full border border-white/20 blur-[2px]"
                animate={{ rotate: 360, borderColor: activeMovie.accent }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute w-[180px] h-[180px] rounded-full border border-white/5 blur-[4px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              {/* Central Singularity */}
              <motion.div 
                className="w-12 h-12 rounded-full bg-white shadow-[0_0_80px_rgba(255,255,255,1)]"
              />
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
