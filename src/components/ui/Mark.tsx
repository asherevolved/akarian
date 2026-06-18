interface MarkProps {
  className?: string;
  variant?: "duotone" | "mono";
}

/**
 * AKARIAN brand mark, an organic sprout/sun glyph echoing the
 * brand-kit emblem: a rising form nestled within an arch, the
 * visual language of growth and nourishment.
 */
export default function Mark({ className = "", variant = "duotone" }: MarkProps) {
  const leaf = variant === "mono" ? "currentColor" : "var(--color-sage)";
  const seed = variant === "mono" ? "currentColor" : "var(--color-terracotta)";
  const arc = variant === "mono" ? "currentColor" : "var(--color-golden-sand)";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Enclosing arch */}
      <path
        d="M12 56V32a20 20 0 0 1 40 0v24"
        stroke={arc}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={variant === "mono" ? 0.5 : 0.7}
      />
      {/* Central stem */}
      <path
        d="M32 54V30"
        stroke={leaf}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M32 40C26 38 20 40 19 46c6 1 11-1 13-6Z"
        fill={leaf}
        opacity="0.85"
      />
      {/* Right leaf */}
      <path
        d="M32 34c6-2 12 0 13 6-6 1-11-1-13-6Z"
        fill={leaf}
        opacity="0.7"
      />
      {/* Seed / sun */}
      <circle cx="32" cy="26" r="6" fill={seed} opacity="0.9" />
      <circle cx="32" cy="26" r="2.5" fill="var(--color-yellow-amber)" />
    </svg>
  );
}
