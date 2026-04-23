import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import heroBg from "@/assets/hero-banner.jpg";
import uclLogo from "@/assets/ucl-logo.png";

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
        <Flame className="h-5 w-5 text-neon" />
        <span className="font-heading text-sm uppercase tracking-[0.3em] text-silver">
          UCL Elite Hub
        </span>
        <Flame className="h-5 w-5 text-neon" />
      </motion.div>

      <motion.img
        src={uclLogo}
        alt="UEFA Champions League logo"
        initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="mx-auto mb-6 h-28 w-28 sm:h-36 sm:w-36 drop-shadow-[0_10px_30px_hsl(var(--neon-blue)/0.6)]"
      />

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display text-6xl sm:text-8xl md:text-9xl uppercase tracking-wide text-silver-bright leading-[0.9] text-3d"
      >
        The Champions
        <br />
        <span className="text-3d-neon">Goal</span>
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
          className="inline-flex items-center gap-2 px-8 py-3 font-heading text-sm uppercase tracking-widest text-primary-foreground bg-primary rounded-lg neon-border animate-glow-pulse hover:scale-105 transition-transform"
        >
          <Trophy className="h-4 w-4" /> Explore Now
        </a>
      </motion.div>
    </div>
  </section>
);

export default HeroBanner;
