import { BestRecords, Difficulty, DifficultyRecord } from '../types';

const STORAGE_KEY = 'mmm_game_records_v1';

const DEFAULT_RECORD: DifficultyRecord = {
  bestTime: null,
  bestMoves: null,
  bestScore: null,
  gamesPlayed: 0,
  gamesWon: 0,
};

const DEFAULT_RECORDS: BestRecords = {
  easy: { ...DEFAULT_RECORD },
  medium: { ...DEFAULT_RECORD },
  hard: { ...DEFAULT_RECORD },
};

export const loadRecords = (): BestRecords => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RECORDS;
    const parsed = JSON.parse(raw);
    return {
      easy: { ...DEFAULT_RECORD, ...(parsed.easy || {}) },
      medium: { ...DEFAULT_RECORD, ...(parsed.medium || {}) },
      hard: { ...DEFAULT_RECORD, ...(parsed.hard || {}) },
    };
  } catch (e) {
    console.error('Failed to load records from localStorage', e);
    return DEFAULT_RECORDS;
  }
};

export interface UpdateRecordResult {
  updatedRecords: BestRecords;
  isNewBestTime: boolean;
  isNewBestMoves: boolean;
  isNewBestScore: boolean;
}

export const saveGameWin = (
  difficulty: Difficulty,
  timeSeconds: number,
  moves: number,
  score: number
): UpdateRecordResult => {
  const current = loadRecords();
  const diffRecord = current[difficulty];

  const isNewBestTime = diffRecord.bestTime === null || timeSeconds < diffRecord.bestTime;
  const isNewBestMoves = diffRecord.bestMoves === null || moves < diffRecord.bestMoves;
  const isNewBestScore = diffRecord.bestScore === null || score > diffRecord.bestScore;

  const updatedRecord: DifficultyRecord = {
    gamesPlayed: diffRecord.gamesPlayed + 1,
    gamesWon: diffRecord.gamesWon + 1,
    bestTime: isNewBestTime ? timeSeconds : diffRecord.bestTime,
    bestMoves: isNewBestMoves ? moves : diffRecord.bestMoves,
    bestScore: isNewBestScore ? score : diffRecord.bestScore,
  };

  const updatedRecords: BestRecords = {
    ...current,
    [difficulty]: updatedRecord,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
  } catch (e) {
    console.error('Failed to save record to localStorage', e);
  }

  return {
    updatedRecords,
    isNewBestTime,
    isNewBestMoves,
    isNewBestScore,
  };
};

export const incrementGamePlayed = (difficulty: Difficulty): BestRecords => {
  const current = loadRecords();
  const diffRecord = current[difficulty];
  const updatedRecord: DifficultyRecord = {
    ...diffRecord,
    gamesPlayed: diffRecord.gamesPlayed + 1,
  };
  const updatedRecords: BestRecords = {
    ...current,
    [difficulty]: updatedRecord,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
  } catch {
    // ignore
  }
  return updatedRecords;
};

export const resetRecords = (): BestRecords => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return DEFAULT_RECORDS;
};
