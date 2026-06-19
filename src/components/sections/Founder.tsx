"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { FOUNDER_VALUES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const archVisualRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Arch visual — slide from left
      gsap.fromTo(
        archVisualRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.0, ease: E_OUT,
          scrollTrigger: { trigger: archVisualRef.current, start: "top 88%", once: true },
        }
      );

      // Mark gentle pulse + slow spin
      const markEl = archVisualRef.current?.querySelector(".founder-mark");
      if (markEl) {
        gsap.fromTo(markEl, { opacity: 0, scale: 0.7 }, {
          opacity: 0.8, scale: 1, duration: 0.8, ease: "back.out(1.7)",
          scrollTrigger: { trigger: archVisualRef.current, start: "top 85%", once: true },
        });
      }

      // Text stagger
      const textItems = textRef.current?.querySelectorAll(".f-animate");
      if (textItems) {
        gsap.fromTo(
          textItems,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: E_OUT,
            scrollTrigger: { trigger: textRef.current, start: "top 88%", once: true },
          }
        );
      }

      // Values stagger up
      const values = valuesRef.current?.querySelectorAll(".founder-value");
      if (values) {
        gsap.fromTo(
          values,
          { opacity: 0, y: 32, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: E_OUT,
            scrollTrigger: { trigger: valuesRef.current, start: "top 90%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="founder" className="section-padding bg-sandstone-beige/20">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">

          {/* Left - Visual */}
          <div ref={archVisualRef} className="relative lg:sticky lg:top-28 will-change-transform w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0">
            <div className="relative aspect-[3/4] min-h-[24rem] w-full arch-top rounded-b-2xl overflow-hidden border border-golden-sand/30 shadow-[0_24px_64px_-16px_rgba(47,59,46,0.18)]">
              {/* Founder photo */}
              <Image
                src="/founder.jpg"
                alt="Akarian Founder"
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority
              />
              {/* Subtle gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-olive/80 via-deep-olive/30 to-transparent p-7 pt-24">
                <p className="font-serif text-2xl text-ivory italic">
                  J Akshatha
                </p>
                <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory/80 mt-1.5">
                  Founder at Akarian
                </p>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.16em] text-ivory/60 mt-0.5">
                  Toddler Enrichment &amp; Early Learning
                </p>
              </div>
            </div>
          </div>

          {/* Right - Text */}
          <div ref={textRef}>
            <SectionHeading eyebrow="About the Founder" heading="A Vision for the Next Generation" />

            <blockquote className="f-animate font-serif text-lg italic text-terracotta/80 border-l-2 border-terracotta/40 pl-4 mb-8 leading-relaxed will-change-transform">
              &ldquo;I built AKARIAN because I believe every child deserves a
              beginning that truly honours the depth of who they already are.&rdquo;
            </blockquote>

            <div className="space-y-4 mb-10">
              <p className="f-animate font-sans text-base text-sage leading-relaxed will-change-transform">
                AKARIAN was founded on an absolute belief: that early childhood is
                not a problem to be managed — it is a gift to be nourished with
                intention, science, and care.
              </p>
              <p className="f-animate font-sans text-base text-sage leading-relaxed will-change-transform">
                The EISE framework was developed as a precise and deliberate new
                approach to the critical 2–6 developmental window, structured,
                scientifically grounded, home-based, and designed to break the
                conventional patterns that have defined early childhood for generations.
              </p>
              <p className="f-animate font-sans text-base text-sage leading-relaxed will-change-transform">
                The vision is clear and unwavering: give every young child the
                sensory nourishment they deserve at the moment when it matters most,
                and watch them grow — with confidence — into the fullest version of themselves.
              </p>
            </div>

            <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {FOUNDER_VALUES.map((value, i) => (
                <Card
                  key={value.title}
                  className="founder-value !p-5 will-change-transform"
                  variant="sandstone"
                  id={`founder-value-${i}`}
                >
                  <h4 className="font-serif text-base font-medium text-forest-green mb-2">
                    {value.title}
                  </h4>
                  <p className="font-sans text-xs text-sage leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
