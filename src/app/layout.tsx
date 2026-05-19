import type { Metadata } from "next";
import { Inter, Bodoni_Moda, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import InteractiveCanvas from "@/components/InteractiveCanvas";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GAYATRI RAO — Custom Sneaker & Denim Artist | Design Studio",
  description: "Bespoke digital archive and design studio of Gayatri Rao (@gayatridoesart). Intricate hand-painted custom sneakers, premium denim customisations, and vibrant acrylic canvas art.",
  keywords: [
    "Gayatri Rao",
    "gayatridoesart",
    "custom sneakers",
    "sneaker customiser",
    "hand-painted sneakers",
    "custom denim jacket",
    "denim art",
    "acrylic on canvas",
    "custom streetwear",
    "luxury art portfolio"
  ],
  authors: [{ name: "Gayatri Rao" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bodoni.variable} ${caveat.variable} scroll-smooth relative`}
      suppressHydrationWarning={true}
    >
      <body suppressHydrationWarning={true} className="bg-background text-foreground font-sans antialiased overflow-x-hidden min-h-screen relative selection:bg-[#8CC0EB] selection:text-[#1A2333]">
        {/* Cinematic Preloader Intro */}
        <Preloader />

        {/* Ambient WebGL-Style Fluid Lighting Canvas */}
        <InteractiveCanvas />

        {/* Buttery smooth scrolling momentum wrapper */}
        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* Luxury Texture Overlay (Grain) */}
        <div className="canvas-texture" />
      </body>
    </html>
  );
}
