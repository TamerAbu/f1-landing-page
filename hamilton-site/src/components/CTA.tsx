"use client";

import { motion } from "framer-motion";
import SplitText, { SectionReveal } from "@/components/SplitText";

const EASING: [number, number, number, number] = [0.65, 0.05, 0, 1];

export default function CTA() {
  return (
    <section id="cta" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-brand-orange/3 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative px-8 py-16 text-center md:px-16 md:py-24">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, ease: EASING }}
                className="type-overline text-brand"
              >
                עונת 2025 פתוחה עכשיו
              </motion.p>

              <div className="mt-5">
                <SplitText
                  as="h2"
                  className="font-display text-fluid-3xl font-extrabold leading-tight tracking-display text-[#111]"
                  delay={0.3}
                >
                  {"מוכנים לטיול\nשל החיים?"}
                </SplitText>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, ease: EASING }}
                className="mx-auto mt-5 max-w-md text-fluid-base text-[#666]"
              >
                המקומות מוגבלים. הצטרפו לרשימת ההמתנה או הזמינו ישירות לעונת
                F1 2025. מקדימים מקבלים את המלונות הטובים ביותר.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, ease: EASING }}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <a
                  href="#"
                  className="group relative overflow-hidden rounded-full bg-brand px-10 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,24,1,0.3)]"
                >
                  <span className="relative z-10">הזמן את הטיול שלך</span>
                  <div className="absolute inset-0 translate-y-full bg-brand-dark transition-transform duration-500 group-hover:translate-y-0" />
                </a>
                <a
                  href="#"
                  className="rounded-full border border-[#ddd] px-10 py-3.5 text-sm font-medium uppercase tracking-wider text-[#333] transition-all duration-300 hover:border-[#aaa] hover:bg-[#f5f5f5]"
                >
                  הצטרף לרשימת המתנה
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, ease: EASING }}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 text-fluid-xs text-[#999]"
              >
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  טיולים מבוטחים במלואם
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  ביטול חינם עד 30 יום
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  תמיכה בטיול 24/7
                </span>
              </motion.div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
