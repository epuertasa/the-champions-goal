import { motion } from "framer-motion";
import { PenLine, Star, Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";
import coachGuardiola from "@/assets/coach-guardiola.jpg";
import coachKlopp from "@/assets/coach-klopp.jpg";
import coachAncelotti from "@/assets/coach-ancelotti.jpg";

const coaches = [
  {
    src: coachGuardiola,
    name: "Pep Guardiola",
    title: "The Architect",
    quote: "For us he's the coach who takes the best care of the ball. We love how his Barça and City play.",
  },
  {
    src: coachKlopp,
    name: "Jürgen Klopp",
    title: "Heavy Metal Football",
    quote: "His Liverpool was pure intensity. It was great to watch them run and press for the full 90 minutes.",
  },
  {
    src: coachAncelotti,
    name: "Carlo Ancelotti",
    title: "Mr. Champions League",
    quote: "Five Champions League titles. Calm on the bench and always with the recipe to win the big games.",
  },
];

const OpinionSection = () => (
  <section id="opinion" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader icon={PenLine} label="Post 2" title="Tactical Vision" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative glass-card p-8 md:p-14 mb-16 max-w-6xl mx-auto overflow-hidden"
      >
        {/* Animated CL-style accent */}
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 animate-float-slow"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--neon-blue) / 0.5), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30 animate-float-slow"
          style={{
            animationDelay: "2s",
            background:
              "radial-gradient(circle, hsl(var(--neon-glow) / 0.5), transparent 70%)",
          }}
        />

        {/* Header row */}
        <div className="relative flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-neon animate-twinkle" />
            <p className="font-heading text-[0.7rem] uppercase tracking-[0.4em] text-neon">
              Our Take
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="h-3 w-3 text-neon animate-twinkle"
                style={{ animationDelay: `${i * 0.3}s` }}
                fill="currentColor"
              />
            ))}
          </div>
        </div>

        <h3 className="relative font-display text-4xl md:text-5xl uppercase tracking-wider text-silver-bright mb-3">
          What we think about{" "}
          <span
            className="neon-text"
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-glow)), hsl(var(--neon-blue)))",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 6s linear infinite",
            }}
          >
            the Champions
          </span>
        </h3>
        <div className="section-divider mb-8" />

        <div className="relative grid md:grid-cols-2 gap-x-12 gap-y-5 font-body text-[0.95rem] leading-relaxed text-silver">
          <p>
            For us, the Champions League is the best club competition in the
            world. Tuesday and Wednesday nights have something special: the
            anthem, the packed stadiums and that feeling that anything can
            happen. We always get together to watch the matches, and the
            atmosphere is incredible when a goal comes in the last minute.
          </p>
          <p>
            We love how teams have changed over the last few years. Before, the
            team that defended best used to win, and now we see matches with
            lots of goals, teams pressing high and coaches taking risks.
            Guardiola, Klopp and Ancelotti are the ones we like the most, each
            one with his own style. The group stage is fun, but the knockout
            rounds are on another level because one mistake can send you home.
          </p>
          <p>
            We have seen some amazing comebacks that we will never forget, like
            teams turning around a three-goal deficit or winning in extra time
            with a last-gasp strike. Those moments are why this competition is
            different from the league or the cup.
          </p>
          <p>
            There's also the money side, which counts more and more and makes
            the big clubs win almost every year. Even so, the cool thing about
            the Champions is that every now and then a small team or a single
            player decides a match on his own — and that's why we keep watching.
            It is pure emotion from start to finish, and that is something no
            other tournament gives us.
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {coaches.map((c, i) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative glass-card neon-border overflow-hidden"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={c.src}
                alt={`${c.name} — ${c.title}`}
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em] text-neon mb-1">
                  {c.title}
                </p>
                <h4 className="font-display text-2xl text-silver-bright leading-tight">
                  {c.name}
                </h4>
              </div>
            </div>
            <div className="p-5">
              <p className="font-body text-sm text-silver leading-relaxed">
                {c.quote}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default OpinionSection;
