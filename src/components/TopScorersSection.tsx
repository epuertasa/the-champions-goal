import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
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

const scorers = [
  { rank: 1, player: "Cristiano Ronaldo", country: "Portugal", clubs: "Man United, Real Madrid, Juventus", goals: 140, apps: 183 },
  { rank: 2, player: "Lionel Messi", country: "Argentina", clubs: "Barcelona, PSG", goals: 129, apps: 163 },
  { rank: 3, player: "Robert Lewandowski", country: "Poland", clubs: "Dortmund, Bayern, Barcelona", goals: 105, apps: 132 },
  { rank: 4, player: "Karim Benzema", country: "France", clubs: "Lyon, Real Madrid", goals: 90, apps: 152 },
  { rank: 5, player: "Raúl González", country: "Spain", clubs: "Real Madrid, Schalke 04", goals: 71, apps: 142 },
  { rank: 6, player: "Ruud van Nistelrooy", country: "Netherlands", clubs: "PSV, Man United, Real Madrid", goals: 56, apps: 73 },
  { rank: 7, player: "Thomas Müller", country: "Germany", clubs: "Bayern Munich", goals: 57, apps: 163 },
  { rank: 8, player: "Thierry Henry", country: "France", clubs: "Monaco, Arsenal, Barcelona", goals: 50, apps: 112 },
  { rank: 9, player: "Alfredo Di Stéfano", country: "Argentina/Spain", clubs: "Real Madrid", goals: 49, apps: 58 },
  { rank: 10, player: "Andriy Shevchenko", country: "Ukraine", clubs: "Dynamo Kyiv, Milan, Chelsea", goals: 48, apps: 100 },
];

const TopScorersSection = () => {
  const t = useT();
  return (
  <section id="top-scorers" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader
        icon={Trophy}
        label="All-Time Records"
        title="Champions League Top Scorers"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card neon-border p-4 md:p-8 overflow-x-auto"
      >
        <Table>
          <TableHeader>
            <TableRow className="border-glass-border hover:bg-transparent">
              <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon w-16">
                {t("#")}
              </TableHead>
              <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon">
                {t("Player")}
              </TableHead>
              <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon hidden md:table-cell">
                {t("Country")}
              </TableHead>
              <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon hidden lg:table-cell">
                {t("Clubs")}
              </TableHead>
              <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon text-right">
                {t("Goals")}
              </TableHead>
              <TableHead className="font-heading text-xs uppercase tracking-[0.2em] text-neon text-right hidden sm:table-cell">
                {t("Apps")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scorers.map((s) => (
              <TableRow
                key={s.rank}
                className="border-glass-border hover:bg-neon/5 transition-colors"
              >
                <TableCell className="font-display text-2xl text-neon/60">
                  {String(s.rank).padStart(2, "0")}
                </TableCell>
                <TableCell className="font-display text-base md:text-lg uppercase tracking-wide text-silver-bright">
                  {s.player}
                </TableCell>
                <TableCell className="font-body text-sm text-silver hidden md:table-cell">
                  {s.country}
                </TableCell>
                <TableCell className="font-body text-xs text-muted-foreground hidden lg:table-cell">
                  {s.clubs}
                </TableCell>
                <TableCell className="font-display text-xl text-neon text-right">
                  {s.goals}
                </TableCell>
                <TableCell className="font-body text-sm text-silver text-right hidden sm:table-cell">
                  {s.apps}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  </section>
  );
};

export default TopScorersSection;