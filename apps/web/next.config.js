/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['db'],
  webpack: (config, { isServer }) => {
    // Resolve .ts files when .js extension is used (for TypeScript ES modules)
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };
    
    if (isServer) {
      // Exclude Prisma from webpack bundling on the server
      config.externals.push('@prisma/client');
      config.externals.push('.prisma/client');
    }
    return config;
  },
};

export default nextConfig;
