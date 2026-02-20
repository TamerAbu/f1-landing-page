"use client";

import { motion } from "framer-motion";
import SplitText, { SectionReveal } from "@/components/SplitText";

const EASING: [number, number, number, number] = [0.65, 0.05, 0, 1];

const TESTIMONIALS = [
  {
    quote: "סוף השבוע הכי טוב בחיי. המירוץ היה מדהים, אבל סיור האוכל וחיי הלילה אחר כך היו ברמה אחרת.",
    name: "אלכס ר.",
    trip: "גרנד פרי מונקו 2024",
  },
  {
    quote: "הייתי במירוצי F1 לבד בעבר. Grid Pass הפך את זה לחוויה אחרת לגמרי — האנרגיה הקבוצתית ללא תחרות.",
    name: "שרה כ.",
    trip: "גרנד פרי סינגפור 2024",
  },
  {
    quote: "הם טיפלו בהכל. כל מה שהייתי צריך לעשות זה להגיע ולהנות מהזמן הכי טוב בחיי.",
    name: "מרקו ט.",
    trip: "גרנד פרי מונזה 2024",
  },
];

export default function SocialProof() {
  return (
    <section id="about" className="relative bg-surface py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASING }}
            className="mb-3 type-overline text-brand"
          >
            מהנוסעים שלנו
          </motion.p>

          <SplitText
            as="h2"
            className="font-display text-fluid-2xl font-extrabold tracking-display text-[#111]"
            delay={0.1}
          >
            {"טיולים אמיתיים. אנשים אמיתיים."}
          </SplitText>
        </div>

        <SectionReveal>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASING }}
                className="rounded-2xl border border-border bg-white p-6 md:p-7"
              >
                <p className="text-fluid-sm leading-relaxed text-[#555]">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/5 text-xs font-semibold text-brand">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111]">{t.name}</p>
                    <p className="text-fluid-xs text-[#999]">{t.trip}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
    </section>
  );
}
