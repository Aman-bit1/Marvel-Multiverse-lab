"use client";
import { useState, useEffect } from "react";

export type Story = {
  id: string;
  movieId: string;
  prompt: string;
  title: string;
  act1: string;
  act2: string;
  act3: string;
  ending: string;
  twist: string;
  fanTheory?: string;
  createdAt: number;
};

export function useStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("marvel-multiverse-stories");
    if (saved) {
      try {
        setStories(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse stories", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const addStory = (story: Story) => {
    const newStories = [story, ...stories];
    setStories(newStories);
    localStorage.setItem("marvel-multiverse-stories", JSON.stringify(newStories));
  };

  const removeStory = (id: string) => {
    const newStories = stories.filter(s => s.id !== id);
    setStories(newStories);
    localStorage.setItem("marvel-multiverse-stories", JSON.stringify(newStories));
  };

  const getRecentTitles = (limit: number = 3) => {
    return stories.slice(0, limit).map(s => s.title);
  };

  return { stories, addStory, removeStory, getRecentTitles, isLoaded };
}
