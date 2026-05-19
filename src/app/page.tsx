import React from 'react';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Commission from "@/components/Commission";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background flex flex-col justify-between overflow-x-hidden text-foreground z-10">
      
      {/* 1. LUXURY EDITORIAL HEADER NAVIGATION */}
      <Header />

      {/* 2. MAIN CINEMATIC STORY-DRIVEN CONTENT */}
      <main className="flex-grow relative z-10">
        
        {/* FULL-SCREEN HERO SHOWPIECE */}
        <Hero />

        {/* 🎭 CHAMBER TRANSITION I: PHILOSOPHY BREATHING CORRIDOR */}
        <section className="relative min-h-[400px] lg:min-h-[500px] py-24 bg-[#FFEBCC] border-t border-b border-[#1A2333]/[0.05] flex items-center justify-center overflow-hidden z-20 select-none">
          {/* Extremely faint center warm sky-blue aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,192,235,0.05)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto gap-4 relative z-10">
            <span className="text-[#3B72A6] text-[8px] tracking-[0.45em] font-black opacity-75 animate-pulse">
              [ ATELIER PHILOSOPHY CHRONICLE ]
            </span>
            <h3 className="font-bodoni text-3xl md:text-5xl lg:text-6xl text-[#1A2333]/90 font-light italic leading-tight">
              “Utility is transient. <br />
              <span className="font-bold text-[#3B72A6]/75 not-italic lowercase">canvas is eternal.</span>”
            </h3>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#3B72A6]/40 to-transparent mt-3" />
            <span className="font-mono text-[7px] tracking-[0.3em] text-[#1A2333]/30 uppercase">
              THRESHOLD ROOM SEC-02 // INGRESS CALIBRATED
            </span>
          </div>
        </section>
        
        {/* HORIZONTAL EXHIBITION PORTFOLIO GALLERY */}
        <Showcase />

        {/* 🎭 CHAMBER TRANSITION II: MONOLITH DIRECTORY THRESHOLD */}
        <section className="relative min-h-[400px] lg:min-h-[500px] py-24 bg-background flex items-center justify-center overflow-hidden z-20 select-none">
          {/* Subtle cool white/gold ambient aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,192,235,0.03)_0%,transparent_60%)] pointer-events-none" />
          
          <div className="flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto gap-6 relative z-10">
            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#1A2333]/10 to-transparent" />
            
            <div className="flex flex-col gap-2">
              <span className="text-[#3B72A6] text-[8.5px] tracking-[0.45em] font-extrabold uppercase">
                [ ENTERING ATELIER PRIVATE DESK ]
              </span>
              <p className="text-[#1A2333]/70 text-[9.5px] tracking-[0.2em] uppercase max-w-md mx-auto leading-relaxed font-light">
                Step beyond the gallery thresholds to register a custom commissions slot. Private ledgers are now open for calendar allocation.
              </p>
            </div>

            <div className="flex items-center gap-4 text-[#1A2333]/40 font-mono text-[7px] tracking-[0.35em] uppercase">
              <span>[ SECTOR IV: DIRECTORY ]</span>
              <span className="text-[#3B72A6]/60">•</span>
              <span>[ STATUS: EXCLUSIVE ]</span>
            </div>

            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#1A2333]/10 to-transparent" />
          </div>
        </section>
        
        {/* BESPOKE PRIVATE CLIENT COMMISSION CONFIGURATOR */}
        <Commission />
        
      </main>

      {/* 3. LUXURY GALLERY FOOTER */}
      <footer className="py-6 bg-[#0A0A09] border-t border-white/[0.08] px-6 md:px-12 lg:px-20 text-center relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 select-none">
          
          {/* Logo Element */}
          <div className="flex items-center gap-1.5">
            <span className="font-bodoni text-sm font-bold tracking-[0.2em] text-[#FAF9F6]">
              GAYATRI RAO
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#8CC0EB]" />
          </div>
          
          {/* Copyright Metadata */}
          <span className="text-white/60 text-[8px] tracking-[0.3em] uppercase font-bold">
            © 2026 GAYATRI RAO. ALL RIGHTS RESERVED. // LUXURY CREATIVE ATELIER
          </span>
          
          {/* Instagram Social Link */}
          <a 
            href="https://www.instagram.com/gayatridoesart/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white text-[9px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 border-b border-transparent hover:border-white/30 pb-0.5 pointer-events-auto"
          >
            INSTAGRAM // @GAYATRIDOESART
          </a>
          
        </div>
      </footer>

    </div>
  );
}
