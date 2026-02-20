"use client";

export default function Marquee() {
  const items = [
    "גרנד פרי מונקו",
    "גישה לפדוק",
    "ארוחות מישלן",
    "אירוח VIP",
    "סוף שבוע במונזה",
    "מסיבת גג",
    "פינאלה אבו דאבי",
    "סיורי אוכל מקומיים",
    "סילברסטון קלאסי",
    "נסיעות קבוצתיות",
  ];

  return (
    <div className="overflow-hidden border-y border-border bg-surface py-5">
      <div className="animate-marquee flex w-max gap-12">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.15em] text-[#ccc]"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}
