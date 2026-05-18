import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Eye, Target, Shuffle, RotateCcw, Lightbulb, Check, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";
import spotDiff from "@/assets/spot-diff-ucl.jpg";

const SHOT_ZONES = [
  { id: "tl", label: "Top Left", x: "18%", y: "22%" },
  { id: "tc", label: "Top Center", x: "50%", y: "18%" },
  { id: "tr", label: "Top Right", x: "82%", y: "22%" },
  { id: "bl", label: "Bottom Left", x: "18%", y: "70%" },
  { id: "bc", label: "Bottom Center", x: "50%", y: "75%" },
  { id: "br", label: "Bottom Right", x: "82%", y: "70%" },
];

// Hotspots are positioned on the RIGHT panel of the spot-the-difference image.
// x is the percentage across the FULL image (so 50–100% lives on the right half).
const DIFF_SPOTS = [
  { id: 1, x: "76%", y: "20%" },   // scoreboard area
  { id: 2, x: "63%", y: "62%" },   // orange ad screen
  { id: 3, x: "55%", y: "82%" },   // ball / centre circle
  { id: 4, x: "70%", y: "78%" },   // referee position
  { id: 5, x: "88%", y: "78%" },   // right-side player jersey
  { id: 6, x: "53%", y: "72%" },   // left-side player
  { id: 7, x: "95%", y: "30%" },   // stadium light
  { id: 8, x: "60%", y: "30%" },   // upper stand banner
  { id: 9, x: "82%", y: "55%" },   // mid-stand crowd patch
  { id: 10, x: "98%", y: "70%" },  // corner flag area
];

