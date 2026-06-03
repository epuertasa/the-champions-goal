import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import uclLogo from "@/assets/ucl-logo.png";
import { useLang } from "@/contexts/LanguageContext";

const navLinks = [
  { key: "Home", href: "#home" },
  { key: "Video Intro", href: "#video-intro" },
  { key: "Best Goals", href: "#best-goals" },
  { key: "Top Scorers", href: "#top-scorers" },
  { key: "Winners", href: "#winners" },
  { key: "Opinion", href: "#opinion" },
  { key: "Choice", href: "#legends" },
  { key: "Fan Zone", href: "#fan-zone" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, toggle, t } = useLang();

  const LangBtn = (
    <button
      onClick={toggle}
      aria-label={t("Language")}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neon/40 text-neon hover:bg-neon/10 hover:border-neon transition-all font-heading text-xs uppercase tracking-[0.25em]"
    >
      <Globe className="h-3.5 w-3.5" />
      {lang === "en" ? "ES" : "EN"}
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0">
      <div className="w-full flex items-center justify-between px-6 py-3">
        <a href="#home" className="flex items-center gap-2">
          <img src={uclLogo} alt="UCL logo" className="h-7 w-7 drop-shadow-[0_2px_8px_hsl(var(--neon-blue)/0.7)]" />
          <span className="font-display text-xl uppercase tracking-wider text-silver-bright">
            {t("The Champions Goal")}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-heading text-sm uppercase tracking-widest text-silver hover:text-neon transition-colors duration-300"
            >
              {t(l.key)}
            </a>
          ))}
          {LangBtn}
        </div>

        <div className="md:hidden flex items-center gap-3">
          {LangBtn}
          <button
            className="text-silver-bright"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-card rounded-none border-x-0"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-heading text-sm uppercase tracking-widest text-silver hover:text-neon transition-colors"
                >
                  {t(l.key)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
