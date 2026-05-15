import { motion } from "framer-motion";
import { PenLine } from "lucide-react";
import SectionHeader from "./SectionHeader";
import coachGuardiola from "@/assets/coach-guardiola.jpg";
import coachKlopp from "@/assets/coach-klopp.jpg";
import coachAncelotti from "@/assets/coach-ancelotti.jpg";

const coaches = [
  {
    src: coachGuardiola,
    name: "Pep Guardiola",
    title: "The Architect",
    quote: "Para nosotros es el entrenador que mejor cuida el balón. Su Barça y su City nos encantan por cómo juegan.",
  },
  {
    src: coachKlopp,
    name: "Jürgen Klopp",
    title: "Heavy Metal Football",
    quote: "Su Liverpool era pura intensidad. Daba gusto verlos correr y presionar durante 90 minutos.",
  },
  {
    src: coachAncelotti,
    name: "Carlo Ancelotti",
    title: "Mr. Champions League",
    quote: "Cinco Champions ganadas. Tranquilo en el banquillo y siempre con la receta para ganar partidos grandes.",
  },
];

const OpinionSection = () => (
  <section id="opinion" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader icon={PenLine} label="Post 2" title="Tactical Vision" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-12 mb-12 max-w-3xl mx-auto"
      >
        <h3 className="font-heading text-2xl uppercase tracking-wider text-silver-bright mb-6">
          Lo que pensamos de la Champions
        </h3>
        <div className="space-y-4 font-body text-sm leading-relaxed text-silver">
          <p>
            Para nosotros la Champions League es la mejor competición de clubes
            del mundo. Los partidos de los martes y miércoles tienen algo
            especial: la música del himno, los estadios llenos y esa sensación
            de que cualquier cosa puede pasar.
          </p>
          <p>
            Nos gusta cómo han cambiado los equipos en los últimos años. Antes
            ganaba el que mejor defendía y ahora vemos partidos con muchos
            goles, equipos que presionan arriba y entrenadores que se la juegan.
            Pep Guardiola, Klopp y Ancelotti son los que más nos llaman la
            atención, cada uno con su estilo.
          </p>
          <p>
            También está el tema del dinero, que cada vez pesa más y hace que
            los equipos grandes ganen casi siempre. Aun así, lo bonito de la
            Champions es que de vez en cuando aparece un equipo pequeño o un
            jugador que decide un partido él solo, y por eso seguimos
            enganchados.
          </p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {coaches.map((c, i) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative glass-card neon-border overflow-hidden"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={c.src}
                alt={`${c.name} — ${c.title}`}
                loading="lazy"
                width={1024}
                height={1280}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-heading text-[0.65rem] uppercase tracking-[0.3em] text-neon mb-1">
                  {c.title}
                </p>
                <h4 className="font-display text-2xl text-silver-bright leading-tight">
                  {c.name}
                </h4>
              </div>
            </div>
            <div className="p-5">
              <p className="font-body text-sm text-silver leading-relaxed">
                {c.quote}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default OpinionSection;
