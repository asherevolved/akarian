"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon, { type IconName } from "@/components/ui/Icon";
import { PILLARS } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

const PILLAR_ICONS: IconName[] = [
  "tactile", "vestibular", "proprioceptive", "visual",
  "auditory", "olfactory", "gustatory", "interoception",
];

type Pillar = (typeof PILLARS)[number];

function PillarCard({ pillar, icon }: { pillar: Pillar; icon: IconName }) {
  return (
    <div className="group relative h-full rounded-[1.75rem] p-px cursor-default bg-gradient-to-br from-white/70 via-white/20 to-white/10 shadow-[0_12px_40px_-8px_rgba(47,59,46,0.18)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-1px)] bg-white/15 backdrop-blur-md backdrop-saturate-150 p-5 sm:p-6 ring-1 ring-white/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(255,255,255,0.25)] transition-[box-shadow,transform,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:bg-white/25 group-hover:shadow-[0_28px_56px_-18px_rgba(47,59,46,0.32),inset_0_1px_2px_rgba(255,255,255,0.95)]">
        {/* Glass gloss sheen — diagonal light streak across the top */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-2 -top-1/2 h-full bg-gradient-to-b from-white/50 to-transparent opacity-60 [mask-image:linear-gradient(115deg,black_20%,transparent_55%)]"
        />
        {/* Top accent hairline */}
        <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-terracotta via-golden-sand to-transparent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        {/* Warm corner light on hover — radial gradient, no blur filter */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 bg-[radial-gradient(130px_130px_at_85%_-8%,rgba(180,106,40,0.10),transparent_70%)]"
        />

        {/* Cropped pillar photo (omitted where no image is provided) */}
        {pillar.image && (
          <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[1.1rem] ring-1 ring-forest-green/10">
            <Image
              src={pillar.image}
              alt={`${pillar.name} sensory pillar`}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 280px"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-green/20 to-transparent"
            />
          </div>
        )}

        {/* Top row: medallion + index */}
        <div className="mb-5 flex items-start justify-between">
          {/* Ring-and-disc medallion */}
          <span className="js-medallion relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-sandstone-beige/35 ring-1 ring-golden-sand/30">
            <span className="absolute inset-[3px] rounded-full bg-white/80 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-terracotta" />
            <Icon
              name={icon}
              className="relative h-5 w-5 sm:h-6 sm:w-6 text-terracotta transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-ivory"
            />
          </span>
          <span className="font-serif nums text-2xl font-light leading-none text-golden-sand/40 select-none transition-colors duration-300 group-hover:text-golden-sand/55">
            {pillar.number}
          </span>
        </div>

        <h3 className="font-serif t-h3 text-forest-green mb-1.5">{pillar.name}</h3>
        <p className="font-sans text-xs sm:text-sm text-sage leading-relaxed">
          {pillar.description}
        </p>
      </div>
    </div>
  );
}

export default function Pillars() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Marquee only runs when motion is allowed. The static grid below is the
      // reduced-motion fallback (toggled purely in CSS).
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;

        // The track holds two identical copies of the pillar set, so shifting
        // by exactly -50% lands on the start of the second copy — seamless loop.
        const loop = gsap.to(el, {
          xPercent: -50,
          ease: "none",
          duration: 40,
          repeat: -1,
        });

        // Pause on hover so a card can be read; resume on leave.
        const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.4 });
        const play = () => gsap.to(loop, { timeScale: 1, duration: 0.4 });
        el.addEventListener("pointerenter", pause);
        el.addEventListener("pointerleave", play);

        return () => {
          el.removeEventListener("pointerenter", pause);
          el.removeEventListener("pointerleave", play);
          loop.kill();
        };
      });
    },
    { scope: root }
  );

  // Two copies for the seamless marquee loop.
  const marqueeItems = [...PILLARS, ...PILLARS];

  return (
    <section id="pillars" className="section-padding bg-sandstone-beige/20 relative overflow-hidden">
      {/* Soft brand-color blobs — give the frosted cards something to refract. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <span className="absolute -left-10 top-1/3 h-72 w-72 rounded-full bg-terracotta/15 blur-3xl" />
        <span className="absolute left-1/3 -top-10 h-80 w-80 rounded-full bg-golden-sand/20 blur-3xl" />
        <span className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-sage/15 blur-3xl" />
      </div>
      <div ref={root} className="container-wide relative">
        <SectionHeading
          eyebrow="The EISE Framework"
          heading="Eight Sensory Pillars. One Complete Child."
          subheading="Every EISE session is precisely mapped to one or more of these sensory pillars. Nothing is arbitrary. Everything is sequenced with developmental purpose and grounded firmly in neuroscience."
          align="center"
        />
      </div>

      {/* Marquee — motion users. Edge fade via overlay strips (NOT mask-image —
          a mask on this wrapper would disable backdrop-filter on the glass cards). */}
      <div className="relative z-10 hidden motion-safe:block overflow-hidden" aria-hidden>
        <div ref={track} className="flex w-max gap-4 sm:gap-5 px-4 sm:px-5 py-2">
          {marqueeItems.map((pillar, i) => (
            <div
              key={`${pillar.number}-${i}`}
              className="w-[270px] sm:w-[290px] shrink-0"
            >
              <PillarCard
                pillar={pillar}
                icon={PILLAR_ICONS[i % PILLARS.length]}
              />
            </div>
          ))}
        </div>
        {/* Left/right fade strips matching the section background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#f1ece0] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#f1ece0] to-transparent" />
      </div>

      {/* Static grid — reduced-motion fallback. */}
      <div className="container-wide motion-safe:hidden">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {PILLARS.map((pillar, i) => (
            <div key={pillar.number} id={`pillar-${pillar.number}`}>
              <PillarCard pillar={pillar} icon={PILLAR_ICONS[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
