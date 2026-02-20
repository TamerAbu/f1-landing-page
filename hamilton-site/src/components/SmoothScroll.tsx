"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const snap = new Snap(lenis, {
      type: "mandatory",
      debounce: 100,
    });

    // Snap to all sections marked with data-snap
    const snapSections = document.querySelectorAll<HTMLElement>("[data-snap]");
    const removers: (() => void)[] = [];

    snapSections.forEach((el) => {
      removers.push(snap.addElement(el, { align: ["start"] }));
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      removers.forEach((remove) => remove());
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return null;
}
