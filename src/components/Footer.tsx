import uclLogo from "@/assets/ucl-logo.png";

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border">
    <div className="container mx-auto text-center">
      <img src={uclLogo} alt="UCL logo" className="h-10 w-10 mx-auto mb-3 drop-shadow-[0_4px_12px_hsl(var(--neon-blue)/0.6)]" />
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
