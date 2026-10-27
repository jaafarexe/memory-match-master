export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  id: Difficulty;
  label: string;
  sublabel: string;
  cols: number;
  rows: number;
  totalCards: number;
  pairs: number;
  starThresholds: {
    threeStars: number; // max moves for 3 stars
    twoStars: number;   // max moves for 2 stars
  };
}

export type ThemeId = 'gems' | 'nature' | 'arcade' | 'food';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
}

export interface CardItem {
  id: string;          // unique per card instance on board
  pairId: number;      // 0 to pairs-1 (cards with same pairId match)
  iconKey: string;     // icon identifier in theme
  label: string;       // accessibility text
  color: string;       // text/icon color class
  accentBg: string;    // background color class
  borderColor: string; // border color class
  isFlipped: boolean;
  isMatched: boolean;
}

export interface DifficultyRecord {
  bestTime: number | null;   // seconds
  bestMoves: number | null;  // count
  bestScore: number | null;  // points
  gamesPlayed: number;
  gamesWon: number;
}

export type BestRecords = Record<Difficulty, DifficultyRecord>;
