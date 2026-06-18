"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  className = "",
  align = "left",
  id,
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const children = el.querySelectorAll(".sh-animate");
    gsap.set(children, { opacity: 0, y: 28 });

    const anim = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  const isCenter = align === "center";

  return (
    <div
      ref={containerRef}
      className={`mb-10 sm:mb-14 md:mb-20 ${isCenter ? "text-center" : "text-left"} ${className}`}
      id={id}
    >
      {eyebrow && (
        <div
          className={`sh-animate flex items-center gap-3 mb-4 sm:mb-5 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-terracotta/50" />
          <span className="eyebrow">{eyebrow}</span>
          {isCenter && <span className="h-px w-8 bg-terracotta/50" />}
        </div>
      )}
      <h2 className={`sh-animate display t-h2 text-forest-green max-w-3xl ${isCenter ? "mx-auto" : ""}`}>
        {heading}
      </h2>
      {subheading && (
        <p
          className={`sh-animate t-lead mt-4 sm:mt-6 font-sans text-sage max-w-2xl ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
