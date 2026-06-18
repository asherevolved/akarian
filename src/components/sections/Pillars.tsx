"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon, { type IconName } from "@/components/ui/Icon";
import { PILLARS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const E_SPRING = "back.out(2)";

const PILLAR_ICONS: IconName[] = [
  "tactile", "vestibular", "proprioceptive", "visual",
  "auditory", "olfactory", "gustatory", "interoception",
];

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".pillar-card");
      if (!cards) return;

      cards.forEach((card, i) => {
        const medallion = card.querySelector<HTMLElement>(".pillar-medallion");
        const number = card.querySelector<HTMLElement>(".pillar-number");
        const row = Math.floor(i / 4);

        // Card entrance — stagger within row
        gsap.fromTo(
          card,
          { opacity: 0, y: 52, scale: 0.93 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.72,
            delay: (i % 4) * 0.09,
            ease: E_OUT,
            scrollTrigger: {
              trigger: row === 0 ? gridRef.current : card,
              start: "top 88%",
              once: true,
            },
          }
        );

        // Medallion spring pop
        if (medallion) {
          gsap.fromTo(
            medallion,
            { scale: 0, rotate: -30 },
            {
              scale: 1, rotate: 0, duration: 0.6,
              delay: (i % 4) * 0.09 + 0.18,
              ease: E_SPRING,
              scrollTrigger: {
                trigger: row === 0 ? gridRef.current : card,
                start: "top 88%",
                once: true,
              },
            }
          );
        }

        // Number fade
        if (number) {
          gsap.fromTo(
            number,
            { opacity: 0, x: 12 },
            {
              opacity: 1, x: 0, duration: 0.5,
              delay: (i % 4) * 0.09 + 0.28,
              ease: E_OUT,
              scrollTrigger: {
                trigger: row === 0 ? gridRef.current : card,
                start: "top 88%",
                once: true,
              },
            }
          );
        }

        // GSAP hover — paused timeline
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(card, { y: -8, boxShadow: "0 20px 44px rgba(47,59,46,0.12)", duration: 0.32, ease: E_OUT }, 0)
          .to(medallion, { rotate: 10, scale: 1.1, duration: 0.32, ease: E_OUT }, 0)
          .to(number, { opacity: 0.35, duration: 0.25 }, 0);

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pillars" className="section-padding bg-sandstone-beige/20">
      <div className="container-wide">
        <SectionHeading
          eyebrow="The EISE Framework"
          heading="Eight Sensory Pillars. One Complete Child."
          subheading="Every EISE session is precisely mapped to one or more of these sensory pillars. Nothing is arbitrary. Everything is sequenced with developmental purpose and grounded firmly in neuroscience."
          align="center"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5"
        >
          {PILLARS.map((pillar, i) => (
            // ── Double-bezel shell: card sits in a machined tray ──
            <div
              key={pillar.number}
              className="pillar-card group relative rounded-[1.75rem] bg-forest-green/[0.04] ring-1 ring-forest-green/10 p-1.5 transition-[box-shadow] duration-500 cursor-default will-change-transform"
              id={`pillar-${pillar.number}`}
            >
              {/* Inner core */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-ivory p-5 sm:p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                {/* Top accent hairline — reveals on hover */}
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-terracotta via-golden-sand to-transparent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-x-100" />

                {/* Top row: medallion + index, aligned across every card */}
                <div className="mb-5 flex items-start justify-between">
                  <span className="pillar-medallion flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-sandstone-beige/45 text-terracotta transition-colors duration-500 group-hover:bg-terracotta group-hover:text-ivory will-change-transform">
                    <Icon name={PILLAR_ICONS[i]} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  <span className="pillar-number font-serif nums text-2xl font-light leading-none text-golden-sand/45 select-none will-change-transform">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="font-serif t-h3 text-forest-green mb-1.5">
                  {pillar.name}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-sage leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
