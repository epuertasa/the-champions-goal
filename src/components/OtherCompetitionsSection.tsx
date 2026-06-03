import { motion } from "framer-motion";
import { Trophy, Medal, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useT } from "@/contexts/LanguageContext";
import competitions from "@/assets/uefa-competitions.png";

const OtherCompetitionsSection = () => {
  const t = useT();
  return (
  <section id="other-competitions" className="py-24 px-6">
    <div className="container mx-auto max-w-6xl">
      <SectionHeader icon={Trophy} label="Extra" title="Other European Cups" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-body text-base md:text-lg text-silver leading-relaxed max-w-3xl mx-auto text-center mb-12"
      >
        {t("The UEFA Champions League may sit at the very top of the European pyramid, but it is only one piece of a much wider continental story. Below it, two other tournaments give clubs from across the continent a chance to chase glory under the same UEFA banner — each with its own identity, history and ambitions.")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="rounded-xl overflow-hidden mb-16 max-w-4xl mx-auto shadow-2xl neon-border"
      >
        <img
          src={competitions}
            alt="UEFA Europa League, Champions League and Europa Conference League logos"
          className="w-full h-auto block"
          loading="lazy"
        />
      </motion.div>

      <p className="font-body text-base text-silver leading-relaxed max-w-3xl mx-auto text-center mb-12">
        {t("Together, these three trophies form a complete European ladder: every club, no matter the size of its league, has a real path to lift silver on a continental night.")}
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card neon-border p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Medal className="h-6 w-6 text-neon" />
            <h3 className="font-heading text-xl uppercase tracking-wider text-silver-bright">
              {t("UEFA Europa League")}
            </h3>
          </div>
          <p className="font-body text-sm text-silver leading-relaxed mb-4">
            {t("Founded in 1971 as the UEFA Cup and rebranded in 2009, the Europa League is Europe's second-tier club competition. It brings together strong domestic sides that just fell short of Champions League qualification, and famously rewards its winner with a direct ticket to the following UCL season.")}
          </p>
          <div className="section-divider my-4" />
          <p className="font-body text-xs text-silver/80 uppercase tracking-[0.2em]">
            {t("Most successful club · Sevilla FC (7 titles)")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card neon-border p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-neon" />
            <h3 className="font-heading text-xl uppercase tracking-wider text-silver-bright">
              {t("UEFA Conference League")}
            </h3>
          </div>
          <p className="font-body text-sm text-silver leading-relaxed mb-4">
            {t("Launched in 2021, the Conference League is the newest member of the UEFA family. Designed as a third tier, it opens the European stage to clubs from smaller and emerging leagues, giving them a realistic shot at continental silverware and unforgettable European nights.")}
          </p>
          <div className="section-divider my-4" />
          <p className="font-body text-xs text-silver/80 uppercase tracking-[0.2em]">
            {t("First champion · AS Roma, 2022 (José Mourinho)")}
          </p>
        </motion.div>
      </div>

      <p className="font-body text-sm md:text-base text-silver/90 italic leading-relaxed max-w-3xl mx-auto text-center mt-12">
        {t("Three competitions, one shared ambition: to crown the best of European football, from the historic giants of the Champions League to the rising names writing their first chapters in the Conference League.")}
      </p>
    </div>
  </section>
  );
};

export default OtherCompetitionsSection;