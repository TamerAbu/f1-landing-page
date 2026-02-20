"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const EASING: [number, number, number, number] = [0.65, 0.05, 0, 1];

/* ─────────────────────────────────────────────
   SplitText — clip-path line reveal (landonorris.com style)
   ───────────────────────────────────────────── */

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  margin?: string;
}

export default function SplitText({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.08,
  once = true,
  margin = "-100px",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });

  const lines = children.split("\n");

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      aria-label={children}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{
            clipPath: "polygon(0 -2%, 100% -2%, 100% 105%, 0 105%)",
          }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.75,
              ease: EASING,
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────────
   SectionReveal — clip-path inset reveal for grids/cards
   ───────────────────────────────────────────── */

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  margin?: string;
}

export function SectionReveal({
  children,
  className = "",
  margin = "-80px",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: "inset(8% 0 0 0)" , opacity: 0 }}
      animate={
        isInView
          ? { clipPath: "inset(0% 0 0 0)", opacity: 1 }
          : { clipPath: "inset(8% 0 0 0)", opacity: 0 }
      }
      transition={{ duration: 0.9, ease: EASING }}
    >
      {children}
    </motion.div>
  );
}
