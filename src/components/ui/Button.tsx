"use client";

import { useRef } from "react";
import gsap from "gsap";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  id?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  id,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const baseClasses =
    "group inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-sans text-[0.75rem] sm:text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors cursor-pointer will-change-transform select-none";

  // Transition: press 100ms, release 400ms — Emil asymmetric timing
  const transitionClasses = "duration-[400ms] active:duration-[100ms]";

  const variants = {
    primary:
      "bg-forest-green text-ivory hover:bg-terracotta active:bg-terracotta shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]",
    secondary:
      "bg-transparent border border-golden-sand text-forest-green hover:border-terracotta hover:text-terracotta",
    ghost:
      "bg-transparent text-deep-olive hover:text-terracotta px-0",
  };

  const combinedClasses = `${baseClasses} ${transitionClasses} ${variants[variant]} ${className}`;

  // GSAP press: scale 0.97 (Emil: buttons scale to 0.97 on press)
  const handlePointerDown = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale: 0.97, duration: 0.1, ease: "power2.out", overwrite: true });
  };
  const handlePointerUp = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)", overwrite: true });
  };

  const interactionProps = {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerLeave: handlePointerUp,
  };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={combinedClasses}
        id={id}
        {...interactionProps}
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={combinedClasses}
      id={id}
      {...interactionProps}
    >
      <span>{children}</span>
    </button>
  );
}
