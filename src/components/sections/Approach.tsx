"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Icon, { type IconName } from "@/components/ui/Icon";
import { APPROACH_PRINCIPLES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

const PRINCIPLE_ICONS: IconName[] = [
  "home", "partner", "spark", "sprout", "science",
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      const cards = gridRef.current?.querySelectorAll(".approach-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 44, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: E_OUT,
            scrollTrigger: { trigger: gridRef.current, start: "top 88%", once: true },
          }
        );

        // Icon arch pop per card
        cards.forEach((card) => {
          const icon = card.querySelector(".principle-icon");
          if (!icon) return;
          gsap.fromTo(
            icon,
            { scale: 0, rotate: -20 },
            {
              scale: 1, rotate: 0, duration: 0.5, ease: "back.out(2.5)",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            }
          );
        });
      }

      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: E_OUT,
          scrollTrigger: { trigger: quoteRef.current, start: "top 88%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="approach" className="section-padding bg-ivory relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-sandstone-beige/20 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="container-wide relative">
        <SectionHeading
          eyebrow="Our Approach"
          heading="Familiar Home. Natural Growth."
          subheading="A new approach for a better future, delivered where a child is most authentically themselves."
          align="center"
        />

        <div className="mb-12 text-center">
          <p className="font-sans text-sm text-sage leading-relaxed max-w-2xl mx-auto">
            AKARIAN sessions are home-based by design — not for convenience, but
            because a child&apos;s world is most open in the environment they know and
            trust deeply. The home is not a backdrop. It is the method itself.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {APPROACH_PRINCIPLES.map((principle, i) => (
            <Card
              key={principle.title}
              className={`approach-card ${i >= 3 ? "lg:col-span-1 lg:col-start-1 md:col-span-1" : ""}`}
              variant="sandstone"
              id={`approach-${i}`}
            >
              <span className="principle-icon mb-4 sm:mb-5 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 arch-top rounded-b-md bg-ivory border border-golden-sand/30 text-terracotta will-change-transform">
                <Icon name={PRINCIPLE_ICONS[i]} className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-forest-green mb-2 sm:mb-3">
                {principle.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-sage leading-relaxed">
                {principle.description}
              </p>
            </Card>
          ))}
        </div>

        <div
          ref={quoteRef}
          className="relative mt-12 sm:mt-16 md:mt-24 bg-deep-olive rounded-t-[3rem] sm:rounded-t-[5rem] rounded-b-2xl p-8 sm:p-10 md:p-16 text-center grain overflow-hidden"
        >
          <blockquote className="relative z-10 font-serif text-xl sm:text-2xl md:text-3xl italic text-ivory/90 leading-relaxed max-w-3xl mx-auto mb-4 sm:mb-5">
            &ldquo;Akarian believes every young child deserves all the nourishment
            they require — to grow, to flourish, and to become the fullest, most
            luminous version of themselves.&rdquo;
          </blockquote>
          <p className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-ivory/45">
            The AKARIAN Promise · The Sensory Haven · Bengaluru
          </p>
        </div>
      </div>
    </section>
  );
}
