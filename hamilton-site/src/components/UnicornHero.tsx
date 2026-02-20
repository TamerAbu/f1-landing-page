"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const UnicornScene = dynamic(() => import("unicornstudio-react/next"), {
  ssr: false,
});

export default function UnicornHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Glass boxes: fade out + float up as you scroll past 30% of the hero
  const boxOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0]);
  const boxY = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0, -60]);

  // Dark overlay: builds from bottom as hero scrolls away
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.85], [0, 1]);

  // Scroll hint: visible at start, fades out as you scroll
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 1, 0]);

  // Subtle zoom on the whole scene as you leave
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={sectionRef} data-snap className="relative h-screen w-full overflow-hidden">
      {/* ── WebGL Scene with subtle zoom ── */}
      <motion.div className="absolute inset-0" style={{ scale: sceneScale }}>
        <UnicornScene
          jsonFilePath="/unicorn-scene.json"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100vh"
          lazyLoad={false}
          production={true}
          dpi={1.5}
          fps={60}
          scale={1}
        />
      </motion.div>

      {/* ── Dark overlay — smooth bridge to video section ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-5"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,1) 100%)",
        }}
      />

      {/* ── Right-aligned text overlay with glass ── */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden lg:flex lg:items-start lg:pt-[12vh]"
        style={{ opacity: boxOpacity, y: boxY }}
      >
        <div
          className="max-w-[420px] rounded-2xl border border-white/6 text-right xl:max-w-[460px]"
          style={{
            padding: "28px 32px",
            background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.55) 100%)",
            backdropFilter: "blur(40px) saturate(1.6)",
            WebkitBackdropFilter: "blur(40px) saturate(1.6)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.06)",
            marginRight: "40px",
          }}
        >
          <div className="mb-3 flex items-center justify-end gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
              המדריך שלכם
            </span>
            <div className="h-px w-6 bg-brand/50" />
          </div>

          <h1 className="text-[26px] font-bold leading-[1.35] text-white xl:text-[30px]">
            עידו יוטבת – לא רק מלווה,
            <br />
            אלא הפרשן האישי שלכם.
          </h1>

          <p className="mt-4 text-[14px] leading-[1.75] text-white/50">
            חובב F1 מושבע שהופך כל מרוץ לחוויה של 360 מעלות. איתי לא רק
            רואים את המכוניות טסות – מבינים את האסטרטגיה, מרגישים את הדופק
            בפיטס ונהנים מהמקומות הכי נחשקים בעיר.
          </p>
        </div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
        style={{ opacity: hintOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/25"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
