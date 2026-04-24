import { motion } from "framer-motion";
import { Goal, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";

const goals = [
  {
    player: "Zinedine Zidane",
    club: "Real Madrid",
    match: "vs Bayer Leverkusen",
    competition: "UCL Final 2002",
    description:
      "Impossible left-footed volley from the edge of the box. Widely regarded as the greatest goal ever scored in a Champions League final.",
    videoId: "6dRBdHQEFcM",
  },
  {
    player: "Lionel Messi",
    club: "FC Barcelona",
    match: "vs Real Madrid",
    competition: "UCL Semifinal 2011",
    description:
      "A mesmerising slalom from midfield, slicing through half of the Madrid defence before coolly slotting it past Casillas.",
    videoId: "RmF9hgkvW_U",
  },
  {
    player: "Cristiano Ronaldo",
    club: "Real Madrid",
    match: "vs Juventus",
    competition: "UCL Quarterfinal 2018",
    description:
      "A breathtaking bicycle kick almost three metres in the air. Even the Juventus Stadium rose to its feet to applaud him.",
    videoId: "Pn5DvD9NFoo",
  },
  {
    player: "Steven Gerrard",
    club: "Liverpool",
    match: "vs AC Milan",
    competition: "UCL Final 2005",
    description:
      "The header that sparked the most epic comeback in history: the Miracle of Istanbul after trailing 3-0 at half-time.",
    videoId: "tF5UTJ9YchE",
  },
  {
    player: "Dejan Stankovic",
    club: "Inter Milan",
    match: "vs Schalke 04",
    competition: "UCL Quarterfinal 2011",
    description:
      "A first-time volley from outside the box just 25 seconds into the match. One of the fastest goals in the competition's history.",
    videoId: "ApwUYscyJBs",
  },
  {
    player: "Roberto Carlos",
    club: "Real Madrid",
    match: "vs Manchester United",
    competition: "UCL Quarterfinal 2003",
    description:
      "An outside-of-the-boot left-footed volley inside the box. Pure Brazilian magic at Old Trafford.",
    videoId: "1Sz9hBYHwVI",
  },
];

const BestGoalsSection = () => (
  <section id="best-goals" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader
        icon={Goal}
        label="Top Strikes"
        title="Best Champions Goals"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <motion.article
            key={goal.player}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-card neon-border p-6 flex flex-col group hover:-translate-y-1 transition-transform"
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-glass-border mb-5 bg-navy-deep/60">
              <iframe
                src={`https://www.youtube.com/embed/${goal.videoId}`}
                title={`${goal.player} — ${goal.competition}`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-neon" />
                <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-silver">
                  {goal.competition}
                </span>
              </div>
              <span className="font-display text-3xl text-neon/40 group-hover:text-neon transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="font-display text-2xl uppercase tracking-wide text-silver-bright leading-tight">
              {goal.player}
            </h3>
            <p className="font-heading text-sm uppercase tracking-wider text-neon mt-1">
              {goal.club}
            </p>
            <p className="font-body text-xs text-muted-foreground mt-1">
              {goal.match}
            </p>

            <div className="section-divider my-4" />

            <p className="font-body text-sm leading-relaxed text-silver flex-1">
              {goal.description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default BestGoalsSection;