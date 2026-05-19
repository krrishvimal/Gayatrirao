"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Instantiate Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Fine luxury spring deceleration
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Hook scroll loop into RequestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Sync scroll event to GSAP ScrollTrigger to ensure zero parallax lag
    lenis.on("scroll", () => {
      // If GSAP is loaded in the window, we tell it to update ScrollTrigger
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).ScrollTrigger) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).ScrollTrigger.update();
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
