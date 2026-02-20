"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TOTAL_FRAMES = 192;

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(4, "0");
  return `/frames/frame_${num}.jpg`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;
  let drawW: number, drawH: number, offsetX: number, offsetY: number;
  if (canvasRatio > imgRatio) {
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    offsetX = 0;
    offsetY = (canvasH - drawH) / 2;
  } else {
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    offsetX = (canvasW - drawW) / 2;
    offsetY = 0;
  }
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ═══════════════════════════════════════════════════
     BLOCK 1 — "GRID PASS" hero scaling (0% – 20%) — shortened
     ═══════════════════════════════════════════════════ */
  const heroScale = useTransform(scrollYProgress, [0.0, 0.02, 0.18], [3.0, 3.0, 0.4]);
  const heroY = useTransform(scrollYProgress, [0.0, 0.02, 0.18], ["0vh", "0vh", "-22vh"]);
  const heroOpacity = useTransform(scrollYProgress, [0.0, 0.01, 0.16, 0.22], [0, 1, 1, 0]);

  const subtitleClipY = useTransform(scrollYProgress, [0.10, 0.15], ["110%", "0%"]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.10, 0.14, 0.18, 0.22], [0, 1, 1, 0]);

  /* ═══════════════════════════════════════════════════
     BLOCK 2 — Big headline + subheader (24% – 52%)
     ═══════════════════════════════════════════════════ */
  const b2Opacity = useTransform(scrollYProgress, [0.24, 0.29, 0.48, 0.52], [0, 1, 1, 0]);
  const b2Line1Y = useTransform(scrollYProgress, [0.24, 0.30], ["110%", "0%"]);
  const b2Line2Y = useTransform(scrollYProgress, [0.26, 0.32], ["110%", "0%"]);
  const b2DescY = useTransform(scrollYProgress, [0.30, 0.36], ["40px", "0px"]);
  const b2DescOpacity = useTransform(scrollYProgress, [0.30, 0.36, 0.48, 0.52], [0, 1, 1, 0]);

  /* ═══════════════════════════════════════════════════
     BLOCK 3 — Features slide from right (55% – 92%)
     ═══════════════════════════════════════════════════ */
  const b3Opacity = useTransform(scrollYProgress, [0.55, 0.60, 0.88, 0.92], [0, 1, 1, 0]);
  const b3Y = useTransform(scrollYProgress, [0.55, 0.62], [40, 0]);
  const feat1X = useTransform(scrollYProgress, [0.57, 0.64], ["80px", "0px"]);
  const feat1Op = useTransform(scrollYProgress, [0.57, 0.64], [0, 1]);
  const feat2X = useTransform(scrollYProgress, [0.60, 0.67], ["80px", "0px"]);
  const feat2Op = useTransform(scrollYProgress, [0.60, 0.67], [0, 1]);
  const feat3X = useTransform(scrollYProgress, [0.63, 0.70], ["80px", "0px"]);
  const feat3Op = useTransform(scrollYProgress, [0.63, 0.70], [0, 1]);
  const feat4X = useTransform(scrollYProgress, [0.66, 0.73], ["80px", "0px"]);
  const feat4Op = useTransform(scrollYProgress, [0.66, 0.73], [0, 1]);
  const b3CtaY = useTransform(scrollYProgress, [0.74, 0.80], ["110%", "0%"]);
  const b3CtaOpacity = useTransform(scrollYProgress, [0.74, 0.80, 0.88, 0.92], [0, 1, 1, 0]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0.0, 0.02, 0.06], [0, 1, 0]);

  /* ═══════════════════════════════════════════════════
     Vignette overlay opacity — stronger during text blocks
     ═══════════════════════════════════════════════════ */
  const vignetteOpacity = useTransform(scrollYProgress,
    [0.0, 0.05, 0.24, 0.29, 0.48, 0.52, 0.58, 0.62, 0.68, 0.92, 1.0],
    [0.4, 0.5, 0.5, 0.75, 0.75, 0.5, 0.6, 0.3, 0.6, 0.6, 0.4]
  );

  /* ═══════════════════════════════════════════════════
     Canvas setup & frame loading
     ═══════════════════════════════════════════════════ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctxRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images[i] = img;
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const img = imagesRef.current[0];
    if (!canvas || !ctx || !img) return;
    drawCover(ctx, img, canvas.width, canvas.height);
    currentFrameRef.current = 0;
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const unsubscribe = scrollYProgress.on("change", (p) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;
      const frameIndex = Math.round(p * (TOTAL_FRAMES - 1));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        const img = imagesRef.current[frameIndex];
        if (img && img.complete) {
          drawCover(ctx, img, canvas.width, canvas.height);
        }
      }
    });
    return () => unsubscribe();
  }, [loaded, scrollYProgress]);

  const textShadow = "0 2px 60px rgba(0,0,0,0.8), 0 0px 20px rgba(0,0,0,0.6), 0 0px 4px rgba(0,0,0,0.4)";

  return (
    <section ref={sectionRef} data-snap className="relative h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ── Loader ── */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0a0a0a]">
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-20 w-20">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="2" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="#ff1801" strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.83} 283`}
                    className="transition-all duration-150"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold type-mono text-white">
                  {progress}%
                </span>
              </div>
              <p className="type-overline text-white/30">טוען חוויה</p>
            </div>
          </div>
        )}

        {/* ── 4K Canvas ── */}
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* ── Cinematic vignette overlay ── */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: vignetteOpacity,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.1) 65%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* ── Bottom gradient for text readability ── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh]"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}
        />

        {/* ════════════════════════════════════════════
            BLOCK 1: "GRID PASS" — scales from massive to small
            ════════════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center justify-center will-transform">
          <motion.div
            style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}
            className="px-6 text-center"
          >
            <img
              src="/images/gridpass-logo.png"
              alt="Grid Pass"
              className="h-24 w-auto brightness-0 invert drop-shadow-[0_2px_40px_rgba(0,0,0,0.5)] md:h-36 lg:h-48"
            />

          </motion.div>
        </div>

        {/* ── Subtitle ── */}
        <div className="absolute inset-0 flex items-center justify-center will-transform">
          <motion.div style={{ opacity: subtitleOpacity }} className="mt-[18vh] text-center">
            <span className="clip-text-line">
              <motion.span
                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/90 md:text-sm"
                style={{ y: subtitleClipY, textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0px 6px rgba(0,0,0,0.5)" }}
              >
                נסיעות קבוצתיות פרימיום לפורמולה 1
              </motion.span>
            </span>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════
            BLOCK 2: Big headline — centered, impactful
            ════════════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center justify-center will-transform">
          <motion.div
            style={{ opacity: b2Opacity }}
            className="w-full px-8 text-center"
          >
            {/* Dark radial backdrop for text readability */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, transparent 80%)",
              }}
            />
            <div className="relative mx-auto max-w-5xl">
              <span className="clip-text-line">
                <motion.span
                  className="inline-block font-display text-fluid-4xl font-extrabold leading-none tracking-display text-white"
                  style={{ y: b2Line1Y, textShadow }}
                >
                  מ-0 ל-100
                </motion.span>
              </span>
              <br />
              <span className="clip-text-line">
                <motion.span
                  className="inline-block font-display text-fluid-4xl font-extrabold leading-none tracking-display text-white"
                  style={{ y: b2Line2Y, textShadow }}
                >
                  בחוויה אחת<span className="text-[#ff6b2b]">.</span>
                </motion.span>
              </span>

              <motion.p
                style={{ y: b2DescY, opacity: b2DescOpacity, textShadow: "0 1px 20px rgba(0,0,0,0.6)" }}
                className="mx-auto mt-8 max-w-lg text-fluid-lg leading-relaxed text-white/80"
                dir="rtl"
              >
                אנחנו נדאג להכל, אתם רק תצטרכו להחזיק חזק.
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════
            BLOCK 3: Features — slide in from the right
            ════════════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center will-transform" dir="rtl">
          <motion.div
            style={{ opacity: b3Opacity, y: b3Y }}
            className="mr-auto w-full max-w-md px-8 md:px-16 lg:max-w-lg lg:px-24"
          >
            <div className="flex flex-col gap-6">
              <motion.div style={{ x: feat1X, opacity: feat1Op }} className="flex items-start gap-4">
                <div className="mt-1.5 h-[2px] w-5 shrink-0 rounded-full bg-brand" />
                <div>
                  <p className="text-base font-semibold text-white">VIP בכניסה</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    כרטיסים למקומות הטובים ביותר.
                  </p>
                </div>
              </motion.div>
              <motion.div style={{ x: feat2X, opacity: feat2Op }} className="flex items-start gap-4">
                <div className="mt-1.5 h-[2px] w-5 shrink-0 rounded-full bg-brand-orange" />
                <div>
                  <p className="text-base font-semibold text-white">קולינריה</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    מסעדות שף ואווירה מקומית בכל ערב.
                  </p>
                </div>
              </motion.div>
              <motion.div style={{ x: feat3X, opacity: feat3Op }} className="flex items-start gap-4">
                <div className="mt-1.5 h-[2px] w-5 shrink-0 rounded-full bg-brand-yellow" />
                <div>
                  <p className="text-base font-semibold text-white">אטרקציות</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    פעילויות אקסטרים ותרבות מעבר למסלול.
                  </p>
                </div>
              </motion.div>
              <motion.div style={{ x: feat4X, opacity: feat4Op }} className="flex items-start gap-4">
                <div className="mt-1.5 h-[2px] w-5 shrink-0 rounded-full bg-white/30" />
                <div>
                  <p className="text-base font-semibold text-white">ידע מקצועי</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    ליווי צמוד והסברים טכניים מעידו לאורך כל סוף השבוע.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-10">
              <span className="clip-text-line">
                <motion.span
                  className="inline-block text-fluid-sm text-white/40"
                  style={{ y: b3CtaY, opacity: b3CtaOpacity }}
                >
                  גלול כדי לגלות יעדים
                </motion.span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Scroll hint at very top ── */}
        {loaded && (
          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="type-overline text-white/30">גלול</span>
              <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
