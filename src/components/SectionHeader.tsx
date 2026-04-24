import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  title: string;
}

const SectionHeader = ({ icon: Icon, label, title }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <div className="flex items-center justify-center gap-2 mb-3">
      <Icon className="h-5 w-5 text-neon" />
      <span className="font-heading text-xs uppercase tracking-[0.3em] text-silver">
        {label}
      </span>
    </div>
    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.04em] text-silver-bright text-3d">
      {title}
    </h2>
    <div className="section-divider mt-6 mx-auto max-w-xs" />
  </motion.div>
);

export default SectionHeader;
