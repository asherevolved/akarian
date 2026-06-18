"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import StatBadge from "@/components/ui/StatBadge";
import Mark from "@/components/ui/Mark";
import { HERO_STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// Strong ease-out — Emil Kowalski default
const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const particle1Ref = useRef<HTMLDivElement>(null);
  const particle2Ref = useRef<HTMLDivElement>(null);
  const particle3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [eyebrowRef.current, h1Ref.current, paraRef.current, quoteRef.current,
            btnsRef.current, scrollHintRef.current, archRef.current,
            badgeRef.current, statsRef.current],
          { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "inset(0 0% 0 0)" }
        );
        return;
      }

      // ── Entrance timeline ──────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: E_OUT } });

      // Arch slides + fades in from right with slight scale
      tl.fromTo(
        archRef.current,
        { opacity: 0, y: 60, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 },
        0
      );

      // Badge pops in via spring
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.6, rotate: -12 },
        {
          opacity: 1, scale: 1, rotate: 0, duration: 0.7,
          ease: "back.out(2.2)",
        },
        0.55
      );

      // Left content stagger
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      tl.fromTo(
        h1Ref.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.85 },
        0.35
      );

      tl.fromTo(
        paraRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.5
      );

      tl.fromTo(
        quoteRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.65 },
        0.62
      );

      tl.fromTo(
        btnsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.74
      );

      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.95
      );

      tl.fromTo(
        statsRef.current?.children ? Array.from(statsRef.current.children) : [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: E_OUT },
        0.85
      );

      // ── Particles ambient float (looping) ─────────────
      [particle1Ref, particle2Ref, particle3Ref].forEach((ref, i) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.9 + i * 0.15, ease: "back.out(2)" }
        );
        gsap.to(ref.current, {
          y: `${-12 - i * 6}`,
          x: `${(i - 1) * 8}`,
          duration: 3 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });

      // ── Parallax on scroll ─────────────────────────────
      gsap.to(archRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Slow ambient rotation on the sun SVG inside arch
      const sun = sectionRef.current?.querySelector(".hero-sun");
      if (sun) {
        gsap.to(sun, { rotate: 360, duration: 30, repeat: -1, ease: "none", transformOrigin: "center center" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-28"
    >
      {/* Atmospheric washes */}
      <div className="absolute -top-20 -right-32 w-[44rem] h-[44rem] rounded-full bg-sandstone-beige/50 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[30rem] h-[30rem] rounded-full bg-sage/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-yellow-amber/5 blur-[160px] pointer-events-none" />

      {/* Watermark */}
      <span
        aria-hidden
        className="absolute -bottom-10 left-0 right-0 text-center font-serif text-[24vw] leading-none text-sandstone-beige/30 select-none pointer-events-none tracking-tight"
      >
        Akarian
      </span>

      {/* Floating particles — hidden on mobile for cleanliness */}
      <div
        ref={particle1Ref}
        className="hidden sm:block absolute top-[22%] left-[8%] w-3 h-3 rounded-full bg-terracotta/30 opacity-0"
        aria-hidden
      />
      <div
        ref={particle2Ref}
        className="hidden sm:block absolute top-[40%] left-[14%] w-2 h-2 rounded-full bg-golden-sand/50 opacity-0"
        aria-hidden
      />
      <div
        ref={particle3Ref}
        className="hidden sm:block absolute top-[18%] left-[20%] w-1.5 h-1.5 rounded-full bg-sage/40 opacity-0"
        aria-hidden
      />

      <div className="container-wide px-5 sm:px-8 md:px-12 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">

          {/* Left — Text */}
          <div className="lg:col-span-6 max-w-xl">
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-5 sm:mb-7 opacity-0">
              <Mark className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="eyebrow">The Sensory Haven</span>
            </div>

            <h1
              ref={h1Ref}
              className="display t-display text-forest-green mb-3 sm:mb-4 opacity-0"
            >
              A Gift for the
              <br />
              <span className="italic text-terracotta">Young Ones</span>
            </h1>

            <p
              ref={paraRef}
              className="font-sans t-lead text-sage mb-6 sm:mb-7 max-w-md opacity-0"
            >
              Early Immersive Sensory Engagement — structured nourishment for
              children aged 2–6, delivered within the home where they are most
              authentically themselves.
            </p>

            <blockquote
              ref={quoteRef}
              className="font-serif text-base sm:text-lg md:text-xl italic text-deep-olive border-l-2 border-terracotta/40 pl-4 sm:pl-5 mb-7 sm:mb-9 leading-relaxed max-w-md opacity-0"
            >
              &ldquo;Every child deserves to grow into the fullest, most luminous
              version of themselves, and it begins here.&rdquo;
            </blockquote>

            <div ref={btnsRef} className="flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12 opacity-0">
              <Button href="#contact" variant="primary" id="hero-cta-primary">
                Begin the Journey
              </Button>
              <Button href="#philosophy" variant="secondary" id="hero-cta-secondary">
                Discover the Vision
              </Button>
            </div>

            <div ref={scrollHintRef} className="hidden sm:flex items-center gap-3 text-golden-sand opacity-0">
              <span className="text-base float">↓</span>
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.25em]">
                Scroll to explore
              </span>
            </div>
          </div>

          {/* Right — Arch */}
          <div className="lg:col-span-6 lg:pl-8">
            <div className="relative max-w-[320px] sm:max-w-md mx-auto">
              <div
                ref={archRef}
                className="relative aspect-[3/4] arch-top rounded-b-2xl overflow-hidden bg-gradient-to-b from-sandstone-beige/70 to-ivory-dark grain border border-golden-sand/30 opacity-0"
              >
                {/* Composition */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 520" className="w-[88%] h-[88%]" fill="none" suppressHydrationWarning>
                    {/* Rotating sun group — rays pre-calculated to avoid SSR hydration mismatch */}
                    <g className="hero-sun">
                      <circle cx="200" cy="170" r="46" fill="var(--color-terracotta)" opacity="0.14" />
                      <circle cx="200" cy="170" r="22" fill="var(--color-yellow-amber)" opacity="0.55" />
                      <line x1="256" y1="170" x2="278" y2="170" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="248.5" y1="148.5" x2="265.5" y2="137.5" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="228" y1="132" x2="237" y2="113" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="200" y1="114" x2="200" y2="92" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="172" y1="132" x2="163" y2="113" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="151.5" y1="148.5" x2="134.5" y2="137.5" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="144" y1="170" x2="122" y2="170" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="151.5" y1="191.5" x2="134.5" y2="202.5" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="172" y1="208" x2="163" y2="227" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="200" y1="226" x2="200" y2="248" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="228" y1="208" x2="237" y2="227" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                      <line x1="248.5" y1="191.5" x2="265.5" y2="202.5" stroke="var(--color-terracotta)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                    </g>
                    {/* Stem */}
                    <path
                      d="M200 240 C200 320 200 380 200 460"
                      stroke="var(--color-deep-olive)"
                      strokeWidth="1.5"
                      opacity="0.45"
                    />
                    {/* Leaves */}
                    {[260, 320, 380].map((y, i) => (
                      <g key={i} opacity={0.42 - i * 0.05}>
                        <path
                          d={`M200 ${y} C160 ${y - 30} 120 ${y - 10} 130 ${y + 20} C145 ${y + 40} 180 ${y + 20} 200 ${y}Z`}
                          fill="var(--color-sage)"
                        />
                        <path
                          d={`M200 ${y} C240 ${y - 30} 280 ${y - 10} 270 ${y + 20} C255 ${y + 40} 220 ${y + 20} 200 ${y}Z`}
                          fill="var(--color-sage)"
                          opacity="0.85"
                        />
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Pull quote */}
                <div className="absolute bottom-6 left-6 right-6 bg-ivory/80 backdrop-blur-sm rounded-xl px-6 py-5 border border-golden-sand/20">
                  <p className="font-serif text-base md:text-lg italic text-forest-green leading-snug">
                    &ldquo;A new approach. A stronger beginning. A better future.&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating EISE badge */}
              <div
                ref={badgeRef}
                className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-left-8 bg-forest-green text-ivory rounded-full w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center text-center shadow-xl opacity-0 pulse-glow"
              >
                <span className="font-serif text-xl sm:text-2xl leading-none">EISE</span>
                <span className="font-sans text-[0.45rem] sm:text-[0.5rem] uppercase tracking-[0.18em] mt-1 text-ivory/70">
                  Framework
                </span>
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-[320px] sm:max-w-md mx-auto">
              {HERO_STATS.map((stat) => (
                <StatBadge key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand line */}
      <div className="absolute bottom-4 sm:bottom-6 left-6 right-6">
        <p className="font-sans text-[0.6rem] uppercase tracking-[0.32em] text-golden-sand/70 text-center">
          AKARIAN® · EISE™ · 2025
        </p>
      </div>
    </section>
  );
}