const Keeper = ({ diving }: { diving: "left" | "right" | "center" | null }) => {
  const rotate = diving === "left" ? -55 : diving === "right" ? 55 : 0;
  return (
    <motion.svg
      viewBox="0 0 80 120"
      className="w-16 h-24 md:w-20 md:h-28 drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]"
      animate={{ rotate }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
    >
      {/* Head */}
      <circle cx="40" cy="16" r="10" fill="#f4c79a" stroke="#000" strokeWidth="1.5" />
      <path d="M30 14 Q40 4 50 14" fill="#3a2a1a" />
      {/* Jersey */}
      <path d="M22 30 L58 30 L62 70 L18 70 Z" fill="#facc15" stroke="#000" strokeWidth="1.5" />
      <text x="40" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#000">1</text>
      {/* Arms (gloves) */}
      <path d="M22 32 L6 50 L10 60 L26 44 Z" fill="#facc15" stroke="#000" strokeWidth="1.5" />
      <circle cx="8" cy="55" r="6" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
      <path d="M58 32 L74 50 L70 60 L54 44 Z" fill="#facc15" stroke="#000" strokeWidth="1.5" />
      <circle cx="72" cy="55" r="6" fill="#ef4444" stroke="#000" strokeWidth="1.5" />
      {/* Shorts */}
      <path d="M20 70 L60 70 L58 88 L42 88 L40 78 L38 88 L22 88 Z" fill="#1e293b" stroke="#000" strokeWidth="1.5" />
      {/* Legs */}
      <rect x="26" y="88" width="10" height="22" fill="#f4c79a" stroke="#000" strokeWidth="1.5" />
      <rect x="44" y="88" width="10" height="22" fill="#f4c79a" stroke="#000" strokeWidth="1.5" />
      {/* Boots */}
      <ellipse cx="31" cy="113" rx="8" ry="4" fill="#000" />
      <ellipse cx="49" cy="113" rx="8" ry="4" fill="#000" />
    </motion.svg>
  );
};

const FanZoneSection = () => {
  // Spot the difference state
  const [foundDiffs, setFoundDiffs] = useState<number[]>([]);
  const [missClick, setMissClick] = useState<{ x: number; y: number } | null>(null);
  const [popups, setPopups] = useState<{ key: number; x: string; y: string }[]>([]);
  const [flash, setFlash] = useState(false);

  const handleDiffClick = (id: number, x: string, y: string) => {
    if (foundDiffs.includes(id)) return;
    setFoundDiffs((prev) => [...prev, id]);
    const key = Date.now() + id;
    setPopups((p) => [...p, { key, x, y }]);
    setFlash(true);
    setTimeout(() => setFlash(false), 350);
    setTimeout(() => setPopups((p) => p.filter((pp) => pp.key !== key)), 1200);
  };

  const handleMiss = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMissClick({ x, y });
    setTimeout(() => setMissClick(null), 500);
  };

  const resetDiffs = () => setFoundDiffs([]);

  // Penalty shootout state
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [keeperZone, setKeeperZone] = useState("bc");
  const [shotZone, setShotZone] = useState<string | null>(null);
  const [diveZone, setDiveZone] = useState<string | null>(null);
  const [result, setResult] = useState<"goal" | "saved" | null>(null);
  const [shooting, setShooting] = useState(false);
  const moveRef = useRef<number | null>(null);
  // Idle side-to-side patrol position (0% -> 100% across goal)
  const [patrolX, setPatrolX] = useState(20);
  const [patrolDir, setPatrolDir] = useState(1);

  useEffect(() => {
    if (shooting) return;
    const tick = () => {
      setPatrolX((x) => {
        let next = x + patrolDir * 4;
        if (next > 80) {
          next = 80;
          setPatrolDir(-1);
        } else if (next < 20) {
          next = 20;
          setPatrolDir(1);
        }
        return next;
      });
    };
    moveRef.current = window.setInterval(tick, 80);
    return () => {
      if (moveRef.current) window.clearInterval(moveRef.current);
    };
  }, [shooting, patrolDir]);

  const shoot = (zoneId: string) => {
    if (shooting) return;
    setShooting(true);
    setShotZone(zoneId);
    const dive = SHOT_ZONES[Math.floor(Math.random() * SHOT_ZONES.length)].id;
    setDiveZone(dive);
    setKeeperZone(dive);
    setTimeout(() => {
      const saved = dive === zoneId;
      setResult(saved ? "saved" : "goal");
      setAttempts((a) => a + 1);
      if (!saved) setScore((s) => s + 1);
      setTimeout(() => {
        setShotZone(null);
        setDiveZone(null);
        setResult(null);
        setShooting(false);
      }, 1400);
    }, 700);
  };

  const resetGame = () => {
    setScore(0);
    setAttempts(0);
    setShotZone(null);
    setDiveZone(null);
    setResult(null);
    setShooting(false);
  };

  const diveTarget = diveZone ? SHOT_ZONES.find((z) => z.id === diveZone)! : null;
  const keeperLeft = diveTarget ? diveTarget.x : `${patrolX}%`;
  const keeperTop = diveTarget ? diveTarget.y : "55%";
  const diveSide: "left" | "right" | "center" | null = diveTarget
    ? diveTarget.id.endsWith("l")
      ? "left"
      : diveTarget.id.endsWith("r")
      ? "right"
      : "center"
    : null;

  return (
    <section id="fan-zone" className="py-24 px-6">
      <div className="container mx-auto">
        <SectionHeader icon={Gamepad2} label="Post 4" title="The Fan Zone" />

        {/* Penalty Shootout — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-neon" />
              <h3 className="font-heading text-xl uppercase tracking-wider text-silver-bright">
                Penalty Shootout
              </h3>
            </div>
            <div className="flex items-center gap-6 font-heading text-sm uppercase tracking-wider">
              <span className="text-silver">Score: <span className="text-neon">{score}</span></span>
              <span className="text-silver">Shots: <span className="text-silver-bright">{attempts}</span></span>
              <button
                onClick={resetGame}
                className="px-4 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors text-xs"
              >
                Reset
              </button>
            </div>
          </div>

          <p className="font-body text-sm text-silver mb-4">
            Pick a corner of the goal to shoot. The keeper patrols side to side and
            dives randomly — outguess him to score!
          </p>

          {/* Pitch + Goal — full width */}
          <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden border border-neon/30 bg-gradient-to-b from-green-700 via-green-600 to-green-800">
            {/* Pitch stripes */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 18px, transparent 18px 36px)",
              }}
            />
            {/* Penalty arc */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-64 h-16 border-t-2 border-white/60 rounded-t-full" />

            {/* Goal frame */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[70%] h-[68%] border-4 border-white rounded-sm bg-black/30 backdrop-blur-[1px]">
              {/* Net */}
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Shot zones (clickable targets) */}
              {SHOT_ZONES.map((z) => (
                <button
                  key={z.id}
                  onClick={() => shoot(z.id)}
                  disabled={shooting}
                  aria-label={`Shoot ${z.label}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-neon/70 bg-neon/10 hover:bg-neon/40 hover:scale-110 transition-all disabled:cursor-not-allowed z-10"
                  style={{ left: z.x, top: z.y }}
                />
              ))}

              {/* Goalkeeper */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                animate={{ left: keeperLeft, top: keeperTop }}
                transition={{
                  type: diveTarget ? "spring" : "tween",
                  duration: diveTarget ? undefined : 0.08,
                  stiffness: 220,
                  damping: 16,
                }}
                style={{ left: keeperLeft, top: keeperTop }}
              >
                <Keeper diving={diveSide} />
              </motion.div>

              {/* Ball animation */}
              {shotZone && (
                <motion.div
                  initial={{ left: "50%", top: "115%", scale: 1 }}
                  animate={{
                    left: SHOT_ZONES.find((z) => z.id === shotZone)!.x,
                    top: SHOT_ZONES.find((z) => z.id === shotZone)!.y,
                    scale: 0.7,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-2xl z-20"
                >
                  ⚽
                </motion.div>
              )}
            </div>

            {/* Ball at penalty spot when idle */}
            {!shotZone && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-6 text-3xl">⚽</div>
            )}

            {/* Result overlay */}
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-background/60"
              >
                <span
                  className={`font-display text-5xl md:text-6xl uppercase tracking-widest ${
                    result === "goal" ? "text-neon" : "text-destructive"
                  }`}
                >
                  {result === "goal" ? "GOAL!" : "SAVED!"}
                </span>
              </motion.div>
            )}
          </div>

          <p className="mt-4 text-xs text-muted-foreground font-body text-center">
            Click a glowing target inside the goal to shoot!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Activity 1: Spot the Difference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-neon" />
                <h3 className="font-heading text-lg uppercase tracking-wider text-silver-bright">
                  Spot the Difference
                </h3>
              </div>
              <div className="flex items-center gap-3 font-heading text-xs uppercase tracking-wider">
                <span className="text-silver">
                  Found: <span className="text-neon">{foundDiffs.length}</span>/10
                </span>
                <button
                  onClick={resetDiffs}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors text-[10px]"
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="font-body text-xs text-silver mb-4">
              Click on the right image to find the 10 hidden differences between the two scenes.
            </p>
            <div
              className="relative glass-card overflow-hidden neon-border flex-1 cursor-crosshair select-none"
              onClick={handleMiss}
            >
              <img
                src={spotDiff}
                alt="Spot the difference UCL match comparison"
                loading="lazy"
                width={1600}
                height={800}
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Hotspots */}
              {DIFF_SPOTS.map((spot) => {
                const found = foundDiffs.includes(spot.id);
                return (
                  <motion.button
                    key={spot.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDiffClick(spot.id, spot.x, spot.y);
                    }}
                    whileHover={{ scale: 1.15 }}
                    animate={
                      found
                        ? { scale: [1, 1.6, 1], rotate: [0, 15, -15, 0] }
                        : { scale: [1, 1.05, 1] }
                    }
                    transition={
                      found
                        ? { duration: 0.6 }
                        : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                    }
                    aria-label={`Difference ${spot.id}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all"
                    style={{
                      left: spot.x,
                      top: spot.y,
                      width: "8%",
                      paddingBottom: "8%",
                      height: 0,
                      border: found
                        ? "3px solid hsl(var(--neon))"
                        : "2px dashed hsl(var(--neon) / 0.25)",
                      background: found
                        ? "hsl(var(--neon) / 0.25)"
                        : "transparent",
                      boxShadow: found
                        ? "0 0 28px hsl(var(--neon) / 0.9), inset 0 0 12px hsl(var(--neon) / 0.6)"
                        : "none",
                    }}
                  />
                );
              })}

              {/* Found popups: floating "+1 / FOUND!" + ripple burst */}
              {popups.map((p) => (
                <div
                  key={p.key}
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{ left: p.x, top: p.y }}
                >
                  {/* Ripple rings */}
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0.9 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.9, delay, ease: "easeOut" }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-neon"
                    />
                  ))}
                  {/* Confetti sparks */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const dx = Math.cos(angle) * 60;
                    const dy = Math.sin(angle) * 60;
                    return (
                      <motion.span
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: dx, y: dy, opacity: 0, scale: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-neon"
                        style={{ boxShadow: "0 0 10px hsl(var(--neon))" }}
                      />
                    );
                  })}
                  {/* Floating label */}
                  <motion.div
                    initial={{ y: 0, opacity: 0, scale: 0.6 }}
                    animate={{ y: -50, opacity: [0, 1, 1, 0], scale: 1.1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-base md:text-xl uppercase tracking-widest text-neon whitespace-nowrap"
                    style={{ textShadow: "0 0 12px hsl(var(--neon))" }}
                  >
                    +1 · Found!
                  </motion.div>
                </div>
              ))}

              {/* Screen flash on hit */}
              {flash && (
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 pointer-events-none bg-neon/30"
                />
              )}

              {/* Miss feedback */}
              {missClick && (
                <div
                  className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${missClick.x}%`, top: `${missClick.y}%` }}
                >
                  <motion.div
                    initial={{ opacity: 1, scale: 0.4 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-full border-2 border-destructive"
                  />
                  <motion.span
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-xs uppercase tracking-widest text-destructive"
                  >
                    Miss
                  </motion.span>
                </div>
              )}

              {/* Win overlay */}
              {foundDiffs.length === 10 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/70"
                >
                  <span className="font-display text-3xl md:text-4xl uppercase tracking-widest text-neon">
                    All 10 found!
                  </span>
                </motion.div>
              )}
            </div>
            <p className="mt-3 text-xs text-muted-foreground font-body text-center">
              Hint: Check the scoreboard, the ad screens, the players & the stadium lights
            </p>
          </motion.div>

          {/* Activity 3: Scrambled Legends */}
          <ScrambledLegends />
        </div>
      </div>
    </section>
  );
};

export default FanZoneSection;

// ============================================================
// Scrambled Legends — guess the UCL legend from shuffled letters
// ============================================================

type Difficulty = "easy" | "medium" | "hard" | "expert";

const LEGEND_POOL: Record<Difficulty, { name: string; hint: string }[]> = {
  easy: [
    { name: "MESSI", hint: "Argentina · 8x Ballon d'Or" },
    { name: "RONALDO", hint: "Portugal · UCL all-time top scorer" },
    { name: "NEYMAR", hint: "Brazil · Barcelona & PSG star" },
    { name: "MBAPPE", hint: "France · World Cup winner 2018" },
    { name: "BENZEMA", hint: "France · Real Madrid #9, Ballon d'Or 2022" },
    { name: "ZIDANE", hint: "France · Volley vs Leverkusen 2002" },
  ],
  medium: [
    { name: "MODRIC", hint: "Croatia · Real Madrid midfield maestro" },
    { name: "INIESTA", hint: "Spain · Barcelona midfield magician" },
    { name: "SUAREZ", hint: "Uruguay · Liverpool & Barcelona striker" },
    { name: "LEWANDOWSKI", hint: "Poland · Bayern & Barcelona goal machine" },
    { name: "KROOS", hint: "Germany · Real Madrid passer, 6x UCL" },
    { name: "RAMOS", hint: "Spain · 93:20 vs Atletico" },
  ],
  hard: [
    { name: "SHEVCHENKO", hint: "Ukraine · Milan #7, 2004 Ballon d'Or" },
    { name: "RIVALDO", hint: "Brazil · 1999 Ballon d'Or, Barcelona" },
    { name: "NEDVED", hint: "Czechia · Juventus dynamo, 2003 Ballon d'Or" },
    { name: "PIRLO", hint: "Italy · Milan & Juventus deep-lying playmaker" },
    { name: "MALDINI", hint: "Italy · Milan captain, 5x UCL" },
    { name: "FIGO", hint: "Portugal · Barca to Real Madrid 2000" },
  ],
  expert: [
    { name: "SEEDORF", hint: "Netherlands · UCL with 3 different clubs" },
    { name: "RIQUELME", hint: "Argentina · Villarreal & Boca No.10" },
    { name: "LAUDRUP", hint: "Denmark · Barca Dream Team genius" },
    { name: "STOICHKOV", hint: "Bulgaria · 1994 Ballon d'Or" },
    { name: "HAGI", hint: "Romania · 'Maradona of the Carpathians'" },
    { name: "KOEMAN", hint: "Netherlands · 1992 UCL final winner for Barca" },
  ],
};

const DIFF_META: { id: Difficulty; label: string; color: string; rounds: number }[] = [
  { id: "easy", label: "Easy", color: "text-emerald-400 border-emerald-400/40", rounds: 5 },
  { id: "medium", label: "Medium", color: "text-sky-400 border-sky-400/40", rounds: 5 },
  { id: "hard", label: "Hard", color: "text-amber-400 border-amber-400/40", rounds: 5 },
  { id: "expert", label: "Expert", color: "text-fuchsia-400 border-fuchsia-400/40", rounds: 5 },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const scrambleWord = (w: string) => {
  let out = w;
  let tries = 0;
  while (out === w && tries < 20) {
    out = shuffle(w.split("")).join("");
    tries++;
  }
  return out;
};

const ScrambledLegends = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [roundIdx, setRoundIdx] = useState(0);
  const [solved, setSolved] = useState<number>(0);
  const [revealed, setRevealed] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const [feedback, setFeedback] = useState<"ok" | "fail" | null>(null);
  const [seed, setSeed] = useState(0);

  // Build a fresh playlist whenever difficulty or seed changes
  const playlist = useMemo(
    () => shuffle(LEGEND_POOL[difficulty]).slice(0, DIFF_META.find((d) => d.id === difficulty)!.rounds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [difficulty, seed]
  );

  const current = playlist[roundIdx];

  // Letter tile state
  const [tiles, setTiles] = useState<{ ch: string; placed: boolean; id: number }[]>([]);
  const [answer, setAnswer] = useState<{ ch: string; tileId: number }[]>([]);

  useEffect(() => {
    if (!current) return;
    const scrambled = scrambleWord(current.name);
    setTiles(scrambled.split("").map((ch, id) => ({ ch, id, placed: false })));
    setAnswer([]);
    setRevealed(false);
    setHintShown(false);
    setFeedback(null);
  }, [current]);

  // Auto-check when answer is full
  useEffect(() => {
    if (!current || answer.length !== current.name.length) return;
    const guess = answer.map((a) => a.ch).join("");
    if (guess === current.name) {
      setFeedback("ok");
      setSolved((s) => s + 1);
      setTimeout(() => nextRound(), 1100);
    } else {
      setFeedback("fail");
      setTimeout(() => setFeedback(null), 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  const placeTile = (id: number) => {
    if (revealed || feedback === "ok") return;
    const tile = tiles.find((t) => t.id === id);
    if (!tile || tile.placed) return;
    setTiles((t) => t.map((x) => (x.id === id ? { ...x, placed: true } : x)));
    setAnswer((a) => [...a, { ch: tile.ch, tileId: id }]);
  };

  const removeAnswer = (idx: number) => {
    if (revealed || feedback === "ok") return;
    const item = answer[idx];
    if (!item) return;
    setAnswer((a) => a.filter((_, i) => i !== idx));
    setTiles((t) => t.map((x) => (x.id === item.tileId ? { ...x, placed: false } : x)));
  };

  const nextRound = () => {
    if (roundIdx + 1 >= playlist.length) {
      // Loop / refresh
      setRoundIdx(0);
      setSeed((s) => s + 1);
      setSolved(0);
    } else {
      setRoundIdx((r) => r + 1);
    }
  };

  const skip = () => {
    setRevealed(true);
    setTimeout(() => nextRound(), 1400);
  };

  const switchDifficulty = (d: Difficulty) => {
    setDifficulty(d);
    setRoundIdx(0);
    setSolved(0);
    setSeed((s) => s + 1);
  };

  const reshuffle = () => {
    if (!current) return;
    const scrambled = scrambleWord(current.name);
    setTiles(scrambled.split("").map((ch, id) => ({ ch, id, placed: false })));
    setAnswer([]);
  };

  const meta = DIFF_META.find((d) => d.id === difficulty)!;

  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 }}
      className="glass-card p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Shuffle className="h-5 w-5 text-neon" />
          <h3 className="font-heading text-lg uppercase tracking-wider text-silver-bright">
            Scrambled Legends
          </h3>
        </div>
        <div className="flex items-center gap-3 font-heading text-xs uppercase tracking-wider">
          <span className="text-silver">
            Round <span className="text-neon">{roundIdx + 1}</span>/{playlist.length}
          </span>
          <span className="text-silver">
            Solved <span className="text-neon">{solved}</span>
          </span>
        </div>
      </div>

      {/* Difficulty selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {DIFF_META.map((d) => (
          <button
            key={d.id}
            onClick={() => switchDifficulty(d.id)}
            className={`font-heading text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 rounded border transition-all ${
              d.id === difficulty
                ? `${d.color} bg-background/50`
                : "border-border/50 text-silver hover:border-neon/50 hover:text-neon"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <p className="font-body text-xs text-silver mb-3">
        Unscramble the legend's name. Click letters to build the answer · click placed letters to remove them.
      </p>

      {/* Answer slots */}
      <div className={`relative rounded-lg border-2 px-3 py-4 mb-4 transition-colors ${
        feedback === "ok"
          ? "border-emerald-400 bg-emerald-400/10"
          : feedback === "fail"
          ? "border-destructive bg-destructive/10 animate-pulse"
          : "border-neon/30 bg-background/40"
      }`}>
        <div className="flex flex-wrap justify-center gap-1.5 min-h-[3rem]">
          {Array.from({ length: current.name.length }).map((_, i) => {
            const slot = answer[i];
            return (
              <button
                key={i}
                onClick={() => slot && removeAnswer(i)}
                disabled={!slot}
                className={`w-9 h-11 md:w-10 md:h-12 rounded border font-heading text-lg md:text-xl uppercase flex items-center justify-center transition-all ${
                  slot
                    ? "bg-neon/20 border-neon text-silver-bright hover:bg-destructive/30 hover:border-destructive cursor-pointer"
                    : "bg-background/60 border-border text-muted-foreground"
                }`}
              >
                {revealed ? current.name[i] : slot?.ch ?? ""}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {feedback === "ok" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-white font-heading text-[10px] uppercase tracking-widest flex items-center gap-1"
            >
              <Check className="h-3 w-3" /> Correct
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Letter tiles */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-4 min-h-[3rem]">
        {tiles.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => placeTile(t.id)}
            whileHover={!t.placed ? { y: -3, scale: 1.05 } : {}}
            whileTap={!t.placed ? { scale: 0.92 } : {}}
            animate={{ opacity: t.placed ? 0.2 : 1 }}
            disabled={t.placed || revealed}
            className={`w-9 h-11 md:w-10 md:h-12 rounded font-heading text-lg md:text-xl uppercase border transition-colors ${
              t.placed
                ? "bg-background/30 border-border/40 text-muted-foreground cursor-not-allowed"
                : "bg-gradient-to-b from-navy-mid to-background border-neon/50 text-silver-bright hover:border-neon hover:text-neon shadow-[0_2px_0_hsl(var(--neon)/0.4)]"
            }`}
          >
            {t.ch}
          </motion.button>
        ))}
      </div>

      {/* Hint */}
      <AnimatePresence>
        {hintShown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 px-3 py-2 rounded border border-amber-400/40 bg-amber-400/5 text-xs text-amber-200 font-body"
          >
            💡 {current.hint}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="grid grid-cols-3 gap-2 mt-auto">
        <button
          onClick={() => setHintShown(true)}
          disabled={hintShown}
          className="inline-flex items-center justify-center gap-1.5 py-2 font-heading text-[10px] uppercase tracking-widest bg-secondary text-silver-bright border border-border rounded hover:border-amber-400/60 hover:text-amber-300 transition-colors disabled:opacity-50"
        >
          <Lightbulb className="h-3.5 w-3.5" /> Hint
        </button>
        <button
          onClick={reshuffle}
          className="inline-flex items-center justify-center gap-1.5 py-2 font-heading text-[10px] uppercase tracking-widest bg-secondary text-silver-bright border border-border rounded hover:border-neon/60 hover:text-neon transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reshuffle
        </button>
        <button
          onClick={skip}
          className="inline-flex items-center justify-center gap-1.5 py-2 font-heading text-[10px] uppercase tracking-widest bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors"
        >
          Reveal · Skip
        </button>
      </div>

      {solved >= playlist.length && (
        <div className="mt-4 flex items-center justify-center gap-2 font-heading text-xs uppercase tracking-widest text-neon">
          <Trophy className="h-4 w-4" /> {meta.label} cleared!
        </div>
      )}
    </motion.div>
  );
};
