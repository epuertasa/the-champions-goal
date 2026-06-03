import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useT } from "@/contexts/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const winners = [
  { season: "1955–56", winner: "Real Madrid", country: "Spain", runnerUp: "Reims", score: "4–3" },
  { season: "1956–57", winner: "Real Madrid", country: "Spain", runnerUp: "Fiorentina", score: "2–0" },
  { season: "1957–58", winner: "Real Madrid", country: "Spain", runnerUp: "Milan", score: "3–2 (a.e.t.)" },
  { season: "1958–59", winner: "Real Madrid", country: "Spain", runnerUp: "Reims", score: "2–0" },
  { season: "1959–60", winner: "Real Madrid", country: "Spain", runnerUp: "Eintracht Frankfurt", score: "7–3" },
  { season: "1960–61", winner: "Benfica", country: "Portugal", runnerUp: "Barcelona", score: "3–2" },
  { season: "1961–62", winner: "Benfica", country: "Portugal", runnerUp: "Real Madrid", score: "5–3" },
  { season: "1962–63", winner: "Milan", country: "Italy", runnerUp: "Benfica", score: "2–1" },
  { season: "1963–64", winner: "Inter Milan", country: "Italy", runnerUp: "Real Madrid", score: "3–1" },
  { season: "1964–65", winner: "Inter Milan", country: "Italy", runnerUp: "Benfica", score: "1–0" },
  { season: "1965–66", winner: "Real Madrid", country: "Spain", runnerUp: "Partizan", score: "2–1" },
  { season: "1966–67", winner: "Celtic", country: "Scotland", runnerUp: "Inter Milan", score: "2–1" },
  { season: "1967–68", winner: "Manchester United", country: "England", runnerUp: "Benfica", score: "4–1 (a.e.t.)" },
  { season: "1968–69", winner: "Milan", country: "Italy", runnerUp: "Ajax", score: "4–1" },
  { season: "1969–70", winner: "Feyenoord", country: "Netherlands", runnerUp: "Celtic", score: "2–1 (a.e.t.)" },
  { season: "1970–71", winner: "Ajax", country: "Netherlands", runnerUp: "Panathinaikos", score: "2–0" },
  { season: "1971–72", winner: "Ajax", country: "Netherlands", runnerUp: "Inter Milan", score: "2–0" },
  { season: "1972–73", winner: "Ajax", country: "Netherlands", runnerUp: "Juventus", score: "1–0" },
  { season: "1973–74", winner: "Bayern Munich", country: "Germany", runnerUp: "Atlético Madrid", score: "1–1 / 4–0 (replay)" },
  { season: "1974–75", winner: "Bayern Munich", country: "Germany", runnerUp: "Leeds United", score: "2–0" },
  { season: "1975–76", winner: "Bayern Munich", country: "Germany", runnerUp: "Saint-Étienne", score: "1–0" },
  { season: "1976–77", winner: "Liverpool", country: "England", runnerUp: "Borussia M'gladbach", score: "3–1" },
  { season: "1977–78", winner: "Liverpool", country: "England", runnerUp: "Club Brugge", score: "1–0" },
  { season: "1978–79", winner: "Nottingham Forest", country: "England", runnerUp: "Malmö", score: "1–0" },
  { season: "1979–80", winner: "Nottingham Forest", country: "England", runnerUp: "Hamburger SV", score: "1–0" },
  { season: "1980–81", winner: "Liverpool", country: "England", runnerUp: "Real Madrid", score: "1–0" },
  { season: "1981–82", winner: "Aston Villa", country: "England", runnerUp: "Bayern Munich", score: "1–0" },
  { season: "1982–83", winner: "Hamburger SV", country: "Germany", runnerUp: "Juventus", score: "1–0" },
  { season: "1983–84", winner: "Liverpool", country: "England", runnerUp: "Roma", score: "1–1 (4–2 pen.)" },
  { season: "1984–85", winner: "Juventus", country: "Italy", runnerUp: "Liverpool", score: "1–0" },
  { season: "1985–86", winner: "Steaua București", country: "Romania", runnerUp: "Barcelona", score: "0–0 (2–0 pen.)" },
  { season: "1986–87", winner: "Porto", country: "Portugal", runnerUp: "Bayern Munich", score: "2–1" },
  { season: "1987–88", winner: "PSV Eindhoven", country: "Netherlands", runnerUp: "Benfica", score: "0–0 (6–5 pen.)" },
  { season: "1988–89", winner: "Milan", country: "Italy", runnerUp: "Steaua București", score: "4–0" },
  { season: "1989–90", winner: "Milan", country: "Italy", runnerUp: "Benfica", score: "1–0" },
  { season: "1990–91", winner: "Red Star Belgrade", country: "Yugoslavia", runnerUp: "Marseille", score: "0–0 (5–3 pen.)" },
  { season: "1991–92", winner: "Barcelona", country: "Spain", runnerUp: "Sampdoria", score: "1–0 (a.e.t.)" },
  { season: "1992–93", winner: "Marseille", country: "France", runnerUp: "Milan", score: "1–0" },
  { season: "1993–94", winner: "Milan", country: "Italy", runnerUp: "Barcelona", score: "4–0" },
  { season: "1994–95", winner: "Ajax", country: "Netherlands", runnerUp: "Milan", score: "1–0" },
  { season: "1995–96", winner: "Juventus", country: "Italy", runnerUp: "Ajax", score: "1–1 (4–2 pen.)" },
  { season: "1996–97", winner: "Borussia Dortmund", country: "Germany", runnerUp: "Juventus", score: "3–1" },
  { season: "1997–98", winner: "Real Madrid", country: "Spain", runnerUp: "Juventus", score: "1–0" },
  { season: "1998–99", winner: "Manchester United", country: "England", runnerUp: "Bayern Munich", score: "2–1" },
  { season: "1999–00", winner: "Real Madrid", country: "Spain", runnerUp: "Valencia", score: "3–0" },
  { season: "2000–01", winner: "Bayern Munich", country: "Germany", runnerUp: "Valencia", score: "1–1 (5–4 pen.)" },
  { season: "2001–02", winner: "Real Madrid", country: "Spain", runnerUp: "Bayer Leverkusen", score: "2–1" },
  { season: "2002–03", winner: "Milan", country: "Italy", runnerUp: "Juventus", score: "0–0 (3–2 pen.)" },
  { season: "2003–04", winner: "Porto", country: "Portugal", runnerUp: "Monaco", score: "3–0" },
  { season: "2004–05", winner: "Liverpool", country: "England", runnerUp: "Milan", score: "3–3 (3–2 pen.)" },
  { season: "2005–06", winner: "Barcelona", country: "Spain", runnerUp: "Arsenal", score: "2–1" },
  { season: "2006–07", winner: "Milan", country: "Italy", runnerUp: "Liverpool", score: "2–1" },
  { season: "2007–08", winner: "Manchester United", country: "England", runnerUp: "Chelsea", score: "1–1 (6–5 pen.)" },
  { season: "2008–09", winner: "Barcelona", country: "Spain", runnerUp: "Manchester United", score: "2–0" },
  { season: "2009–10", winner: "Inter Milan", country: "Italy", runnerUp: "Bayern Munich", score: "2–0" },
  { season: "2010–11", winner: "Barcelona", country: "Spain", runnerUp: "Manchester United", score: "3–1" },
  { season: "2011–12", winner: "Chelsea", country: "England", runnerUp: "Bayern Munich", score: "1–1 (4–3 pen.)" },
  { season: "2012–13", winner: "Bayern Munich", country: "Germany", runnerUp: "Borussia Dortmund", score: "2–1" },
  { season: "2013–14", winner: "Real Madrid", country: "Spain", runnerUp: "Atlético Madrid", score: "4–1 (a.e.t.)" },
  { season: "2014–15", winner: "Barcelona", country: "Spain", runnerUp: "Juventus", score: "3–1" },
  { season: "2015–16", winner: "Real Madrid", country: "Spain", runnerUp: "Atlético Madrid", score: "1–1 (5–3 pen.)" },
  { season: "2016–17", winner: "Real Madrid", country: "Spain", runnerUp: "Juventus", score: "4–1" },
  { season: "2017–18", winner: "Real Madrid", country: "Spain", runnerUp: "Liverpool", score: "3–1" },
  { season: "2018–19", winner: "Liverpool", country: "England", runnerUp: "Tottenham", score: "2–0" },
  { season: "2019–20", winner: "Bayern Munich", country: "Germany", runnerUp: "PSG", score: "1–0" },
  { season: "2020–21", winner: "Chelsea", country: "England", runnerUp: "Manchester City", score: "1–0" },
  { season: "2021–22", winner: "Real Madrid", country: "Spain", runnerUp: "Liverpool", score: "1–0" },
  { season: "2022–23", winner: "Manchester City", country: "England", runnerUp: "Inter Milan", score: "1–0" },
  { season: "2023–24", winner: "Real Madrid", country: "Spain", runnerUp: "Borussia Dortmund", score: "2–0" },
  { season: "2024–25", winner: "Paris Saint-Germain", country: "France", runnerUp: "Inter Milan", score: "5–0" },
];

