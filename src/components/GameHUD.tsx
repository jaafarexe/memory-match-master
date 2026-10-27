import React from 'react';
import { RotateCcw, Clock, Target, Flame, Trophy, Palette } from 'lucide-react';
import { BestRecords, Difficulty, ThemeId } from '../types';
import { DIFFICULTIES, formatTime, THEMES } from '../utils/cards';

interface GameHUDProps {
  difficulty: Difficulty;
  theme: ThemeId;
  moves: number;
  timeSeconds: number;
  matches: number;
  totalPairs: number;
  score: number;
  streak: number;
  bestRecords: BestRecords;
  onSelectDifficulty: (d: Difficulty) => void;
  onSelectTheme: (t: ThemeId) => void;
  onRestart: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  difficulty,
  theme,
  moves,
  timeSeconds,
  matches,
  totalPairs,
  score,
  streak,
  bestRecords,
  onSelectDifficulty,
  onSelectTheme,
  onRestart,
}) => {
  const currentDiff = DIFFICULTIES[difficulty];
  const activeRecord = bestRecords[difficulty];
  const progressPercent = Math.round((matches / totalPairs) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
      {/* Top Toolbar: Difficulty Tabs, Theme Picker & Restart Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-md">
        {/* Difficulty Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((diffKey) => {
            const config = DIFFICULTIES[diffKey];
            const isActive = difficulty === diffKey;
            return (
              <button
                key={diffKey}
                onClick={() => onSelectDifficulty(diffKey)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{config.label}</span>
                <span className="hidden md:inline ml-1.5 text-[11px] opacity-75 font-normal">
                  ({config.cols}×{config.rows})
                </span>
              </button>
            );
          })}
        </div>

        {/* Right side: Theme Selector & Restart */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Theme Selector */}
          <div className="relative flex items-center">
            <Palette className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              value={theme}
              aria-label="Select card theme"
              onChange={(e) => onSelectTheme(e.target.value as ThemeId)}
              className="bg-slate-950/80 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium rounded-xl pl-8 pr-7 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-slate-200">
                  {t.name}
                </option>
              ))}
            </select>
            <div className="absolute right-2.5 pointer-events-none text-slate-500 text-[10px]">▼</div>
          </div>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            aria-label="Restart current game"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700/80 rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4 text-indigo-400" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Main HUD Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {/* Stat 1: Moves */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Moves</span>
            </span>
            {activeRecord.bestMoves !== null && (
              <span className="text-[11px] font-mono-numbers text-slate-500" title="Best moves on this difficulty">
                Best: {activeRecord.bestMoves}
              </span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-white">
            {moves}
          </div>
        </div>

        {/* Stat 2: Timer */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Time</span>
            </span>
            {activeRecord.bestTime !== null && (
              <span className="text-[11px] font-mono-numbers text-slate-500" title="Best time on this difficulty">
                Best: {formatTime(activeRecord.bestTime)}
              </span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-white">
            {formatTime(timeSeconds)}
          </div>
        </div>

        {/* Stat 3: Pairs Progress */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Matched</span>
            </span>
            <span className="text-[11px] font-mono-numbers text-slate-400">
              {progressPercent}%
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-bold font-mono-numbers text-white">
              {matches}
            </span>
            <span className="text-xs text-slate-400 font-mono-numbers">
              / {totalPairs} pairs
            </span>
          </div>
          {/* Micro progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stat 4: Score */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              <span>Score</span>
            </span>
            {streak > 1 && (
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-amber-400 animate-pulse">
                <Flame className="w-3 h-3 fill-amber-400" />
                <span>{streak}x Streak</span>
              </span>
            )}
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono-numbers text-white">
            {score.toLocaleString()}
          </div>
        </div>

        {/* Stat 5 (Large screens): Star Target Preview */}
        <div className="hidden lg:flex bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 flex-col justify-between shadow-sm">
          <div className="text-xs text-slate-400 mb-1">Star Goals</div>
          <div className="flex items-center gap-2 text-xs font-mono-numbers text-slate-300">
            <span className="text-amber-400 font-semibold">★★★ ≤ {currentDiff.starThresholds.threeStars}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">★★ ≤ {currentDiff.starThresholds.twoStars}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
