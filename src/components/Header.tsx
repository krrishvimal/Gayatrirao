"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBadgeHovered, setIsBadgeHovered] = useState(false);

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

        {/* Creative Availability Action (Concept 2 - high-end conversions) */}
        <div className="hidden lg:flex items-center border-l border-white/[0.08] pl-6 select-none">
          <motion.div
            onMouseEnter={() => setIsBadgeHovered(true)}
            onMouseLeave={() => setIsBadgeHovered(false)}
            onClick={() => handleNavClick("commission", "commission")}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glowing Active Status Dot */}
            <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            
            {/* Morphing Text Container */}
            <span className="font-mono text-[8px] tracking-[0.18em] font-bold text-white/50 uppercase transition-colors duration-300 flex items-center min-w-[130px] justify-center">
              <AnimatePresence mode="wait">
                {!isBadgeHovered ? (
                  <motion.span
                    key="status-open"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1"
                  >
                    STUDIO STATUS: <span className="text-white/80">OPEN</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="status-inquire"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-[#8CC0EB] flex items-center gap-1"
                  >
                    BOOK A COMMISSION <span className="translate-x-0.5">➔</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.div>
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
