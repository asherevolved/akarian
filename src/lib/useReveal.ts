"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** The one motion curve — strong ease-out, no bounce. */
const EASE = "power3.out";

interface RevealOptions {
  /** CSS selector for children to stagger in. `null` reveals the element itself. */
  selector?: string | null;
  /** Rise distance in px. */
  y?: number;
  /** Stagger between items (only meaningful with a selector). */
  stagger?: number;
  /** ScrollTrigger start. */
  start?: string;
  duration?: number;
}

/**
 * The single reveal primitive for the whole site: a gentle fade + rise,
 * fired once when the element scrolls into view.
 *
 * Content is visible by default (CSS). Motion only applies when JS runs and
 * the user hasn't asked for reduced motion — so nothing is ever gated behind
 * an animation that might not fire.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    selector = "[data-reveal]",
    y = 16,
    stagger = 0.08,
    start = "top 85%",
    duration = 0.7,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const targets: Element[] = selector
        ? Array.from(el.querySelectorAll(selector))
        : [el];
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: EASE,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [selector, y, stagger, start, duration]);

  return ref;
}
