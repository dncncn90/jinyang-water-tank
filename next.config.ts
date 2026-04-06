import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/products/chem-:id',
        destination: '/products/pe-round-1t',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
