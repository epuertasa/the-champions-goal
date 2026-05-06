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
    quote: "Redefined possession football and high pressing — winner with Barcelona & Manchester City.",
  },
  {
    src: coachKlopp,
    name: "Jürgen Klopp",
    title: "Heavy Metal Football",
    quote: "Turned Liverpool into European royalty again with relentless intensity and gegenpressing.",
  },
  {
    src: coachAncelotti,
    name: "Carlo Ancelotti",
    title: "Mr. Champions League",
    quote: "Five UCL titles. The calmest mind in the dugout — a record-breaking European master.",
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
          The Modern Era of the UCL
        </h3>
        <div className="space-y-4 font-body text-sm leading-relaxed text-silver">
          <p>
            The UEFA Champions League has evolved into more than just a football
            tournament — it is a global spectacle that defines the pinnacle of
            European club football. Over the past two decades, the competition has
            witnessed a dramatic shift in playing styles, from the defensive
            masterclasses of Italian clubs to the high-pressing, possession-based
            systems pioneered by teams like Barcelona and Manchester City.
          </p>
          <p>
            Modern tactics emphasize versatility and athleticism. The rise of
            "false nines," inverted full-backs, and pressing triggers has
            transformed how teams approach each match. Coaches like Pep Guardiola,
            Jürgen Klopp, and Carlo Ancelotti have redefined what it means to
            compete at the highest level, blending tactical sophistication with
            individual brilliance.
          </p>
          <p>
            The financial landscape has also reshaped the competition. Clubs backed
            by massive investments have disrupted traditional hierarchies, while
            the introduction of Financial Fair Play aimed — with mixed results — to
            level the playing field. Yet the magic of the UCL endures: on any
            given night, underdogs can topple giants, and a single moment of
            genius can rewrite history forever.
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
