import React from 'react';
import {
  Crown,
  Gem,
  Sparkles,
  Flame,
  Star,
  Heart,
  Moon,
  Zap,
  Trophy,
  Compass,
  Shield,
  Key,
  Fish,
  Bird,
  Bug,
  Flower2,
  TreePine,
  Sun,
  CloudRain,
  Mountain,
  Leaf,
  Feather,
  Rabbit,
  Cat,
  Gamepad2,
  Rocket,
  Bot,
  Cpu,
  Radio,
  Disc,
  Swords,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Ghost,
  Coffee,
  Apple,
  Pizza,
  Cookie,
  IceCream,
  Cherry,
  Cake,
  Citrus,
  Carrot,
  CupSoda,
  Sandwich,
  Popcorn,
  LucideIcon,
} from 'lucide-react';
import { CardItem, Difficulty, DifficultyConfig, ThemeConfig, ThemeId } from '../types';

export const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
  easy: {
    id: 'easy',
    label: 'Easy',
    sublabel: '4 × 3 · 6 Pairs',
    cols: 4,
    rows: 3,
    totalCards: 12,
    pairs: 6,
    starThresholds: {
      threeStars: 9,  // <= 9 moves
      twoStars: 14,   // <= 14 moves
    },
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    sublabel: '4 × 4 · 8 Pairs',
    cols: 4,
    rows: 4,
    totalCards: 16,
    pairs: 8,
    starThresholds: {
      threeStars: 13, // <= 13 moves
      twoStars: 19,   // <= 19 moves
    },
  },
  hard: {
    id: 'hard',
    label: 'Hard',
    sublabel: '6 × 4 · 12 Pairs',
    cols: 6,
    rows: 4,
    totalCards: 24,
    pairs: 12,
    starThresholds: {
      threeStars: 20, // <= 20 moves
      twoStars: 30,   // <= 30 moves
    },
  },
};

export const THEMES: ThemeConfig[] = [
  {
    id: 'gems',
    name: 'Gems & Mystic',
    description: 'Sparkling treasures and elemental artifacts',
  },
  {
    id: 'nature',
    name: 'Wild & Nature',
    description: 'Animals, flora and outdoor elements',
  },
  {
    id: 'arcade',
    name: 'Cyber & Arcade',
    description: 'Retro tech, games, and futuristic gadgets',
  },
  {
    id: 'food',
    name: 'Bistro & Treats',
    description: 'Sweet pastries, snacks and tasty refreshments',
  },
];

interface CardDefinition {
  icon: LucideIcon;
  label: string;
  color: string;
  accentBg: string;
  borderColor: string;
}

