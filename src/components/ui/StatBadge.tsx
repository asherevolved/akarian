"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StatBadgeProps {
  value: string;
  label: string;
}

export default function StatBadge({ value, label }: StatBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const anim = gsap.from(el, {
      opacity: 0,
      y: 18,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 92%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <div ref={ref} className="text-center">
      <p className="font-serif nums text-3xl sm:text-4xl md:text-5xl font-light text-terracotta leading-none">
        {value}
      </p>
      <span className="mx-auto mt-2 sm:mt-3 mb-2 sm:mb-2.5 block h-px w-5 sm:w-6 bg-golden-sand/50" />
      <p className="font-sans text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-golden-sand">
        {label}
      </p>
    </div>
  );
}
