"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon, { type IconName } from "@/components/ui/Icon";
import { DISCOVERY_INCLUDES, CORE_INCLUDES } from "@/lib/constants";

function Check({ tone = "terracotta" }: { tone?: "terracotta" | "amber" }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        tone === "amber"
          ? "bg-yellow-amber/15 text-yellow-amber"
          : "bg-terracotta/10 text-terracotta"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.5l4 4 10-10" />
      </svg>
    </span>
  );
}

// Button-in-button CTA — trailing arrow nested in its own circle (haptic depth)
function ProgramCTA({
  href,
  label,
  id,
  tone,
}: {
  href: string;
  label: string;
  id: string;
  tone: "light" | "dark";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onDown = () =>
    ref.current && gsap.to(ref.current, { scale: 0.98, duration: 0.1, ease: "power2.out", overwrite: true });
  const onUp = () =>
    ref.current && gsap.to(ref.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)", overwrite: true });

  const shell =
    tone === "dark"
      ? "bg-terracotta text-ivory hover:bg-yellow-amber hover:text-forest-green"
      : "bg-forest-green text-ivory hover:bg-terracotta";
  const circle = tone === "dark" ? "bg-ivory/20" : "bg-ivory/15";

  return (
    <a
      ref={ref}
      href={href}
      id={id}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      className={`group/cta inline-flex w-full items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${shell}`}
    >
      <span>{label}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 ${circle}`}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}

gsap.registerPlugin(ScrollTrigger);

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const cards = cardsRef.current?.querySelectorAll(".program-card");
      if (cards?.[0]) {
        gsap.fromTo(cards[0], { opacity: 0, x: -70, scale: 0.96 }, {
          opacity: 1, x: 0, scale: 1, duration: 0.85, ease: E_OUT,
          scrollTrigger: { trigger: cardsRef.current, start: "top 88%", once: true },
        });
      }
      if (cards?.[1]) {
        gsap.fromTo(cards[1], { opacity: 0, x: 70, scale: 0.96 }, {
          opacity: 1, x: 0, scale: 1, duration: 0.85, ease: E_OUT,
          scrollTrigger: { trigger: cardsRef.current, start: "top 88%", once: true },
        });
      }

      const stats = statsRef.current?.querySelectorAll(".program-stat");
      if (stats) {
        gsap.fromTo(stats, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.55, stagger: 0.13, ease: E_OUT,
          scrollTrigger: { trigger: statsRef.current, start: "top 92%", once: true },
        });
      }

      // Checklist items stagger in after card appears
      const checkItems = cardsRef.current?.querySelectorAll("li");
      if (checkItems) {
        gsap.fromTo(checkItems, { opacity: 0, x: -14 }, {
          opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: E_OUT,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="section-padding bg-ivory">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Programs"
          heading="Two Pathways to Sensory Nourishment"
          subheading="Begin gently with a guided Discovery Session, or commit fully to the Core Programme, a structured monthly journey of deep sensory nourishment for your child, delivered in your home."
          align="center"
        />

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 mb-10 sm:mb-14 items-stretch">
          {/* ── Discovery — light tier (double-bezel) ── */}
          <div className="program-card group h-full rounded-t-[3.5rem] rounded-b-[2rem] bg-forest-green/[0.04] ring-1 ring-forest-green/10 p-1.5 will-change-transform" id="program-discovery">
            <div className="flex h-full flex-col rounded-t-[calc(3.5rem-0.375rem)] rounded-b-[calc(2rem-0.375rem)] bg-ivory p-7 sm:p-9 md:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
              <span className="inline-flex w-max items-center rounded-full bg-sandstone-beige/50 px-3 py-1 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-deep-olive mb-6">
                Discovery
              </span>
              {/* Fixed-height title+intro block keeps both cards' checklists aligned */}
              <div className="lg:min-h-[10.5rem]">
                <h3 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] font-bold leading-tight text-forest-green mb-3">
                  EISE Preschool Residency
                </h3>
                <p className="font-sans text-sm text-sage leading-relaxed">
                  Sensory development for children in a space they already know —
                  Early Immersive Sensory Engagement, brought into your child&apos;s
                  own preschool.
                </p>
              </div>

              <div className="my-7 h-px bg-golden-sand/25" />

              <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-golden-sand mb-5">
                What&apos;s included
              </p>
              <ul className="space-y-3.5 mb-9 flex-1">
                {DISCOVERY_INCLUDES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-deep-olive leading-relaxed">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ProgramCTA href="#contact" label="Begin Discovery" id="program-discovery-cta" tone="light" />
            </div>
          </div>

          {/* ── Core — featured dark tier (double-bezel) ── */}
          <div className="program-card group relative h-full rounded-t-[3.5rem] rounded-b-[2rem] bg-forest-green/15 ring-1 ring-forest-green/20 p-1.5 will-change-transform" id="program-core">
            <div className="relative flex h-full flex-col overflow-hidden rounded-t-[calc(3.5rem-0.375rem)] rounded-b-[calc(2rem-0.375rem)] bg-forest-green p-7 sm:p-9 md:p-10 grain shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="relative z-10 mb-6">
                <span className="inline-flex w-max items-center rounded-full bg-yellow-amber/15 px-3 py-1 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-yellow-amber">
                  Core Programme
                </span>
              </div>
              <div className="relative z-10 lg:min-h-[10.5rem]">
                <h3 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.25rem] font-light leading-tight text-ivory mb-3">
                  EISE In-Home Core Program
                </h3>
                <p className="font-sans text-sm text-ivory/65 leading-relaxed">
                  The most personal sensory education — at your home, with your
                  child&apos;s own facilitator.
                </p>
              </div>

              <div className="relative z-10 my-7 h-px bg-ivory/15" />

              <p className="relative z-10 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory/45 mb-5">
                What&apos;s included
              </p>
              <ul className="relative z-10 space-y-3.5 mb-9 flex-1">
                {CORE_INCLUDES.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-ivory/80 leading-relaxed">
                    <Check tone="amber" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="relative z-10">
                <ProgramCTA href="#contact" label="Begin Programme" id="program-core-cta" tone="dark" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 mb-8 sm:mb-10">
          {([
            { label: "Home Based Delivery", icon: "house" },
            { label: "2–6 Age Group", icon: "child" },
            { label: "Limited Cohort Intake", icon: "star" },
          ] as { label: string; icon: IconName }[]).map((stat) => (
            <div key={stat.label} className="program-stat flex items-center gap-3 will-change-transform">
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-golden-sand/30 text-terracotta">
                <Icon name={stat.icon} className="w-4 h-4" />
              </span>
              <span className="font-sans text-sm text-deep-olive tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center font-serif text-base italic text-deep-olive max-w-2xl mx-auto">
          &ldquo;Limited cohorts are accepted each cycle, ensuring every child
          receives the full depth of immersive engagement and personalised
          attention they deserve.&rdquo;
        </p>
      </div>
    </section>
  );
}
