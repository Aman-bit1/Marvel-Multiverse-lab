import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import AudioPlayer from "@/components/effects/AudioPlayer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marvel Multiverse Lab | Premium Cinematic Experience",
  description: "An alternate ending generator and cinematic journey through the MCU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          cinzel.variable,
          "antialiased min-h-screen relative flex flex-col bg-black text-white"
        )}
      >
        <div 
          className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay opacity-[0.03]" 
          style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"}}
        ></div>
        <Navbar />
        <AudioPlayer />
        <main className="relative z-10 flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
