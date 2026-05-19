"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHRASES = [
  "WEAR THE ART.",
  "CRAFTING STREET COUTURE.",
  "UNAPOLOGETIC EXPRESSION.",
  "BESPOKE ATELIER.",
  "GAYATRI RAO STUDIO."
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Animate progress percentage
  useEffect(() => {
    const duration = 800; // 0.8s total preload
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 100); // Snappy pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Cycle through phrases
  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 450);

    return () => clearInterval(interval);
  }, [progress]);

  // Handle body overflow lock
  useEffect(() => {
    if (!isComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: "-100vh", 
            filter: "blur(8px)",
            transition: { 
              duration: 0.7, 
              ease: [0.16, 1, 0.3, 1], // snappy Expo exit
              delay: 0.05 
            } 
          }}
          className="fixed inset-0 z-[9999] bg-[#FFEBCC] flex flex-col justify-between p-8 md:p-16 text-[#1A2333] overflow-hidden"
        >
          {/* Top Label */}
          <div className="flex items-center justify-between select-none">
            <span className="font-bodoni text-xs tracking-[0.35em] opacity-40 uppercase">
              GAYATRI RAO // CREATIVE DIRECTION
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] opacity-40 uppercase">
              EST. 2026
            </span>
          </div>

          {/* Center Phrase Reveal */}
          <div className="h-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={phraseIndex}
                initial={{ y: 35, opacity: 0, filter: "blur(5px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -35, opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="font-bodoni text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] text-center max-w-2xl text-[#1A2333]"
              >
                {PHRASES[phraseIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Bottom Counter & Layout */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-[#1A2333]/[0.08] pt-8 select-none">
            <div className="flex flex-col gap-1 max-w-xs">
              <span className="text-[9px] tracking-[0.3em] font-bold text-[#3B72A6] uppercase">
                PHILOSOPHY
              </span>
              <p className="text-[10px] tracking-[0.18em] text-[#1A2333]/60 uppercase leading-relaxed font-light">
                MAKING STREETWEAR A LIVING CANVAS. INDIVIDUAL CUSTOMISATION WORTH COLLECTING.
              </p>
            </div>

            {/* Premium Big Number Loader */}
            <div className="flex items-baseline gap-1 select-none">
              <span className="font-sans text-7xl md:text-[9rem] font-extrabold leading-[0.8] tracking-tighter text-[#1A2333] opacity-95">
                {Math.floor(progress).toString().padStart(3, "0")}
              </span>
              <span className="font-sans text-xl md:text-2xl font-bold opacity-30">%</span>
            </div>
          </div>

          {/* High-End Scanlines / Analog Noise Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.035]" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
