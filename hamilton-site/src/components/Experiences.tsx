"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SplitText, { SectionReveal } from "@/components/SplitText";

const CircuitModel = dynamic(() => import("@/components/CircuitModel"), {
  ssr: false,
  loading: () => <div className="h-[100px] w-[100px]" />,
});

const EASING: [number, number, number, number] = [0.65, 0.05, 0, 1];

const RACES = [
  { city: "מונקו", country: "מונטה קרלו", date: "מאי 2025", tag: "אייקוני" },
  { city: "מונזה", country: "איטליה", date: "ספט׳ 2025", tag: "קלאסי" },
  { city: "אבו דאבי", country: "איחוד האמירויות", date: "דצמ׳ 2025", tag: "פינאלה" },
  { city: "סילברסטון", country: "בריטניה", date: "יולי 2025", tag: "מורשת" },
  { city: "סינגפור", country: "מרינה ביי", date: "אוק׳ 2025", tag: "מירוץ לילה" },
  { city: "ברצלונה", country: "ספרד", date: "יוני 2025", tag: "קיץ" },
];

export default function Experiences() {
  return (
    <section id="experiences" data-snap className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASING }}
            className="mb-3 type-overline text-brand"
          >
            לוח שנה 2025
          </motion.p>

          <SplitText
            as="h2"
            className="font-display text-fluid-3xl font-extrabold tracking-display text-[#111]"
            delay={0.1}
          >
            {"בחר את המירוץ שלך"}
          </SplitText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASING }}
            className="mt-4 max-w-lg text-fluid-base text-[#666]"
          >
            כל טיול מאורגן במלואו — טיסות, מלונות, העברות, כרטיסים למירוץ,
            וחוויות מותאמות אישית בכל עיר.
          </motion.p>
        </div>

        <SectionReveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RACES.map((race, i) => (
              <motion.div
                key={race.city}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASING }}
                className="group cursor-pointer rounded-2xl border border-border bg-white p-6 transition-all duration-500 hover:border-brand/20 hover:shadow-[0_8px_40px_rgba(255,24,1,0.06)] md:p-7"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-[#f5f5f5] px-3 py-1 type-overline text-brand transition-colors group-hover:bg-brand/5">
                      {race.tag}
                    </span>
                    <div className="mt-5">
                      <h3 className="font-display text-fluid-xl font-semibold tracking-display text-[#111] transition-transform duration-500 group-hover:-translate-y-0.5">
                        {race.city}
                      </h3>
                      <p className="mt-1 text-sm text-[#999]">{race.country}</p>
                    </div>
                  </div>
                  <div className="opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                    <CircuitModel className="h-[100px] w-[100px] md:h-[110px] md:w-[110px]" />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium type-mono text-[#aaa]">{race.date}</span>
                  <span className="flex items-center gap-1.5 type-overline text-brand opacity-0 transition-all duration-500 group-hover:opacity-100">
                    צפה בטיול
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
