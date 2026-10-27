import React from 'react';
import { X, HelpCircle, Star, Flame, Zap, MousePointerClick } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">How to Play</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close rules modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules details */}
        <div className="my-5 flex flex-col gap-4 text-sm text-slate-300">
          <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <MousePointerClick className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white">Flip & Match</h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Click any face-down card to reveal its icon, then click a second card. If they match, they stay revealed! If they don't, they flip back after a brief moment.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white">Combo Streaks</h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Find matching pairs consecutively to build your combo multiplier! Streaks amplify your score and sound effects for each chain link.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <Star className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white">3-Star Rating</h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Aim to solve the board in the fewest moves possible:
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs font-mono-numbers">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold">Easy (4×3)</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">3★ ≤ 9 moves</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold">Medium (4×4)</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">3★ ≤ 13 moves</div>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-amber-400 font-bold">Hard (6×4)</span>
                  <div className="text-[11px] text-slate-400 mt-0.5">3★ ≤ 20 moves</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <Zap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-white">Keyboard Shortcuts</h3>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">R</kbd> to restart anytime, <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">M</kbd> to toggle audio, and use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">Tab</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 border border-slate-700">Space</kbd> for keyboard navigation.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-600/30"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
