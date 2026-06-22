"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import Button from "@/components/ui/Button";

import { HERO_STATS } from "@/lib/constants";

const EASE = "power3.out";

const SLIDES = [
  { src: "/hero/hero-1.jpg", alt: "Child exploring stones — tactile sensory play" },
  { src: "/hero/hero-2.jpg", alt: "Child hands with pebbles — sensory discovery" },
  { src: "/hero/hero-3.jpg", alt: "Child playing with gravel — proprioceptive engagement" },
  { src: "/hero/hero-4.jpg", alt: "Child in nature — sensory nourishment" },
  { src: "/hero/hero-5.jpg", alt: "Child hands — early sensory exploration" },
];

const INTERVAL = 4500;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  currentRef.current = current;
  const isAnimating = useRef(false);

  // ── Crossfade ──────────────────────────────────────────────────────
  const goTo = useCallback((next: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const outEl = slidesRef.current[currentRef.current];
    const inEl = slidesRef.current[next];
    if (!outEl || !inEl) { isAnimating.current = false; return; }

    gsap.set(inEl, { zIndex: 2, opacity: 0 });
    gsap.set(outEl, { zIndex: 1 });

    // Ken Burns on incoming
    const img = inEl.querySelector("img");
    if (img) gsap.fromTo(img, { scale: 1.07 }, { scale: 1, duration: INTERVAL / 1000 + 1.2, ease: "none" });

    gsap.to(inEl, {
      opacity: 1,
      duration: 1.1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(outEl, { opacity: 0, zIndex: 0 });
        setCurrent(next);
        isAnimating.current = false;
      },
    });
  }, []);

  // ── Auto-advance ───────────────────────────────────────────────────
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTicker = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      goTo((currentRef.current + 1) % SLIDES.length);
    }, INTERVAL);
  }, [goTo]);

  useEffect(() => {
    startTicker();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startTicker]);

  const handleDot = (i: number) => { goTo(i); startTicker(); };

  // ── Entrance animation for text ────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-hero]");
      gsap.set(items, { opacity: 0, y: 28 });
      gsap.to(items, { opacity: 1, y: 0, duration: 1, stagger: 0.11, ease: EASE, delay: 0.2 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Ken Burns on first slide
  useEffect(() => {
    const img = slidesRef.current[0]?.querySelector("img");
    if (img) gsap.fromTo(img, { scale: 1.07 }, { scale: 1, duration: INTERVAL / 1000 + 1.2, ease: "none" });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* ── Full-bleed slideshow background ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          ref={(el) => { slidesRef.current[i] = el; }}
          className="absolute inset-0"
          aria-hidden={i !== current}
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-deep-olive/80 via-deep-olive/60 to-deep-olive/25" />

      {/* Dot nav — bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2" role="tablist" aria-label="Slideshow navigation">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => handleDot(i)}
            className={`rounded-full transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory ${
              i === current
                ? "w-6 h-1.5 bg-ivory"
                : "w-1.5 h-1.5 bg-ivory/40 hover:bg-ivory/70"
            }`}
          />
        ))}
      </div>

      {/* Brand line */}
      <p className="absolute inset-x-6 bottom-5 text-center font-sans text-[0.6rem] uppercase tracking-[0.3em] text-ivory/30 z-30">
        AKARIAN® · EISE™ · 2025
      </p>

      {/* ── Content ── */}
      <div className="container-wide relative z-20 w-full px-5 sm:px-8 md:px-12">
        <div className="max-w-2xl">

          <h1 data-hero className="display t-display mb-5 text-ivory">
            A Gift for the{" "}
            <span className="italic text-yellow-amber">Young Ones</span>
          </h1>

          <div data-hero className="mb-8 max-w-xl space-y-3 font-sans text-ivory font-medium [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
            <p className="t-lead">
              The years between one and five are when the architecture of learning is formed.
              Before letters or numbers can take root, the nervous system must first learn to
              regulate and interpret the world.
            </p>
            <p className="t-lead">
              The sensory foundations that make learning possible are often overlooked.
              Through neurodevelopmental experiences, we strengthen this vital bridge between
              readiness and learning.
            </p>
            <p className="t-lead">Not early education. The foundation beneath it.</p>
          </div>


          <div data-hero className="mb-10 flex flex-col gap-3 xs:flex-row sm:gap-4">
            <Button href="#contact" variant="primary" id="hero-cta-primary">
              Begin the Journey
            </Button>
            <Button href="#philosophy" variant="secondary" id="hero-cta-secondary" className="!bg-white !border-white !text-forest-green hover:!bg-ivory">
              Discover the Vision
            </Button>
          </div>

          <div data-hero className="flex gap-8 sm:gap-12">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif nums text-3xl sm:text-4xl md:text-5xl font-light text-white leading-none">
                  {stat.value}
                </p>
                <span className="mx-auto mt-2 sm:mt-3 mb-2 block h-px w-5 sm:w-6 bg-white/40" />
                <p className="font-sans text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.2em] text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
