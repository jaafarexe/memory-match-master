import React from 'react';
import { Volume2, VolumeX, Trophy, HelpCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenRecords: () => void;
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleSound,
  onOpenRecords,
  onOpenRules,
}) => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
            <Sparkles className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
            Memory Match Master
          </span>
        </div>

        {/* Zone 2: Clean Single-Line Links */}
        <nav className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={onOpenRecords}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Records</span>
          </button>

          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">How to Play</span>
          </button>
        </nav>

        {/* Zone 3: Sound Control */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Sound Muted (Click to enable)' : 'Sound Enabled (Click to mute)'}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-slate-800/80 border-slate-700/80 text-indigo-400 hover:text-indigo-300 hover:border-indigo-500/50 shadow-sm'
            }`}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span className="hidden md:inline text-slate-400">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <span className="hidden md:inline text-slate-200">Audio On</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
