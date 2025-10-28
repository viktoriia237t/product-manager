/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    publicRuntimeConfig: {
        USERS_API: process.env.NEXT_PUBLIC_USERS_API || "https://69009fa7ff8d792314babc7b.mockapi.io/",
    },
}

module.exports = nextConfig