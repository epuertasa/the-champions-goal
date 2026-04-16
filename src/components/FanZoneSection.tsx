import { useState } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Eye, Grid3X3, HelpCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import spotDiff from "@/assets/spot-diff-1.jpg";
import hiddenPlayer from "@/assets/hidden-player.jpg";

// Crossword grid data
const crosswordGrid = [
  ["M", "E", "S", "S", "I", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["R", "O", "N", "A", "L", "D", "O", ""],
  ["", "", "", "", "", "", "", ""],
  ["Z", "I", "D", "A", "N", "E", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["N", "E", "Y", "M", "A", "R", "", ""],
  ["", "", "", "", "", "", "", ""],
];

const clues = [
  "Argentine maestro with 8 Ballon d'Or awards",
  "All-time UCL top scorer from Portugal",
  "French icon famous for his 2002 final volley",
  "Brazilian forward known for flair and skill",
];

const FanZoneSection = () => {
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false]);
  const [guesses, setGuesses] = useState<string[]>(["", "", ""]);
  const [showAnswers, setShowAnswers] = useState(false);
  const hiddenPlayers = ["Ronaldinho", "Beckham", "Kaka"];

  const revealCell = (row: number) => {
    setRevealed((prev) => {
      const next = [...prev];
      next[row] = true;
      return next;
    });
  };

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

          {/* Activity 2: UCL Crossword */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Grid3X3 className="h-5 w-5 text-neon" />
              <h3 className="font-heading text-lg uppercase tracking-wider text-silver-bright">
                UCL Crossword
              </h3>
            </div>

            <div className="flex-1">
              <div className="grid gap-0.5 mb-4" style={{ gridTemplateColumns: `repeat(8, 1fr)` }}>
                {crosswordGrid.flat().map((cell, i) => {
                  const row = Math.floor(i / 8);
                  const isRevealed = revealed[Math.floor(row / 2)];
                  const isEmpty = cell === "";
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-xs font-heading uppercase ${
                        isEmpty
                          ? "bg-transparent"
                          : isRevealed
                          ? "bg-primary/30 text-silver-bright border border-neon/40"
                          : "bg-secondary border border-border text-muted-foreground cursor-pointer hover:bg-primary/20 transition-colors"
                      }`}
                      onClick={() => !isEmpty && !isRevealed && revealCell(Math.floor(row / 2))}
                    >
                      {isEmpty ? "" : isRevealed ? cell : "?"}
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2">
                <p className="font-heading text-xs uppercase tracking-wider text-silver mb-1">Clues:</p>
                {clues.map((clue, i) => (
                  <p key={i} className="text-xs text-silver font-body">
                    <span className="text-neon font-heading mr-1">{i + 1}.</span>
                    {clue}
                  </p>
                ))}
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground font-body text-center">
              Click the cells to reveal the players!
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
