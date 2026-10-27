import React from 'react';
import { CardItem, ThemeId } from '../types';
import { getThemeCardIcon } from '../utils/cards';
import { Check } from 'lucide-react';

interface CardProps {
  card: CardItem;
  theme: ThemeId;
  onFlip: (card: CardItem) => void;
  disabled: boolean;
  aspectRatioClass?: string;
}

export const Card: React.FC<CardProps> = ({
  card,
  theme,
  onFlip,
  disabled,
  aspectRatioClass = 'aspect-[3/4]',
}) => {
  const IconComponent = getThemeCardIcon(theme, card.pairId);
  const isRevealed = card.isFlipped || card.isMatched;

  const handleClick = () => {
    if (disabled || isRevealed) return;
    onFlip(card);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isRevealed || disabled ? -1 : 0}
      aria-label={isRevealed ? `${card.label}, matched` : `Hidden card`}
      aria-disabled={disabled || isRevealed}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`group relative select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-xl transition-transform duration-200 perspective-1000 ${aspectRatioClass} ${
        disabled && !isRevealed ? 'cursor-not-allowed opacity-80' : ''
      } ${
        !isRevealed && !disabled ? 'hover:-translate-y-1 active:scale-[0.97]' : ''
      }`}
    >
      {/* 3D Flip Container */}
      <div
        className={`w-full h-full duration-500 rounded-xl transition-all transform-style-3d ${
          isRevealed ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD BACK (Face Down) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl backface-hidden border flex flex-col items-center justify-center p-3 shadow-md transition-colors ${
            disabled && !isRevealed
              ? 'bg-slate-800/80 border-slate-700/60 text-slate-500'
              : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700/80 hover:border-indigo-500/50 hover:shadow-indigo-500/10 shadow-black/40 text-slate-400 group-hover:text-indigo-300'
          }`}
        >
          {/* Subtle Geometric Pattern Overlay */}
          <div className="absolute inset-1 rounded-lg border border-dashed border-slate-700/40 pointer-events-none" />
          
          <div className="relative flex flex-col items-center justify-center">
            {/* Center Card Back Medallion */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-slate-950/60 border border-slate-700/60 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300">
              <span className="text-sm sm:text-base font-bold tracking-wider font-mono-numbers text-slate-400 group-hover:text-indigo-400 transition-colors">
                ?
              </span>
            </div>
            <span className="mt-1 text-[10px] tracking-widest uppercase font-medium text-slate-500 opacity-60">
              MATCH
            </span>
          </div>

          {/* Corner ornaments */}
          <span className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 select-none">✦</span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-600 select-none">✦</span>
        </div>

        {/* CARD FRONT (Face Up / Revealed) */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl backface-hidden rotate-y-180 border flex flex-col items-center justify-center p-3 shadow-lg ${
            card.isMatched
              ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/30 border-emerald-500/50 shadow-emerald-500/10'
              : 'bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-slate-600 shadow-indigo-500/10'
          }`}
        >
          {/* Matched check badge */}
          {card.isMatched && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
          )}

          {/* Icon Glow backdrop */}
          <div
            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all ${
              card.accentBg
            } ${card.borderColor} border ${
              card.isMatched ? 'scale-105 shadow-md shadow-emerald-500/20' : ''
            }`}
          >
            <IconComponent className={`w-7 h-7 sm:w-9 sm:h-9 ${card.color} stroke-[2.2]`} />
          </div>

          {/* Label name */}
          <span className="mt-2 text-xs font-semibold text-slate-300 tracking-wide text-center truncate max-w-[90%]">
            {card.label}
          </span>
        </div>
      </div>
    </div>
  );
};
