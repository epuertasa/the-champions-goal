import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
}

const SectionBanner = ({ label = "Next Up", title, subtitle }: Props) => (
  <section className="relative py-16 px-6 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
    <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none">
      <div className="section-divider" />
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="container mx-auto relative z-10"
    >
      <div className="glass-card neon-border max-w-4xl mx-auto px-8 py-10 md:py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-neon/60" />
          <Star className="h-5 w-5 text-neon" />
          <span className="font-heading text-xs uppercase tracking-[0.4em] text-silver">
            {label}
          </span>
          <Star className="h-5 w-5 text-neon" />
          <div className="h-px w-12 bg-neon/60" />
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-[0.05em] text-silver-bright text-3d-neon leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-4 font-body text-sm md:text-base text-silver max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  </section>
);

export default SectionBanner;