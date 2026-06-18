"use client";

import Button from "@/components/ui/Button";
import Mark from "@/components/ui/Mark";
import { FOOTER_PROGRAMME_LINKS, FOOTER_ABOUT_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative bg-deep-olive text-ivory/80 grain overflow-hidden">
      {/* ── Closing call-to-action band ───────────────── */}
      <div className="container-wide px-5 sm:px-6 md:px-12 relative z-10">
        <div className="flex flex-col gap-7 border-b border-ivory/10 py-12 sm:py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow !text-yellow-amber/70 mb-3">A Gift for the Young Ones</p>
            <h2 className="display t-h2 text-ivory">
              Begin your child&apos;s sensory journey.
            </h2>
          </div>
          <Button
            href="#contact"
            variant="primary"
            className="!bg-terracotta hover:!bg-yellow-amber hover:!text-forest-green shrink-0"
            id="footer-cta"
          >
            Reserve a Place
          </Button>
        </div>

        {/* ── Link grid ─────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-y-10 gap-x-6 py-12 sm:py-14 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-2.5 mb-4">
              <Mark className="w-7 h-7" variant="mono" />
              <span className="font-serif text-2xl tracking-[0.18em] text-ivory">
                AKARIAN<span className="text-terracotta align-super text-xs">®</span>
              </span>
            </a>
            <p className="font-serif text-sm italic text-ivory/50 mb-4">
              The Sensory Haven
            </p>
            <p className="font-sans text-xs text-ivory/40 leading-relaxed max-w-xs">
              Structured sensory nourishment for children aged 2–6, grounded in
              developmental neuroscience. Whitefield, Bengaluru.
            </p>
          </div>

          {/* Explore */}
          <nav className="md:col-span-3" aria-label="Programme">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-ivory/40 mb-5">
              Programme
            </h3>
            <ul className="space-y-3">
              {FOOTER_PROGRAMME_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-ivory/60 hover:text-terracotta transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* About + Connect */}
          <nav className="md:col-span-4" aria-label="About and contact">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-ivory/40 mb-5">
              Visit &amp; Connect
            </h3>
            <ul className="space-y-3">
              {FOOTER_ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-ivory/60 hover:text-terracotta transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://instagram.com/akarian_whitefield"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-ivory/60 hover:text-terracotta transition-colors duration-300"
                >
                  @akarian_whitefield
                </a>
              </li>
              <li>
                <a
                  href="tel:8050659897"
                  className="font-sans text-sm text-ivory/60 hover:text-terracotta transition-colors duration-300 nums"
                >
                  8050 659 897
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* ── Bottom bar ────────────────────────────────── */}
        <div className="flex flex-col gap-2 border-t border-ivory/10 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="font-sans text-xs text-ivory/30">
            © 2025 Akarian®, The Sensory Haven. Whitefield, Bengaluru.
          </p>
          <p className="font-sans text-xs text-ivory/30">
            Your details stay private — used only to plan your child&apos;s sessions.
          </p>
        </div>
      </div>
    </footer>
  );
}
