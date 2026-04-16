import { Trophy } from "lucide-react";

const Footer = () => (
  <footer className="py-12 px-6 border-t border-border">
    <div className="container mx-auto text-center">
      <Trophy className="h-6 w-6 text-neon mx-auto mb-3" />
      <p className="font-heading text-sm uppercase tracking-widest text-silver">
        The Champions Goal
      </p>
      <p className="mt-2 text-xs text-muted-foreground font-body">
        © 2026 Erik Puertas, Alex Molina &amp; Luis De La Rosa. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