const THEME_CARDS: Record<ThemeId, CardDefinition[]> = {
  gems: [
    { icon: Crown, label: 'Crown', color: 'text-amber-400', accentBg: 'bg-amber-500/15', borderColor: 'border-amber-500/30' },
    { icon: Gem, label: 'Gem', color: 'text-cyan-400', accentBg: 'bg-cyan-500/15', borderColor: 'border-cyan-500/30' },
    { icon: Sparkles, label: 'Sparkles', color: 'text-purple-400', accentBg: 'bg-purple-500/15', borderColor: 'border-purple-500/30' },
    { icon: Flame, label: 'Flame', color: 'text-orange-400', accentBg: 'bg-orange-500/15', borderColor: 'border-orange-500/30' },
    { icon: Star, label: 'Star', color: 'text-yellow-400', accentBg: 'bg-yellow-500/15', borderColor: 'border-yellow-500/30' },
    { icon: Heart, label: 'Heart', color: 'text-rose-400', accentBg: 'bg-rose-500/15', borderColor: 'border-rose-500/30' },
    { icon: Moon, label: 'Moon', color: 'text-indigo-400', accentBg: 'bg-indigo-500/15', borderColor: 'border-indigo-500/30' },
    { icon: Zap, label: 'Lightning', color: 'text-emerald-400', accentBg: 'bg-emerald-500/15', borderColor: 'border-emerald-500/30' },
    { icon: Trophy, label: 'Trophy', color: 'text-amber-300', accentBg: 'bg-amber-400/15', borderColor: 'border-amber-400/30' },
    { icon: Compass, label: 'Compass', color: 'text-teal-400', accentBg: 'bg-teal-500/15', borderColor: 'border-teal-500/30' },
    { icon: Shield, label: 'Shield', color: 'text-blue-400', accentBg: 'bg-blue-500/15', borderColor: 'border-blue-500/30' },
    { icon: Key, label: 'Key', color: 'text-violet-400', accentBg: 'bg-violet-500/15', borderColor: 'border-violet-500/30' },
  ],
  nature: [
    { icon: Sun, label: 'Sun', color: 'text-amber-400', accentBg: 'bg-amber-500/15', borderColor: 'border-amber-500/30' },
    { icon: Leaf, label: 'Leaf', color: 'text-emerald-400', accentBg: 'bg-emerald-500/15', borderColor: 'border-emerald-500/30' },
    { icon: Fish, label: 'Fish', color: 'text-cyan-400', accentBg: 'bg-cyan-500/15', borderColor: 'border-cyan-500/30' },
    { icon: Bird, label: 'Bird', color: 'text-sky-400', accentBg: 'bg-sky-500/15', borderColor: 'border-sky-500/30' },
    { icon: Flower2, label: 'Flower', color: 'text-pink-400', accentBg: 'bg-pink-500/15', borderColor: 'border-pink-500/30' },
    { icon: TreePine, label: 'Pine Tree', color: 'text-teal-400', accentBg: 'bg-teal-500/15', borderColor: 'border-teal-500/30' },
    { icon: Mountain, label: 'Mountain', color: 'text-slate-300', accentBg: 'bg-slate-500/15', borderColor: 'border-slate-500/30' },
    { icon: CloudRain, label: 'Rain Cloud', color: 'text-blue-400', accentBg: 'bg-blue-500/15', borderColor: 'border-blue-500/30' },
    { icon: Feather, label: 'Feather', color: 'text-purple-400', accentBg: 'bg-purple-500/15', borderColor: 'border-purple-500/30' },
    { icon: Rabbit, label: 'Rabbit', color: 'text-rose-400', accentBg: 'bg-rose-500/15', borderColor: 'border-rose-500/30' },
    { icon: Cat, label: 'Cat', color: 'text-orange-400', accentBg: 'bg-orange-500/15', borderColor: 'border-orange-500/30' },
    { icon: Bug, label: 'Bug', color: 'text-lime-400', accentBg: 'bg-lime-500/15', borderColor: 'border-lime-500/30' },
  ],
  arcade: [
    { icon: Gamepad2, label: 'Gamepad', color: 'text-purple-400', accentBg: 'bg-purple-500/15', borderColor: 'border-purple-500/30' },
    { icon: Rocket, label: 'Rocket', color: 'text-red-400', accentBg: 'bg-red-500/15', borderColor: 'border-red-500/30' },
    { icon: Bot, label: 'Robot', color: 'text-cyan-400', accentBg: 'bg-cyan-500/15', borderColor: 'border-cyan-500/30' },
    { icon: Cpu, label: 'Processor', color: 'text-emerald-400', accentBg: 'bg-emerald-500/15', borderColor: 'border-emerald-500/30' },
    { icon: Radio, label: 'Radio', color: 'text-amber-400', accentBg: 'bg-amber-500/15', borderColor: 'border-amber-500/30' },
    { icon: Disc, label: 'Disc', color: 'text-blue-400', accentBg: 'bg-blue-500/15', borderColor: 'border-blue-500/30' },
    { icon: Swords, label: 'Swords', color: 'text-rose-400', accentBg: 'bg-rose-500/15', borderColor: 'border-rose-500/30' },
    { icon: Laptop, label: 'Laptop', color: 'text-indigo-400', accentBg: 'bg-indigo-500/15', borderColor: 'border-indigo-500/30' },
    { icon: Headphones, label: 'Headphones', color: 'text-teal-400', accentBg: 'bg-teal-500/15', borderColor: 'border-teal-500/30' },
    { icon: Camera, label: 'Camera', color: 'text-orange-400', accentBg: 'bg-orange-500/15', borderColor: 'border-orange-500/30' },
    { icon: Watch, label: 'Watch', color: 'text-yellow-400', accentBg: 'bg-yellow-500/15', borderColor: 'border-yellow-500/30' },
    { icon: Ghost, label: 'Ghost', color: 'text-pink-400', accentBg: 'bg-pink-500/15', borderColor: 'border-pink-500/30' },
  ],
  food: [
    { icon: Coffee, label: 'Coffee', color: 'text-amber-400', accentBg: 'bg-amber-500/15', borderColor: 'border-amber-500/30' },
    { icon: Apple, label: 'Apple', color: 'text-red-400', accentBg: 'bg-red-500/15', borderColor: 'border-red-500/30' },
    { icon: Pizza, label: 'Pizza', color: 'text-orange-400', accentBg: 'bg-orange-500/15', borderColor: 'border-orange-500/30' },
    { icon: Cookie, label: 'Cookie', color: 'text-amber-500', accentBg: 'bg-amber-600/15', borderColor: 'border-amber-600/30' },
    { icon: IceCream, label: 'Ice Cream', color: 'text-pink-400', accentBg: 'bg-pink-500/15', borderColor: 'border-pink-500/30' },
    { icon: Cherry, label: 'Cherry', color: 'text-rose-400', accentBg: 'bg-rose-500/15', borderColor: 'border-rose-500/30' },
    { icon: Cake, label: 'Cake', color: 'text-fuchsia-400', accentBg: 'bg-fuchsia-500/15', borderColor: 'border-fuchsia-500/30' },
    { icon: Citrus, label: 'Citrus', color: 'text-yellow-400', accentBg: 'bg-yellow-500/15', borderColor: 'border-yellow-500/30' },
    { icon: Carrot, label: 'Carrot', color: 'text-orange-500', accentBg: 'bg-orange-600/15', borderColor: 'border-orange-600/30' },
    { icon: CupSoda, label: 'Soda', color: 'text-sky-400', accentBg: 'bg-sky-500/15', borderColor: 'border-sky-500/30' },
    { icon: Sandwich, label: 'Sandwich', color: 'text-emerald-400', accentBg: 'bg-emerald-500/15', borderColor: 'border-emerald-500/30' },
    { icon: Popcorn, label: 'Popcorn', color: 'text-yellow-300', accentBg: 'bg-yellow-400/15', borderColor: 'border-yellow-400/30' },
  ],
};

