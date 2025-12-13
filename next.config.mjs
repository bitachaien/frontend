/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: false,
  trailingSlash: false,

  images: {
    loader: "custom",
    loaderFile: "./jsdevlivr.js",
    minimumCacheTTL: 43200,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "gwfd.qatgwawm.net",
        pathname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://betapi.spaceplus.live/api/:path*",
      },
    ];
  },

  productionBrowserSourceMaps: false,

  webpack(config, { isServer }) {
    if (isServer) {
      config.resolve.alias["fs"] = false;
    }
    return config;
  },
};

module.exports = nextConfig;
