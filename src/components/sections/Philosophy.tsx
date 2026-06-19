"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { EISE_BREAKDOWN } from "@/lib/constants";

export default function Philosophy() {
  const bodyRef = useReveal<HTMLDivElement>({ stagger: 0.08 });
  const eiseRef = useReveal<HTMLDivElement>({ stagger: 0.1, start: "top 88%" });
  const quoteRef = useReveal<HTMLDivElement>({ selector: null, start: "top 88%" });

  return (
    <section id="philosophy" className="section-padding bg-ivory">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — the argument */}
          <div ref={bodyRef}>
            <SectionHeading heading="Built on a strong foundation, designed for a better future." />
            <div className="space-y-5 font-sans text-[1.0625rem] leading-relaxed text-deep-olive">
              <p data-reveal className="font-serif text-xl italic text-forest-green sm:text-2xl">
                AKARIAN is not a remedial programme. It is a proactive gift.
              </p>
              <p data-reveal>
                It is an act of intentional nourishment offered to a child at
                precisely the moment when it carries the greatest possible impact.
              </p>
              <p data-reveal>
                Between the ages of 2 and 6, the brain constructs the neural
                architecture that will underpin everything a child becomes: their
                capacity for attention, emotional depth, creativity, connection,
                and self-knowledge.
              </p>
              <p data-reveal>
                EISE — Early Immersive Sensory Engagement — is the structured
                framework through which AKARIAN delivers this nourishment. Designed
                across eight sensory pillars, sequenced with developmental
                precision, and delivered within the home.
              </p>
              <p data-reveal className="font-medium text-forest-green">
                Every child is extraordinary. AKARIAN is built on this truth,
                absolutely and without compromise.
              </p>
            </div>
          </div>

          {/* Right — the EISE sequence (a real ordered framework, so it is numbered) */}
          <div>
            <p className="label mb-7">The EISE Framework</p>
            <div ref={eiseRef} className="flex flex-col gap-3">
              {EISE_BREAKDOWN.map((item, i) => (
                <div
                  key={i}
                  data-reveal
                  className="flex items-center gap-5 rounded-card border border-golden-sand/20 bg-sandstone-beige/25 p-5 transition-colors duration-300 hover:border-terracotta/35"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-terracotta/30 bg-ivory font-serif text-2xl font-light text-terracotta">
                    {item.letter}
                  </span>
                  <div>
                    <p className="font-serif text-lg text-forest-green">{item.word}</p>
                    <p className="font-sans text-sm text-deep-olive/75">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pull quote */}
        <div
          ref={quoteRef}
          className="relative mt-16 overflow-hidden bg-deep-olive p-8 text-center grain arch sm:mt-24 sm:p-12 md:p-16"
        >
          <p className="relative z-10 mx-auto max-w-3xl font-serif text-xl italic leading-relaxed text-ivory/90 sm:text-2xl md:text-3xl">
            &ldquo;We are not here to shape children into something they are not.
            We are here to nourish everything they already are.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
