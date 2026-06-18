"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Mark from "@/components/ui/Mark";

const E_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: E_OUT } });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7 },
        0
      );

      const links = linksRef.current?.querySelectorAll("a");
      if (links) {
        tl.fromTo(
          Array.from(links),
          { opacity: 0, y: -12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          0.2
        );
      }

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6 },
        0.35
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Scroll progress + header state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? window.scrollY / total : 0;
        gsap.set(progressRef.current, { scaleX: progress });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Scrollspy — highlight the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      // Trigger band sits just below the fixed navbar
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="scroll-progress w-full"
        aria-hidden
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-ivory/88 backdrop-blur-md border-b border-golden-sand/15 shadow-[0_1px_0_rgba(234,215,185,0.15)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between px-5 sm:px-6 md:px-12 py-3.5 sm:py-4">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            className="flex items-center gap-2.5 group opacity-0"
            id="nav-logo"
          >
            <Mark className="w-7 h-7 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
            <span className="font-serif text-xl md:text-[1.4rem] tracking-[0.22em] text-forest-green transition-colors duration-300 group-hover:text-terracotta">
              AKARIAN
              <span className="text-terracotta align-super text-[0.6rem] ml-0.5">®</span>
            </span>
          </a>

          {/* Desktop links */}
          <div ref={linksRef} className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-block font-sans text-[0.8rem] uppercase tracking-[0.14em] transition-colors duration-300 opacity-0 ${
                    isActive ? "text-terracotta" : "text-deep-olive hover:text-terracotta"
                  }`}
                  id={`nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute left-0 -bottom-1.5 h-px w-full bg-terracotta origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div ref={ctaRef} className="hidden lg:block opacity-0">
            <Button href="#contact" variant="primary" id="nav-cta">
              Begin
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative w-11 h-11 flex flex-col justify-center items-center gap-[5px] z-50 -mr-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-[1.5px] origin-center"
              animate={
                mobileOpen
                  ? { rotate: 45, y: 6.5, backgroundColor: "#FAF6EE" }
                  : { rotate: 0, y: 0, backgroundColor: "#2F3B2E" }
              }
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            />
            <motion.span
              className="block w-6 h-[1.5px]"
              animate={
                mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1, backgroundColor: "#2F3B2E" }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] origin-center"
              animate={
                mobileOpen
                  ? { rotate: -45, y: -6.5, backgroundColor: "#FAF6EE" }
                  : { rotate: 0, y: 0, backgroundColor: "#2F3B2E" }
              }
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-deep-olive flex flex-col items-center justify-center gap-7 grain"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          >
            <Mark className="w-12 h-12 mb-2 relative z-10" />
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="relative z-10 font-serif text-3xl text-ivory/85 hover:text-yellow-amber transition-colors duration-300"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ delay: i * 0.055, duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              className="relative z-10 mt-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <Button
                href="#contact"
                variant="secondary"
                onClick={() => setMobileOpen(false)}
                className="!border-ivory/40 !text-ivory hover:!border-yellow-amber hover:!text-yellow-amber"
              >
                Begin Journey
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
