import { Star } from "lucide-react";

// Subtle Champions League–inspired ambient layer:
// drifting orbs + twinkling stars, fixed behind all content.
const stars = [
  { top: "8%",  left: "6%",  size: 22, delay: "0s",   dur: "5s" },
  { top: "15%", left: "82%", size: 16, delay: "1.2s", dur: "6s" },
  { top: "32%", left: "12%", size: 14, delay: "0.6s", dur: "4.5s" },
  { top: "44%", left: "70%", size: 20, delay: "2s",   dur: "7s" },
  { top: "58%", left: "20%", size: 18, delay: "0.3s", dur: "5.5s" },
  { top: "65%", left: "88%", size: 14, delay: "1.8s", dur: "6.5s" },
  { top: "78%", left: "45%", size: 22, delay: "0.9s", dur: "5s" },
  { top: "88%", left: "8%",  size: 16, delay: "2.4s", dur: "7s" },
  { top: "25%", left: "50%", size: 12, delay: "3s",   dur: "4s" },
  { top: "72%", left: "62%", size: 18, delay: "1.5s", dur: "6s" },
];

const AmbientBackground = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    {/* Soft drifting orbs */}
    <div
      className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-40 blur-3xl animate-float-slow"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--neon-blue) / 0.35), transparent 70%)",
      }}
    />
    <div
      className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full opacity-30 blur-3xl animate-float-slow"
      style={{
        animationDelay: "3s",
        background:
          "radial-gradient(circle, hsl(var(--neon-glow) / 0.3), transparent 70%)",
      }}
    />
    <div
      className="absolute bottom-0 left-1/4 w-[420px] h-[420px] rounded-full opacity-25 blur-3xl animate-float-slow"
      style={{
        animationDelay: "1.5s",
        background:
          "radial-gradient(circle, hsl(var(--neon-blue) / 0.4), transparent 70%)",
      }}
    />

    {/* Twinkling Champions stars */}
    {stars.map((s, i) => (
      <Star
        key={i}
        className="absolute text-neon animate-twinkle"
        style={{
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          animationDelay: s.delay,
          animationDuration: s.dur,
          filter: "drop-shadow(0 0 8px hsl(var(--neon-blue) / 0.6))",
        }}
        fill="currentColor"
      />
    ))}

    {/* Faint scanline / grid for depth */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--neon-blue)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-blue)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

export default AmbientBackground;
