"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "ivory" | "sandstone" | "dark";
  hover?: boolean;
  arch?: boolean;
  id?: string;
}

export default function Card({
  children,
  className = "",
  variant = "ivory",
  hover = true,
  arch = false,
  id,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!hover || !ref.current) return;
    const el = ref.current;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Reusable paused timeline — Emil pattern: play/reverse not recreate
    tlRef.current = gsap.timeline({ paused: true })
      .to(el, {
        y: -7,
        borderColor: "var(--color-terracotta)",
        boxShadow: "0 16px 40px rgba(47, 59, 46, 0.10)",
        duration: 0.35,
        ease: "cubic-bezier(0.23, 1, 0.32, 1)",
      });

    const enter = () => tlRef.current?.play();
    const leave = () => tlRef.current?.reverse();

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      tlRef.current?.kill();
    };
  }, [hover]);

  const variants = {
    ivory: "bg-ivory border-forest-green/10",
    sandstone: "bg-sandstone-beige/35 border-golden-sand/25",
    dark: "bg-deep-olive border-sage/25 text-ivory",
  };

  const radius = arch ? "rounded-t-[5rem] rounded-b-2xl" : "rounded-2xl";

  return (
    <div
      ref={ref}
      className={`relative border ${radius} p-7 md:p-8 ${variants[variant]} ${hover ? "will-change-transform" : ""} ${className}`}
      id={id}
    >
      {children}
    </div>
  );
}
