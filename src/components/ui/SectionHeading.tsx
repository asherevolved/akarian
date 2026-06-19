"use client";

import { useReveal } from "@/lib/useReveal";

interface SectionHeadingProps {
  /** Optional quiet label. Off by default — use sparingly, never on every section. */
  label?: string;
  /** Alias for `label`, used by section components. */
  eyebrow?: string;
  heading: string;
  subheading?: string;
  className?: string;
  align?: "left" | "center";
  id?: string;
}

export default function SectionHeading({
  label,
  eyebrow,
  heading,
  subheading,
  className = "",
  align = "left",
  id,
}: SectionHeadingProps) {
  const eyebrowText = label ?? eyebrow;
  const ref = useReveal<HTMLDivElement>({ stagger: 0.1, start: "top 88%" });
  const isCenter = align === "center";

  return (
    <div
      ref={ref}
      className={`mb-10 sm:mb-14 md:mb-16 ${isCenter ? "text-center" : "text-left"} ${className}`}
      id={id}
    >
      {eyebrowText && (
        <p data-reveal className="label mb-4">
          {eyebrowText}
        </p>
      )}
      <h2
        data-reveal
        className={`display t-h2 text-forest-green max-w-3xl ${isCenter ? "mx-auto" : ""}`}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          data-reveal
          className={`t-lead mt-4 sm:mt-5 font-sans text-deep-olive/80 max-w-2xl ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
