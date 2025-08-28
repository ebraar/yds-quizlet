/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 🚀 Build sırasında ESLint hatalarını yok say
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;