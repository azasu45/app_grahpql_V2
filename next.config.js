/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
        serverActions: true
    },
    images: {
        domains: [
            "tailwindui.com",
            "images.unsplash.com",
            "lh3.googleusercontent.com",
            "uploadthing.com"
        ]
    }
}

module.exports = nextConfig
