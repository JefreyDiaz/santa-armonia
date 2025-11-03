import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santa Armonía - Facial & Corporal",
  description: "Centro de estética integral. Tratamientos faciales y corporales. Agenda tu cita en Santa Armonía.",
  keywords: ["spa", "estética", "tratamientos faciales", "tratamientos corporales", "Santa Armonía"],
  authors: [{ name: "Santa Armonía" }],
  icons: {
    icon: '/images/icono_santa_armonia.png',
  },
  openGraph: {
    title: "Santa Armonía - Facial & Corporal",
    description: "Centro de estética integral. Tratamientos faciales y corporales.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
