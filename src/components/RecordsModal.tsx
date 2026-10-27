import React from 'react';
import { X, Trophy, Clock, Target, Trash2 } from 'lucide-react';
import { BestRecords, Difficulty } from '../types';
import { DIFFICULTIES, formatTime } from '../utils/cards';

interface RecordsModalProps {
  isOpen: boolean;
  records: BestRecords;
  onClose: () => void;
  onReset: () => void;
}

export const RecordsModal: React.FC<RecordsModalProps> = ({
  isOpen,
  records,
  onClose,
  onReset,
}) => {
  if (!isOpen) return null;

  const diffKeys: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Personal Best Records</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close records modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content by Difficulty */}
        <div className="my-5 flex flex-col gap-3.5">
          {diffKeys.map((key) => {
            const config = DIFFICULTIES[key];
            const rec = records[key];
            const hasData = rec.bestMoves !== null || rec.bestTime !== null;

            return (
              <div
                key={key}
                className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{config.label}</span>
                    <span className="text-xs text-slate-400 font-mono-numbers">
                      {config.cols}×{config.rows} ({config.pairs} pairs)
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Games Won: <span className="text-slate-300 font-mono-numbers">{rec.gamesWon}</span>
                  </div>
                </div>

                {hasData ? (
                  <div className="flex items-center gap-4 text-xs font-mono-numbers">
                    <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      <span>{rec.bestTime !== null ? formatTime(rec.bestTime) : '--:--'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <Target className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{rec.bestMoves !== null ? `${rec.bestMoves} moves` : '--'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>{rec.bestScore !== null ? rec.bestScore : '--'}</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 italic">No games completed yet</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
          <button
            onClick={() => {
              if (window.confirm('Reset all saved records and best times?')) {
                onReset();
              }
            }}
            className="flex items-center gap-1.5 text-rose-400/80 hover:text-rose-300 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Records</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
