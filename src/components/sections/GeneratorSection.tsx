"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Movie, MOVIES } from "@/lib/constants";
import { generateAlternateStory } from "@/lib/ai-service";
import { useStories, Story } from "@/hooks/useStories";
import { ChevronDown, Loader2, Sparkles, Crosshair } from "lucide-react";

export default function GeneratorSection({ 
  activeMovie, 
  onSelectMovie 
}: { 
  activeMovie: Movie, 
  onSelectMovie: (m: Movie) => void 
}) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  const { addStory, getRecentTitles } = useStories();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedStory(null);
    setErrorStatus(null);
    
    try {
      const result = await generateAlternateStory(activeMovie, prompt, getRecentTitles(3));
      const newStory: Story = {
        ...result,
        id: Math.random().toString(36).substring(7),
        createdAt: Date.now()
      };
      setGeneratedStory(newStory);
      addStory(newStory);
    } catch (e: any) {
      console.error(e);
      setErrorStatus(e.message || "Timeline connection failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generator" className="relative w-full min-h-screen py-32 px-4 md:px-8 z-20 text-white selection:bg-white/20 overflow-hidden">
      
      {/* CINEMATIC INTERACTIVE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div className="absolute inset-0 opacity-20 blur-[100px]" animate={{ backgroundColor: activeMovie.accent }} transition={{ duration: 3, ease: "easeInOut" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)", backgroundSize: "50px 50px", transform: "perspective(500px) rotateX(60deg) scale(2) translateY(-100px)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }} className="mb-16 md:mb-24 text-center md:text-left flex flex-col items-center md:items-start pt-10 md:pt-0">
          <div className="flex items-center gap-4 mb-4">
             <Crosshair className="w-4 h-4 text-white/40" />
             <div className="text-[0.65rem] md:text-xs tracking-[0.3em] text-white/40 uppercase">Phase 1 Integration</div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] drop-shadow-2xl">
            Define The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 block md:inline">Variable</span>
          </h2>
        </motion.div>

        {/* INTERACTIVE GENERATOR STUDIO MODULE */}
        <div className="relative mb-32 p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-transparent shadow-[0_0_80px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl rounded-2xl z-0" />
          
          <div className="relative z-10 grid md:grid-cols-12 gap-0">
            {/* ANCHOR POINT DROPDOWN */}
            <div className="md:col-span-4 p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/5 relative">
               <motion.div className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-20 pointer-events-none" animate={{ backgroundColor: activeMovie.accent }} transition={{ duration: 2 }} />
               <label className="flex items-center gap-2 text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-white/40 mb-6 w-full"><span>Anchor Point</span><span className="flex-1 h-[1px] bg-white/10" /></label>
               <div className="relative group w-full">
                  <div className="w-full bg-black/40 border border-white/10 p-4 md:p-5 rounded-lg flex justify-between items-center cursor-pointer hover:border-white/30 transition-all shadow-inner" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    <span className="font-sans text-sm md:text-lg tracking-wide text-white/90 group-hover:text-white transition-colors truncate pr-4">{activeMovie.title}</span>
                    <ChevronDown className={`w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white transition-transform duration-500 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div initial={{ opacity: 0, y: 10, scale: 0.98, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(10px)' }} transition={{ duration: 0.3 }} className="absolute top-full left-0 w-full mt-2 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden">
                         <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto custom-scrollbar">
                          {MOVIES.map(movie => (
                            <div key={movie.id} className="px-5 py-3 md:px-6 md:py-4 font-sans text-xs md:text-sm tracking-widest text-white/60 hover:text-white cursor-pointer transition-all border-l-2 hover:bg-white/5" style={{ borderLeftColor: activeMovie.id === movie.id ? movie.accent : 'transparent' }} onClick={() => { onSelectMovie(movie); setIsDropdownOpen(false); }}>
                              {movie.title}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>

            {/* DEPARTURE TEXTAREA */}
            <div className="md:col-span-8 p-6 md:p-12 relative flex flex-col">
              <label className="flex items-center gap-2 text-[0.65rem] md:text-xs uppercase tracking-[0.2em] text-white/40 mb-6"><span>The Departure</span><span className="flex-1 h-[1px] bg-white/10" /></label>
              <div className="w-full relative flex-1 group pl-2 md:pl-0 mt-4 md:mt-0">
                <span className="absolute left-[-1.5rem] md:left-[-2rem] top-1 md:top-3 text-2xl md:text-3xl text-white/10 font-serif group-focus-within:text-white/30 transition-colors">"</span>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Tony Stark survived?" className="w-full bg-transparent border-none px-0 py-2 font-serif text-2xl md:text-5xl text-white focus:outline-none resize-none min-h-[120px] md:min-h-[160px] leading-[1.2] placeholder:text-white/10" />
              </div>
              
              <div className="w-full flex flex-col xl:flex-row justify-between items-start xl:items-end mt-8 gap-6">
                <span className="text-[0.65rem] md:text-xs font-sans tracking-widest text-white/30 uppercase flex items-center gap-3 w-full xl:w-auto"><div className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: activeMovie.accent }} />{isGenerating ? "Calculating Timeline..." : "Awaiting Input..."}</span>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full xl:w-auto bg-white text-black px-6 py-4 md:px-8 md:py-5 font-sans uppercase tracking-[0.2em] text-[0.65rem] md:text-xs flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-all rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden group/btn font-bold">
                  {isGenerating ? <span className="flex items-center justify-center gap-3 relative z-10 w-full"><Loader2 className="w-4 h-4 animate-spin" /> Processing</span> : <span className="flex items-center justify-center gap-3 relative z-10 w-full"><Sparkles className="w-4 h-4" /> Fracture Reality</span>}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 z-0" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {errorStatus && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-6 rounded-lg border border-red-500/30 text-red-400 bg-red-500/5 text-base tracking-widest text-center mb-12 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <span className="font-bold uppercase block mb-1 text-red-500">Anomaly Detected</span>{errorStatus}
          </motion.div>
        )}

        {/* CINEMATIC OUTPUT REVEAL */}
        <AnimatePresence mode="wait">
          {generatedStory && (
            <motion.div initial={{ opacity: 0, y: 70, filter: 'blur(20px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.8, ease: "easeOut" }} className="mt-12 pt-32 relative text-center md:text-left">
              <div className="absolute top-0 left-1/2 md:left-24 -translate-x-1/2 w-[1px] h-24" style={{ backgroundColor: activeMovie.accent, boxShadow: `0 0 40px ${activeMovie.accent}` }} />
              <div className="space-y-24">
                <div className="relative md:pl-24">
                  <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 0.5, ease: "easeOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-48 opacity-20 pointer-events-none blur-[60px] z-[-1]" style={{ backgroundColor: activeMovie.accent }} />
                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-6 md:mb-8 leading-[1.1] max-w-4xl drop-shadow-lg">{generatedStory.title}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-[0.65rem] md:text-xs font-sans tracking-[0.4em] text-white/30 uppercase"><span className="w-8 h-[1px] bg-white/10" />Variant • {(Math.random() * 10000).toFixed(0)}</div>
                </div>

                <div className="grid gap-12 md:gap-16 font-sans text-white/80 leading-[1.8] md:leading-[2] font-light max-w-4xl text-base md:text-xl md:pl-24">
                  {[{ title: "Act I", content: generatedStory.act1 }, { title: "Act II", content: generatedStory.act2 }, { title: "Act III", content: generatedStory.act3 }].map((act, idx) => (
                    <motion.div key={act.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 1.2, delay: 0.2 + idx * 0.3, ease: "easeOut" }} className="relative md:pl-16 group">
                      <div className="hidden md:flex absolute left-0 top-2 text-xs font-serif italic text-white/20 transition-colors group-hover:text-white/50">{"0"+(idx+1)}</div>
                      <div className="md:hidden flex items-center gap-4 mb-4">
                        <div className="text-xs font-serif italic text-white/40">{"0"+(idx+1)}</div>
                        <div className="h-[1px] flex-1 bg-white/5" />
                      </div>
                      <p className="text-white/70 group-hover:text-white transition-colors">{act.content}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.4 }} className="max-w-4xl px-6 py-12 md:px-8 md:py-20 relative overflow-hidden flex items-center justify-center min-h-[200px] md:min-h-[300px] border border-white/5 rounded-xl bg-black/60 shadow-2xl md:ml-12 mx-auto">
                  <div className="absolute left-0 top-0 w-[4px] h-full" style={{ backgroundColor: activeMovie.accent, boxShadow: `0 0 30px ${activeMovie.accent}` }} />
                  <p className="text-xl sm:text-3xl md:text-5xl font-serif text-white/90 italic leading-snug md:leading-[1.4] text-center relative z-10 font-bold p-4">"{generatedStory.ending}"</p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 md:pl-24 max-w-4xl">
                   <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} className="p-6 md:p-8 border border-white/5 rounded-lg bg-black/40 text-left">
                    <span className="block text-[0.65rem] md:text-xs uppercase tracking-[0.3em] font-medium mb-3 md:mb-4" style={{ color: activeMovie.accent }}>Post-Credits Observation</span>
                    <p className="text-white/50 text-xs md:text-sm font-sans leading-relaxed tracking-wide">{generatedStory.twist}</p>
                  </motion.div>
                   <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} className="p-6 md:p-8 border border-white/5 rounded-lg bg-black/40 text-left">
                    <span className="block text-[0.65rem] md:text-xs uppercase tracking-[0.3em] font-medium mb-3 md:mb-4 text-white/60">Multiversal Fallout</span>
                    <p className="text-white/50 text-xs md:text-sm font-sans leading-relaxed tracking-wide italic">"{generatedStory.fanTheory}"</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
