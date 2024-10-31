/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mantenipro.s3.us-east-2.amazonaws.com'], // Agrega tu dominio aquí
  },
};

export default nextConfig;