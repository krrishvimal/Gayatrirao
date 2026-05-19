"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Medium = 'sneakers' | 'denim' | 'canvas';
type Style = 'minimal' | 'popart' | 'storyboard';

export default function Commission() {
  const [step, setStep] = useState(1);
  const [medium, setMedium] = useState<Medium>('sneakers');
  const [artStyle, setArtStyle] = useState<Style>('popart');
  
  // Contact details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Hover states to drive the 3D museum pedestal previews
  const [hoveredMedium, setHoveredMedium] = useState<Medium | null>(null);
  const [hoveredStyle, setHoveredStyle] = useState<Style | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    setStep(1);
    setMedium('sneakers');
    setArtStyle('popart');
    setName('');
    setEmail('');
    setIdea('');
    setSubmitted(false);
  };

  const currentYear = new Date().getFullYear();

  // Mapping pedestal display preview photographs
  const mediumPreviews = {
    sneakers: "/work/sneaker.jpg",
    denim: "/work/denim_cropped.png",
    canvas: "/work/wolf of the wall.jpg"
  };

  const stylePreviews = {
    minimal: "/work/Screenshot 2026-05-18 141932.png",
    popart: "/work/sneaker2.jpg",
    storyboard: "/work/denim_cropped.png"
  };

  const activeMediumLabel = medium === 'sneakers' ? 'Custom Footwear Pedestal' : medium === 'denim' ? 'Distressed Apparel Monolith' : 'Archival Fine Art Canvas';
  const activeStyleLabel = artStyle === 'minimal' ? 'Geometric & Clean Lines' : artStyle === 'popart' ? 'Vibrant Nebula Splatters' : 'Complex Storyboard Narrative';

  return (
    <section 
      id="commission" 
      className="relative min-h-screen w-full bg-[#FFEBCC] flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12 lg:py-24 border-t border-[#1A2333]/[0.08] z-20 overflow-hidden select-none"
    >

      {/* 2. THEATRICAL SPLIT-SCREEN CONSULTING DESK */}
      <div className="w-full max-w-7xl mx-auto flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 py-4 lg:py-12">
        
        {/* LEFT COLUMN: ACTIVE MINIMAL QUESTIONNAIRE FORM (Exits with a cinematic blur-defocus) */}
        <div className="lg:col-span-6 w-full relative">
          
          <div className="border border-[#3B72A6]/10 bg-[#FFF9D2]/95 backdrop-blur-md rounded-[2rem] p-6 md:p-8 relative overflow-hidden shadow-[0_40px_80px_rgba(26,35,51,0.06)]">
            {/* Fine corner brackets */}
            <div className="absolute top-4 left-4 h-3 w-3 border-t border-l border-[#3B72A6]/30" />
            <div className="absolute top-4 right-4 h-3 w-3 border-t border-r border-[#3B72A6]/30" />
            <div className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-[#3B72A6]/30" />
            <div className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-[#3B72A6]/30" />

            <AnimatePresence mode="wait">
              
              {submitted ? (
                
                /* SUCCESS ACQUISITION CERTIFICATE RECEIPT */
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  key="success-receipt-card"
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#1A2333]/[0.02] border border-[#3B72A6]/30 flex items-center justify-center text-[#3B72A6] text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-[#3B72A6] text-[9px] tracking-[0.35em] font-extrabold uppercase">
                      ACQUISITION STAMP REGISTERED
                    </span>
                  </div>

                  <h2 className="font-bodoni text-3xl md:text-5xl text-[#1A2333] tracking-tighter uppercase font-light">
                    COMMISSION<br/>INITIATED.
                  </h2>
                  
                  <p className="text-[#1A2333]/70 text-[10px] tracking-[0.16em] uppercase leading-relaxed max-w-md">
                    Your commission configuration has been securely logged in the atelier database. A curatorial curator will reach out to schedule your physical design layout alignment session.
                  </p>

                  <div className="mt-4">
                    <button
                      onClick={resetForm}
                      className="bg-[#1A2333] hover:bg-[#3B72A6] text-[#FFF9D2] px-8 py-3.5 rounded-full text-[9px] font-extrabold tracking-[0.25em] uppercase transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      INITIATE ANOTHER CONFIGURATION
                    </button>
                  </div>
                </motion.div>

              ) : step === 1 ? (
                
                /* STEP 1: PHYSICAL MEDIUM CATALOG LINKS */
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  key="step-1-form"
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[#3B72A6] text-[8px] tracking-[0.4em] font-extrabold uppercase">
                      CHOOSE PHYSICAL BASE CANVAS
                    </span>
                    <h3 className="font-bodoni text-2xl md:text-4xl text-[#1A2333] uppercase tracking-tighter leading-[1.0] font-light">
                      SELECT YOUR CANVAS MEDIUM:
                    </h3>
                  </div>

                  {/* Highly tactile fashion list with gold laser sweeps on hover */}
                  <div className="flex flex-col border-t border-[#1A2333]/[0.08]">
                    {(['sneakers', 'denim', 'canvas'] as const).map((m, index) => {
                      const num = `[ 0${index + 1} ]`;
                      const title = m === 'sneakers' ? 'CUSTOM SNEAKERS' : m === 'denim' ? 'DISTRESSED APPAREL' : 'FINE ART CANVAS';
                      const desc = m === 'sneakers' ? 'AJ1s, AF1s & Custom cleats' : m === 'denim' ? 'Distressed denim apparel' : 'Archival stretched boards';
                      const isSel = medium === m;

                      return (
                        <div
                          key={m}
                          onMouseEnter={() => setHoveredMedium(m)}
                          onMouseLeave={() => setHoveredMedium(null)}
                          onClick={() => setMedium(m)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[#1A2333]/[0.08] cursor-pointer group relative overflow-hidden"
                        >
                          {/* Tactical gold laser indicator sweep */}
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#8CC0EB] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                          {/* Selected gold glaze background */}
                          <div className={`absolute inset-0 bg-[#8CC0EB]/[0.03] backdrop-blur-[1px] transition-opacity duration-500 pointer-events-none ${isSel ? 'opacity-100' : 'opacity-0'}`} />
                          
                          <div className="flex items-center gap-6 relative z-10">
                            <span className={`font-mono text-[9px] tracking-wider transition-colors duration-500 ${isSel ? 'text-[#3B72A6]' : 'text-[#1A2333]/40'}`}>
                              {num}
                            </span>
                            <span className={`font-bodoni text-lg md:text-xl tracking-tight transition-all duration-500 ${
                              isSel ? 'text-[#1A2333] pl-3' : 'text-[#1A2333]/40 group-hover:text-[#1A2333]/80'
                            }`}>
                              {title}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6 mt-2 sm:mt-0 relative z-10">
                            <span className="text-[#1A2333]/60 text-[8px] tracking-[0.2em] uppercase font-light">
                              {desc}
                            </span>
                            <div className={`h-3 w-3 rounded-full border flex items-center justify-center transition-all duration-500 ${
                              isSel ? 'border-[#3B72A6] bg-[#3B72A6]' : 'border-[#1A2333]/10 group-hover:border-[#1A2333]/30'
                            }`}>
                              {isSel && <div className="h-1 w-1 rounded-full bg-[#FFF9D2]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="bg-[#1A2333] hover:bg-[#3B72A6] text-[#FFF9D2] font-extrabold px-12 py-4 rounded-full text-[9px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-xl flex items-center gap-2 self-start"
                  >
                    <span>NEXT STEP</span>
                    <span>→</span>
                  </button>
                </motion.div>

              ) : step === 2 ? (
                
                /* STEP 2: ARTISTIC ILLUSTRATION catalog */
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  key="step-2-form"
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[#3B72A6] text-[8px] tracking-[0.4em] font-extrabold uppercase">
                      DEFINE ARTISTIC DIRECTION
                    </span>
                    <h3 className="font-bodoni text-2xl md:text-4xl text-[#1A2333] uppercase tracking-tighter leading-[1.0] font-light">
                      SELECT ILLUSTRATIVE STYLE:
                    </h3>
                  </div>

                  <div className="flex flex-col border-t border-[#1A2333]/[0.08]">
                    {(['minimal', 'popart', 'storyboard'] as const).map((s, index) => {
                      const num = `[ 0${index + 1} ]`;
                      const title = s === 'minimal' ? 'MINIMAL LINE-WORK' : s === 'popart' ? 'VIBRANT POP-ART' : 'INTRICATE STORYBOARD';
                      const desc = s === 'minimal' ? 'Clean geometric lines & outlines' : s === 'popart' ? 'Gold fluid glows & splatters' : 'Elaborate, hand-drawn narratives';
                      const isSel = artStyle === s;

                      return (
                        <div
                          key={s}
                          onMouseEnter={() => setHoveredStyle(s)}
                          onMouseLeave={() => setHoveredStyle(null)}
                          onClick={() => setArtStyle(s)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[#1A2333]/[0.08] cursor-pointer group relative overflow-hidden"
                        >
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-[#8CC0EB] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                          {/* Selected gold glaze background */}
                          <div className={`absolute inset-0 bg-[#8CC0EB]/[0.03] backdrop-blur-[1px] transition-opacity duration-500 pointer-events-none ${isSel ? 'opacity-100' : 'opacity-0'}`} />
                          
                          <div className="flex items-center gap-6 relative z-10">
                            <span className={`font-mono text-[9px] tracking-wider transition-colors duration-500 ${isSel ? 'text-[#3B72A6]' : 'text-[#1A2333]/40'}`}>
                              {num}
                            </span>
                            <span className={`font-bodoni text-lg md:text-xl tracking-tight transition-all duration-500 ${
                              isSel ? 'text-[#1A2333] pl-3' : 'text-[#1A2333]/40 group-hover:text-[#1A2333]/80'
                            }`}>
                              {title}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6 mt-2 sm:mt-0 relative z-10">
                            <span className="text-[#1A2333]/60 text-[8px] tracking-[0.2em] uppercase font-light">
                              {desc}
                            </span>
                            <div className={`h-3 w-3 rounded-full border flex items-center justify-center transition-all duration-500 ${
                              isSel ? 'border-[#3B72A6] bg-[#3B72A6]' : 'border-[#1A2333]/10 group-hover:border-[#1A2333]/30'
                            }`}>
                              {isSel && <div className="h-1 w-1 rounded-full bg-[#FFF9D2]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="bg-transparent hover:bg-[#1A2333]/5 text-[#1A2333]/60 hover:text-[#1A2333] border border-[#1A2333]/10 px-8 py-3.5 rounded-full text-[9px] font-bold tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      BACK
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="bg-[#1A2333] hover:bg-[#3B72A6] text-[#FFF9D2] font-extrabold px-12 py-4 rounded-full text-[9px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-xl flex items-center gap-2"
                    >
                      <span>NEXT STEP</span>
                      <span>→</span>
                    </button>
                  </div>
                </motion.div>

              ) : (
                
                /* STEP 3: CONTACT SPECIFICATIONS FORM */
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  key="step-3-form"
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[#3B72A6] text-[8px] tracking-[0.4em] font-extrabold uppercase">
                      SECURE ATELIER STATUS
                    </span>
                    <h3 className="font-bodoni text-2xl md:text-4xl text-[#1A2333] uppercase tracking-tighter leading-[1.0] font-light">
                      PROVIDE DETAILS & CONCEPT:
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="text-[#1A2333]/60 text-[7px] tracking-[0.3em] font-bold uppercase">[ SPEC-I // CLIENT DESIGNATION ]</span>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent border-b border-[#1A2333]/15 py-2 text-xs tracking-[0.25em] text-[#1A2333] focus:outline-none focus:border-[#3B72A6] transition-colors duration-500 uppercase font-light placeholder-[#1A2333]/30"
                          placeholder="ENTER NOMINAL KEY"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col gap-2">
                        <span className="text-[#1A2333]/60 text-[7px] tracking-[0.3em] font-bold uppercase">[ SPEC-II // COMMUNICATIONS DIRECTORY ]</span>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-b border-[#1A2333]/15 py-2 text-xs tracking-[0.25em] text-[#1A2333] focus:outline-none focus:border-[#3B72A6] transition-colors duration-500 font-light placeholder-[#1A2333]/30"
                          placeholder="CLIENT@STUDIO.COM"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <span className="text-[#1A2333]/60 text-[7px] tracking-[0.3em] font-bold uppercase">[ SPEC-III // ATELIER COMMISSION VISION ]</span>
                      <textarea 
                        required
                        rows={2}
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        className="w-full bg-transparent border-b border-[#1A2333]/15 py-2 text-xs tracking-[0.16em] text-[#1A2333] focus:outline-none focus:border-[#3B72A6] transition-colors duration-500 resize-none leading-relaxed font-light placeholder-[#1A2333]/30"
                        placeholder="OUTLINE THE COLLECTIBLE'S METAPHYSICAL OR ARTISTIC IDENTITY..."
                      />
                    </div>

                    {/* Ledger catalog metadata */}
                    <div className="flex justify-between items-center border-t border-[#1A2333]/[0.08] pt-4 mt-2 font-mono text-[7px] tracking-[0.3em] text-[#3B72A6]/60 uppercase select-none">
                      <span>REGISTRY ONLINE SLOT</span>
                      <span>[ STATUS: READY TO SEAL ]</span>
                    </div>

                    <div className="flex gap-4 mt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="bg-transparent hover:bg-[#1A2333]/5 text-[#1A2333]/60 hover:text-[#1A2333] border border-[#1A2333]/10 px-8 py-3.5 rounded-full text-[9px] font-bold tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer"
                      >
                        BACK
                      </button>
                      <button
                        type="submit"
                        className="bg-[#1A2333] hover:bg-[#3B72A6] text-[#FFF9D2] font-extrabold px-12 py-4 rounded-full text-[9px] tracking-[0.25em] uppercase transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-xl flex items-center gap-2"
                      >
                        <span>SUBMIT LEDGER ENTRY</span>
                        <span>✓</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D MUSEUM PEDESTAL SHOWCASE STAND (Cross-fades active options on hover) */}
        <div className="lg:col-span-6 flex items-center justify-center relative">
          
          <div className="absolute inset-0 pointer-events-none select-none z-0 opacity-30">
            <div className="absolute top-[30%] left-[20%] w-[250px] h-[250px] rounded-full bg-[#8CC0EB]/[0.08] filter blur-[70px] animate-pulse" />
          </div>

          <motion.div
            style={{ 
              perspective: 1200,
              transformStyle: "preserve-3d"
            }}
            animate={{
              rotateY: hoveredMedium || hoveredStyle ? -18 : -12,
              rotateX: hoveredMedium || hoveredStyle ? 12 : 8
            }}
            transition={{ type: "spring", stiffness: 90, damping: 22 }}
            className="relative w-[80%] h-[40vh] sm:h-[45vh] lg:h-[55vh] border border-[#3B72A6]/10 rounded-[2rem] overflow-hidden bg-[#FFF9D2] shadow-[0_40px_80px_rgba(26,35,51,0.06)] z-10 group"
          >
            {/* Museum Exhibition pedestal stand light beam */}
            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-[#8CC0EB]/20 to-transparent pointer-events-none z-20" />
            
            {/* Dynamic Cross-fade Artwork Render Slot */}
            <div className="absolute inset-0 w-full h-full">
              <AnimatePresence mode="wait">
                
                {submitted ? (
                  /* Renders Archival Fine Art Stretched board on success */
                  <motion.div
                    key="success-receipt-art"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.65, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src="/work/Screenshot 2026-05-18 141943.png"
                      alt="Archival Success"
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                ) : step === 1 ? (
                  /* Dynamic Medium selections cross-fade preview */
                  <motion.div
                    key={hoveredMedium || medium}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={mediumPreviews[hoveredMedium || medium]}
                      alt="Pedestal Medium Display"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                    />
                  </motion.div>
                ) : (
                  /* Dynamic Style selections cross-fade preview */
                  <motion.div
                    key={hoveredStyle || artStyle}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={stylePreviews[hoveredStyle || artStyle]}
                      alt="Pedestal Style Display"
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                    />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Light vignette backdrop shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF9D2]/95 via-[#FFF9D2]/30 to-transparent pointer-events-none z-10" />

            {/* Floating Technical Pedestal coordinates */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 z-20 pointer-events-none">
              <span className="text-[#1A2333] text-[9px] tracking-[0.25em] font-extrabold uppercase">
                {submitted ? 'CERTIFICATE REGISTERED' : step === 1 ? activeMediumLabel : activeStyleLabel}
              </span>
              <span className="text-[#3B72A6] text-[7.5px] tracking-[0.2em] uppercase font-bold">
                {submitted ? 'CALENDAR SLOT ACQUIRED' : step === 1 ? '[ ACTIVE PEDESTAL SELECTION ]' : '[ ACTIVE CREATIVE VIBE ]'}
              </span>
            </div>

            {/* Glass corner parameters */}
            <div className="absolute top-6 left-6 border border-[#BFDDF0] bg-[#FFF9D2]/80 px-3 py-1.5 rounded-xl z-20 text-[7px] tracking-[0.2em] font-bold text-[#1A2333]/50 uppercase pointer-events-none">
              STUDIO PREVIEW
            </div>
            
            <div className="absolute inset-0 border border-[#3B72A6]/10 rounded-[2rem] pointer-events-none group-hover:border-[#3B72A6]/30 transition-colors duration-500 z-20" />
          </motion.div>

          {/* Pedestal Stand base reflection */}
          <div className="absolute bottom-[-15px] w-[60%] h-[30px] bg-gradient-to-b from-[#3B72A6]/[0.06] to-transparent blur-[15px] rounded-full z-0 pointer-events-none" />
        </div>

      </div>

      {/* 3. FOOTER CREDITS INDEX */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between relative z-10 pt-6 border-t border-[#1A2333]/[0.08] gap-4">
        <span className="font-mono text-[8px] tracking-[0.25em] text-[#1A2333]/40 uppercase">
          SECURED COMMISSION PORTAL // END DESK
        </span>
        <span className="font-mono text-[8px] tracking-[0.25em] text-[#1A2333]/40 uppercase">
          © {currentYear} GAYATRI RAO ALL RIGHTS RESERVED
        </span>
      </div>
    </section>
  );
}
