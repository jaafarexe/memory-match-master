import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Trophy, Clock, Target, RotateCcw, ArrowRight, Zap } from 'lucide-react';
import { Difficulty, DifficultyConfig } from '../types';
import { DIFFICULTIES, formatTime } from '../utils/cards';

interface WinModalProps {
  isOpen: boolean;
  stars: number;
  moves: number;
  timeSeconds: number;
  score: number;
  maxStreak: number;
  difficulty: Difficulty;
  isNewBestTime: boolean;
  isNewBestMoves: boolean;
  isNewBestScore: boolean;
  onPlayAgain: () => void;
  onNextDifficulty?: (nextDiff: Difficulty) => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  isOpen,
  stars,
  moves,
  timeSeconds,
  score,
  maxStreak,
  difficulty,
  isNewBestTime,
  isNewBestMoves,
  isNewBestScore,
  onPlayAgain,
  onNextDifficulty,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Fire vibrant confetti sequence
      try {
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          zIndex: 9999,
        };

        const fire = (particleRatio: number, opts: confetti.Options) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        };

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      } catch (e) {
        console.error('Confetti trigger error', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentConfig: DifficultyConfig = DIFFICULTIES[difficulty];
  const accuracy = Math.round((currentConfig.pairs / Math.max(moves, currentConfig.pairs)) * 100);

  const getNextDifficulty = (current: Difficulty): Difficulty | null => {
    if (current === 'easy') return 'medium';
    if (current === 'medium') return 'hard';
    return null;
  };

  const nextDiff = getNextDifficulty(difficulty);

  const getPraiseTitle = (s: number) => {
    if (s === 3) return 'Masterclass Memory!';
    if (s === 2) return 'Impressive Game!';
    return 'Puzzle Solved!';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-center">
        {/* Glow halo */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Stars Display */}
        <div className="flex justify-center items-center gap-2 mb-4">
          {[1, 2, 3].map((starIdx) => {
            const isEarned = starIdx <= stars;
            return (
              <div
                key={starIdx}
                className={`relative transition-all duration-500 transform ${
                  isEarned
                    ? 'scale-100 text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                    : 'scale-90 text-slate-700'
                }`}
                style={{
                  transitionDelay: `${starIdx * 150}ms`,
                }}
              >
                <Star
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${
                    isEarned ? 'fill-amber-400 stroke-amber-300' : 'fill-slate-800 stroke-slate-700'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {getPraiseTitle(stars)}
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          You conquered the <span className="font-semibold text-indigo-400">{currentConfig.label}</span> board in{' '}
          <span className="font-mono-numbers font-medium text-slate-200">{moves} moves</span>!
        </p>

        {/* Stats Matrix */}
        <div className="grid grid-cols-2 gap-3 my-6">
          {/* Time */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Time</span>
            </div>
            <div className="text-xl font-bold font-mono-numbers text-white">
              {formatTime(timeSeconds)}
            </div>
            {isNewBestTime && (
              <span className="mt-1 text-[10px] font-semibold tracking-wide text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                NEW BEST
              </span>
            )}
          </div>

          {/* Moves */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>Moves</span>
            </div>
            <div className="text-xl font-bold font-mono-numbers text-white">
              {moves}
            </div>
            {isNewBestMoves && (
              <span className="mt-1 text-[10px] font-semibold tracking-wide text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded">
                FEWEST MOVES
              </span>
            )}
          </div>

          {/* Accuracy */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Accuracy</span>
            </div>
            <div className="text-xl font-bold font-mono-numbers text-white">
              {accuracy}%
            </div>
            <span className="mt-1 text-[10px] text-slate-400 font-medium">
              {currentConfig.pairs} / {moves} pairs
            </span>
          </div>

          {/* Score & Streak */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Score</span>
            </div>
            <div className="text-xl font-bold font-mono-numbers text-white">
              {score.toLocaleString()}
            </div>
            {maxStreak > 1 && (
              <span className="mt-1 text-[10px] font-medium text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded">
                Max Streak {maxStreak}x
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          {nextDiff && onNextDifficulty && (
            <button
              onClick={() => onNextDifficulty(nextDiff)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] border border-slate-700 hover:border-slate-600 rounded-xl transition-all cursor-pointer"
            >
              <span>{DIFFICULTIES[nextDiff].label} Mode</span>
              <ArrowRight className="w-4 h-4 text-indigo-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
