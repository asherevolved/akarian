"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { MARQUEE_ITEMS } from "@/lib/constants";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const totalWidth = track.scrollWidth / 2;

    animRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 48,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    // Pause on hover — slow down smoothly, resume on leave
    const container = track.parentElement;
    if (!container) return;

    const slowDown = () => {
      gsap.to(animRef.current, { timeScale: 0.18, duration: 0.6, ease: "power2.out" });
    };
    const resume = () => {
      gsap.to(animRef.current, { timeScale: 1, duration: 0.8, ease: "power2.inOut" });
    };

    container.addEventListener("mouseenter", slowDown);
    container.addEventListener("mouseleave", resume);

    return () => {
      animRef.current?.kill();
      container.removeEventListener("mouseenter", slowDown);
      container.removeEventListener("mouseleave", resume);
    };
  }, []);

  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="relative py-5 sm:py-7 bg-deep-olive overflow-hidden grain cursor-default select-none">
      <div
        ref={trackRef}
        className="relative z-10 flex items-center gap-0 whitespace-nowrap will-change-transform"
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-serif text-base sm:text-lg md:text-2xl italic text-ivory/85 px-5 sm:px-8 hover:text-yellow-amber transition-colors duration-300">
              {item}
            </span>
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3 text-yellow-amber/60 shrink-0"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
            </svg>
          </span>
        ))}
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-deep-olive to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-deep-olive to-transparent z-20 pointer-events-none" />
    </section>
  );
}
