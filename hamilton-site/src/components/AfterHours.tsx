"use client";

import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";

const EASING: [number, number, number, number] = [0.65, 0.05, 0, 1];

const EXPERIENCES = [
  {
    title: "סיורי אוכל מקומיים",
    description: "מסעדות נבחרות בקפידה, סיורי אוכל רחוב, וארוחות מישלן. לכל עיר יש סיפור קולינרי.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    title: "ברים על הגג וחיי לילה",
    description: "המירוץ נגמר, המסיבה מתחילה. גישה בלעדית לחיי הלילה הטובים ביותר שכל עיר מארחת מציעה.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22h8" /><path d="M12 11v11" /><path d="M20 7l-8 4L4 7" /><path d="M6 2l6 4 6-4" />
      </svg>
    ),
  },
  {
    title: "חקירת העיר",
    description: "סיורים מודרכים באתרים אייקוניים, שכונות נסתרות, ומוקדים תרבותיים. ראה את העיר כמו מקומי.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
      </svg>
    ),
  },
  {
    title: "פעילויות קבוצתיות",
    description: "קארטינג, ימי יאכטה, מועדוני חוף, והרפתקאות ספונטניות שמחברות אנשים.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function AfterHours() {
  return (
    <section id="afterhours" className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: EASING }}
              className="mb-3 type-overline text-brand-orange"
            >
              מעבר למסלול
            </motion.p>

            <SplitText
              as="h2"
              className="font-display text-fluid-3xl font-extrabold leading-[1.1] tracking-display text-[#111]"
              delay={0.1}
            >
              {"המירוץ הוא רק\nההתחלה."}
            </SplitText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASING }}
              className="mt-6 max-w-md text-fluid-base leading-relaxed text-[#666]"
            >
              כשהדגל המשובץ מונף, Grid Pass ממשיך. כל
              יעד הוא חוויה מלאה — אוכל, תרבות, חיי לילה, וסוג
              הזיכרונות שאי אפשר לתכנן לבד.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.5, ease: EASING }}
              className="mt-8 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-brand-orange to-transparent"
            />
          </div>

          <div className="space-y-5">
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASING }}
                className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:border-brand-orange/20 hover:shadow-sm md:p-7"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange/5 text-brand-orange transition-colors duration-300 group-hover:bg-brand-orange/10">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="text-fluid-lg font-semibold text-[#111]">{exp.title}</h3>
                    <p className="mt-2 text-fluid-sm leading-relaxed text-[#666]">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
