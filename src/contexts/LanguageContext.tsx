import { createContext, useContext, useState, ReactNode, useCallback } from "react";

type Lang = "en" | "es";

const dict: Record<string, string> = {
  // Navbar
  "Home": "Inicio",
  "Video Intro": "Vídeo Intro",
  "Best Goals": "Mejores Goles",
  "Top Scorers": "Máximos Goleadores",
  "Winners": "Campeones",
  "Opinion": "Opinión",
  "Choice": "Elección",
  "Fan Zone": "Zona Fan",

  // Hero
  "The Champions": "The Champions",
  "Goal": "Goal",
  "By Erik, Alex & Luis": "Por Erik, Àlex y Luis",
  "Explore Now": "Explorar Ahora",

  // Video Intro
  "Video Introduction": "Introducción en Vídeo",
  "The Kick-Off": "El Saque Inicial",
  "Meet the Creators": "Conoce a los Creadores",
  "SMR Project — 2026": "Proyecto SMR — 2026",

  // Best goals
  "Top Strikes": "Mejores Disparos",
  "Best Champions Goals": "Los Mejores Goles de la Champions",

  // Top scorers
  "All-Time Records": "Récords Históricos",
  "Champions League Top Scorers": "Máximos Goleadores de la Champions",
  "#": "#",
  "Player": "Jugador",
  "Country": "País",
  "Clubs": "Clubes",
  "Goals": "Goles",
  "Apps": "Part.",

  // Winners
  "Hall of Champions": "Salón de los Campeones",
  "All Champions League Winners": "Todos los Campeones de la Champions",
  "Season": "Temporada",
  "Winner": "Campeón",
  "Runner-up": "Subcampeón",
  "Score": "Resultado",

  // Opinion
  "Post 2": "Post 2",
  "Tactical Vision": "Visión Táctica",
  "Our Take": "Nuestra Opinión",
  "What we think about": "Lo que pensamos sobre",
  "the Champions": "la Champions",

  // Legends
  "Post 3": "Post 3",
  "The Golden Choice": "La Elección Dorada",
  "Incredible Records & Curious Facts": "Récords Increíbles y Datos Curiosos",
  "The Most Remembered Faces of the UCL": "Los Rostros Más Recordados de la UCL",

  // Other competitions
  "Extra": "Extra",
  "Other European Cups": "Otras Copas Europeas",
  "UEFA Europa League": "UEFA Europa League",
  "UEFA Conference League": "UEFA Conference League",

  // Fan Zone
  "Post 4": "Post 4",
  "The Fan Zone": "La Zona Fan",
  "Penalty Shootout": "Tanda de Penaltis",
  "Score:": "Puntos:",
  "Shots:": "Tiros:",
  "Reset": "Reiniciar",
  "Spot the Difference": "Encuentra las Diferencias",
  "Found:": "Encontradas:",
  "Scrambled Legends": "Leyendas Mezcladas",
  "Easy": "Fácil",
  "Medium": "Medio",
  "Hard": "Difícil",
  "Expert": "Experto",
  "Hint": "Pista",
  "Reshuffle": "Mezclar",
  "Reveal · Skip": "Revelar · Saltar",
  "GOAL!": "¡GOL!",
  "SAVED!": "¡PARADA!",
  "Miss": "Falló",
  "All 10 found!": "¡Las 10 encontradas!",
  "Correct": "Correcto",

  // Word search
  "Activity · Post 4": "Actividad · Post 4",
  "Player Word Search": "Sopa de Letras de Jugadores",
  "New puzzle": "Nuevo puzle",
  "Progress:": "Progreso:",
  "Solved": "Resuelto",

  // Section banners
  "Next Up": "Lo Siguiente",
  "Next Chapter": "Siguiente Capítulo",
  "The Hall Of Champions": "El Salón de los Campeones",
  "A journey through every European king — from 1956 to today.":
    "Un viaje por todos los reyes de Europa — desde 1956 hasta hoy.",
  "Coming Up · Post 2": "A Continuación · Post 2",
  "Opinion Essay": "Ensayo de Opinión",
  "Our take on the modern era of the UEFA Champions League.":
    "Nuestra visión sobre la era moderna de la UEFA Champions League.",
  "Coming Up · Post 3": "A Continuación · Post 3",
  "Students' Choice": "La Elección de los Alumnos",
  "The records, moments and legends we couldn't leave out.":
    "Los récords, momentos y leyendas que no podíamos dejar fuera.",
  "Beyond The Champions League": "Más Allá de la Champions League",
  "A quick look at the other two UEFA club competitions.":
    "Un vistazo rápido a las otras dos competiciones de clubes de la UEFA.",
  "Coming Up · Post 4": "A Continuación · Post 4",
  "Fan Zone & Activities": "Zona Fan y Actividades",
  "Test your UCL knowledge with games, puzzles and challenges made by Erik, Àlex & Luis.":
    "Pon a prueba tu conocimiento de la UCL con juegos, puzles y retos hechos por Erik, Àlex y Luis.",
  "Find ten Champions League legends hidden in the grid.":
    "Encuentra diez leyendas de la Champions escondidas en la cuadrícula.",

  // Footer
  "The Champions Goal": "The Champions Goal",
  "© 2026 Erik Puertas, Àlex Molina & Luis De La Rosa. All rights reserved.":
    "© 2026 Erik Puertas, Àlex Molina y Luis De La Rosa. Todos los derechos reservados.",

  // Long paragraphs — Opinion
  "For us, the Champions League is the best club competition in the world. Tuesday and Wednesday nights have something special: the anthem, the packed stadiums and that feeling that anything can happen. We always get together to watch the matches, and the atmosphere is incredible when a goal comes in the last minute.":
    "Para nosotros, la Champions League es la mejor competición de clubes del mundo. Las noches de martes y miércoles tienen algo especial: el himno, los estadios llenos y esa sensación de que cualquier cosa puede pasar. Siempre nos juntamos a ver los partidos y el ambiente es increíble cuando llega un gol en el último minuto.",
  "We love how teams have changed over the last few years. Before, the team that defended best used to win, and now we see matches with lots of goals, teams pressing high and coaches taking risks. Guardiola, Klopp and Ancelotti are the ones we like the most, each one with his own style. The group stage is fun, but the knockout rounds are on another level because one mistake can send you home.":
    "Nos encanta cómo han cambiado los equipos en los últimos años. Antes ganaba el que mejor defendía, y ahora vemos partidos con muchos goles, equipos presionando arriba y entrenadores que se arriesgan. Guardiola, Klopp y Ancelotti son los que más nos gustan, cada uno con su estilo. La fase de grupos es divertida, pero las eliminatorias están a otro nivel porque un fallo te manda a casa.",
  "We have seen some amazing comebacks that we will never forget, like teams turning around a three-goal deficit or winning in extra time with a last-gasp strike. Those moments are why this competition is different from the league or the cup.":
    "Hemos visto remontadas increíbles que no olvidaremos nunca, como equipos dando la vuelta a un 3-0 o ganando en la prórroga con un gol agónico. Esos momentos son los que hacen que esta competición sea diferente de la liga o de la copa.",
  "There's also the money side, which counts more and more and makes the big clubs win almost every year. Even so, the cool thing about the Champions is that every now and then a small team or a single player decides a match on his own — and that's why we keep watching. It is pure emotion from start to finish, and that is something no other tournament gives us.":
    "También está el tema del dinero, que cuenta cada vez más y hace que los grandes clubes ganen casi todos los años. Aun así, lo bonito de la Champions es que de vez en cuando un equipo pequeño o un jugador solo decide un partido — y por eso seguimos viéndola. Es pura emoción de principio a fin, y eso es algo que ningún otro torneo nos da.",

  // Coach quotes
  "The Architect": "El Arquitecto",
  "Heavy Metal Football": "Fútbol Heavy Metal",
  "Mr. Champions League": "Mr. Champions League",
  "For us he's the coach who takes the best care of the ball. We love how his Barça and City play.":
    "Para nosotros es el entrenador que mejor cuida el balón. Nos encanta cómo juegan su Barça y su City.",
  "His Liverpool was pure intensity. It was great to watch them run and press for the full 90 minutes.":
    "Su Liverpool era pura intensidad. Era una gozada verlos correr y presionar los 90 minutos.",
  "Five Champions League titles. Calm on the bench and always with the recipe to win the big games.":
    "Cinco Champions. Tranquilo en el banquillo y siempre con la receta para ganar los partidos grandes.",

  // Video intro paragraph (kept as JSX, not translated through t())
  // Legends paragraphs
  "The Champions League is a treasure trove of staggering records and unforgettable stories. Cristiano Ronaldo holds the all-time scoring record with 140 goals, a feat that may never be surpassed. Meanwhile, Lionel Messi's mesmerizing dribbles in the 2010–11 campaign, where Barcelona dismantled every opponent, remain etched in football's collective memory.":
    "La Champions League es un cofre lleno de récords asombrosos e historias inolvidables. Cristiano Ronaldo tiene el récord histórico de goles con 140, una marca que quizás nunca se supere. Mientras, los regates mágicos de Messi en la 2010–11, donde el Barça destrozó a todos sus rivales, siguen grabados en la memoria del fútbol.",
  "Real Madrid's dynasty of three consecutive titles from 2016 to 2018 under Zinedine Zidane proved that tactical brilliance and squad depth still conquer all. But perhaps the most iconic moment belongs to the 1999 final, when Manchester United scored twice in injury time against Bayern Munich to complete an unbelievable treble.":
    "La dinastía del Real Madrid con tres títulos seguidos entre 2016 y 2018 con Zidane demostró que la inteligencia táctica y un buen plantel lo siguen ganando todo. Pero quizá el momento más icónico fue la final de 1999, cuando el Manchester United marcó dos goles en el descuento contra el Bayern para completar un triplete increíble.",
  "Liverpool's miracle in Istanbul in 2005 — coming back from 3-0 down against AC Milan — redefined what belief and determination mean in sport. And who could forget Ajax's youthful uprising in 2018–19, when a group of teenagers nearly reached the final with fearless, free-flowing football?":
    "El milagro del Liverpool en Estambul 2005 — remontando un 3-0 contra el Milan — redefinió lo que significan la fe y la determinación en el deporte. Y quién puede olvidar al Ajax joven de 2018–19, cuando un grupo de chavales casi llega a la final jugando sin miedo y a todo trapo.",
  "The UCL also holds curious records: the fastest goal was scored in just 10.12 seconds by Roy Makaay, and the highest-scoring match saw 12 goals in a single game. From Zidane's legendary volley in the 2002 final to Sergio Ramos's stoppage-time header in 2014, these moments transcend football itself, becoming part of global sporting folklore.":
    "La UCL también guarda récords curiosos: el gol más rápido lo marcó Roy Makaay en 10,12 segundos, y el partido con más goles tuvo 12 en un solo encuentro. Desde la volea legendaria de Zidane en la final de 2002 hasta el cabezazo en el descuento de Sergio Ramos en 2014, esos momentos van más allá del fútbol y forman parte del folclore deportivo mundial.",
  "Raúl, Messi, Lewandowski, Cristiano Ronaldo and Shevchenko — five icons whose nights under the European lights became eternal.":
    "Raúl, Messi, Lewandowski, Cristiano Ronaldo y Shevchenko — cinco iconos cuyas noches bajo las luces europeas se hicieron eternas.",

  // Other competitions paragraphs
  "The UEFA Champions League may sit at the very top of the European pyramid, but it is only one piece of a much wider continental story. Below it, two other tournaments give clubs from across the continent a chance to chase glory under the same UEFA banner — each with its own identity, history and ambitions.":
    "La UEFA Champions League está en lo más alto de la pirámide europea, pero es solo una pieza de una historia continental mucho más amplia. Por debajo, otros dos torneos dan a los clubes de todo el continente la oportunidad de pelear por la gloria bajo la misma bandera de la UEFA — cada uno con su identidad, historia y ambiciones.",
  "Together, these three trophies form a complete European ladder: every club, no matter the size of its league, has a real path to lift silver on a continental night.":
    "Juntos, estos tres trofeos forman una escalera europea completa: cualquier club, sin importar el tamaño de su liga, tiene un camino real para levantar un título en una noche continental.",
  "Founded in 1971 as the UEFA Cup and rebranded in 2009, the Europa League is Europe's second-tier club competition. It brings together strong domestic sides that just fell short of Champions League qualification, and famously rewards its winner with a direct ticket to the following UCL season.":
    "Fundada en 1971 como Copa de la UEFA y renombrada en 2009, la Europa League es la segunda competición de clubes de Europa. Reúne a equipos potentes que se quedaron a las puertas de la Champions y premia a su campeón con un billete directo a la siguiente UCL.",
  "Most successful club · Sevilla FC (7 titles)": "Club más laureado · Sevilla FC (7 títulos)",
  "Launched in 2021, the Conference League is the newest member of the UEFA family. Designed as a third tier, it opens the European stage to clubs from smaller and emerging leagues, giving them a realistic shot at continental silverware and unforgettable European nights.":
    "Lanzada en 2021, la Conference League es el miembro más nuevo de la familia UEFA. Pensada como un tercer escalón, abre el escenario europeo a clubes de ligas más pequeñas y emergentes, dándoles una oportunidad real de levantar un título y vivir noches europeas inolvidables.",
  "First champion · AS Roma, 2022 (José Mourinho)": "Primer campeón · AS Roma, 2022 (José Mourinho)",
  "Three competitions, one shared ambition: to crown the best of European football, from the historic giants of the Champions League to the rising names writing their first chapters in the Conference League.":
    "Tres competiciones, una misma ambición: coronar a lo mejor del fútbol europeo, desde los gigantes históricos de la Champions hasta los nombres emergentes que escriben sus primeros capítulos en la Conference League.",

  // Misc small strings
  "Pick a corner of the goal to shoot. The keeper patrols side to side and dives randomly — outguess him to score!":
    "Elige una esquina de la portería para chutar. El portero patrulla de lado a lado y se lanza al azar — ¡adivínalo para marcar!",
  "Click a glowing target inside the goal to shoot!":
    "¡Haz clic en un objetivo brillante dentro de la portería para chutar!",
  "Click on the right image to find the 10 hidden differences between the two scenes.":
    "Haz clic en la imagen de la derecha para encontrar las 10 diferencias escondidas entre las dos escenas.",
  "Hint: Check the scoreboard, the ad screens, the players & the stadium lights":
    "Pista: revisa el marcador, los anuncios, los jugadores y las luces del estadio",
  "Unscramble the legend's name. Click letters to build the answer · click placed letters to remove them.":
    "Descifra el nombre de la leyenda. Haz clic en las letras para construir la respuesta · haz clic en las colocadas para quitarlas.",
  "Short names, only horizontal & vertical.": "Nombres cortos, solo horizontal y vertical.",
  "Diagonals appear, forwards only.": "Aparecen diagonales, solo hacia adelante.",
  "All 8 directions — forwards & backwards.": "Las 8 direcciones — hacia adelante y hacia atrás.",
  "Bigger grid, longer names, every direction.": "Cuadrícula más grande, nombres más largos, todas las direcciones.",
  "Find these legends": "Encuentra estas leyendas",
  "Click and drag across the grid to select letters.": "Haz clic y arrastra por la cuadrícula para seleccionar letras.",
  "Round": "Ronda",
  "Language": "Idioma",
  "cleared!": "¡superado!",
};

interface Ctx {
  lang: Lang;
  toggle: () => void;
  t: (s: string) => string;
}

const LanguageContext = createContext<Ctx>({
  lang: "en",
  toggle: () => {},
  t: (s) => s,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = useCallback(() => setLang((l) => (l === "en" ? "es" : "en")), []);
  const t = useCallback(
    (s: string) => (lang === "es" ? dict[s] ?? s : s),
    [lang]
  );
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;