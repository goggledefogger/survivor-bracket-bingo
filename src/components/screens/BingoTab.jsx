import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../AppContext';
import { generateBingoCard } from '../../data';
import { BingoSquare, Icon } from '../fijian';

export default function BingoTab() {
  const { gameState, saveGame } = useApp();
  const { players, bingo } = gameState;

  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [winAnimation, setWinAnimation] = useState(false);
  const [winningCells, setWinningCells] = useState([]);

  const playerCard = bingo?.cards?.[selectedPlayer];
  const seed = playerCard?.seed || (selectedPlayer + 1) * 7919;
  const marks = playerCard?.marks || Array(25).fill(false);
  const card = generateBingoCard(seed);

  const saveBingoState = useCallback(async (s, m) => {
    const newCards = { ...(bingo?.cards || {}) };
    newCards[selectedPlayer] = { seed: s, marks: m };
    await saveGame({
      ...gameState,
      bingo: { ...bingo, cards: newCards },
    });
  }, [selectedPlayer, gameState, bingo, saveGame]);

  useEffect(() => {
    if (!marks[12]) {
      const newMarks = [...marks];
      newMarks[12] = true;
      saveBingoState(seed, newMarks);
    }
  }, [selectedPlayer, marks, seed, saveBingoState]);

  const toggleMark = async (index) => {
    if (index === 12) return;
    const newMarks = [...marks];
    newMarks[index] = !newMarks[index];
    await saveBingoState(seed, newMarks);
    checkWin(newMarks);
  };

  const checkWin = useCallback((m) => {
    const lines = [
      [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
    ];
    for (const line of lines) {
      if (line.every((i) => m[i])) {
        setWinAnimation(true);
        setWinningCells(line);
        return;
      }
    }
    setWinAnimation(false);
    setWinningCells([]);
  }, []);

  const newCard = async () => {
    const newSeed = Math.floor(Math.random() * 100000);
    const freshMarks = Array(25).fill(false);
    freshMarks[12] = true;
    await saveBingoState(newSeed, freshMarks);
    setWinAnimation(false);
    setWinningCells([]);
  };

  const resetMarks = async () => {
    const freshMarks = Array(25).fill(false);
    freshMarks[12] = true;
    await saveBingoState(seed, freshMarks);
    setWinAnimation(false);
    setWinningCells([]);
  };

  return (
    <div className="space-y-6">
      <header className="text-center px-4 py-8 bg-gradient-to-b from-ochre/20 via-transparent to-transparent">
        <div className="mb-1 text-3xl opacity-80" aria-hidden>🔱</div>
        <h1 className="text-5xl font-display font-normal leading-none text-sand-warm drop-shadow-text">
          FIJIAN <span className="text-ochre">BINGO</span>
        </h1>
        <p className="text-[10px] font-bold tracking-[0.4em] text-sand-warm/70 uppercase mt-2 font-sans">
          Season 50 Watch Party
        </p>
      </header>

      <div className="px-6 text-center">
        <h2 className="text-sand-warm text-2xl font-serif mb-2">Authentic Fijian Bingo</h2>
        <p className="text-sand-warm/70 text-sm leading-snug px-6 max-w-sm mx-auto font-sans">
          Mark your card as the season unfolds. First to five in a row shouts{' '}
          <span className="text-clay font-bold font-serif">&quot;BULA!&quot;</span>
        </p>
      </div>

      <div className="px-4 flex flex-wrap gap-3 items-center justify-between mb-8">
        <div className="flex-1 min-w-[140px]">
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(Number(e.target.value))}
            className="w-full bg-stone-dark border border-ochre/30 rounded-lg text-sm text-sand-warm font-bold py-2.5 px-4 focus:ring-ochre focus:border-ochre font-sans"
            aria-label="Select player for bingo card"
          >
            {players.map((name, i) => (
              <option key={i} value={i}>{name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={newCard}
            className="bg-ochre/20 hover:bg-ochre/30 text-sand-warm border border-ochre/30 py-2.5 px-4 rounded-lg text-xs font-black flex items-center gap-2 transition-all font-sans"
          >
            <Icon name="auto_stories" className="text-sm" />
            NEW
          </button>
          <button
            type="button"
            onClick={resetMarks}
            className="bg-ochre/20 hover:bg-ochre/30 text-sand-warm border border-ochre/30 py-2.5 px-4 rounded-lg text-xs font-black transition-all font-sans"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="px-4 mb-10">
        <div className="magimagi-edge p-1 bg-stone-dark shadow-2xl">
          <div
            className="grid grid-cols-5 gap-1.5 aspect-square w-full max-w-md mx-auto p-1 bg-stone-dark"
            role="grid"
            aria-label="Bingo card"
          >
            {card.map((item, i) => {
              const isFree = i === 12;
              const isMarked = marks[i];
              const isWinning = winningCells.includes(i);
              return (
                <BingoSquare
                  key={i}
                  label={item}
                  isFree={isFree}
                  isMarked={isMarked}
                  isWinning={isWinning}
                  onClick={() => toggleMark(i)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {winAnimation && (
        <div className="px-6 pb-24 text-center animate-bounce-in" role="status" aria-live="polite">
          <h3 className="text-6xl font-display text-clay mb-2 text-shadow-glow-win">
            BULA!
          </h3>
          <h4 className="text-4xl font-display text-clay/90 mb-4">JEFF PROBST!</h4>
          <p className="text-sand-warm text-lg font-bold tracking-tighter drop-shadow-md font-sans">
            VINAKA! THE TRIBE HAS SPOKEN! 🐚
          </p>
        </div>
      )}
    </div>
  );
}
