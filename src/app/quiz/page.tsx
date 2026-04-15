"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════
//  QUESTION BANK — 18 questions, 5 picked randomly each game
// ═══════════════════════════════════════════════════════════
const QUESTION_BANK = [
  {
    id: "q01", scene: "CRITICAL MOMENT",
    text: "The bomb has 3 minutes. You can defuse it OR save one person. You choose...",
    options: [
      { text: "Defuse it. Save thousands over one.", character: "Iron Man", label: "PRAGMATIST" },
      { text: "Save the one. Every soul is irreplaceable.", character: "Captain America", label: "PROTECTOR" },
      { text: "Find a third option. There's always a third option.", character: "Doctor Strange", label: "VISIONARY" },
      { text: "Use the chaos to disappear.", character: "Loki", label: "OPPORTUNIST" },
    ],
  },
  {
    id: "q02", scene: "DEEPEST TRUTH",
    text: "What do people fundamentally misunderstand about you?",
    options: [
      { text: "That my armor is to protect me — it protects everyone else.", character: "Iron Man", label: "THE ARMOR" },
      { text: "That following the rules is weakness. It's the hardest discipline.", character: "Captain America", label: "THE CODE" },
      { text: "That I'm dangerous. I'm the only thing between you and real danger.", character: "Scarlet Witch", label: "THE SHIELD" },
      { text: "That I'm a villain. I'm just honest about the game.", character: "Loki", label: "THE TRUTH" },
    ],
  },
  {
    id: "q03", scene: "DEFINING MOMENT",
    text: "Your mentor betrayed everything you stood for. Your city is watching. You...",
    options: [
      { text: "Walk away. Some battles cost more than the win.", character: "Black Widow", label: "STRATEGIST" },
      { text: "Confront them publicly. Truth demands witnesses.", character: "Captain America", label: "RIGHTEOUS" },
      { text: "Build something so powerful it can never happen again.", character: "Iron Man", label: "ARCHITECT" },
      { text: "Wait. Patience is the sharpest weapon ever forged.", character: "Black Panther", label: "THE KING" },
    ],
  },
  {
    id: "q04", scene: "POWER PROTOCOL",
    text: "You wake up tomorrow with unstoppable power. Your first act is...",
    options: [
      { text: "Fix everything immediately. I've been waiting to do this.", character: "Scarlet Witch", label: "ABSOLUTE" },
      { text: "Understand it first. Power without control is catastrophe.", character: "Doctor Strange", label: "SCHOLAR" },
      { text: "Operate in the shadows. Invisible force wins.", character: "Black Widow", label: "PHANTOM" },
      { text: "Announce it. Let's see who's brave enough to challenge me.", character: "Thor", label: "THE GOD" },
    ],
  },
  {
    id: "q05", scene: "3AM FREQUENCY",
    text: "It's 3AM. You can't sleep. What won't leave your mind?",
    options: [
      { text: "The faces of people I couldn't reach in time.", character: "Spider-Man", label: "THE GUILT" },
      { text: "How to be faster, smarter, better. Always.", character: "Iron Man", label: "THE DRIVE" },
      { text: "The next three moves ahead of everyone else.", character: "Doctor Strange", label: "CALCULATION" },
      { text: "Nothing. I trained myself to turn it all off.", character: "Black Widow", label: "THE VOID" },
    ],
  },
  {
    id: "q06", scene: "TEAM BREAKDOWN",
    text: "Your team is fracturing at the worst moment. You're the only one who can save it. How?",
    options: [
      { text: "Lead by example. No speech — just action.", character: "Captain America", label: "THE ANCHOR" },
      { text: "Give each person a role precisely designed for them to succeed.", character: "Black Panther", label: "THE KING" },
      { text: "Manufacture a crisis that forces them to unite.", character: "Loki", label: "CATALYST" },
      { text: "Engineer a system that removes the human error.", character: "Iron Man", label: "THE ENGINEER" },
    ],
  },
  {
    id: "q07", scene: "MORAL BREAKING POINT",
    text: "One line crossed now saves a million lives. Do you cross it?",
    options: [
      { text: "No. The moment you cross lines, you become what you fight.", character: "Captain America", label: "THE WALL" },
      { text: "Yes. Morality is a luxury for people who don't carry the weight.", character: "Iron Man", label: "PRAGMATIST" },
      { text: "Yes — and I'll carry that alone so no one else has to.", character: "Black Widow", label: "MARTYR" },
      { text: "I change the rules so the line no longer exists.", character: "Scarlet Witch", label: "ABSOLUTE" },
    ],
  },
  {
    id: "q08", scene: "ORIGIN",
    text: "What actually forged you into who you are?",
    options: [
      { text: "Loss. Irreversible, shattering, formative loss.", character: "Spider-Man", label: "THE WOUND" },
      { text: "Rage that eventually became something useful.", character: "Hulk", label: "THE FIRE" },
      { text: "A moment I saw what the world really was. And rejected it.", character: "Black Widow", label: "AWAKENING" },
      { text: "Someone believed in me before I deserved it.", character: "Captain America", label: "THE GIFT" },
    ],
  },
  {
    id: "q09", scene: "FINAL STAND",
    text: "Outmatched, outgunned, exhausted. What happens next?",
    options: [
      { text: "I stand my ground. I can do this all day.", character: "Captain America", label: "THE WALL" },
      { text: "I improvise something they've never seen before.", character: "Iron Man", label: "INVENTOR" },
      { text: "I call lightning from the sky.", character: "Thor", label: "THE GOD" },
      { text: "I vanish. Then come at them from where they never imagined.", character: "Loki", label: "THE GHOST" },
    ],
  },
  {
    id: "q10", scene: "NON-NEGOTIABLE",
    text: "What is the single thing you would never let the world take from you?",
    options: [
      { text: "My principles. Take everything else.", character: "Captain America", label: "THE HONOR" },
      { text: "My mind. My intelligence built the life I live.", character: "Iron Man", label: "THE MIND" },
      { text: "My freedom. Cages are for those who accept them.", character: "Black Widow", label: "FREEDOM" },
      { text: "The people I would die for. Non-negotiable.", character: "Scarlet Witch", label: "THE LOVE" },
    ],
  },
  {
    id: "q11", scene: "ENEMY INTEL",
    text: "What do your enemies quietly respect about you?",
    options: [
      { text: "That I never, ever stop. Defeat doesn't register.", character: "Spider-Man", label: "THE RISE" },
      { text: "That I've already seen every move they're planning.", character: "Doctor Strange", label: "ORACLE" },
      { text: "That when I hit, it hits completely differently.", character: "Thor", label: "THUNDER" },
      { text: "That I know all their secrets before they've told anyone.", character: "Black Widow", label: "THE FILE" },
    ],
  },
  {
    id: "q12", scene: "STRIPPED",
    text: "Remove the powers, the suit, the title. Who actually are you?",
    options: [
      { text: "A kid from Brooklyn who never learned how to back down.", character: "Captain America", label: "THE SOUL" },
      { text: "A genius with trauma and a compulsion to control everything.", character: "Iron Man", label: "THE CORE" },
      { text: "Someone shaped by darkness who chose light anyway.", character: "Black Widow", label: "THE CHOICE" },
      { text: "Still figuring that out. That's the whole point.", character: "Spider-Man", label: "JOURNEY" },
    ],
  },
  {
    id: "q13", scene: "THE SACRIFICE",
    text: "Victory is certain. But it costs something irreplaceable. Do you pay?",
    options: [
      { text: "Yes. Whatever it takes.", character: "Black Widow", label: "THE COST" },
      { text: "I engineer a solution that removes the cost entirely.", character: "Iron Man", label: "THE ESCAPE" },
      { text: "This isn't my decision alone. We decide together.", character: "Captain America", label: "COUNCIL" },
      { text: "I've already seen the 14 million outcomes. I know which choice to make.", character: "Doctor Strange", label: "THE EYE" },
    ],
  },
  {
    id: "q14", scene: "OFF DUTY",
    text: "No missions, no enemies. Your perfect evening looks like...",
    options: [
      { text: "In the lab building something that doesn't exist yet.", character: "Iron Man", label: "CREATOR" },
      { text: "Rooftop view of the city. Me and silence.", character: "Spider-Man", label: "WITNESS" },
      { text: "With people I'd die for. No tomorrow, just tonight.", character: "Captain America", label: "ANCHOR" },
      { text: "Completely alone. Silence is the most honest thing.", character: "Black Widow", label: "SOLITUDE" },
    ],
  },
  {
    id: "q15", scene: "THE LEGACY",
    text: "A thousand years from now, what do they remember about you?",
    options: [
      { text: "That I changed what was possible for the species.", character: "Iron Man", label: "INVENTOR" },
      { text: "That when it truly mattered, I didn't run.", character: "Captain America", label: "SOLDIER" },
      { text: "That I loved so hard it literally broke reality.", character: "Scarlet Witch", label: "THE FORCE" },
      { text: "That I was the most compelling story ever told.", character: "Loki", label: "THE AUTHOR" },
    ],
  },
  {
    id: "q16", scene: "CHAOS PROTOCOL",
    text: "Civilization is collapsing. Old rules are gone. What's your move?",
    options: [
      { text: "Build the new order. Someone must — it might as well be me.", character: "Black Panther", label: "THE KING" },
      { text: "Protect whoever I can reach. One person at a time.", character: "Spider-Man", label: "GUARDIAN" },
      { text: "Find who benefits from the chaos. Eliminate them.", character: "Black Widow", label: "THE HUNTER" },
      { text: "Let it burn. What grows from ash will be stronger.", character: "Scarlet Witch", label: "PHOENIX" },
    ],
  },
  {
    id: "q17", scene: "THE WEIGHT",
    text: "What's the burden you carry that no one around you can see?",
    options: [
      { text: "Every mistake I made is someone else's tragedy.", character: "Spider-Man", label: "THE DEBT" },
      { text: "I know how bad things could get. I can't tell anyone.", character: "Doctor Strange", label: "THE SECRET" },
      { text: "The part of me capable of all this... terrifies even me.", character: "Scarlet Witch", label: "THE FEAR" },
      { text: "I've lost so much I'm not sure what I'm fighting for anymore.", character: "Thor", label: "THE LOSS" },
    ],
  },
  {
    id: "q18", scene: "ENDGAME",
    text: "It's finally over. You won. What's the first thing you say?",
    options: [
      { text: "I am Iron Man.", character: "Iron Man", label: "DECLARATION" },
      { text: "Was there ever any doubt?", character: "Thor", label: "CONFIDENCE" },
      { text: "We did this together.", character: "Captain America", label: "GRATITUDE" },
      { text: "...What comes next?", character: "Doctor Strange", label: "THE QUESTION" },
    ],
  },
];

