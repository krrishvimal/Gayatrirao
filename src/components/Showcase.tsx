"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Master dataset for the pinned vertical scroll presentation
const EXHIBITION_PIECES = [
  {
    id: "01",
    title: "STARBOY",
    subtitle: "portrait.",
    quote: "Neon vision.\nWearable canvas.",
    desc: "A custom hand-painted denim campaign capturing cinematic lighting, vibrant cyan shading, and striking neon accents. Fusing high-illustration paint washes with raw street detail, this portrait elevates clothing into a gallery showpiece.",
    category: "COUTURE DENIM PORTRAIT",
    image: "/work/Screenshot 2026-05-18 141932.png",
    spec: "SPEC - 01",
    materials: ["vintage denim", "acrylic paint", "neon inks", "hand paint", "matte seal"],
    colors: ["#E2FF2E", "#1D8A99", "#E2583E", "#0F1A2C", "#202D30"]
  },
  {
    id: "02",
    title: "DENIM",
    subtitle: "monolith.",
    quote: "Raw textile.\nCelestial sequence.",
    desc: "A hand-distressed denim monolith inspired by The Big Bang Theory, fusing iconic character panels, pop-culture nostalgia, and raw street detail crafted as a collectible tribute to science, chaos, and identity.",
    category: "COUTURE COAT MONOLITH",
    image: "/work/denim_cropped.png",
    spec: "SPEC - 02",
    materials: ["vintage denim", "fabric ink", "liquid gold", "brass hardware", "frayed edges"],
    colors: ["#FFE600", "#70E600", "#FFA500", "#FF007F", "#00E6FF"]
  },
  {
    id: "03",
    title: "WOLF",
    subtitle: "canvas.",
    quote: "Financial chaos.\nPop-culture greed.",
    desc: "A hand-painted cinematic portrait of Leonardo DiCaprio, merging Wall Street excess, cult film iconography, and rich canvas texturing crafted as a collectible tribute to ambition, power, and modern myth.",
    category: "FINE ART COLLECTIBLES",
    image: "/work/wolf of the wall.jpg",
    spec: "SPEC - 03",
    materials: ["gesso canvas", "neon acrylics", "spray paint", "charcoal shade", "matte varnish"],
    colors: ["#111111", "#e3dccf", "#b89047", "#5c6b73", "#8a2b2b"]
  },
  {
    id: "04",
    title: "CHAOS",
    subtitle: "remains.",
    quote: "Mortal decay.\nDark rebellion.",
    desc: "A dark wearable portrait colliding glamour with mortal decay, blending hand-drawn skeletal detailing, dripping crimson accents, and raw monochrome contrast crafted as a collectible study of beauty, death, and rebellion.",
    category: "WEARABLE MACABRE",
    image: "/work/Screenshot 2026-05-18 141909.png",
    spec: "SPEC - 04",
    materials: ["vintage denim", "fabric acrylics", "crimson ink", "charcoal shade", "matte sealer"],
    colors: ["#0a0a09", "#ffffff", "#8a2b2b", "#363636", "#b89047"]
  },
  {
    id: "05",
    title: "COASTAL",
    subtitle: "kicks.",
    quote: "Tropical tones.\nSummer archive.",
    desc: "A tropical-toned Air Force 1 reworked with saturated aqua suede, hand-layered oceanic color contrasts, and raw streetwear energy crafted as a vibrant collectible for summer archive rotations.",
    category: "FOOTWEAR ARTISTRY",
    image: "/work/sneaker2.jpg",
    spec: "SPEC - 05",
    materials: ["aqua suede", "oceanic dyes", "white leather", "archival laces", "summer sole"],
    colors: ["#00a8cc", "#142850", "#27496d", "#dae1e7", "#ffc30f"]
  }
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const gsapModule = require("gsap");
      const ScrollTriggerModule = require("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);

      // Create a safely scoped GSAP context to prevent React DOM lifecycle crashes
      const ctx = gsap.context(() => {
        let mm = gsap.matchMedia();

        // Pin and fade ONLY on screen sizes 1024px and wider (desktops & large landscape tablets)
        mm.add("(min-width: 1024px)", () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: `+=${EXHIBITION_PIECES.length * 800}`, // Scroll distance to complete the gallery
              scrub: true,
              pin: true, // Pin the container directly
              anticipatePin: 1
            }
          });

          // Animate opacity of each overlapping DOM piece node 
          EXHIBITION_PIECES.forEach((_, i) => {
            if (i === 0) return; // First is already visible initially
            
            // At progress step, fade out previous, fade in current smoothly
            timeline
              .to(`.piece-${i - 1}`, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, `step${i}`)
              .fromTo(`.piece-${i}`, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" }, `step${i}`)
          });
        });
      }, containerRef);

      return () => {
        ctx.revert(); // Safely unpins and cleans up DOM for React
      };
    }
  }, []);

  return (
    <div ref={containerRef} id="showcase" className="relative bg-background z-20 select-none w-full h-auto lg:h-screen overflow-visible lg:overflow-hidden py-16 lg:py-0">
        
        {/* Global Grunge overlay for entire pinned section */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay z-0" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dust.png')" }} />
        
        {EXHIBITION_PIECES.map((piece, i) => (
          <div 
            key={piece.id} 
            className={`piece-${i} relative lg:absolute lg:inset-0 w-full h-auto lg:h-full flex flex-col justify-start px-6 md:px-16 lg:px-24 pt-8 lg:pt-[160px] pb-8 lg:pb-16 z-10 opacity-100 ${i !== 0 ? 'lg:opacity-0' : 'lg:opacity-100'} mb-16 lg:mb-0`}
          >
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12 h-auto relative">
              
              {/* Left Content Typography Structure */}
              <div className="w-full lg:w-[45%] flex flex-col gap-4 md:gap-5 justify-center z-20">
                <div className="flex flex-col gap-1 relative">
                  <span className="text-[#3B72A6] text-xs font-handwriting tracking-widest uppercase layer-back rotate-[-1deg]">
                    STUDIO PORTFOLIO // SELECTED CAMPAIGNS
                  </span>
                  
                  <h2 className="font-bodoni text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7rem] leading-[0.8] tracking-tighter text-[#1A2333] uppercase font-bold drop-shadow-md">
                    {piece.title}<br/>
                    <span className="font-bold text-[#3B72A6] italic lowercase font-bodoni">{piece.subtitle}</span>
                  </h2>
                  
                  <div className="mt-3 pl-4 border-l-[1.5px] border-[#1A2333]/20 relative">
                    <p className="font-handwriting text-[1.75rem] text-[#1A2333]/70 leading-[1.1] rotate-[1deg] opacity-90 whitespace-pre-line">
                      {piece.quote}
                    </p>
                    <div className="w-32 h-[1px] bg-gradient-to-r from-[#1A2333] to-transparent mt-2 rotate-[-1deg]" />
                  </div>
                </div>
                
                <div className="mt-4 relative">
                  <p className="text-[#1A2333]/60 text-[9px] md:text-[9.5px] tracking-[0.2em] uppercase leading-relaxed font-bold w-[95%]">
                    {piece.desc}
                  </p>
                </div>
              </div>

              {/* Right PHYSICAL SCRAPBOOK COLLAGE Chamber */}
              <div className="flex w-full lg:w-[55%] h-[350px] sm:h-[450px] lg:h-[500px] relative items-center justify-center pointer-events-none select-none z-10 overflow-visible mt-4 lg:mt-0">
                
                {/* Responsive Scale Wrapper */}
                <div className="absolute inset-0 flex items-center justify-center scale-[0.58] sm:scale-[0.8] lg:scale-100 origin-top lg:origin-center transition-transform duration-300">
                  
                  {/* Back Cardboard Base */}
                  <div className="absolute w-[440px] h-[480px] bg-[#FFEBCC] rotate-[-2deg] border border-[#3B72A6]/10 shadow-2xl rounded-sm" />
                  
                  {/* Ripped Paper Backing */}
                  <div className="absolute w-[400px] h-[450px] bg-[#BFDDF0] rotate-[1deg] shadow-lg border border-[#8CC0EB] flex" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cardboard-flat.png')" }} />
                
                {/* Vertical Color Swatches */}
                <div className="absolute right-[8%] top-[18%] w-[40px] h-[220px] bg-[#FFF9D2] rotate-[3deg] shadow-md border-r border-dashed border-[#BFDDF0] flex flex-col items-center py-4 gap-2">
                  {piece.colors.map((c, idx) => (
                    <div key={idx} className="w-5 h-5 shadow-sm rounded-[1px]" style={{ backgroundColor: c }} />
                  ))}
                </div>

                {/* Masking Tape Top Left */}
                <div className="absolute top-[8%] left-[12%] w-[120px] h-[25px] bg-[#BFDDF0]/80 backdrop-blur-sm rotate-[-5deg] shadow-sm z-20 border border-white/20" />

                {/* Main Polaroid Frame */}
                <div className="absolute w-[360px] h-[410px] bg-[#FFF9D2] shadow-[0_20px_40px_rgba(26,35,51,0.12)] rotate-[-1.5deg] z-10 flex flex-col items-center justify-start p-5 pb-16 border border-[#BFDDF0]">
                  <div className="relative w-full h-[290px] shadow-inner bg-black border border-black/10 overflow-hidden">
                    <Image
                      src={piece.image}
                      alt={piece.title}
                      fill
                      sizes="340px"
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }} />
                  </div>
                </div>

                {/* Handwritten Annotations */}
                <div className="absolute top-[10%] left-[22%] z-20 font-handwriting text-[#1A2333] text-[1.3rem] rotate-[-2deg] opacity-85 tracking-wide">
                  ARCHIVE TEASER?
                </div>
                <div className="absolute top-[16%] left-[22%] z-20 font-mono text-[6.5px] tracking-[0.25em] text-[#1A2333] opacity-70">
                  {piece.category}
                  <br/>
                  00{i+1} / INGRESS
                </div>

                {/* Bottom polaroid annotations */}
                <div className="absolute bottom-[10%] left-[18%] z-20 font-handwriting text-[#1A2333] text-[1.4rem] rotate-[1deg] opacity-80">
                  Preview // Atelier_00{i+1}
                </div>
                <div className="absolute bottom-[10%] right-[22%] z-20 font-handwriting text-[#1A2333] text-[1.2rem] opacity-75 tracking-wider">
                  {piece.spec}
                </div>

                {/* Materials List floating bottom right */}
                <div className="absolute bottom-[4%] right-[-4%] z-20 flex flex-col gap-1 w-[130px] bg-[#FFEBCC] p-4 shadow-xl rotate-[-3deg] border border-[#BFDDF0]">
                  <span className="font-handwriting text-[1.1rem] text-[#1A2333] opacity-90 border-b border-[#1A2333]/20 pb-1 mb-1">MATERIALS:</span>
                  <span className="font-handwriting text-[1.1rem] text-[#1A2333]/80 leading-snug">
                    {piece.materials.map((m, idx) => (
                      <React.Fragment key={idx}>
                        {m}<br/>
                      </React.Fragment>
                    ))}
                  </span>
                </div>
                
                {/* Additional scattered tape */}
                <div className="absolute bottom-[18%] left-[6%] w-[90px] h-[22px] bg-[#BFDDF0]/80 backdrop-blur-sm rotate-[14deg] shadow-sm z-20 border border-white/20" />
                <div className="absolute top-[42%] right-[-1%] w-[65px] h-[25px] bg-[#BFDDF0]/80 backdrop-blur-sm rotate-[9deg] shadow-sm z-20 border border-white/20" />
                
                </div> {/* End of Responsive Scale Wrapper */}
              </div>
            </div>

            {/* Elevated Scroll Instruction Area (Anchored to exact viewport bottom) */}
            <div className="relative lg:absolute bottom-0 lg:bottom-16 left-0 lg:left-24 z-30 mt-8 lg:mt-0">
              {i === EXHIBITION_PIECES.length - 1 ? (
                <div 
                  onClick={() => {
                    const commission = document.getElementById("commission");
                    if (commission) commission.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="relative flex items-center gap-4 font-bold text-[#1A2333]/60 hover:text-[#1A2333] text-[9.5px] tracking-[0.3em] uppercase group cursor-pointer w-max select-none pointer-events-auto"
                >
                  <span className="group-hover:text-[#1A2333] transition-colors duration-300">ENTER COMMISSION DESK</span>
                  <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
                  <div className="absolute -bottom-3 left-0 w-full h-[1px] bg-[#1A2333]/30 rotate-[-1deg]" />
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-4 font-bold text-[#1A2333]/60 text-[9.5px] tracking-[0.3em] uppercase w-max select-none animate-pulse opacity-70">
                  <span>SCROLL TO EXPLORE ARCHIVE</span>
                  <span className="text-lg">↓</span>
                </div>
              )}
            </div>
            
          </div>
        ))}
    </div>
  );
}
