/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from './components/Card';
import { Header } from './components/Header';
import { GameHUD } from './components/GameHUD';
import { WinModal } from './components/WinModal';
import { RecordsModal } from './components/RecordsModal';
import { RulesModal } from './components/RulesModal';
import { CardItem, Difficulty, ThemeId, BestRecords } from './types';
import {
  DIFFICULTIES,
  generateDeck,
  calculateStars,
} from './utils/cards';
import { soundManager } from './utils/sound';
import {
  loadRecords,
  saveGameWin,
  resetRecords,
  incrementGamePlayed,
} from './utils/storage';

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [theme, setTheme] = useState<ThemeId>('gems');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  const [moves, setMoves] = useState<number>(0);
  const [matches, setMatches] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);

  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(3);

  const [isNewBestTime, setIsNewBestTime] = useState<boolean>(false);
  const [isNewBestMoves, setIsNewBestMoves] = useState<boolean>(false);
  const [isNewBestScore, setIsNewBestScore] = useState<boolean>(false);

  const [bestRecords, setBestRecords] = useState<BestRecords>(loadRecords());
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [isRecordsOpen, setIsRecordsOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Initialize or reset game board
  const startNewGame = useCallback(
    (targetDiff: Difficulty = difficulty, targetTheme: ThemeId = theme) => {
      // Clear any active timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      const newDeck = generateDeck(targetDiff, targetTheme);
      setCards(newDeck);
      setFlippedCards([]);
      setIsEvaluating(false);
      setMoves(0);
      setMatches(0);
      setScore(0);
      setStreak(0);
      setMaxStreak(0);
      setTimeSeconds(0);
      setIsGameActive(false);
      setIsGameWon(false);
      setIsNewBestTime(false);
      setIsNewBestMoves(false);
      setIsNewBestScore(false);

      incrementGamePlayed(targetDiff);
      setBestRecords(loadRecords());
    },
    [difficulty, theme]
  );

  // Initial load
  useEffect(() => {
    startNewGame(difficulty, theme);
  }, []);

  // Timer loop
  useEffect(() => {
    if (isGameActive && !isGameWon) {
      timerRef.current = window.setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isGameActive, isGameWon]);

  // Handle card click / flip
  const handleCardFlip = (clickedCard: CardItem) => {
    if (isEvaluating) return;
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    if (flippedCards.length >= 2) return;

    // Start timer on first card interaction
    if (!isGameActive && !isGameWon) {
      setIsGameActive(true);
    }

    soundManager.playFlip();

    // Mark card as flipped
    const updatedCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, { ...clickedCard, isFlipped: true }];
    setFlippedCards(newFlipped);

    // If 2 cards are now flipped, evaluate match
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const newMoves = moves + 1;
      setMoves(newMoves);
      setIsEvaluating(true);

      const isMatch = first.pairId === second.pairId;

      if (isMatch) {
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        setMaxStreak((prev) => Math.max(prev, nextStreak));

        // Score formula: 100 base + streak bonus
        const streakBonus = (nextStreak - 1) * 50;
        const speedBonus = Math.max(10, 100 - timeSeconds);
        const matchPoints = 100 + streakBonus + speedBonus;
        const newScore = score + matchPoints;
        setScore(newScore);

        soundManager.playMatch(nextStreak);

        const newMatches = matches + 1;
        setMatches(newMatches);

        // Lock matched cards
        setCards((prev) =>
          prev.map((c) =>
            c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c
          )
        );
        setFlippedCards([]);
        setIsEvaluating(false);

        // Check victory
        const totalPairs = DIFFICULTIES[difficulty].pairs;
        if (newMatches === totalPairs) {
          setIsGameActive(false);
          setIsGameWon(true);
          const finalStars = calculateStars(difficulty, newMoves);
          setStars(finalStars);

          // Save records
          const result = saveGameWin(difficulty, timeSeconds, newMoves, newScore);
          setBestRecords(result.updatedRecords);
          setIsNewBestTime(result.isNewBestTime);
          setIsNewBestMoves(result.isNewBestMoves);
          setIsNewBestScore(result.isNewBestScore);

          setTimeout(() => {
            soundManager.playWin();
          }, 200);
        }
      } else {
        // Mismatch
        setStreak(0);
        setTimeout(() => {
          soundManager.playMismatch();
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsEvaluating(false);
        }, 900);
      }
    }
  };

  // Switch difficulty
  const handleSelectDifficulty = (newDiff: Difficulty) => {
    soundManager.playClick();
    setDifficulty(newDiff);
    startNewGame(newDiff, theme);
  };

  // Switch theme
  const handleSelectTheme = (newTheme: ThemeId) => {
    soundManager.playClick();
    setTheme(newTheme);
    startNewGame(difficulty, newTheme);
  };

  // Sound toggle
  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  // Reset records
  const handleResetRecords = () => {
    soundManager.playClick();
    const clean = resetRecords();
    setBestRecords(clean);
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        startNewGame();
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleSound();
      } else if (e.key === 'Escape') {
        setIsRecordsOpen(false);
        setIsRulesOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [startNewGame]);

  const currentConfig = DIFFICULTIES[difficulty];

  // Grid column class based on difficulty
  const getGridColsClass = () => {
    if (difficulty === 'easy') {
      return 'grid-cols-4 max-w-xl';
    }
    if (difficulty === 'medium') {
      return 'grid-cols-4 max-w-2xl';
    }
    // Hard: 6 cols x 4 rows
    return 'grid-cols-4 sm:grid-cols-6 max-w-4xl';
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Header */}
      <Header
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenRecords={() => {
          soundManager.playClick();
          setIsRecordsOpen(true);
        }}
        onOpenRules={() => {
          soundManager.playClick();
          setIsRulesOpen(true);
        }}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-8 flex flex-col items-center gap-6">
        {/* HUD: Difficulty, Theme, Moves, Timer, Streak, Restart */}
        <GameHUD
          difficulty={difficulty}
          theme={theme}
          moves={moves}
          timeSeconds={timeSeconds}
          matches={matches}
          totalPairs={currentConfig.pairs}
          score={score}
          streak={streak}
          bestRecords={bestRecords}
          onSelectDifficulty={handleSelectDifficulty}
          onSelectTheme={handleSelectTheme}
          onRestart={() => {
            soundManager.playClick();
            startNewGame();
          }}
        />

        {/* Card Arena Grid */}
        <section
          aria-label="Memory card game board"
          className="w-full flex justify-center py-2"
        >
          <div
            className={`w-full grid ${getGridColsClass()} gap-2.5 sm:gap-3.5 transition-all duration-300`}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                theme={theme}
                onFlip={handleCardFlip}
                disabled={isEvaluating}
                aspectRatioClass={difficulty === 'hard' ? 'aspect-[3/3.8]' : 'aspect-[3/3.8]'}
              />
            ))}
          </div>
        </section>

        {/* Footer info & keyboard hint */}
        <footer className="w-full max-w-5xl text-center pt-4 pb-2 border-t border-slate-900/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <span>Pairs: {matches} / {currentConfig.pairs}</span>
            <span>·</span>
            <span>Grid: {currentConfig.cols} × {currentConfig.rows}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">R</kbd> to restart</span>
            <span>·</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[10px]">M</kbd> mute</span>
          </div>
        </footer>
      </main>

      {/* Win Screen Modal */}
      <WinModal
        isOpen={isGameWon}
        stars={stars}
        moves={moves}
        timeSeconds={timeSeconds}
        score={score}
        maxStreak={maxStreak}
        difficulty={difficulty}
        isNewBestTime={isNewBestTime}
        isNewBestMoves={isNewBestMoves}
        isNewBestScore={isNewBestScore}
        onPlayAgain={() => {
          soundManager.playClick();
          startNewGame(difficulty, theme);
        }}
        onNextDifficulty={(nextDiff) => {
          soundManager.playClick();
          setDifficulty(nextDiff);
          startNewGame(nextDiff, theme);
        }}
      />

      {/* Best Records Modal */}
      <RecordsModal
        isOpen={isRecordsOpen}
        records={bestRecords}
        onClose={() => {
          soundManager.playClick();
          setIsRecordsOpen(false);
        }}
        onReset={handleResetRecords}
      />

      {/* Rules / How to play Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => {
          soundManager.playClick();
          setIsRulesOpen(false);
        }}
      />
    </div>
  );
}
