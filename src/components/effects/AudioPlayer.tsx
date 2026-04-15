"use client";
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Lower volume for ambient background feel
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch((e) => {
            console.error("Audio playback failed. Please ensure 'marvel-theme.mp3' exists in the /public folder.", e);
            setHasError(true);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* 
        NOTE TO USER: 
        Place your Marvel theme song inside the 'public' folder and name it 'marvel-theme.mp3'.
      */}
      <audio 
        ref={audioRef} 
        src="/marvel-theme.mp4" 
        loop 
        preload="auto"
      />
      
      <div className="relative group">
        {hasError && (
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-max px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md">
            Missing /public/marvel-theme.mp3
          </div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-xl border transition-all shadow-2xl ${
            hasError 
              ? 'bg-red-500/5 border-red-500/20 text-red-500' 
              : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
          }`}
          title="Toggle Cinematic Audio"
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 opacity-70" />}
          
          {/* Radar pulse effect when playing */}
          {isPlaying && (
             <motion.div 
               className="absolute inset-0 rounded-full border border-white/20"
               animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
             />
          )}
        </motion.button>
      </div>
    </div>
  );
}
