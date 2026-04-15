"use client";
import { useStories } from "@/hooks/useStories";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { MOVIES } from "@/lib/constants";

export default function VaultPage() {
  const { stories, removeStory, isLoaded } = useStories();

  if (!isLoaded) return <div className="min-h-screen bg-black" />;

  return (
    <div className="min-h-screen bg-black pt-40 px-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4 font-sans">
            Multiversal Database
          </div>
          <h1 className="text-5xl md:text-6xl font-serif uppercase tracking-widest text-white">
            The Archives
          </h1>
        </motion.div>
        
        {stories.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/30 font-sans font-light border-y border-white/5 py-24 text-center mt-12 tracking-wide uppercase text-sm"
          >
            No anomalous timelines recorded. Return to the core lab to initialize a fracture.
          </motion.div>
        ) : (
          <div className="relative before:absolute before:left-[15px] md:before:left-[31px] before:top-4 before:h-full before:w-[1px] before:bg-white/10 before:-z-10 pl-16 md:pl-24 space-y-24">
            <AnimatePresence>
              {stories.map((story, i) => {
                const movie = MOVIES.find((m) => m.id === story.movieId) || MOVIES[0];
                return (
                  <motion.div
                    key={story.id}
                    layout // Animate layout changes like removal
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group focus-within:z-10"
                  >
                    {/* Node on Timeline */}
                    <div 
                      className="absolute left-[-49px] md:left-[-73px] top-2 w-[18px] h-[18px] rounded-full border border-black z-10 transition-transform duration-500 group-hover:scale-150"
                      style={{ backgroundColor: movie.accent, boxShadow: `0 0 15px ${movie.accent}` }}
                    />
                    
                    {/* Content Section */}
                    <div className="flex justify-between items-start mb-8 w-full group/header">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-xs font-sans tracking-[0.2em] text-white/40 uppercase">
                            Variant: {movie.title}
                          </span>
                          <span className="w-4 h-[1px] bg-white/20" />
                          <span className="text-xs font-sans tracking-[0.1em] text-white/20">
                            ID: {story.id.toUpperCase()}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-wider pr-8 group-hover/header:text-white transition-colors">
                          {story.title}
                        </h2>
                      </div>
                      <button 
                        onClick={() => removeStory(story.id)}
                        className="text-white/10 hover:text-red-500 transition-colors p-2 shrink-0 opacity-0 group-hover:opacity-100 mix-blend-screen"
                        title="Delete Timeline"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="font-sans text-white/60 space-y-6 text-base leading-[1.8] font-light max-h-64 overflow-y-auto pr-8 custom-scrollbar border-l-2 border-transparent transition-colors group-hover:border-white/5 pl-6 -ml-6 pb-4">
                      <div>
                        {/* Prompt reminder */}
                        <div className="text-white/80 italic font-serif text-lg mb-6 leading-snug">
                          "What if {story.prompt}?"
                        </div>
                      </div>
                      <p><span className="text-white/30 uppercase text-xs tracking-wider block mb-2">Act I</span>{story.act1}</p>
                      <p><span className="text-white/30 uppercase text-xs tracking-wider block mb-2">Act II</span>{story.act2}</p>
                      <p><span className="text-white/30 uppercase text-xs tracking-wider block mb-2">Act III</span>{story.act3}</p>
                      <div className="pt-4 border-t border-white/5 mt-6">
                        <span className="text-white/30 uppercase text-xs tracking-wider block mb-2">Ending</span>
                        <p className="text-white/80 italic font-serif">{story.ending}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
