import uclLogo from "@/assets/ucl-footer.png";

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border">
    <div className="container mx-auto text-center">
      <img src={uclLogo} alt="UEFA Champions League logo" className="h-24 w-auto mx-auto mb-4 drop-shadow-[0_4px_24px_hsl(var(--neon-blue)/0.7)]" />
      <p className="font-display text-base uppercase tracking-widest text-silver-bright">
        The Champions Goal
      </p>
      <p className="mt-2 text-xs text-muted-foreground font-body">
        © 2026 Erik Puertas, Alex Molina &amp; Luis De La Rosa. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
