import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, RotateCcw } from "lucide-react";
import SectionHeader from "./SectionHeader";

const PLAYERS = [
  "MESSI",
  "RONALDO",
  "RAUL",
  "ZIDANE",
  "BENZEMA",
  "LEWANDOWSKI",
  "SHEVCHENKO",
  "MBAPPE",
  "HALAND",
  "MODRIC",
];

const SIZE = 14;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Cell = { letter: string; words: Set<string> };

const directions = [
  [0, 1],   // →
  [1, 0],   // ↓
  [1, 1],   // ↘
  [-1, 1],  // ↗
  [0, -1],  // ←
  [-1, 0],  // ↑
];

function buildGrid(): { grid: Cell[][]; placed: string[] } {
  const grid: Cell[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({ letter: "", words: new Set<string>() }))
  );
  const placed: string[] = [];

  const tryPlace = (word: string) => {
    for (let attempt = 0; attempt < 200; attempt++) {
      const [dr, dc] = directions[Math.floor(Math.random() * directions.length)];
      const r = Math.floor(Math.random() * SIZE);
      const c = Math.floor(Math.random() * SIZE);
      const endR = r + dr * (word.length - 1);
      const endC = c + dc * (word.length - 1);
      if (endR < 0 || endR >= SIZE || endC < 0 || endC >= SIZE) continue;
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[r + dr * i][c + dc * i];
        if (cell.letter && cell.letter !== word[i]) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[r + dr * i][c + dc * i];
        cell.letter = word[i];
        cell.words.add(word);
      }
      placed.push(word);
      return true;
    }
    return false;
  };

  for (const w of PLAYERS) tryPlace(w);

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!grid[r][c].letter) {
        grid[r][c].letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      }
    }
  }
  return { grid, placed };
}

const WordSearchSection = () => {
  const [seed, setSeed] = useState(0);
  const { grid, placed } = useMemo(() => buildGrid(), [seed]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [start, setStart] = useState<[number, number] | null>(null);
  const [current, setCurrent] = useState<[number, number] | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const lineCells = useCallback((a: [number, number], b: [number, number]): [number, number][] | null => {
    const [r1, c1] = a;
    const [r2, c2] = b;
    const dr = r2 - r1;
    const dc = c2 - c1;
    const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;
    if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
    const sr = dr === 0 ? 0 : dr / Math.abs(dr);
    const sc = dc === 0 ? 0 : dc / Math.abs(dc);
    const cells: [number, number][] = [];
    for (let i = 0; i < len; i++) cells.push([r1 + sr * i, c1 + sc * i]);
    return cells;
  }, []);

  const selection = useMemo(() => {
    if (!start || !current) return [] as [number, number][];
    return lineCells(start, current) ?? [];
  }, [start, current, lineCells]);

  const selectionSet = useMemo(
    () => new Set(selection.map(([r, c]) => `${r}-${c}`)),
    [selection]
  );

  const finishSelection = () => {
    if (selection.length > 1) {
      const word = selection.map(([r, c]) => grid[r][c].letter).join("");
      const reversed = word.split("").reverse().join("");
      const match = placed.find((w) => w === word || w === reversed);
      if (match && !found.has(match)) {
        setFound((p) => new Set(p).add(match));
        setFoundCells((p) => {
          const next = new Set(p);
          selection.forEach(([r, c]) => next.add(`${r}-${c}`));
          return next;
        });
      }
    }
    setStart(null);
    setCurrent(null);
    setIsDragging(false);
  };

  const reset = () => {
    setFound(new Set());
    setFoundCells(new Set());
    setStart(null);
    setCurrent(null);
    setSeed((s) => s + 1);
  };

  return (
    <section id="wordsearch" className="py-24 px-6">
      <div className="container mx-auto">
        <SectionHeader icon={Search} label="Activity · Post 4" title="Player Word Search" />

        <div className="grid lg:grid-cols-[auto,1fr] gap-10 items-start max-w-6xl mx-auto">
          {/* Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card neon-border p-4 sm:p-6 mx-auto"
          >
            <div
              className="grid gap-[2px] sm:gap-1 select-none touch-none"
              style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
              onMouseLeave={() => isDragging && finishSelection()}
              onMouseUp={finishSelection}
              onTouchEnd={finishSelection}
            >
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const key = `${r}-${c}`;
                  const isFound = foundCells.has(key);
                  const isSelected = selectionSet.has(key);
                  return (
                    <div
                      key={key}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                        setStart([r, c]);
                        setCurrent([r, c]);
                      }}
                      onMouseEnter={() => isDragging && setCurrent([r, c])}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                        setStart([r, c]);
                        setCurrent([r, c]);
                      }}
                      onTouchMove={(e) => {
                        const t = e.touches[0];
                        const el = document.elementFromPoint(t.clientX, t.clientY) as HTMLElement | null;
                        const k = el?.dataset?.cell;
                        if (k) {
                          const [rr, cc] = k.split("-").map(Number);
                          setCurrent([rr, cc]);
                        }
                      }}
                      data-cell={key}
                      className={`aspect-square flex items-center justify-center font-heading text-[0.65rem] sm:text-sm uppercase tracking-wider rounded-sm border transition-colors cursor-pointer ${
                        isFound
                          ? "bg-neon/30 border-neon text-neon text-3d-neon"
                          : isSelected
                          ? "bg-neon/40 border-neon text-background"
                          : "bg-background/40 border-border/40 text-silver hover:border-neon/40"
                      }`}
                    >
                      {cell.letter}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* Words list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-6 sm:p-8"
          >
            <h3 className="font-heading text-lg uppercase tracking-[0.25em] text-neon mb-2">
              Find these legends
            </h3>
            <p className="font-body text-sm text-silver/80 mb-6">
              Click and drag across the grid to select letters. Words run horizontally, vertically and diagonally — forwards and backwards.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {placed.map((w) => (
                <div
                  key={w}
                  className={`text-left font-heading text-sm uppercase tracking-wider px-3 py-2 rounded border transition-all ${
                    found.has(w)
                      ? "border-neon text-neon bg-neon/10 line-through"
                      : "border-border/50 text-silver-bright"
                  }`}
                >
                  {w}
                </div>
              ))}
            </div>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 font-heading text-xs uppercase tracking-[0.25em] text-silver-bright hover:text-neon transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              New puzzle
            </button>

            <div className="section-divider my-6" />
            <p className="font-body text-xs text-silver/70">
              Progress: <span className="text-neon">{found.size}</span> / {placed.length}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WordSearchSection;