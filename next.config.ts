import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable next-generation AVIF format alongside WebP.
    // AVIF compresses up to 30% better than WebP while preserving
    // hyper-realistic high-resolution colors and textures of fine art.
    formats: ["image/avif", "image/webp"],
    
    // Cache optimized images on the server/CDN for at least 1 month
    // to ensure subsequent visits load instantly without processing overhead.
    minimumCacheTTL: 2592000,
    
    // Explicit sizing grids to prevent layout shifts and deliver
    // perfect resolution footprints across all mobile & desktop screen sizes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
};

export default nextConfig;
