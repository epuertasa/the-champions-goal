import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Eye, Target, HelpCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import spotDiff from "@/assets/spot-diff-1.jpg";
import hiddenPlayer from "@/assets/hidden-player.jpg";

const SHOT_ZONES = [
  { id: "tl", label: "Top Left", x: "18%", y: "22%" },
  { id: "tc", label: "Top Center", x: "50%", y: "18%" },
  { id: "tr", label: "Top Right", x: "82%", y: "22%" },
  { id: "bl", label: "Bottom Left", x: "18%", y: "70%" },
  { id: "bc", label: "Bottom Center", x: "50%", y: "75%" },
  { id: "br", label: "Bottom Right", x: "82%", y: "70%" },
];

const FanZoneSection = () => {
  const [guesses, setGuesses] = useState<string[]>(["", "", ""]);
  const [showAnswers, setShowAnswers] = useState(false);
  const hiddenPlayers = ["Ronaldinho", "Beckham", "Kaka"];

  // Penalty shootout state
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [keeperZone, setKeeperZone] = useState("bc");
  const [shotZone, setShotZone] = useState<string | null>(null);
  const [diveZone, setDiveZone] = useState<string | null>(null);
  const [result, setResult] = useState<"goal" | "saved" | null>(null);
  const [shooting, setShooting] = useState(false);
  const moveRef = useRef<number | null>(null);

  useEffect(() => {
    if (shooting) return;
    const tick = () => {
      setKeeperZone(SHOT_ZONES[Math.floor(Math.random() * SHOT_ZONES.length)].id);
    };
    moveRef.current = window.setInterval(tick, 600);
    return () => {
      if (moveRef.current) window.clearInterval(moveRef.current);
    };
  }, [shooting]);

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

  const activeKeeperZone = SHOT_ZONES.find((z) => z.id === keeperZone)!;

  return (
    <section id="fan-zone" className="py-24 px-6">
      <div className="container mx-auto">
        <SectionHeader icon={Gamepad2} label="Post 4" title="The Fan Zone" />

        <div className="grid md:grid-cols-3 gap-8">
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

          {/* Activity 2: Penalty Shootout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-neon" />
              <h3 className="font-heading text-lg uppercase tracking-wider text-silver-bright">
                Penalty Shootout
              </h3>
            </div>

            <p className="font-body text-xs text-silver mb-3">
              Pick a corner of the goal to shoot. The keeper moves randomly —
              outguess him and score!
            </p>

            <div className="flex items-center justify-between mb-3 font-heading text-xs uppercase tracking-wider">
              <span className="text-silver">Score: <span className="text-neon">{score}</span></span>
              <span className="text-silver">Shots: <span className="text-silver-bright">{attempts}</span></span>
            </div>

            {/* Pitch + Goal */}
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-neon/30 bg-gradient-to-b from-green-700 via-green-600 to-green-800">
              {/* Pitch stripes */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0 12px, transparent 12px 24px)",
                }}
              />
              {/* Penalty arc */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-32 h-10 border-t-2 border-white/60 rounded-t-full" />

              {/* Goal frame */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[82%] h-[55%] border-4 border-white rounded-sm bg-black/30 backdrop-blur-[1px]">
                {/* Net */}
                <div className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />

                {/* Shot zones (clickable targets) */}
                {SHOT_ZONES.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => shoot(z.id)}
                    disabled={shooting}
                    aria-label={`Shoot ${z.label}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border-2 border-neon/70 bg-neon/10 hover:bg-neon/40 hover:scale-110 transition-all disabled:cursor-not-allowed"
                    style={{ left: z.x, top: z.y }}
                  />
                ))}

                {/* Goalkeeper */}
                <motion.div
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  animate={{ left: activeKeeperZone.x, top: activeKeeperZone.y }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  style={{ left: activeKeeperZone.x, top: activeKeeperZone.y }}
                >
                  <div className="text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">🧤</div>
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
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xl"
                  >
                    ⚽
                  </motion.div>
                )}
              </div>

              {/* Ball at penalty spot when idle */}
              {!shotZone && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-4 text-xl">⚽</div>
              )}

              {/* Result overlay */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-background/60"
                >
                  <span className={`font-display text-3xl uppercase tracking-widest ${
                    result === "goal" ? "text-neon" : "text-destructive"
                  }`}>
                    {result === "goal" ? "GOAL!" : "SAVED!"}
                  </span>
                </motion.div>
              )}
            </div>

            <button
              onClick={resetGame}
              className="mt-4 w-full py-2 font-heading text-xs uppercase tracking-widest bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-colors"
            >
              Reset Match
            </button>

            <p className="mt-3 text-xs text-muted-foreground font-body text-center">
              Click a glowing target inside the goal to shoot!
            </p>
          </motion.div>

          {/* Activity 3: The Hidden Ball */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
