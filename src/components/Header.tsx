"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll transitions to toggle active nav state & scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["hero", "showcase", "commission"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === "hero" ? "home" : section === "showcase" ? "archive" : "commission");
            break;
          }
        }
      }
    };

    // Initial check in case page is refreshed while scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, navState: string) => {
    setActiveSection(navState);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed left-0 right-0 z-50 flex justify-center pointer-events-none ${
        isScrolled ? "top-0 px-0" : "top-3 px-6"
      }`}
      style={{ 
        transition: "top 250ms cubic-bezier(0.16, 1, 0.3, 1), padding 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "top, padding"
      }}
    >
      <div 
        className={`w-full flex items-center justify-between pointer-events-auto ${
          isScrolled 
            ? "max-w-full rounded-none bg-[#0A0A09]/95 backdrop-blur-2xl border-b border-t-0 border-l-0 border-r-0 border-white/[0.08] px-6 md:px-12 py-2 shadow-[0_15px_40px_rgba(0,0,0,0.35)]" 
            : "max-w-7xl rounded-full bg-[#0A0A09]/95 backdrop-blur-xl border border-white/[0.04] px-4 md:px-6 py-2 shadow-none"
        }`}
        style={{ 
          transition: "max-width 250ms cubic-bezier(0.16, 1, 0.3, 1), border-radius 250ms cubic-bezier(0.16, 1, 0.3, 1), padding 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1), background-color 250ms cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "max-width, border-radius, padding, box-shadow, background-color"
        }}
      >
        
        {/* Fine Art Monogram Logo */}
        <div 
          onClick={() => handleNavClick("hero", "home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="font-bodoni text-sm md:text-base font-bold tracking-[0.2em] text-[#FAF9F6] transition-colors duration-300 group-hover:text-[#8CC0EB]">
            GAYATRI RAO
          </span>
          <span className="h-1 w-1 rounded-full bg-[#8CC0EB] group-hover:scale-125 transition-transform duration-300" />
        </div>

        {/* Creative Capabilities Micro-Icons (Bespoke premium capabilities pill) */}
        <div className="hidden lg:flex items-center gap-6 border-l border-white/[0.08] pl-6 select-none">
          <div className="flex items-center gap-4 text-white/40">
            
            {/* 1. Custom Apparel Capability (Shirt) */}
            <motion.div 
              title="Custom Hand-Painted Apparel"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.25, rotate: -6, color: "#8CC0EB" }}
              className="cursor-pointer transition-colors duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M20.38 3.46L16 6V4a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2L3.62 3.46a2 2 0 0 0-2.41.9L0 8l4 4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8l4-4-1.21-3.64a2 2 0 0 0-2.41-.9z" />
              </svg>
            </motion.div>

            {/* Divider */}
            <span className="h-1 w-1 rounded-full bg-white/10" />

            {/* 2. Custom Footwear/Sneaker Capability (Inline Sneaker Vector Outline) */}
            <motion.div 
              title="Bespoke Collectible Sneakers"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.25, rotate: 8, color: "#8CC0EB" }}
              className="cursor-pointer transition-colors duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M3 16h18a1 1 0 0 0 1-1c0-2-1-3.5-4-4.5l-4-3h-4L6 11l-3 1v4z" />
                <path d="M10 8h2M12 10h2" />
                <path d="M3 14.5h18" />
              </svg>
            </motion.div>

            {/* Divider */}
            <span className="h-1 w-1 rounded-full bg-white/10" />

            {/* 3. Custom Fine Art Canvas Capability (Artist Palette Outline) */}
            <motion.div 
              title="Archival Fine Art Canvases"
              animate={{ rotate: [0, 4, -4, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.25, color: "#8CC0EB" }}
              className="cursor-pointer transition-colors duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="8" cy="9" r="1.5" fill="currentColor" />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                <circle cx="16" cy="9" r="1.5" fill="currentColor" />
                <circle cx="15" cy="14" r="1.5" fill="currentColor" />
                <circle cx="9" cy="14" r="1" fill="currentColor" />
              </svg>
            </motion.div>

          </div>
        </div>

        {/* Luxury Capsule Navigation Bar */}
        <nav className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] p-1 rounded-full relative">
          
          {(["home", "archive", "commission"] as const).map((item) => {
            const label = item === "home" ? "HOME" : item === "archive" ? "ARCHIVE" : "COMMISSION";
            const targetId = item === "home" ? "hero" : item === "archive" ? "showcase" : "commission";
            const isAct = activeSection === item;

            return (
              <button
                key={item}
                onClick={() => handleNavClick(targetId, item)}
                className="relative px-4 py-1.5 rounded-full text-[9px] font-extrabold tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer select-none"
              >
                {/* Active Indicator Slider Backing */}
                {isAct && (
                  <motion.div
                    layoutId="activePill"
                    transition={{ type: "spring", stiffness: 220, damping: 25 }}
                    className="absolute inset-0 bg-[#FAF9F6] rounded-full z-0 shadow-md"
                  />
                )}
                
                <span 
                  className={`relative z-10 transition-colors duration-500 ${
                    isAct ? 'text-[#0A0A09]' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}

        </nav>

      </div>
    </header>
  );
}
