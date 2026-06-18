"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { BENEFITS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Heading slides in
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: E_OUT,
          scrollTrigger: { trigger: headRef.current, start: "top 88%", once: true },
        }
      );

      // Cards — alternating row stagger for grid feel
      const cards = gridRef.current?.querySelectorAll(".benefit-card");
      if (!cards) return;

      cards.forEach((card, i) => {
        const col = i % 3;
        const fromX = col === 0 ? -30 : col === 2 ? 30 : 0;

        gsap.fromTo(
          card,
          { opacity: 0, y: 48, x: fromX, scale: 0.96 },
          {
            opacity: 1, y: 0, x: 0, scale: 1,
            duration: 0.7,
            delay: (i % 3) * 0.08,
            ease: E_OUT,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="benefits" className="section-padding bg-ivory">
      <div className="container-wide">
        <div ref={headRef}>
          <SectionHeading
            eyebrow="What Your Child Gains"
            heading="The Gifts of Sensory Nourishment"
            subheading="When a child's sensory systems are thoughtfully nourished during the 2–6 developmental window, the impact reaches every dimension of who they are, shaping the person they will become for the rest of their life."
            align="center"
          />
        </div>

        {/* Asymmetric 2-col zig-zag on md, single col on mobile */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {BENEFITS.map((benefit, idx) => (
            <Card
              key={benefit.number}
              className={`benefit-card group !bg-sandstone-beige/20 ${
                idx % 2 !== 0 ? "sm:mt-8" : ""
              }`}
              variant="sandstone"
              id={`benefit-${benefit.number}`}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-3xl sm:text-4xl font-light text-terracotta leading-none transition-transform duration-300 group-hover:scale-110 inline-block">
                  {benefit.number}
                </span>
                <span className="flex-1 h-px bg-golden-sand/30 group-hover:bg-terracotta/40 transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-forest-green mb-3">
                {benefit.title}
              </h3>
              <p className="font-sans text-sm text-sage leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
