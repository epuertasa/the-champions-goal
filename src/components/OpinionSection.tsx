import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import SectionHeader from "./SectionHeader";

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
    </div>
  </section>
);

export default OpinionSection;
