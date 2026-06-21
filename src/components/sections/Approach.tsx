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
    const ctx = gsap.context(() => {

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
          label="Our Approach"
          heading="Early sensory nourishment in the space your child already knows"
          align="center"
        />

        <div className="mb-12 text-center">
          <p className="font-sans text-sm text-sage leading-relaxed max-w-2xl mx-auto">
            AKARIAN sessions are pre-school mapped and home-based by design — not
            for convenience, but because a child&apos;s world is most open in the
            environment they know and trust deeply. The home is not a backdrop. It
            is the method itself.
          </p>
        </div>

        <div ref={gridRef} className="mx-auto flex max-w-3xl flex-col gap-4 sm:gap-5">
          {APPROACH_PRINCIPLES.map((principle, i) => (
            <Card
              key={principle.title}
              id={`approach-${i}`}
              variant="sandstone"
              className="approach-card grid grid-cols-[auto_1fr] items-start gap-5 sm:gap-7"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-serif nums text-2xl text-terracotta sm:text-3xl">
                  {i + 1}
                </span>
                <span className="principle-icon flex h-10 w-10 items-center justify-center arch-top rounded-b-md border border-golden-sand/30 bg-ivory text-terracotta will-change-transform sm:h-12 sm:w-12">
                  <Icon name={PRINCIPLE_ICONS[i]} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
              </div>
              <div>
                <h3 className="font-serif text-lg text-forest-green sm:text-xl">
                  {principle.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-sage">
                  {principle.description}
                </p>
              </div>
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
