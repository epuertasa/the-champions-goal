import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
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
        className="glass-card p-8 md:p-12 mb-12 max-w-3xl mx-auto"
      >
        <h3 className="font-heading text-2xl uppercase tracking-wider text-silver-bright mb-6">
          What we think about the Champions
        </h3>
        <div className="space-y-4 font-body text-sm leading-relaxed text-silver">
          <p>
            For us, the Champions League is the best club competition in the
            world. Tuesday and Wednesday nights have something special: the
            anthem, the packed stadiums and that feeling that anything can
            happen.
          </p>
          <p>
            We love how teams have changed over the last few years. Before, the
            team that defended best used to win, and now we see matches with
            lots of goals, teams pressing high and coaches taking risks.
            Guardiola, Klopp and Ancelotti are the ones we like the most, each
            one with his own style.
          </p>
          <p>
            There's also the money side, which counts more and more and makes
            the big clubs win almost every year. Even so, the cool thing about
            the Champions is that every now and then a small team or a single
            player decides a match on his own — and that's why we keep watching.
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
