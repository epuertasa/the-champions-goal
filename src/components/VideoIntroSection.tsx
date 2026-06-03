import { motion } from "framer-motion";
import { Video, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useT, useLang } from "@/contexts/LanguageContext";

const VideoIntroSection = () => {
  const t = useT();
  const { lang } = useLang();
  return (
  <section id="video-intro" className="py-24 px-6">
    <div className="container mx-auto">
      <SectionHeader icon={Video} label="Video Introduction" title="The Kick-Off" />

      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 aspect-video"
        >
          <iframe
            src="https://drive.google.com/file/d/12buUeHJsWmzEliKcansD-DEbxvgbQtNK/preview"
            title="The Champions Goal — Video Introduction"
            allow="autoplay"
            allowFullScreen
            className="w-full h-full block"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-neon" />
            <h3 className="font-heading text-lg uppercase tracking-wider text-silver-bright">
              {t("Meet the Creators")}
            </h3>
          </div>
          {lang === "en" ? (
            <p className="font-body text-sm leading-relaxed text-silver flex-1">
              Welcome to <strong className="text-silver-bright">The Champions Goal</strong> — a
              blog created by <strong className="text-neon">Erik Puertas</strong>,{" "}
              <strong className="text-neon">Àlex Molina</strong>, and{" "}
              <strong className="text-neon">Luis De La Rosa</strong>. As students with
              a passion for football and Strategic Media &amp; Research (SMR), we built
              this platform to celebrate the most prestigious club competition in
              the world: the UEFA Champions League. Through video analysis, tactical
              essays, legendary stories, and interactive fan activities, we invite
              you to experience the beautiful game like never before.
            </p>
          ) : (
            <p className="font-body text-sm leading-relaxed text-silver flex-1">
              Bienvenido a <strong className="text-silver-bright">The Champions Goal</strong> —
              un blog creado por <strong className="text-neon">Erik Puertas</strong>,{" "}
              <strong className="text-neon">Àlex Molina</strong> y{" "}
              <strong className="text-neon">Luis De La Rosa</strong>. Como alumnos
              apasionados del fútbol y de SMR (Sistemas Microinformáticos y Redes),
              hemos creado esta plataforma para celebrar la competición de clubes
              más prestigiosa del mundo: la UEFA Champions League. A través de
              análisis en vídeo, ensayos tácticos, historias legendarias y
              actividades interactivas, te invitamos a vivir el fútbol como nunca.
            </p>
          )}
          <div className="section-divider mt-6" />
          <p className="mt-4 text-xs text-muted-foreground font-body tracking-wide uppercase">
            {t("SMR Project — 2026")}
          </p>
        </motion.div>
      </div>
    </div>
  </section>
  );
};

export default VideoIntroSection;
