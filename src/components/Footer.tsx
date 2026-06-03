import { useT } from "@/contexts/LanguageContext";

const Footer = () => {
  const t = useT();
  return (
  <footer className="py-12 px-6 border-t border-border">
    <div className="container mx-auto text-center">
      <p className="font-display text-base uppercase tracking-widest text-silver-bright">
        {t("The Champions Goal")}
      </p>
      <p className="mt-2 text-xs text-muted-foreground font-body">
        {t("© 2026 Erik Puertas, Àlex Molina & Luis De La Rosa. All rights reserved.")}
      </p>
    </div>
  </footer>
  );
};

export default Footer;
