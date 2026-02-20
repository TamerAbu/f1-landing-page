"use client";

import { motion } from "framer-motion";
import SplitText, { SectionReveal } from "@/components/SplitText";

const EASING: [number, number, number, number] = [0.65, 0.05, 0, 1];

const STEPS = [
  { number: "01", title: "בחר את המירוץ שלך", description: "עיין בלוח השנה שלנו ובחר מתוך 24 יעדי גרנד פרי ברחבי העולם. הזוהר של מונקו או המהירות של סוזוקה — הבחירה שלך." },
  { number: "02", title: "אנחנו מטפלים בהכל", description: "טיסות, מלונות 4 כוכבים+, העברות משדה התעופה, כרטיסים למירוץ, ותיאום קבוצתי. אתה רק מגיע." },
  { number: "03", title: "חוויית יום המירוץ", description: "גישה ליציע VIP, סיורים מאחורי הקלעים, מסיבות צפייה, והאנרגיה החשמלית של גרנד פרי חי." },
  { number: "04", title: "אחרי המירוץ", description: "סיורי אוכל, ברים על הגג, פנינים מקומיות נסתרות, וחיי לילה. אנחנו חוקרים כל עיר כמו מקומיים, לא כתיירים." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative bg-surface py-24 md:py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: EASING }}
            className="mb-3 type-overline text-brand"
          >
            איך זה עובד
          </motion.p>

          <SplitText
            as="h2"
            className="font-display text-fluid-3xl font-extrabold tracking-display text-[#111]"
            delay={0.1}
          >
            {"ארבעה צעדים פשוטים"}
          </SplitText>
        </div>

        <SectionReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASING }}
                className="group rounded-2xl border border-border bg-white p-6 transition-all duration-500 hover:border-brand/15 hover:shadow-sm md:p-8"
              >
                <span className="gradient-text font-display text-5xl font-extrabold type-mono opacity-20 transition-opacity duration-500 group-hover:opacity-40">{step.number}</span>
                <h3 className="mt-4 font-display text-fluid-lg font-semibold tracking-display text-[#111]">{step.title}</h3>
                <p className="mt-3 text-fluid-sm leading-relaxed text-[#666]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
    </section>
  );
}