// ═══════════════════════════════════════════════════════════
//  CHARACTER DATA
// ═══════════════════════════════════════════════════════════
const CHARACTER_DATA: Record<string, {
  color: string; title: string; faction: string; clearance: string;
  description: string; weakness: string; weapon: string; quote: string;
  power: number; cunning: number; heart: number;
}> = {
  "Iron Man": {
    color: "#06b6d4", title: "THE FUTURIST", faction: "AVENGERS", clearance: "LEVEL 7",
    description: "Underneath the armor is a mind that refuses to accept impossible. You see solutions before others recognize the problem exists. Your so-called arrogance is just confidence that hasn't been disproven yet — and it usually isn't.",
    weakness: "You care far more than you'll ever let anyone see.",
    weapon: "Your mind runs at a frequency others can't tune into.",
    quote: "I am Iron Man.",
    power: 85, cunning: 95, heart: 70,
  },
  "Captain America": {
    color: "#3B82F6", title: "THE SENTINEL", faction: "AVENGERS", clearance: "LEVEL 7",
    description: "You carry a standard that most people abandoned the moment they understood its cost. You aren't naive — you've seen the worst this world creates and chose integrity anyway. That's not idealism. That's the hardest form of strength.",
    weakness: "You hold everyone to the same standard you hold yourself.",
    weapon: "Your belief is contagious. People fight differently when you're watching.",
    quote: "I can do this all day.",
    power: 80, cunning: 70, heart: 99,
  },
  "Thor": {
    color: "#facc15", title: "THE ODINSON", faction: "ASGARDIAN CROWN", clearance: "ASGARDIAN",
    description: "You were born extraordinary and had to learn that isn't enough. Your greatest fights were never against armies. They were against your own arrogance, your grief, your capacity for evolution. You won all of them.",
    weakness: "You chronically underestimate what the people around you are capable of.",
    weapon: "When you embrace who you actually are — nothing in any realm can stop you.",
    quote: "I am the strongest Avenger.",
    power: 99, cunning: 50, heart: 82,
  },
  "Spider-Man": {
    color: "#ef4444", title: "THE FRIENDLY NEIGHBOR", faction: "STREET LEVEL", clearance: "UNCLASSIFIED",
    description: "The universe handed you extraordinary power and immediately tested whether you deserved it. You passed — at devastating personal cost. You keep showing up. That isn't heroism, it's something rarer: decency at scale.",
    weakness: "You blame yourself for things entirely outside your control.",
    weapon: "You make people feel like someone is genuinely on their side. That changes everything.",
    quote: "With great power comes great responsibility.",
    power: 70, cunning: 80, heart: 98,
  },
  "Scarlet Witch": {
    color: "#e11d48", title: "THE NEXUS BEING", faction: "AVENGERS", clearance: "OMEGA",
    description: "Your power comes from somewhere so human it's terrifying — grief, love, protection, rage. The most dangerous force in any reality isn't a weapon. It's someone who has nothing left to lose and everything to protect.",
    weakness: "The thing you love most is also the thing that controls you.",
    weapon: "You rewrite the rules. You can't fight someone who controls the game itself.",
    quote: "I am the Scarlet Witch. And I'm rewriting the rules.",
    power: 99, cunning: 85, heart: 92,
  },
  "Loki": {
    color: "#22c55e", title: "GOD OF STORIES", faction: "ASGARDIAN", clearance: "CLASSIFIED",
    description: "You are the most interesting person in any room. Chaos isn't your goal — it's your medium. Underneath every illusion is someone who just needed to know they mattered. You've been writing your redemption arc longer than you'll admit.",
    weakness: "You sabotage yourself right before you actually win.",
    weapon: "You make enemies doubt themselves. Doubt is more lethal than any blade.",
    quote: "I am burdened with glorious purpose.",
    power: 80, cunning: 99, heart: 58,
  },
  "Doctor Strange": {
    color: "#f97316", title: "SORCERER SUPREME", faction: "MASTERS OF MYSTIC ARTS", clearance: "SORCERER SUPREME",
    description: "You traded comfort for knowledge, knowledge for burden. You've seen how this ends — all 14 million versions — and chose the hardest one because it was the only one that worked. That isn't intelligence. That's sacrifice disguised as calculation.",
    weakness: "You forget that other people can't see what you've already seen.",
    weapon: "You've already solved it. You're waiting for everyone else to catch up.",
    quote: "Dormammu, I've come to bargain.",
    power: 90, cunning: 95, heart: 74,
  },
  "Black Widow": {
    color: "#a855f7", title: "THE OPERATIVE", faction: "S.H.I.E.L.D.", clearance: "EYES ONLY",
    description: "You learned early the world isn't safe and decided to become the most dangerous thing in it instead. Every skill you have was forged in rooms most people never survive. Your softness — when you let it show — is more disarming than all of it.",
    weakness: "You find it nearly impossible to ask for help.",
    weapon: "You know exactly what people are about to do before they decide it.",
    quote: "Whatever it takes.",
    power: 74, cunning: 97, heart: 80,
  },
  "Black Panther": {
    color: "#c4b5fd", title: "KING OF WAKANDA", faction: "WAKANDA", clearance: "SOVEREIGN",
    description: "You rule with intellect and honor at the same time — which is rarer than any superpower. You carry the weight of your nation, your ancestors, your future simultaneously. Every decision ripples forward through generations.",
    weakness: "Duty sometimes blinds you to what you personally need.",
    weapon: "You're the king in any room — even when no one knows it yet.",
    quote: "Wakanda forever.",
    power: 84, cunning: 90, heart: 90,
  },
  "Hulk": {
    color: "#84cc16", title: "THE STRONGEST AVENGER", faction: "AVENGERS", clearance: "LEVEL 5",
    description: "You contain multitudes — literally. The rage was never the problem. The problem was learning what to direct it toward. You're living proof that unimaginable power and fragile humanity can coexist. Barely. But they can.",
    weakness: "You believe you don't deserve the quiet moments.",
    weapon: "When you're furious about the right things, nothing on Earth can stop you.",
    quote: "Hulk... smash.",
    power: 99, cunning: 40, heart: 75,
  },
};

