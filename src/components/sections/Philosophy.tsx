"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { EISE_BREAKDOWN } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const eiseRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Left text block — stagger paragraphs
      const paras = leftRef.current?.querySelectorAll("p, h2, .section-eyebrow");
      if (paras) {
        gsap.fromTo(
          paras,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: E_OUT,
            scrollTrigger: { trigger: leftRef.current, start: "top 85%", once: true },
          }
        );
      }

      // EISE cards — clip-path reveal from bottom
      const eiseCards = eiseRef.current?.querySelectorAll(".eise-item");
      if (eiseCards) {
        gsap.fromTo(
          eiseCards,
          { opacity: 0, y: 44, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12, ease: E_OUT,
            scrollTrigger: { trigger: eiseRef.current, start: "top 88%", once: true },
          }
        );
      }

      // Pull quote — scale + fade
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.9, ease: E_OUT,
          scrollTrigger: { trigger: quoteRef.current, start: "top 88%", once: true },
        }
      );

      // Hover on EISE cards
      eiseCards?.forEach((card) => {
        const icon = card.querySelector(".eise-icon");
        const tl = gsap.timeline({ paused: true });
        tl.to(card, { x: 6, duration: 0.3, ease: E_OUT }, 0)
          .to(icon, { scale: 1.15, rotate: 5, duration: 0.3, ease: E_OUT }, 0);

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="section-padding bg-ivory">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20">

          {/* Left */}
          <div ref={leftRef}>
            <SectionHeading
              eyebrow="Our Philosophy"
              heading="Built on a Strong Foundation, Designed for a Better Future."
            />
            <div className="space-y-4 sm:space-y-5 font-sans text-sm sm:text-base md:text-[1.0625rem] text-sage leading-relaxed">
              <p className="font-serif text-lg sm:text-xl md:text-2xl italic text-deep-olive leading-relaxed !mb-2">
                AKARIAN is not a remedial programme. It is a proactive gift.
              </p>
              <p>
                It is an act of intentional nourishment offered to a child at
                precisely the moment when it carries the greatest possible impact.
              </p>
              <p>
                Between the ages of 2 and 6, the brain constructs the neural architecture
                that will underpin everything a child becomes: their capacity for attention,
                emotional depth, creativity, connection, and self-knowledge.
              </p>
              <p>
                EISE, Early Immersive Sensory Engagement, is the structured framework
                through which AKARIAN delivers this nourishment. Designed across eight
                sensory pillars, sequenced with developmental precision, and delivered
                within the home.
              </p>
              <p className="font-medium text-forest-green">
                Every child is extraordinary. AKARIAN is built on this truth, absolutely
                and without compromise.
              </p>
            </div>
          </div>

          {/* Right — EISE */}
          <div>
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="h-px w-8 bg-terracotta/50" />
              <span className="eyebrow">The EISE Framework</span>
            </div>

            <div ref={eiseRef} className="flex flex-col items-center">
              {EISE_BREAKDOWN.map((item, i) => (
                <div key={i} className="eise-item w-full flex flex-col items-center will-change-transform">
                  <div className="group w-full flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-[2rem] bg-sandstone-beige/30 border border-golden-sand/20 hover:border-terracotta/40 hover:bg-sandstone-beige/45 transition-colors duration-300 cursor-default">
                    <div className="eise-icon w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-ivory border border-terracotta/30 flex items-center justify-center shrink-0 group-hover:border-terracotta transition-colors duration-300 will-change-transform">
                      <span className="font-serif text-xl sm:text-2xl font-light text-terracotta">
                        {item.letter}
                      </span>
                    </div>
                    <div>
                      <p className="font-serif text-base sm:text-lg text-forest-green leading-tight">
                        {item.word}
                      </p>
                      <p className="font-sans text-xs sm:text-sm text-sage mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {i < EISE_BREAKDOWN.length - 1 && (
                    <div className="w-px h-6 sm:h-8 bg-terracotta/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pull Quote */}
        <div
          ref={quoteRef}
          className="relative mt-14 sm:mt-20 md:mt-28 bg-deep-olive rounded-t-[3rem] sm:rounded-t-[5rem] rounded-b-2xl p-8 sm:p-10 md:p-16 text-center grain overflow-hidden"
        >
          <span className="relative z-10 block font-serif text-4xl sm:text-5xl text-yellow-amber/40 leading-none mb-2">
            &ldquo;
          </span>
          <blockquote className="relative z-10 font-serif text-xl sm:text-2xl md:text-3xl italic text-ivory/90 leading-relaxed max-w-3xl mx-auto -mt-4">
            We are not here to shape children into something they are not. We are
            here to nourish everything they already are.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
