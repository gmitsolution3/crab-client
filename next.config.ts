import type { NextConfig } from "next";
// import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://low-e-commerce-server.vercel.app/:path*",
      },
    ];
  },
};

/* const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
}); */

// export default withBundleAnalyzer(nextConfig);
export default nextConfig;
