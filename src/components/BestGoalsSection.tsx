import { motion } from "framer-motion";
import { Goal, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";

const goals = [
  {
    player: "Zinedine Zidane",
    club: "Real Madrid",
    match: "vs Bayer Leverkusen",
    competition: "Final UCL 2002",
    description:
      "Volea imposible con la pierna izquierda desde el borde del área. Considerado por muchos el mejor gol en la historia de una final.",
  },
  {
    player: "Lionel Messi",
    club: "FC Barcelona",
    match: "vs Real Madrid",
    competition: "Semifinal UCL 2011",
    description:
      "Slalom desde el centro del campo, regateando a media defensa blanca antes de definir con frialdad ante Casillas.",
  },
  {
    player: "Cristiano Ronaldo",
    club: "Real Madrid",
    match: "vs Juventus",
    competition: "Cuartos UCL 2018",
    description:
      "Chilena espectacular a casi tres metros de altura. Hasta el Juventus Stadium se levantó a aplaudirle.",
  },
  {
    player: "Steven Gerrard",
    club: "Liverpool",
    match: "vs AC Milan",
    competition: "Final UCL 2005",
    description:
      "Cabezazo que inició la remontada más épica de la historia: el milagro de Estambul tras ir 3-0 abajo.",
  },
  {
    player: "Dejan Stankovic",
    club: "Inter de Milán",
    match: "vs Schalke 04",
    competition: "Cuartos UCL 2011",
    description:
      "Volea de primeras desde fuera del área a los 25 segundos del partido. Uno de los goles más rápidos de la competición.",
  },
  {
    player: "Roberto Carlos",
    club: "Real Madrid",
    match: "vs Manchester United",
    competition: "Cuartos UCL 2003",
    description:
      "Volea de exterior con la zurda dentro del área. Pura magia brasileña en Old Trafford.",
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