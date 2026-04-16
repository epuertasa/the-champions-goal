import { motion } from "framer-motion";
import { Star } from "lucide-react";
import heroBg from "@/assets/hero-banner.jpg";

const HeroBanner = () => (
  <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
    <img
      src={heroBg}
      alt="Champions League trophy under stadium lights"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={800}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

    <div className="relative z-10 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <Star className="h-5 w-5 text-neon" />
        <span className="font-heading text-sm uppercase tracking-[0.3em] text-silver">
          UCL Elite Hub
        </span>
        <Star className="h-5 w-5 text-neon" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-heading text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-silver-bright leading-none"
      >
        The Champions
        <br />
        <span className="neon-text">Goal</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-6 font-body text-base text-silver tracking-wide"
      >
        By Erik, Alex &amp; Luis
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-10"
      >
        <a
          href="#video-intro"
          className="inline-block px-8 py-3 font-heading text-sm uppercase tracking-widest text-primary-foreground bg-primary rounded-lg neon-border animate-glow-pulse hover:scale-105 transition-transform"
        >
          Explore Now
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroBanner;