// ═══════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const OPTION_LABELS = ["A", "B", "C", "D"];

// ═══════════════════════════════════════════════════════════
//  STAT BAR
// ═══════════════════════════════════════════════════════════
const StatBar = ({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between">
      <span className="text-[0.55rem] uppercase tracking-[0.35em] text-white/40 font-mono">{label}</span>
      <span className="text-[0.55rem] font-mono font-bold tabular-nums" style={{ color }}>{value}</span>
    </div>
    <div className="h-px bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════
//  CHARACTER SVG LOGOS
// ═══════════════════════════════════════════════════════════
interface LogoProps { color: string; }

const p = (delay: number, duration = 1.4) => ({
  initial: { pathLength: 0, opacity: 0 } as const,
  animate: { pathLength: 1, opacity: 1 } as const,
  transition: { pathLength: { duration, delay, ease: "easeInOut" as const }, opacity: { duration: 0.3, delay } },
});

const ArcReactorLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.circle cx="50" cy="50" r="43" stroke={color} strokeWidth="0.8" strokeDasharray="4 3" {...p(0, 2)} />
    <motion.circle cx="50" cy="50" r="32" stroke={color} strokeWidth="1.5" {...p(0.4)} />
    <motion.polygon points="50,22 72,57 28,57" stroke={color} strokeWidth="1.5" {...p(0.8, 1)} />
    <motion.circle cx="50" cy="50" r="13" stroke={color} strokeWidth="1.5" {...p(1.2, 0.8)} />
    <motion.circle cx="50" cy="50" r="4" fill={color}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.9] }}
      transition={{ delay: 1.8, duration: 0.6 }}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    />
  </svg>
);

const ShieldLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.circle cx="50" cy="50" r="43" stroke={color} strokeWidth="2.5" {...p(0, 2)} />
    <motion.circle cx="50" cy="50" r="32" stroke="#ccc" strokeWidth="2" {...p(0.4)} />
    <motion.circle cx="50" cy="50" r="20" stroke={color} strokeWidth="2.5" {...p(0.7, 1.1)} />
    <motion.polygon
      points="50,35 52.9,44 62.6,44 55,49.7 57.9,58.7 50,53.1 42.1,58.7 45,49.7 37.4,44 47.1,44"
      stroke="white" strokeWidth="1" fill={color}
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      style={{ transformOrigin: "50px 47px" }}
    />
  </svg>
);

const MjolnirLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.circle cx="50" cy="52" r="43" stroke={color} strokeWidth="0.6" strokeDasharray="3 5" {...p(0, 2)} />
    <motion.rect x="26" y="18" width="48" height="30" rx="4" stroke={color} strokeWidth="2" {...p(0.2, 1.5)} />
    <motion.rect x="43" y="48" width="14" height="28" rx="3" stroke={color} strokeWidth="1.5" {...p(0.7, 1)} />
    <motion.line x1="41" y1="59" x2="59" y2="59" stroke={color} strokeWidth="1.2" {...p(1, 0.4)} />
    <motion.line x1="41" y1="67" x2="59" y2="67" stroke={color} strokeWidth="1.2" {...p(1.1, 0.4)} />
    <motion.path d="M44,18 L37,4 L50,12 L43,0" stroke={color} strokeWidth="1.8" {...p(1.4, 0.8)} />
  </svg>
);

const WebLogo = ({ color }: LogoProps) => {
  const R = 42;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI * 2) / 8 - Math.PI / 2;
        return (
          <motion.line key={i} x1="50" y1="50" x2={50 + R * Math.cos(a)} y2={50 + R * Math.sin(a)}
            stroke={color} strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease: "easeOut" }}
          />
        );
      })}
      {[14, 24, 34].map((r, i) => (
        <motion.circle key={i} cx="50" cy="50" r={r} stroke={color} strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.25, ease: "easeInOut" }}
        />
      ))}
      <motion.circle cx="50" cy="50" r={R} stroke={color} strokeWidth="1.5" {...p(1.4, 1)} />
      <motion.circle cx="50" cy="50" r="4" fill={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9 }} />
    </svg>
  );
};

const ChaosHexLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.circle cx="50" cy="50" r="44" stroke={color} strokeWidth="0.8" strokeDasharray="2 4" {...p(0, 2)} />
    <motion.polygon points="50,10 83,30 83,70 50,90 17,70 17,30" stroke={color} strokeWidth="1.5" {...p(0.3)} />
    <motion.polygon points="50,22 76,37 76,63 50,78 24,63 24,37" stroke={color} strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0, rotate: 30 }} animate={{ pathLength: 1, opacity: 0.6, rotate: 30 }}
      style={{ transformOrigin: "50px 50px" }}
      transition={{ pathLength: { duration: 1.3, delay: 0.6, ease: "easeInOut" }, opacity: { duration: 0.3, delay: 0.6 } }}
    />
    {[...Array(6)].map((_, i) => {
      const a = (i * Math.PI * 2) / 6 - Math.PI / 2;
      return (
        <motion.line key={i} x1="50" y1="50" x2={50 + 44 * Math.cos(a)} y2={50 + 44 * Math.sin(a)}
          stroke={color} strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 0.6, delay: 1 + i * 0.08 }}
        />
      );
    })}
    <motion.circle cx="50" cy="50" r="6" fill={color} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 }}
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
    />
  </svg>
);

const LokiLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.path d="M50,44 C50,44 36,36 22,16 C18,9 23,3 29,9 C35,15 41,30 50,44" stroke={color} strokeWidth="2.5" {...p(0, 1.4)} />
    <motion.path d="M50,44 C50,44 64,36 78,16 C82,9 77,3 71,9 C65,15 59,30 50,44" stroke={color} strokeWidth="2.5" {...p(0.2, 1.4)} />
    <motion.path d="M32,56 Q50,43 68,56 L63,76 Q50,86 37,76 Z" stroke={color} strokeWidth="1.5" {...p(0.8, 1.1)} />
    <motion.polygon points="50,52 57,61 50,70 43,61" stroke={color} strokeWidth="1.5" {...p(1.3, 0.7)} />
    <motion.circle cx="50" cy="56" r="42" stroke={color} strokeWidth="0.6" strokeDasharray="3 5" {...p(1.6)} />
  </svg>
);

const EyeOfAgamottoLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    {[...Array(12)].map((_, i) => {
      const a = (i * Math.PI * 2) / 12;
      return (
        <motion.line key={i} x1={50 + 22 * Math.cos(a)} y1={50 + 22 * Math.sin(a)}
          x2={50 + 40 * Math.cos(a)} y2={50 + 40 * Math.sin(a)}
          stroke={color} strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        />
      );
    })}
    <motion.circle cx="50" cy="50" r="43" stroke={color} strokeWidth="1.5" {...p(0.5, 1.8)} />
    <motion.circle cx="50" cy="50" r="22" stroke={color} strokeWidth="1" {...p(0.8, 1.1)} />
    <motion.path d="M20,50 Q50,24 80,50 Q50,76 20,50 Z" stroke={color} strokeWidth="2.5" {...p(1.2, 1.1)} />
    <motion.circle cx="50" cy="50" r="9" stroke={color} strokeWidth="1.5" {...p(1.6, 0.7)} />
    <motion.circle cx="50" cy="50" r="3" fill={color} initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 1] }} transition={{ delay: 2 }}
      style={{ filter: `drop-shadow(0 0 6px ${color})` }}
    />
  </svg>
);

const HourglassLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.ellipse cx="50" cy="50" rx="36" ry="43" stroke={color} strokeWidth="1.5" {...p(0, 1.8)} />
    <motion.path d="M20,18 L80,18 L50,50 L20,18" stroke={color} strokeWidth="1.5" {...p(0.4, 1.1)} />
    <motion.path d="M20,82 L80,82 L50,50 L20,82" stroke={color} strokeWidth="1.5" {...p(0.7, 1.1)} />
    <motion.line x1="18" y1="50" x2="82" y2="50" stroke={color} strokeWidth="0.8" {...p(1.2, 0.5)} />
    <motion.circle cx="50" cy="50" r="3.5" fill={color}
      animate={{ y: [-8, 8], opacity: [1, 0.4, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      style={{ filter: `drop-shadow(0 0 5px ${color})` }}
    />
  </svg>
);

const PantherClawLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.circle cx="50" cy="50" r="43" stroke={color} strokeWidth="1" strokeDasharray="5 3" {...p(0, 1.8)} />
    <motion.path d="M28,25 Q42,46 38,76" stroke={color} strokeWidth="3" strokeLinejoin="round" {...p(0.3, 1.1)} />
    <motion.path d="M41,20 Q50,43 47,80" stroke={color} strokeWidth="3" strokeLinejoin="round" {...p(0.5, 1.1)} />
    <motion.path d="M59,20 Q50,43 53,80" stroke={color} strokeWidth="3" strokeLinejoin="round" {...p(0.7, 1.1)} />
    <motion.path d="M72,25 Q58,46 62,76" stroke={color} strokeWidth="3" strokeLinejoin="round" {...p(0.9, 1.1)} />
    <motion.circle cx="50" cy="50" r="17" stroke={color} strokeWidth="1" {...p(1.4, 0.9)} />
  </svg>
);

const GammaAtomLogo = ({ color }: LogoProps) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round">
    <motion.ellipse cx="50" cy="50" rx="44" ry="15" stroke={color} strokeWidth="1.5" {...p(0, 1.5)} />
    <motion.ellipse cx="50" cy="50" rx="44" ry="15" stroke={color} strokeWidth="1.5"
      transform="rotate(60 50 50)" {...p(0.3, 1.5)} />
    <motion.ellipse cx="50" cy="50" rx="44" ry="15" stroke={color} strokeWidth="1.5"
      transform="rotate(120 50 50)" {...p(0.6, 1.5)} />
    <motion.circle cx="50" cy="50" r="8" fill={color}
      initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ delay: 1.2, duration: 0.5 }}
      style={{ filter: `drop-shadow(0 0 10px ${color})` }}
    />
    {[1, 1.8, 2.6].map((s, i) => (
      <motion.circle key={i} cx="50" cy="50" r="8" stroke={color} strokeWidth="1" fill="none"
        initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: [1, s * 1.5, s * 3], opacity: [0.8, 0.3, 0] }}
        transition={{ delay: 1.5 + i * 0.2, duration: 1.5, repeat: Infinity }}
      />
    ))}
  </svg>
);

