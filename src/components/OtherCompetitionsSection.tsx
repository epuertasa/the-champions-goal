import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import SectionHeader from "./SectionHeader";
import competitions from "@/assets/uefa-competitions.png";

const OtherCompetitionsSection = () => (
  <section id="other-competitions" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader icon={Trophy} label="Extra" title="Other European Cups" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card neon-border max-w-5xl mx-auto p-8 md:p-12"
      >
        <div className="bg-silver-bright/95 rounded-lg p-6 mb-8">
          <img
            src={competitions}
            alt="UEFA Europa League, Champions League and Europa Conference League logos"
            className="w-full max-w-2xl mx-auto h-auto block"
            loading="lazy"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="font-heading text-lg uppercase tracking-wider text-neon mb-3">
              UEFA Europa League
            </h3>
            <p className="font-body text-sm text-silver leading-relaxed">
              Born in 1971 as the UEFA Cup, the Europa League is the second-tier
              continental competition. It gathers strong sides that just missed
              out on the Champions League and rewards the winner with a direct
              ticket to the UCL. Sevilla, with seven titles, is its undisputed
              king.
            </p>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-heading text-lg uppercase tracking-wider text-neon mb-3">
              UEFA Conference League
            </h3>
            <p className="font-body text-sm text-silver leading-relaxed">
              Launched in 2021, the Conference League is the newest UEFA club
              tournament. It opens the European stage to clubs from smaller
              leagues, giving them the chance to lift a continental trophy.
              Roma, Mourinho's side, became its first-ever champion in 2022.
            </p>
          </div>
        </div>

        <div className="section-divider my-8" />
        <p className="font-body text-xs text-silver/70 text-center uppercase tracking-[0.3em]">
          Three competitions · One European dream
        </p>
      </motion.div>
    </div>
  </section>
);

export default OtherCompetitionsSection;