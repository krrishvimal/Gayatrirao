"use client";

import { useEffect, useRef } from "react";

interface FogParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  phaseSpeed: number;
}

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracker with high inertia
    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    // Dynamic scroll tracking for section-specific color interpolation
    let scrollPct = 0;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollPct = docHeight > 0 ? scrollY / docHeight : 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles(); // Reinitialize fog distributions on resize
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Initialize 30 floating, low-opacity volumetric fog particles
    let particles: FogParticle[] = [];
    const initParticles = () => {
      particles = [];
      const count = 35;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.12,
          size: Math.random() * 280 + 150, // Giant soft blurred circles
          alpha: Math.random() * 0.015 + 0.005,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.002 + 0.0005,
        });
      }
    };
    initParticles();

    // Blobs definitions
    const blobs = [
      { x: width * 0.15, y: height * 0.25, angle: 0, speed: 0.0008, size: 750 },
      { x: width * 0.85, y: height * 0.65, angle: Math.PI, speed: 0.0006, size: 850 },
      { x: width * 0.5, y: height * 0.5, angle: Math.PI / 2, speed: 0.0004, size: 700 }
    ];

    // Core cinematic render loop
    const render = () => {
      // 1. Draw absolute deep luxury museum cream canvas
      ctx.fillStyle = "#FFF9D2";
      ctx.fillRect(0, 0, width, height);

      // Damp mouse coordinates
      mouse.x += (mouse.tx - mouse.x) * 0.035;
      mouse.y += (mouse.ty - mouse.y) * 0.035;

      // 2. Interpolate background colors based on active scroll section
      // Phase 0 (Hero): Pastel sky blue glow
      // Phase 1 (Showcase): Soft ice blue wash
      // Phase 2 (Commission): Warm peach/ivory glow
      
      let blob1Color = { r: 140, g: 192, b: 235, a: 0.15 };
      let blob2Color = { r: 191, g: 221, b: 240, a: 0.18 };
      let blob3Color = { r: 255, g: 235, b: 204, a: 0.15 };

      if (scrollPct < 0.35) {
        // Hero: Pure Sky Blue & Ice Blue
        const factor = scrollPct / 0.35;
        blob1Color.r = Math.floor(140 + (191 - 140) * factor);
        blob1Color.g = Math.floor(192 + (221 - 192) * factor);
        blob1Color.b = Math.floor(235 + (240 - 235) * factor);
        blob1Color.a = 0.15 + 0.05 * factor;
      } else if (scrollPct < 0.78) {
        // Showcase: Soft Ice Blue & Peach
        const factor = (scrollPct - 0.35) / (0.78 - 0.35);
        blob1Color.r = Math.floor(191 + (255 - 191) * factor);
        blob1Color.g = Math.floor(221 + (235 - 221) * factor);
        blob1Color.b = Math.floor(240 - (240 - 204) * factor);
        blob1Color.a = 0.2 - 0.05 * factor;
        
        blob2Color.r = Math.floor(191 + (255 - 191) * factor);
        blob2Color.g = Math.floor(221 + (249 - 221) * factor);
        blob2Color.b = Math.floor(240 - (240 - 210) * factor);
      } else {
        // Commission: Beautiful Peach & Ivory Warmth
        blob1Color = { r: 255, g: 235, b: 204, a: 0.22 };
        blob2Color = { r: 255, g: 249, b: 210, a: 0.25 };
        blob3Color = { r: 140, g: 192, b: 235, a: 0.12 };
      }

      // 3. Render ambient glazes
      blobs.forEach((blob, idx) => {
        blob.angle += blob.speed;
        const driftX = blob.x + Math.cos(blob.angle) * 110;
        const driftY = blob.y + Math.sin(blob.angle) * 110;

        const gradient = ctx.createRadialGradient(driftX, driftY, 0, driftX, driftY, blob.size);
        
        let c = blob1Color;
        if (idx === 1) c = blob2Color;
        if (idx === 2) c = blob3Color;

        gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);
        gradient.addColorStop(1, "rgba(255, 249, 210, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      // 4. Update and render 30 Volumetric Fog Particles (Cinematic smoke drift)
      particles.forEach((p) => {
        // Slow float
        p.phase += p.phaseSpeed;
        p.x += p.vx + Math.sin(p.phase) * 0.06;
        p.y += p.vy + Math.cos(p.phase) * 0.04;

        // Wrap around bounds
        if (p.x < -p.size) p.x = width + p.size;
        if (p.x > width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = height + p.size;
        if (p.y > height + p.size) p.y = -p.size;

        // Draw particle
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        // Slowly pulse alpha based on phase
        const pulseAlpha = p.alpha * (0.85 + Math.sin(p.phase) * 0.15);
        
        // Match particle tone slightly to scroll position (cool in gold phase, warm in indigo phase)
        let particleColor = "140, 192, 235"; // Sky Blue base
        if (scrollPct > 0.35 && scrollPct < 0.78) {
          particleColor = "191, 221, 240"; // Ice blue in museum phase
        } else if (scrollPct >= 0.78) {
          particleColor = "255, 235, 204"; // Peach fog in studio phase
        }

        grad.addColorStop(0, `rgba(${particleColor}, ${pulseAlpha})`);
        grad.addColorStop(0.5, `rgba(${particleColor}, ${pulseAlpha * 0.3})`);
        grad.addColorStop(1, "rgba(255, 249, 210, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // 5. Dynamic cursor lens bloom light beam (follows cursor with drag inertia)
      const cursorGlowSize = 550;
      const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, cursorGlowSize);
      
      let cursorColor = "140, 192, 235"; // Sky Blue
      let cursorAlpha = 0.12;
      
      if (scrollPct > 0.35 && scrollPct < 0.78) {
        cursorColor = "191, 221, 240"; // Ice Blue
        cursorAlpha = 0.14;
      } else if (scrollPct >= 0.78) {
        cursorColor = "255, 235, 204";  // Peach
        cursorAlpha = 0.16;
      }

      mouseGrad.addColorStop(0, `rgba(${cursorColor}, ${cursorAlpha})`);
      mouseGrad.addColorStop(0.4, `rgba(${cursorColor}, ${cursorAlpha * 0.35})`);
      mouseGrad.addColorStop(1, "rgba(255, 249, 210, 0)");

      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);

      // 6. Volumetric Dark Vignette Frame
      const vignette = ctx.createRadialGradient(width / 2, height / 2, width * 0.3, width / 2, height / 2, width * 0.85);
      vignette.addColorStop(0, "rgba(255, 249, 210, 0)");
      vignette.addColorStop(0.6, "rgba(255, 249, 210, 0.12)");
      vignette.addColorStop(1, "rgba(255, 249, 210, 0.45)");
      
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full bg-[#FFF9D2]"
    />
  );
}
