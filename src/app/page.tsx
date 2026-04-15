"use client";
import { useState } from "react";
import { MOVIES, Movie } from "@/lib/constants";
import HeroSection from "@/components/sections/HeroSection";
import GeneratorSection from "@/components/sections/GeneratorSection";

export default function Home() {
  const [activeMovie, setActiveMovie] = useState<Movie>(MOVIES[0]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <HeroSection activeMovie={activeMovie} />
      <GeneratorSection activeMovie={activeMovie} onSelectMovie={setActiveMovie} />
    </div>
  );
}