const CharacterLogo = ({ character, color }: { character: string; color: string }) => {
  switch (character) {
    case "Iron Man":        return <ArcReactorLogo color={color} />;
    case "Captain America": return <ShieldLogo color={color} />;
    case "Thor":            return <MjolnirLogo color={color} />;
    case "Spider-Man":      return <WebLogo color={color} />;
    case "Scarlet Witch":   return <ChaosHexLogo color={color} />;
    case "Loki":            return <LokiLogo color={color} />;
    case "Doctor Strange":  return <EyeOfAgamottoLogo color={color} />;
    case "Black Widow":     return <HourglassLogo color={color} />;
    case "Black Panther":   return <PantherClawLogo color={color} />;
    case "Hulk":            return <GammaAtomLogo color={color} />;
    default:                return <ArcReactorLogo color={color} />;
  }
};

// ═══════════════════════════════════════════════════════════
//  MAIN QUIZ COMPONENT
// ═══════════════════════════════════════════════════════════
export default function QuizPage() {
  const [sessionQuestions] = useState<typeof QUESTION_BANK>(() =>
    shuffle(QUESTION_BANK).slice(0, 5)
  );
  const [step, setStep] = useState<number>(-1);          // -1 = intro
  const [answers, setAnswers] = useState<string[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const [newQuestions, setNewQuestions] = useState<typeof QUESTION_BANK>(sessionQuestions);

  const currentQ = newQuestions[step] || null;
  const hoveredColor = (currentQ && hoveredIdx !== null)
    ? (CHARACTER_DATA[currentQ.options[hoveredIdx].character]?.color ?? null)
    : null;

  const getResult = useCallback((): string => {
    const counts: Record<string, number> = {};
    answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
    if (!Object.keys(counts).length) return "Iron Man";
    return Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0];
  }, [answers]);

  const handleSelect = useCallback((idx: number) => {
    if (selectedIdx !== null || !currentQ) return;
    const opt = currentQ.options[idx];
    const charData = CHARACTER_DATA[opt.character];
    const color = charData?.color ?? "#ffffff";

    setSelectedIdx(idx);
    setFlashColor(color);

    setTimeout(() => {
      setAnswers(prev => [...prev, opt.character]);
      setStep(prev => prev + 1);
      setSelectedIdx(null);
      setHoveredIdx(null);
      setFlashColor(null);
    }, 750);
  }, [selectedIdx, currentQ]);

  const restart = () => {
    setNewQuestions(shuffle(QUESTION_BANK).slice(0, 5));
    setAnswers([]);
    setStep(-1);
    setSelectedIdx(null);
    setHoveredIdx(null);
    setFlashColor(null);
  };

  const resultChar = step >= newQuestions.length ? getResult() : null;
  const resultData = resultChar ? CHARACTER_DATA[resultChar] : null;
  const resultColor = resultChar
    ? (CHARACTER_DATA[resultChar]?.color ?? "#ffffff")
    : "#ffffff";
  const progress = step >= 0 ? (step / newQuestions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#030303] text-white relative overflow-hidden flex flex-col">

      {/* ── AMBIENT BACKGROUND ─────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.015) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.01) 0%, transparent 40%)"
        }} />
        <motion.div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(#ffffff 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }}
          animate={{ y: [0, -32] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at center, transparent 40%, #030303 100%)" }} />
      </div>

      {/* ── HOVER COLOR AMBIENT ─────────────────────────── */}
      <AnimatePresence>
        {hoveredColor && (
          <motion.div key={hoveredColor} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 110%, ${hoveredColor}18 0%, transparent 55%)` }}
          />
        )}
      </AnimatePresence>

      {/* ── FLASH FX ─────────────────────────────────────── */}
      <AnimatePresence>
        {flashColor && (
          <motion.div key="flash"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.55, 0] }} exit={{ opacity: 0 }}
            transition={{ duration: 0.75, times: [0, 0.25, 1] }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{ backgroundColor: flashColor }}
          />
        )}
      </AnimatePresence>

      {/* ── PROGRESS BAR ─────────────────────────────────── */}
      {step >= 0 && step < newQuestions.length && (
        <div className="fixed top-0 left-0 right-0 h-[2px] z-40 bg-white/[0.04]">
          <motion.div className="h-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ backgroundColor: currentQ ? CHARACTER_DATA[currentQ.options[0].character]?.color ?? "#fff" : "#fff" }}
          />
        </div>
      )}

      {/* ── MAIN CONTENT ───────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-4xl mx-auto px-5 sm:px-10 md:px-16 py-24 min-h-screen">
        <AnimatePresence mode="wait">

          {/* ═══ INTRO ═══ */}
          {step === -1 && (
            <motion.div key="intro"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -30, filter: "blur(20px)" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center text-center gap-12"
            >
              {/* Scanning ring */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-white/10 border-dashed" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 rounded-full border-t-2 border-l border-white/30 border-r-transparent border-b-transparent" />
                <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-white/60 blur-[6px]" />
                <div className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" />
              </div>

              <div className="space-y-4">
                <p className="text-[0.6rem] uppercase tracking-[0.8em] text-white/30 font-mono">S.H.I.E.L.D. · Psychological Evaluation Unit</p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-white leading-none tracking-tight">
                  Identity Unknown
                </h1>
                <p className="text-sm sm:text-base text-white/40 font-sans font-light max-w-sm mx-auto leading-relaxed">
                  Five questions. No right answers. Your archetype will be decoded from what you choose instinctively.
                </p>
              </div>

              <div className="space-y-3 w-full max-w-xs">
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(0)}
                  className="w-full py-4 bg-white text-black font-sans text-[0.7rem] uppercase tracking-[0.35em] font-bold hover:bg-white/90 transition-all rounded-none"
                >
                  Begin Evaluation →
                </motion.button>
                <p className="text-[0.55rem] text-white/20 uppercase tracking-[0.3em] font-mono text-center">
                  Each session is unique · Questions randomize every game
                </p>
              </div>
            </motion.div>
          )}

          {/* ═══ QUESTION ═══ */}
          {step >= 0 && currentQ && step < newQuestions.length && (
            <motion.div key={`q-${step}`}
              initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-10 sm:gap-14 w-full"
            >
              {/* Scene header */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[0.55rem] uppercase tracking-[0.6em] text-white/30 font-mono shrink-0">
                  {currentQ.scene} · {String(step + 1).padStart(2, "0")}/{newQuestions.length}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Question text */}
              <div className="relative">
                {/* Big faded step number */}
                <div className="absolute -top-6 left-0 text-[6rem] sm:text-[10rem] font-serif text-white/[0.03] leading-none select-none pointer-events-none font-bold">
                  {String(step + 1).padStart(2, "0")}
                </div>
                <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-[1.15] max-w-2xl">
                  {currentQ.text.split(" ").map((word, wi) => (
                    <span key={wi} className="inline-block mr-[0.22em]">
                      {word.split("").map((c, ci) => (
                        <motion.span key={ci} initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          transition={{ delay: 0.05 + (wi * 0.07) + (ci * 0.012), duration: 0.4 }}
                          className="inline-block"
                        >{c}</motion.span>
                      ))}
                    </span>
                  ))}
                </h2>
              </div>

              {/* Options — horizontal strips */}
              <div className="flex flex-col gap-0 border border-white/[0.06] overflow-hidden rounded-sm">
                {currentQ.options.map((opt, i) => {
                  const charData = CHARACTER_DATA[opt.character];
                  const color = charData?.color ?? "#ffffff";
                  const isHov = hoveredIdx === i;
                  const isSel = selectedIdx === i;
                  const isDim = selectedIdx !== null && selectedIdx !== i;

                  return (
                    <motion.button key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: isDim ? 0.15 : 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      onHoverStart={() => setHoveredIdx(i)}
                      onHoverEnd={() => setHoveredIdx(null)}
                      onClick={() => handleSelect(i)}
                      disabled={selectedIdx !== null}
                      className="relative w-full text-left flex items-stretch border-b border-white/[0.06] last:border-b-0 overflow-hidden select-none cursor-pointer group"
                      style={{ minHeight: 72 }}
                    >
                      {/* Hover fill */}
                      <motion.div className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: isSel ? 1 : isHov ? 0.9 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ background: `linear-gradient(90deg, ${color}22 0%, ${color}08 60%, transparent 100%)` }}
                      />

                      {/* Left accent bar */}
                      <motion.div className="absolute left-0 top-0 h-full w-[3px] pointer-events-none"
                        animate={{ opacity: isHov || isSel ? 1 : 0, backgroundColor: color }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Letter badge */}
                      <div className="shrink-0 flex items-center justify-center w-12 sm:w-16 border-r border-white/[0.06]">
                        <motion.span
                          className="text-xs sm:text-sm font-mono font-bold transition-all duration-200"
                          animate={{ color: isHov || isSel ? color : "rgba(255,255,255,0.2)" }}
                        >
                          {OPTION_LABELS[i]}
                        </motion.span>
                      </div>

                      {/* Option text */}
                      <div className="flex-1 flex items-center px-4 sm:px-6 py-5">
                        <motion.p
                          className="font-sans font-light text-sm sm:text-base leading-snug transition-colors duration-200"
                          animate={{ color: isHov || isSel ? "#ffffff" : "rgba(255,255,255,0.55)" }}
                        >
                          {opt.text}
                        </motion.p>
                      </div>

                      {/* Right label */}
                      <div className="shrink-0 hidden sm:flex items-center justify-end px-5 w-36">
                        <motion.span
                          className="text-[0.5rem] uppercase tracking-[0.35em] font-mono font-bold transition-colors duration-200"
                          animate={{ color: isHov || isSel ? color : "rgba(255,255,255,0.15)" }}
                        >
                          {opt.label}
                        </motion.span>
                      </div>

                      {/* Selected check */}
                      <AnimatePresence>
                        {isSel && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[0.65rem] font-bold text-black"
                            style={{ backgroundColor: color }}
                          >
                            ✓
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              {/* Step dots */}
              <div className="flex items-center justify-center gap-2">
                {newQuestions.map((_, i) => (
                  <motion.div key={i}
                    animate={{
                      width: i === step ? 20 : 6,
                      backgroundColor: i < step ? "#ffffff" : i === step ? (currentQ.options[0] ? (CHARACTER_DATA[currentQ.options[0].character]?.color ?? "#ffffff") : "#fff") : "rgba(255,255,255,0.1)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="h-1 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══ RESULT — CINEMATIC ═══ */}
          {step >= newQuestions.length && resultData && resultChar && (
            <motion.div key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center w-full min-h-[80vh] justify-center gap-0 py-8"
            >
              {/* Fixed ambient glow */}
              <div className="fixed inset-0 pointer-events-none z-0"
                style={{ background: `radial-gradient(ellipse at 50% 55%, ${resultColor}15 0%, transparent 60%)` }} />

              {/* ── IDENTITY LABEL ── */}
              <motion.div
                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="flex items-center gap-4 mb-6 z-10"
              >
                <div className="h-px w-8 bg-white/15" />
                <span className="text-[0.5rem] uppercase tracking-[0.7em] font-mono text-white/25">Identity Protocol Complete</span>
                <div className="h-px w-8 bg-white/15" />
              </motion.div>

              {/* ── YOU ARE ── */}
              <div className="overflow-hidden z-10 mb-1">
                <motion.p
                  initial={{ y: "100%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[0.55rem] uppercase tracking-[0.7em] font-mono font-bold text-center"
                  style={{ color: resultColor }}
                >
                  You Are
                </motion.p>
              </div>

              {/* ── CHARACTER NAME ── */}
              <div className="overflow-hidden z-10 mb-2">
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[2.6rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem] font-serif uppercase tracking-tight leading-none text-center"
                  style={{
                    background: `linear-gradient(125deg, #ffffff 30%, ${resultColor} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {resultChar}
                </motion.h1>
              </div>

              {/* ── TITLE + BADGES ── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-10 z-10"
              >
                <span className="text-[0.55rem] uppercase tracking-[0.4em] font-mono px-2.5 py-1 border"
                  style={{ color: resultColor, borderColor: `${resultColor}40`, backgroundColor: `${resultColor}10` }}
                >
                  {resultData.clearance}
                </span>
                <span className="text-[0.55rem] uppercase tracking-[0.4em] font-mono text-white/25">·</span>
                <span className="text-[0.55rem] uppercase tracking-[0.4em] font-mono text-white/35">{resultData.faction}</span>
              </motion.div>

              {/* ── ANIMATED LOGO ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mb-10"
                style={{ width: 180, height: 180 }}
              >
                {/* Outer glow ring pulse */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.12, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ backgroundColor: resultColor, filter: "blur(28px)" }}
                />
                {/* Orbiting particle 1 */}
                <motion.div
                  className="absolute w-2 h-2 rounded-full top-1/2 left-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "-72px 0px", backgroundColor: resultColor, filter: `drop-shadow(0 0 6px ${resultColor})` }}
                />
                {/* Orbiting particle 2 */}
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full top-1/2 left-1/2"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "-90px 0px", backgroundColor: `${resultColor}80`, filter: `drop-shadow(0 0 4px ${resultColor})` }}
                />
                {/* SVG logo */}
                <div className="absolute inset-4 z-10">
                  <CharacterLogo character={resultChar} color={resultColor} />
                </div>
              </motion.div>

              {/* ── STAT PILLS ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.7 }}
                className="flex items-center gap-3 sm:gap-6 mb-8 z-10"
              >
                {[
                  { label: "Power", value: resultData.power },
                  { label: "Cunning", value: resultData.cunning },
                  { label: "Heart", value: resultData.heart },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <span className="text-[0.5rem] uppercase tracking-[0.4em] font-mono text-white/30">{label}</span>
                    <div className="w-14 sm:w-20 h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1.5, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{ backgroundColor: resultColor, boxShadow: `0 0 6px ${resultColor}` }}
                      />
                    </div>
                    <span className="text-[0.6rem] font-mono font-bold tabular-nums" style={{ color: resultColor }}>{value}</span>
                  </div>
                ))}
              </motion.div>

              {/* ── ICONIC QUOTE ── */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 1 }}
                className="z-10 mb-10 text-center px-4"
              >
                <p className="font-serif italic text-base sm:text-xl md:text-2xl text-white/50" style={{ letterSpacing: "0.02em" }}>
                  &ldquo;{resultData.quote}&rdquo;
                </p>
              </motion.div>

              {/* ── CTAs ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-sm z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${resultColor}60` }}
                  whileTap={{ scale: 0.96 }}
                  onClick={restart}
                  className="flex-1 py-4 font-sans text-[0.6rem] uppercase tracking-[0.35em] font-bold text-black transition-all"
                  style={{ backgroundColor: resultColor }}
                >
                  New Session
                </motion.button>
                <motion.a href="/"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="flex-1 py-4 text-center border border-white/10 bg-white/[0.03] text-white font-sans text-[0.6rem] uppercase tracking-[0.35em] font-bold hover:bg-white/[0.07] transition-all"
                >
                  The Lab →
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
