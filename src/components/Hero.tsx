"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const [mounted, setMounted] = useState(false);

  // Keep a reference to track smooth visual animation states
  const animationRef = useRef({
    currentScale: 150,
    entranceCompleted: false,
    startTimestamp: null as number | null
  });

  // Controlled cinematic sequence stages
  const [stageAtmosphere, setStageAtmosphere] = useState(false);
  const [stageArtwork, setStageArtwork] = useState(false);
  const [stageForeground, setStageForeground] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 🎭 SYNCED CINEMATIC TIMING SEQUENCE (Timed perfectly with Preloader curtain lift)
    
    // Stage 1: Atmosphere & Volumetric Lights fade in exactly as curtain lifts (900ms)
    const timerAtmosphere = setTimeout(() => {
      setStageAtmosphere(true);
    }, 900);

    // Stage 2: Masterpiece fluid morph starts as the curtain clears the screen (1200ms)
    const timerArtwork = setTimeout(() => {
      setStageArtwork(true);
    }, 1200);

    // Stage 3: Foreground typography, metadata, and CTA slide in (2000ms)
    const timerForeground = setTimeout(() => {
      setStageForeground(true);
    }, 2000);

    return () => {
      clearTimeout(timerAtmosphere);
      clearTimeout(timerArtwork);
      clearTimeout(timerForeground);
    };
  }, []);

  // 🌊 60FPS DIRECT-DOM FLUID MORPH LOOP (Handles entrance morph)
  useEffect(() => {
    if (!stageArtwork) return;

    let rafId: number;

    const animate = (timestamp: number) => {
      const state = animationRef.current;

      if (!state.entranceCompleted) {
        if (!state.startTimestamp) state.startTimestamp = timestamp;
        const elapsed = timestamp - state.startTimestamp;
        const duration = 1400; // Luxurious 1.4s elegant entrance dissolve

        if (elapsed < duration) {
          state.currentScale = Math.max(0, 150 - (elapsed / duration) * 150);
        } else {
          state.currentScale = 0;
          state.entranceCompleted = true;
        }

        // Update the displacement map scale directly on the DOM element for absolute peak GPU performance!
        if (displacementRef.current) {
          displacementRef.current.setAttribute("scale", state.currentScale.toFixed(2));
        }

        rafId = requestAnimationFrame(animate);
      } else {
        if (displacementRef.current) {
          displacementRef.current.setAttribute("scale", "0");
        }
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [stageArtwork]);

  // Scroll Parallax calculations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scaleBackdrop = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const yBackdrop = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityFadeOut = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Spring-based 3D Camera Offsets driven by mouse movement
  const springX = useSpring(0, { stiffness: 60, damping: 22 });
  const springY = useSpring(0, { stiffness: 60, damping: 22 });

  // Unconditional 3D Camera tilt transforms (satisfies Rules of Hooks)
  const rotateX = useTransform(springY, [-45, 45], [5, -5]);
  const rotateY = useTransform(springX, [-45, 45], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    // Map coords to a subtle camera tilt
    const xOffset = (clientX / window.innerWidth - 0.5) * 45;
    const yOffset = (clientY / window.innerHeight - 0.5) * 45;
    springX.set(xOffset);
    springY.set(yOffset);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  const scrollToArchive = () => {
    const archive = document.getElementById("showcase");
    if (archive) {
      archive.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full bg-transparent overflow-hidden px-6 md:px-12 lg:px-20 py-8 select-none z-20 flex flex-col justify-between"
    >
      {/* NATIVE SVG FLUID DISPLACEMENT MORPH DEF */}
      {mounted && (
        <svg className="absolute w-0 h-0 pointer-events-none">
          <defs>
            <filter id="tbbtMorphFilter">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.012 0.022" 
                numOctaves="3" 
                result="noise" 
              />
              <feDisplacementMap 
                ref={displacementRef} 
                in="SourceGraphic" 
                in2="noise" 
                scale="150" 
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* 🎭 LAYER 1: CINEMATIC ATMOSPHERE & GOLDEN GLAZES */}
      <motion.div 
        style={{ scale: scaleBackdrop, y: yBackdrop, opacity: opacityFadeOut }}
        className="absolute inset-0 z-0 pointer-events-none select-none"
      >
        {/* Soft Radial Ambient Spotlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,192,235,0.08)_0%,rgba(255,249,210,0.65)_80%)]" />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9D2] via-transparent to-[#FFF9D2] opacity-75" />
      </motion.div>

      {/* 🎭 LAYER 2: GIANT EDITORIAL BACKDROP TEXT (Vogue Cover Style - z-index: 10) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <AnimatePresence>
          {stageAtmosphere && (
            <motion.h1
              initial={{ opacity: 0, y: 140, scale: 0.95 }}
              animate={{ opacity: 0.08, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-bodoni text-[9.5vw] sm:text-[10vw] md:text-[10.5vw] lg:text-[11vw] xl:text-[11.5vw] text-[#1A2333] leading-none tracking-tighter uppercase font-black select-none text-center w-full px-4"
            >
              UNAPOLOGETIC
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* 🎭 LAYER 3: THE COLLECTIBLE CENTERPIECE (Massive Hanging Denim Jacket - z-index: 20) */}
      <div className="absolute top-[8%] lg:top-[12%] bottom-0 right-[2%] lg:right-[3%] w-[90%] lg:w-[46vw] h-[75vh] lg:h-[78vh] my-auto flex items-center justify-center z-20 pointer-events-none select-none">
        <AnimatePresence>
          {stageArtwork && (
            <motion.div
              style={{
                x: springX,
                y: springY,
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
                perspective: 1200
              }}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -14, 0],
                rotateZ: [0, 0.6, 0]
              }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{
                y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 13, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
              }}
              className="relative w-full h-[88%] flex items-center justify-center"
            >
              
              {/* Main Organic Denim jacket artwork (Escaping standard rectangular crops) */}
              <div 
                className="relative w-[110%] h-[110%] flex items-center justify-center filter drop-shadow-[0_45px_95px_rgba(26,35,51,0.22)]"
                style={{ filter: "url(#tbbtMorphFilter)", willChange: "filter" }}
              >
                <Image
                  src="/work/denim_cropped.png"
                  alt="Collectible Campaign Centerpiece - Distressed TBBT Denim Jacket"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain select-none opacity-90"
                />
              </div>

              {/* Floating micro-light particles reflecting inside the campaign chamber */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-30">
                <div className="absolute h-1.5 w-1.5 rounded-full bg-[#8CC0EB] top-[20%] left-[30%] blur-[0.5px] animate-pulse" />
                <div className="absolute h-1 w-1 rounded-full bg-white top-[50%] left-[70%] blur-[0.5px] animate-pulse" />
                <div className="absolute h-1.5 w-1.5 rounded-full bg-[#8CC0EB] top-[80%] left-[40%] blur-[0.8px] animate-pulse" />
              </div>

              {/* Floating coordinate catalog metadata (Attached like museum pedestal stamps) */}
              <div className="absolute bottom-10 left-[8%] font-mono text-[7px] md:text-[8px] tracking-[0.3em] text-[#3B72A6]/70 uppercase pointer-events-none">
                [ CAMPAIGN SERIES I // SPEC-02 ]
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 🎭 LAYER 4: FOREGROUND TYPOGRAPHY & INTERACTIVE METADATA (Overlaps the image - z-index: 30) */}
      
      {/* Center Row: Editorial Title Layers */}
      <div className="max-w-7xl w-full mx-auto flex-grow flex flex-col justify-center relative z-30 pointer-events-none select-none">
        <div className="max-w-2xl w-full lg:w-[50%] flex flex-col gap-6 md:gap-8 justify-center h-full">
          
          <div className="flex flex-col gap-1.5">
            {/* Live commission ticker */}
            <AnimatePresence>
              {stageForeground && (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2.5"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3B72A6] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3B72A6]"></span>
                  </span>
                  <span className="font-sans text-[8.5px] tracking-[0.5em] font-extrabold text-[#3B72A6] uppercase">
                    PRIVATE CLIENT COMMISSIONS ACTIVE
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title overlap blocks */}
            <h2 className="font-bodoni text-[2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.6rem] xl:text-[4rem] text-[#1A2333] leading-[0.98] tracking-tighter uppercase font-light">
              <span className="block overflow-hidden relative pb-1 md:pb-2">
                <AnimatePresence>
                  {stageForeground && (
                    <motion.span
                      initial={{ y: "105%", rotateZ: 2 }}
                      animate={{ y: 0, rotateZ: 0 }}
                      transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
                      className="block origin-left text-[#1A2333]/30 tracking-[0.1em]"
                    >
                      COUTURE
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="block overflow-hidden relative pb-1 md:pb-2">
                <AnimatePresence>
                  {stageForeground && (
                    <motion.span
                      initial={{ y: "105%", rotateZ: -2 }}
                      animate={{ y: 0, rotateZ: 0 }}
                      transition={{ duration: 1.6, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
                      className="block text-[#3B72A6] italic font-light font-bodoni lowercase tracking-normal pl-4 sm:pl-8 origin-left"
                    >
                      custom collectibles
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </h2>
          </div>

          {/* Luxury context statement */}
          <AnimatePresence>
            {stageForeground && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 max-w-md border-l border-[#3B72A6]/30 pl-4 md:pl-5"
              >
                <p className="text-[#1A2333]/70 text-[9.5px] sm:text-[10px] tracking-[0.16em] leading-[1.65] uppercase font-light">
                  Gayatri Rao orchestrates wearable art—merging high-illustration paint washes, fluid inks, and distressed textiles into exclusive museum-grade collectibles.
                </p>
                <span className="text-stone-600 text-[7px] tracking-[0.2em] uppercase font-bold">
                  [ INDIVIDUAL SERIAL NUMBER REGISTRY ]
                </span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Bottom Row: Tactile scrolling CTA & counter */}
      <div className="w-full flex justify-between items-center relative z-30 select-none pt-4 border-t border-[#1A2333]/[0.08] pointer-events-auto">
        <AnimatePresence>
          {stageForeground && (
            <motion.button
              onClick={scrollToArchive}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 text-left group border border-[#3B72A6]/40 hover:border-[#3B72A6]/80 rounded-full px-5 py-2.5 bg-[#1A2333]/[0.01] hover:bg-[#3B72A6]/[0.06] backdrop-blur-md hover:shadow-[0_0_18px_rgba(140,192,235,0.3)] transition-all duration-500 cursor-pointer pointer-events-auto"
            >
              <span className="text-[8.5px] tracking-[0.35em] font-black text-[#1A2333]/95 group-hover:text-[#3B72A6] transition-colors duration-500 uppercase">
                [ WALK THE GALLERY ]
              </span>
              <div className="h-5 w-5 rounded-full bg-[#1A2333] group-hover:bg-[#3B72A6] flex items-center justify-center text-[#FFF9D2] group-hover:text-[#FFF9D2] group-hover:translate-y-0.5 transition-all duration-500">
                <svg width="6" height="8" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 0V8M4 8L1 5M4 8L7 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stageForeground && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8 }}
              className="hidden sm:inline font-mono text-[7px] tracking-[0.3em] text-[#1A2333]/50 uppercase"
            >
              ATELIER INITIATIVE // DIRECT ENTRY
            </motion.span>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
