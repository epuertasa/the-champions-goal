import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Eye, Target, HelpCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import spotDiff from "@/assets/spot-diff-ucl.jpg";
import hiddenPlayer from "@/assets/hidden-player.jpg";

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
  const [guesses, setGuesses] = useState<string[]>(["", "", ""]);
  const [showAnswers, setShowAnswers] = useState(false);
  const hiddenPlayers = ["Ronaldinho", "Beckham", "Kaka"];

  // Spot the difference state
  const [foundDiffs, setFoundDiffs] = useState<number[]>([]);
  const [missClick, setMissClick] = useState<{ x: number; y: number } | null>(null);

  const handleDiffClick = (id: number) => {
    if (foundDiffs.includes(id)) return;
    setFoundDiffs((prev) => [...prev, id]);
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
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5 text-neon" />
              <h3 className="font-heading text-lg uppercase tracking-wider text-silver-bright">
                Spot the Difference
              </h3>
            </div>
            <p className="font-body text-xs text-silver mb-4">
              Compare the two stadium images below. Can you find the hidden differences?
            </p>
            <div className="relative glass-card overflow-hidden neon-border flex-1">
              <img
                src={spotDiff}
                alt="Spot the difference UCL match comparison"
                loading="lazy"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground font-body text-center">
              Hint: Look at the player positions, stadium lights &amp; scoreboard
            </p>
          </motion.div>

          {/* Activity 3: The Hidden Ball */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-neon" />
              <h3 className="font-heading text-lg uppercase tracking-wider text-silver-bright">
                The Hidden Ball
              </h3>
            </div>
            <p className="font-body text-xs text-silver mb-4">
              Guess the legendary player from the silhouette! Type your answers below.
            </p>

            <div className="relative glass-card overflow-hidden neon-border mb-4">
              <img
                src={hiddenPlayer}
                alt="Mystery player silhouette"
                loading="lazy"
                width={800}
                height={600}
                className={`w-full aspect-[4/3] object-cover transition-all duration-700 ${
                  showAnswers ? "blur-0" : "blur-sm"
                }`}
              />
            </div>

            <div className="space-y-2 flex-1">
              {hiddenPlayers.map((player, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-neon font-heading text-sm">{i + 1}.</span>
                  <input
                    type="text"
                    placeholder={`Player ${i + 1}...`}
                    value={guesses[i]}
                    onChange={(e) => {
                      const next = [...guesses];
                      next[i] = e.target.value;
                      setGuesses(next);
                    }}
                    className="flex-1 bg-secondary border border-border rounded px-3 py-1.5 text-xs text-silver-bright font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                  />
                  {showAnswers && (
                    <span className={`text-xs font-heading ${
                      guesses[i].toLowerCase().trim() === player.toLowerCase()
                        ? "text-green-400"
                        : "text-destructive"
                    }`}>
                      {player}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="mt-4 w-full py-2 font-heading text-xs uppercase tracking-widest bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors"
            >
              {showAnswers ? "Hide Answers" : "Reveal Answers"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FanZoneSection;
