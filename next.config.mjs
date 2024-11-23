/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './imageLoader.ts',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'photos.hannahjackwedding.com',
            },
        ],
    },
}

export default nextConfig;
