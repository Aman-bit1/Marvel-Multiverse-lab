import { Movie } from "./constants";
import { Story } from "@/hooks/useStories";

export async function generateAlternateStory(
  movie: Movie, 
  prompt: string, 
  memoryHistory: string[] = []
): Promise<Omit<Story, 'id' | 'createdAt'>> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, movieTitle: movie.title, memoryHistory }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Timeline generation failed.');
  }
  
  return {
    movieId: movie.id,
    prompt,
    title: data.title,
    act1: data.act1,
    act2: data.act2,
    act3: data.act3,
    ending: data.ending,
    twist: data.twist,
    fanTheory: data.fanTheory,
  };
}
