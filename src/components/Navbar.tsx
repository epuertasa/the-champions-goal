import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Video Intro", href: "#video-intro" },
  { label: "Opinion", href: "#opinion" },
  { label: "Legends", href: "#legends" },
  { label: "Fan Zone", href: "#fan-zone" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <a href="#home" className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-neon" />
          <span className="font-heading text-lg uppercase tracking-wider text-silver-bright">
            Champions Goal
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-heading text-sm uppercase tracking-widest text-silver hover:text-neon transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-silver-bright"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
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
                  {l.label}
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
