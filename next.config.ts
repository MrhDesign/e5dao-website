import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // 优化图片加载缓存策略
    unoptimized: false,
    // 添加缓存策略 - 增加到24小时
    minimumCacheTTL: 86400, // 24小时缓存
    // 设置设备尺寸（优化响应式图片）
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 实验性功能，可能有助于改善导航性能
  experimental: {
    optimizePackageImports: ['next/image'],
  }
};

export default nextConfig;
