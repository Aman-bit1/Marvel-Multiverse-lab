export type Movie = {
  id: string;
  title: string;
  accent: string;
  bgUrl: string;
};

const bgPool = [
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=2074&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2059&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279bbc0?q=80&w=2072&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=2078&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2084&auto=format&fit=crop"
];

const getBg = (index: number) => bgPool[index % bgPool.length];

export const MOVIES: Movie[] = [
  { id: "iron-man", title: "Iron Man (2008)", accent: "#EAB308", bgUrl: getBg(0) },
  { id: "incredible-hulk", title: "The Incredible Hulk", accent: "#22C55E", bgUrl: getBg(1) },
  { id: "iron-man-2", title: "Iron Man 2", accent: "#EAB308", bgUrl: getBg(2) },
  { id: "thor", title: "Thor", accent: "#38BDF8", bgUrl: getBg(3) },
  { id: "captain-america-first-avenger", title: "Captain America: The First Avenger", accent: "#3B82F6", bgUrl: getBg(4) },
  { id: "avengers", title: "The Avengers", accent: "#3B82F6", bgUrl: getBg(5) },
  { id: "iron-man-3", title: "Iron Man 3", accent: "#EAB308", bgUrl: getBg(0) },
  { id: "thor-dark-world", title: "Thor: The Dark World", accent: "#DC2626", bgUrl: getBg(1) },
  { id: "captain-america-winter-soldier", title: "Captain America: The Winter Soldier", accent: "#9CA3AF", bgUrl: getBg(2) },
  { id: "guardians-of-the-galaxy", title: "Guardians of the Galaxy", accent: "#A855F7", bgUrl: getBg(3) },
  { id: "avengers-age-of-ultron", title: "Avengers: Age of Ultron", accent: "#DC2626", bgUrl: getBg(4) },
  { id: "ant-man", title: "Ant-Man", accent: "#F87171", bgUrl: getBg(5) },
  { id: "captain-america-civil-war", title: "Captain America: Civil War", accent: "#DC2626", bgUrl: getBg(0) },
  { id: "doctor-strange", title: "Doctor Strange", accent: "#F97316", bgUrl: getBg(1) },
  { id: "guardians-vol-2", title: "Guardians of the Galaxy Vol. 2", accent: "#C084FC", bgUrl: getBg(2) },
  { id: "spider-man-homecoming", title: "Spider-Man: Homecoming", accent: "#EF4444", bgUrl: getBg(3) },
  { id: "thor-ragnarok", title: "Thor: Ragnarok", accent: "#10B981", bgUrl: getBg(4) },
  { id: "black-panther", title: "Black Panther", accent: "#A855F7", bgUrl: getBg(5) },
  { id: "avengers-infinity-war", title: "Avengers: Infinity War", accent: "#EAB308", bgUrl: getBg(0) },
  { id: "ant-man-and-the-wasp", title: "Ant-Man and the Wasp", accent: "#FACC15", bgUrl: getBg(1) },
  { id: "captain-marvel", title: "Captain Marvel", accent: "#38BDF8", bgUrl: getBg(2) },
  { id: "avengers-endgame", title: "Avengers: Endgame", accent: "#9333EA", bgUrl: getBg(3) },
  { id: "spider-man-far-from-home", title: "Spider-Man: Far From Home", accent: "#EF4444", bgUrl: getBg(4) },
  { id: "wandavision", title: "WandaVision", accent: "#DC2626", bgUrl: getBg(5) },
  { id: "falcon-winter-soldier", title: "The Falcon and the Winter Soldier", accent: "#3B82F6", bgUrl: getBg(0) },
  { id: "loki", title: "Loki", accent: "#22C55E", bgUrl: getBg(1) },
  { id: "black-widow", title: "Black Widow", accent: "#DC2626", bgUrl: getBg(2) },
  { id: "shang-chi", title: "Shang-Chi", accent: "#F97316", bgUrl: getBg(3) },
  { id: "eternals", title: "Eternals", accent: "#EAB308", bgUrl: getBg(4) },
  { id: "hawkeye", title: "Hawkeye", accent: "#A855F7", bgUrl: getBg(5) },
  { id: "spider-man-no-way-home", title: "Spider-Man: No Way Home", accent: "#EF4444", bgUrl: getBg(0) },
  { id: "moon-knight", title: "Moon Knight", accent: "#D1D5DB", bgUrl: getBg(1) },
  { id: "doctor-strange-multiverse", title: "Doctor Strange: Multiverse of Madness", accent: "#DC2626", bgUrl: getBg(2) },
  { id: "ms-marvel", title: "Ms. Marvel", accent: "#A855F7", bgUrl: getBg(3) },
  { id: "thor-love-and-thunder", title: "Thor: Love and Thunder", accent: "#38BDF8", bgUrl: getBg(4) },
  { id: "she-hulk", title: "She-Hulk", accent: "#22C55E", bgUrl: getBg(5) },
  { id: "black-panther-wakanda-forever", title: "Black Panther: Wakanda Forever", accent: "#38BDF8", bgUrl: getBg(0) },
  { id: "quantumania", title: "Ant-Man & Wasp: Quantumania", accent: "#A855F7", bgUrl: getBg(1) },
  { id: "guardians-vol-3", title: "Guardians Vol. 3", accent: "#C084FC", bgUrl: getBg(2) },
  { id: "secret-invasion", title: "Secret Invasion", accent: "#22C55E", bgUrl: getBg(3) },
  { id: "the-marvels", title: "The Marvels", accent: "#F97316", bgUrl: getBg(4) },
  { id: "daredevil", title: "Daredevil", accent: "#DC2626", bgUrl: getBg(5) },
  { id: "punisher", title: "The Punisher", accent: "#9CA3AF", bgUrl: getBg(0) },
  { id: "what-if", title: "What If...?", accent: "#3B82F6", bgUrl: getBg(1) },
  { id: "x-men-97", title: "X-Men '97", accent: "#EAB308", bgUrl: getBg(2) },
  { id: "deadpool-wolverine", title: "Deadpool & Wolverine", accent: "#DC2626", bgUrl: getBg(3) }
];
