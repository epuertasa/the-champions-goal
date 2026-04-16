import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import SectionHeader from "./SectionHeader";
import legend1 from "@/assets/ucl-legend-1.jpg";
import legend2 from "@/assets/ucl-legend-2.jpg";
import legend3 from "@/assets/ucl-legend-3.jpg";

const images = [
  { src: legend1, alt: "Incredible bicycle kick", watermark: "Erik's Edition" },
  { src: legend2, alt: "Trophy celebration", watermark: "Alex's Edition" },
  { src: legend3, alt: "Packed stadium final", watermark: "Luis's Edition" },
];

const LegendsSection = () => (
  <section id="legends" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader icon={Crown} label="Post 3" title="The Golden Choice" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-12 mb-12 max-w-4xl mx-auto"
      >
        <h3 className="font-heading text-2xl uppercase tracking-wider text-silver-bright mb-6 text-center">
          Incredible Records &amp; Curious Facts
        </h3>
        <div className="space-y-4 font-body text-sm leading-relaxed text-silver columns-1 md:columns-2 gap-8">
          <p>
            The Champions League is a treasure trove of staggering records and
            unforgettable stories. Cristiano Ronaldo holds the all-time scoring
            record with 140 goals, a feat that may never be surpassed. Meanwhile,
            Lionel Messi's mesmerizing dribbles in the 2010–11 campaign, where
            Barcelona dismantled every opponent, remain etched in football's
            collective memory.
          </p>
          <p>
            Real Madrid's dynasty of three consecutive titles from 2016 to 2018
            under Zinedine Zidane proved that tactical brilliance and squad depth
            still conquer all. But perhaps the most iconic moment belongs to the
            1999 final, when Manchester United scored twice in injury time against
            Bayern Munich to complete an unbelievable treble.
          </p>
          <p>
            Liverpool's miracle in Istanbul in 2005 — coming back from 3-0 down
            against AC Milan — redefined what belief and determination mean in
            sport. And who could forget Ajax's youthful uprising in 2018–19, when
            a group of teenagers nearly reached the final with fearless,
            free-flowing football?
          </p>
          <p>
            The UCL also holds curious records: the fastest goal was scored in
            just 10.12 seconds by Roy Makaay, and the highest-scoring match saw
            12 goals in a single game. From Zidane's legendary volley in the 2002
            final to Sergio Ramos's stoppage-time header in 2014, these moments
            transcend football itself, becoming part of global sporting folklore.
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={img.watermark}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative glass-card overflow-hidden group"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              width={800}
              height={600}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="watermark">{img.watermark}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LegendsSection;
