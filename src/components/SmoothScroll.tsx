"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis wired straight into the GSAP ticker — one rAF loop for smooth
 * scroll and ScrollTrigger together.
 *
 * Deliberately NOT the <ReactLenis> wrapper: with `autoRaf: false` the
 * wrapper's instance ref wasn't reliably available when our effect ran,
 * so nothing ever pumped `lenis.raf()` — Lenis swallowed wheel events and
 * never applied them (wheel dead, middle-click autoscroll fine). Creating
 * the instance in the same effect that registers the ticker makes the
 * ordering impossible to get wrong.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // native scroll; ScrollTrigger works on its own
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
