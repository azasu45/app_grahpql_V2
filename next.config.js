/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        typedRoutes:true
    },
    images:{
        domains:[
            "tailwindui.com",
            "images.unsplash.com",
            "lh3.googleusercontent.com"
        ]
    }
}

module.exports = nextConfig
