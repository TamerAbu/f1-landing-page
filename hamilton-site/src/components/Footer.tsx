"use client";

import { motion } from "framer-motion";

const FOOTER_LINKS = [
  { title: "יעדים", links: ["מונקו", "מונזה", "אבו דאבי", "סילברסטון", "סינגפור", "כל המירוצים"] },
  { title: "חברה", links: ["אודות", "איך זה עובד", "שאלות נפוצות", "צור קשר"] },
  { title: "רשתות חברתיות", links: ["Instagram", "TikTok", "YouTube", "X (Twitter)"] },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-[#111]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center">
              <img
                src="/images/gridpass-logo.png"
                alt="Grid Pass"
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <p className="mt-5 max-w-xs text-fluid-sm leading-relaxed text-white/40">
              נסיעות קבוצתיות פרימיום למירוצי פורמולה 1 ברחבי העולם. יום מירוץ, סיורי אוכל,
              חיי לילה, וחוויות בלתי נשכחות.
            </p>
          </motion.div>

          {FOOTER_LINKS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
            >
              <p className="mb-4 type-overline text-white/25">{group.title}</p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-fluid-sm text-white/40 transition-colors duration-300 hover:text-white">{link}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-12">
          <p className="text-xs text-white/20">&copy; 2025 Grid Pass. כל הזכויות שמורות.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/20 transition-colors hover:text-white/50">מדיניות פרטיות</a>
            <a href="#" className="text-xs text-white/20 transition-colors hover:text-white/50">תנאי שימוש</a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 bottom-16 select-none opacity-[0.02] md:right-12">
        <img src="/images/gridpass-logo.png" alt="" className="h-32 w-auto brightness-0 invert md:h-48" />
      </div>
    </footer>
  );
}
