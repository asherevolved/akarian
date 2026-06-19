"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import {
  FOOTER_PROGRAMME_LINKS,
  FOOTER_ABOUT_LINKS,
} from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Section anchors must point back to the home route when on a sub-page.
  const r = (href: string) =>
    href.startsWith("#") ? (isHome ? href : `/${href}`) : href;

  const reveal = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative isolate mt-[-1px] overflow-hidden rounded-t-[2.5rem] bg-deep-olive text-ivory/80 grain sm:rounded-t-[4rem]">
      {/* Amber sunrise glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] max-w-[120vw] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,211,125,0.18), rgba(180,106,40,0.06) 45%, transparent 70%)",
        }}
      />
      {/* Hairline crowning the arch */}
      <div
        aria-hidden
        className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-yellow-amber/30 to-transparent"
      />

      <div className="container-wide relative z-10 px-5 sm:px-6 md:px-12">
        {/* ── Closing call-to-action band ───────────────── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.09 }}
          className="flex flex-col gap-8 border-b border-ivory/10 py-16 sm:py-20 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={reveal}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-4 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.28em] text-yellow-amber/80"
            >
              <span className="h-px w-8 bg-yellow-amber/50" />
              A Gift for the Young Ones
            </motion.p>
            <motion.h2
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="display text-ivory"
              style={{ fontSize: "clamp(2.4rem, 1.3rem + 4vw, 4rem)", lineHeight: 1.02 }}
            >
              Let your child&apos;s senses
              <br className="hidden sm:block" />{" "}
              <span className="italic text-yellow-amber/90">come alive.</span>
            </motion.h2>
            <motion.p
              variants={reveal}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-5 max-w-md font-sans text-sm leading-relaxed text-ivory/55"
            >
              Limited cohorts each cycle, in the warmth of your own home. We would
              love to meet your little one.
            </motion.p>
          </div>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.7, ease: EASE }}
            className="shrink-0"
          >
            <Button
              href={r("#contact")}
              variant="primary"
              className="!bg-terracotta hover:!bg-yellow-amber hover:!text-forest-green"
              id="footer-cta"
            >
              Reserve a Place
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Main grid ─────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:py-16 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <a href={r("#home")} className="-ml-3 mb-3 inline-block">
              <Image
                src="/akarian-logo-outline.png"
                alt="Akarian"
                width={240}
                height={66}
                className="h-[120px] w-auto sm:h-[140px]"
              />
            </a>
            <p className="mb-4 font-serif text-base italic text-ivory/55">
              The Sensory Haven
            </p>
            <p className="max-w-xs font-sans text-xs leading-relaxed text-ivory/40">
              Structured sensory nourishment for children aged 2–6, grounded in
              developmental neuroscience. Whitefield, Bengaluru.
            </p>
          </div>

          {/* Programme links */}
          <nav className="md:col-span-2" aria-label="Programme">
            <h3 className="mb-5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-yellow-amber/60">
              Programme
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_PROGRAMME_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={r(link.href)}
                    className="group inline-flex items-center gap-2 font-sans text-sm text-ivory/60 transition-colors duration-300 hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* About links */}
          <nav className="md:col-span-2" aria-label="About">
            <h3 className="mb-5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-yellow-amber/60">
              About
            </h3>
            <ul className="space-y-3.5">
              {FOOTER_ABOUT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={r(link.href)}
                    className="group inline-flex items-center gap-2 font-sans text-sm text-ivory/60 transition-colors duration-300 hover:text-ivory"
                  >
                    <span className="h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/blog"
                  className="group inline-flex items-center gap-2 font-sans text-sm text-ivory/60 transition-colors duration-300 hover:text-ivory"
                >
                  <span className="h-px w-0 bg-terracotta transition-all duration-300 group-hover:w-4" />
                  Journal
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact — arch-framed card */}
          <div className="col-span-2 md:col-span-4">
            <div className="arch border border-ivory/12 bg-ivory/[0.04] p-6 backdrop-blur-sm sm:p-7">
              <h3 className="mb-5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-yellow-amber/60">
                Visit &amp; Connect
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Icon name="location" className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                  <span className="font-sans text-sm leading-relaxed text-ivory/65">
                    Whitefield, Bengaluru
                  </span>
                </li>
                <li>
                  <a
                    href="tel:8050659897"
                    className="flex items-center gap-3 font-sans text-sm text-ivory/65 transition-colors duration-300 hover:text-yellow-amber"
                  >
                    <Icon name="phone" className="h-4 w-4 shrink-0 text-terracotta" />
                    <span className="nums">8050 659 897</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/akarian_blr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-sans text-sm text-ivory/65 transition-colors duration-300 hover:text-yellow-amber"
                  >
                    <Icon name="instagram" className="h-4 w-4 shrink-0 text-terracotta" />
                    @akarian_blr
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────── */}
        <div className="pb-8 pt-2">
          {/* Ornamental rule */}
          <div className="mb-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ivory/15 to-transparent" />
            <svg
              aria-hidden
              viewBox="0 0 24 10"
              fill="none"
              className="w-6 shrink-0 text-yellow-amber/40"
            >
              <circle cx="12" cy="5" r="1.5" fill="currentColor" />
              <circle cx="4" cy="5" r="1" fill="currentColor" />
              <circle cx="20" cy="5" r="1" fill="currentColor" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-ivory/15 to-transparent" />
          </div>

          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="font-serif text-[0.72rem] italic tracking-wide text-ivory/35">
              © {new Date().getFullYear()} Akarian®, The Sensory Haven · Whitefield, Bengaluru
            </p>
            <p className="font-sans text-[0.68rem] tracking-[0.08em] text-ivory/25">
              Your details stay private
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
