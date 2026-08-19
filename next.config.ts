/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*",
        },
      ],
    },
    redirects: async () => {
      return [
        {
          source: "/visual-stories",
          destination: "/infographics",
          permanent: true,
        },
        {
          source: "/infographics/charts/:topic",
          destination: "/infographics/charts",
          permanent: true,
        },
        {
          source: "/infographics/explainers/:topic",
          destination: "/infographics/explainers",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  