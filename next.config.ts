import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignorar errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignorar errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },
  // Deshabilitar prerendering estático
  output: 'standalone',
  // Configuración para paquetes externos del servidor
  serverExternalPackages: ['pg'],
};

export default nextConfig;
