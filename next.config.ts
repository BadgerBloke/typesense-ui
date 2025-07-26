import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'authjs.dev'
            }
        ]
    }
};

export default nextConfig;