const WinnersSection = () => {
  const t = useT();
  return (
  <section id="winners" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader
        icon={Crown}
        label="Hall of Champions"
        title="All Champions League Winners"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card neon-border p-4 md:p-6"
      >
        <div className="max-h-[600px] overflow-y-auto overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-navy-deep/95 backdrop-blur z-10">
              <TableRow className="border-glass-border hover:bg-transparent">
                <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon">
                  {t("Season")}
                </TableHead>
                <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon">
                  {t("Winner")}
                </TableHead>
                <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon hidden md:table-cell">
                  {t("Country")}
                </TableHead>
                <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon hidden sm:table-cell">
                  {t("Runner-up")}
                </TableHead>
                <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon text-right">
                  {t("Score")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {winners.map((w) => (
                <TableRow
                  key={w.season}
                  className="border-glass-border hover:bg-neon/5 transition-colors"
                >
                  <TableCell className="font-heading text-sm text-silver">
                    {w.season}
                  </TableCell>
                  <TableCell className="font-display text-base uppercase tracking-wide text-silver-bright">
                    {w.winner}
                  </TableCell>
                  <TableCell className="font-body text-sm text-silver hidden md:table-cell">
                    {w.country}
                  </TableCell>
                  <TableCell className="font-body text-sm text-muted-foreground hidden sm:table-cell">
                    {w.runnerUp}
                  </TableCell>
                  <TableCell className="font-heading text-sm text-neon text-right whitespace-nowrap">
                    {w.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default WinnersSection;