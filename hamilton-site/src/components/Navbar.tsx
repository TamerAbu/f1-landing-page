"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "חוויות", href: "#experiences" },
  { label: "איך זה עובד", href: "#how" },
  { label: "אחרי המירוץ", href: "#afterhours" },
  { label: "אודות", href: "#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [docked, setDocked] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const vh = window.innerHeight;
    const MAGNETIC_THRESHOLD = vh * 0.5;

    let rafId = 0;
    let targetOffset = vh - 140;
    offsetRef.current = targetOffset;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getMagneticTarget = (scrollY: number) => {
      if (scrollY <= 0) return vh - 140;
      if (scrollY >= vh) return 0;

      const ratio = scrollY / vh;

      if (ratio < 0.3) {
        return vh - 140 - scrollY * 0.3;
      } else {
        const snapRatio = (ratio - 0.3) / 0.7;
        const eased = snapRatio * snapRatio * snapRatio;
        const bottomPos = vh - 140 - MAGNETIC_THRESHOLD * 0.3;
        return bottomPos * (1 - eased);
      }
    };

    const tick = () => {
      const speed = Math.abs(targetOffset - offsetRef.current) > 100 ? 0.18 : 0.12;
      offsetRef.current = lerp(offsetRef.current, targetOffset, speed);

      if (Math.abs(offsetRef.current - targetOffset) < 0.5) {
        offsetRef.current = targetOffset;
      }

      if (navRef.current) {
        navRef.current.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      targetOffset = getMagneticTarget(y);
      setDocked(y > vh * 0.75);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-100"
        style={{ willChange: "transform" }}
      >
        <div
          className={`mx-auto transition-[max-width,padding] duration-500 ease-in-out ${
            docked ? "max-w-7xl px-6 py-3" : "max-w-5xl px-6 py-3"
          }`}
        >
          <nav
            className={`liquid-glass-nav relative overflow-hidden transition-[border-radius] duration-500 ${
              docked ? "rounded-2xl" : "rounded-[20px]"
            }`}
            style={{
              backdropFilter: "blur(22px) saturate(1.8)",
              WebkitBackdropFilter: "blur(22px) saturate(1.8)",
            }}
          >
            {/* Dark glass background — always readable */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(17,17,17,0.82) 0%, rgba(17,17,17,0.72) 50%, rgba(17,17,17,0.78) 100%)",
              }}
            />
            {/* Refraction shimmer */}
            <div className="pointer-events-none absolute inset-0 liquid-glass-refraction" />
            {/* Border + shadow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "inherit",
              }}
            />

            {/* Nav content */}
            <div className="relative z-10 flex items-center justify-between px-7 py-3 md:px-10">
              {/* Logo */}
              <a href="#" className="flex items-center">
                <img
                  src="/images/gridpass-logo.png"
                  alt="Grid Pass"
                  className="h-9 w-auto brightness-0 invert"
                />
              </a>

              {/* Desktop links */}
              <div className="hidden items-center gap-8 lg:flex">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[13px] font-medium tracking-wide text-white/55 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#cta"
                className="group relative hidden items-center gap-2 overflow-hidden rounded-full border border-white/10 px-6 py-2 text-[13px] font-medium tracking-wide text-white/90 transition-all duration-500 hover:border-white/20 hover:text-white sm:inline-flex"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-brand/60 via-brand/40 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">הזמן טיול</span>
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
                aria-label="Toggle menu"
              >
                <span className={`h-0.5 w-6 rounded-full transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45 bg-[#111]" : "bg-white/80"}`} />
                <span className={`h-0.5 w-6 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : "bg-white/80"}`} />
                <span className={`h-0.5 w-6 rounded-full transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45 bg-[#111]" : "bg-white/80"}`} />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white px-6 pt-28"
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="text-2xl font-medium text-[#111] transition-colors hover:text-brand"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#cta"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="group relative mt-4 inline-flex w-fit items-center overflow-hidden rounded-full border border-brand/20 px-7 py-2.5 text-base font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #ff1801 0%, #cc1200 100%)",
                }}
              >
                <span className="relative">הזמן טיול</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
