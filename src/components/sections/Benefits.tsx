"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon, { type IconName } from "@/components/ui/Icon";
import { BENEFITS } from "@/lib/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BENEFIT_ICONS: IconName[] = [
  "confidence",
  "esteem",
  "participation",
  "performance",
  "awareness",
  "potential",
];

export default function Benefits() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Motion only for users who haven't asked for less. Cards are visible
      // by default in CSS, so nothing is gated behind an animation that
      // might not fire.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".js-benefit-card");
        gsap.set(cards, { autoAlpha: 0, y: 28, filter: "blur(8px)" });

        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            const tl = gsap.timeline();
            tl.to(batch, {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.1,
              overwrite: true,
            });
            const medallions = batch.flatMap((card) =>
              gsap.utils.toArray<HTMLElement>(card.querySelectorAll(".js-medallion"))
            );
            tl.fromTo(
              medallions,
              { scale: 0.6, rotate: -8 },
              { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.1 },
              "-=0.65"
            );
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="benefits" className="section-padding bg-ivory">
      <div ref={root} className="container-wide">
        <SectionHeading
          eyebrow="Why It Matters"
          heading="The gifts of sensory nourishment"
          subheading="When a child's sensory systems are thoughtfully nourished during the 2–6 developmental window, the impact reaches every dimension of who they are — shaping the person they will become for the rest of their life."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {BENEFITS.map((benefit, i) => (
            <article
              key={benefit.number}
              id={`benefit-${benefit.number}`}
              className="js-benefit-card group relative rounded-[1.85rem] bg-forest-green/[0.04] ring-1 ring-forest-green/10 p-1.5"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.85rem-0.375rem)] bg-gradient-to-b from-ivory to-sandstone-beige/25 p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.65)] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-[0_24px_50px_-26px_rgba(47,59,46,0.45)]">
                {/* Top accent hairline — draws in on hover */}
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-terracotta via-golden-sand to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                {/* Warm corner light on hover — radial gradient, no blur filter */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 bg-[radial-gradient(150px_150px_at_88%_-5%,rgba(180,106,40,0.10),transparent_70%)]"
                />

                {/* Top row: medallion + index */}
                <div className="mb-6 flex items-start justify-between">
                  {/* Ring-and-disc medallion */}
                  <span className="js-medallion relative flex h-14 w-14 items-center justify-center rounded-full bg-ivory ring-1 ring-golden-sand/35">
                    <span className="absolute inset-[3px] rounded-full bg-sandstone-beige/50 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-terracotta" />
                    <Icon
                      name={BENEFIT_ICONS[i]}
                      className="relative h-6 w-6 text-terracotta transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-ivory"
                    />
                  </span>
                  <span className="font-serif nums text-[2.6rem] font-light leading-none text-golden-sand/25 select-none transition-colors duration-300 group-hover:text-golden-sand/40">
                    {benefit.number}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-[1.4rem] text-forest-green mb-2.5 leading-snug">
                  {benefit.title}
                </h3>
                <p className="font-sans text-[0.84rem] sm:text-sm text-sage leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