export const getThemeCardIcon = (theme: ThemeId, pairId: number): LucideIcon => {
  const cards = THEME_CARDS[theme] || THEME_CARDS.gems;
  const card = cards[pairId % cards.length];
  return card.icon;
};

/**
 * Generates and shuffles a deck of cards for the given difficulty and theme.
 */
export const generateDeck = (difficulty: Difficulty, theme: ThemeId): CardItem[] => {
  const config = DIFFICULTIES[difficulty];
  const themeCards = THEME_CARDS[theme] || THEME_CARDS.gems;
  const selectedDefinitions = themeCards.slice(0, config.pairs);

  const cards: CardItem[] = [];

  selectedDefinitions.forEach((def, pairIdx) => {
    // Generate card 1 of pair
    cards.push({
      id: `${difficulty}-${theme}-${pairIdx}-a`,
      pairId: pairIdx,
      iconKey: def.label,
      label: def.label,
      color: def.color,
      accentBg: def.accentBg,
      borderColor: def.borderColor,
      isFlipped: false,
      isMatched: false,
    });

    // Generate card 2 of pair
    cards.push({
      id: `${difficulty}-${theme}-${pairIdx}-b`,
      pairId: pairIdx,
      iconKey: def.label,
      label: def.label,
      color: def.color,
      accentBg: def.accentBg,
      borderColor: def.borderColor,
      isFlipped: false,
      isMatched: false,
    });
  });

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
};

/**
 * Calculates star rating (1 to 3) based on moves and difficulty thresholds
 */
export const calculateStars = (difficulty: Difficulty, moves: number): number => {
  const thresholds = DIFFICULTIES[difficulty].starThresholds;
  if (moves <= thresholds.threeStars) return 3;
  if (moves <= thresholds.twoStars) return 2;
  return 1;
};

/**
 * Format time in MM:SS
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
