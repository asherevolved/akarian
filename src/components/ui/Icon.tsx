interface IconProps {
  name: IconName;
  className?: string;
}

export type IconName =
  // pillars
  | "tactile"
  | "vestibular"
  | "proprioceptive"
  | "visual"
  | "auditory"
  | "olfactory"
  | "gustatory"
  | "interoception"
  // approach principles
  | "home"
  | "partner"
  | "spark"
  | "sprout"
  | "science"
  // contact
  | "location"
  | "phone"
  | "instagram"
  | "calendar"
  // programme stats
  | "house"
  | "child"
  | "star"
  // benefits
  | "confidence"
  | "esteem"
  | "participation"
  | "performance"
  | "awareness"
  | "potential";

/**
 * Hand-tuned line-icon set, replaces all emoji to keep the
 * refined editorial-wellness aesthetic of the brand kit.
 * Fine 1.4px stroke on a 24×24 grid, currentColor. The card icons
 * (pillars + benefits) are duotone: a faint currentColor fill layer
 * under crisp strokes, for quiet haptic depth.
 */
export default function Icon({ name, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

const PATHS: Record<IconName, React.ReactNode> = {
  // ── Pillars ──────────────────────────────────
  // Tactile — fingerprint, the body's first intelligence
  tactile: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="none" opacity="0.06" />
      <path d="M5.5 12a6.5 6.5 0 0 1 13 0" opacity="0.45" />
      <path d="M8 12a4 4 0 0 1 8 0v2.4" />
      <path d="M10.3 12a1.7 1.7 0 0 1 3.4 0v3.2" />
      <path d="M12 12v4" />
      <path d="M7.9 16.4c.4 1 1 1.9 1.8 2.5" opacity="0.45" />
    </>
  ),
  // Vestibular — gyroscope, balance and equilibrium
  vestibular: (
    <>
      <circle cx="12" cy="12" r="8" fill="currentColor" stroke="none" opacity="0.06" />
      <ellipse cx="12" cy="12" rx="8" ry="3.2" />
      <ellipse cx="12" cy="12" rx="3.2" ry="8" opacity="0.45" />
      <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),
  // Proprioceptive — body located within a frame of space
  proprioceptive: (
    <>
      <path d="M5 8V5.5A.5.5 0 0 1 5.5 5H8" opacity="0.4" />
      <path d="M19 8V5.5A.5.5 0 0 0 18.5 5H16" opacity="0.4" />
      <path d="M5 16v2.5a.5.5 0 0 0 .5.5H8" opacity="0.4" />
      <path d="M19 16v2.5a.5.5 0 0 1-.5.5H16" opacity="0.4" />
      <circle cx="12" cy="7.6" r="1.9" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="12" cy="7.6" r="1.9" />
      <path d="M12 9.5v4.4M8.7 19.2 12 13.9l3.3 5.3M8.8 11.9l3.2 1.3 3.2-1.3" />
    </>
  ),
  // Visual — the eye, tracking and depth
  visual: (
    <>
      <path d="M2.7 12S6.2 6 12 6s9.3 6 9.3 6-3.5 6-9.3 6S2.7 12 2.7 12Z" fill="currentColor" stroke="none" opacity="0.07" />
      <path d="M2.7 12S6.2 6 12 6s9.3 6 9.3 6-3.5 6-9.3 6S2.7 12 2.7 12Z" />
      <circle cx="12" cy="12" r="2.7" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  // Auditory — sound radiating from a source
  auditory: (
    <>
      <path d="M7.6 9.6 11 6.6v10.8l-3.4-3H6a1 1 0 0 1-1-1v-2.8a1 1 0 0 1 1-1Z" fill="currentColor" stroke="none" opacity="0.12" />
      <path d="M7.6 9.6 11 6.6v10.8l-3.4-3H6a1 1 0 0 1-1-1v-2.8a1 1 0 0 1 1-1Z" />
      <path d="M14.4 9.6a4 4 0 0 1 0 4.8" />
      <path d="M16.8 7.6a7.5 7.5 0 0 1 0 8.8" opacity="0.5" />
    </>
  ),
  // Olfactory — scent rising as memory
  olfactory: (
    <>
      <path d="M5.6 9.2c1.6-1.8 4-2.8 6.4-2.8s4.8 1 6.4 2.8" opacity="0.4" />
      <path d="M7.6 20.4c-1.7-1.7-1.7-4.3 0-6 1.3-1.3 1.3-2.6 0-3.9" />
      <path d="M12 20.4c-1.7-1.7-1.7-4.3 0-6 1.3-1.3 1.3-2.6 0-3.9" />
      <path d="M16.4 20.4c-1.7-1.7-1.7-4.3 0-6 1.3-1.3 1.3-2.6 0-3.9" />
    </>
  ),
  // Gustatory — palate, oral awareness
  gustatory: (
    <>
      <path d="M12 4c3.7 0 6.6 2.3 6.6 6.1 0 4.7-3.1 11.3-6.6 11.3S5.4 14.8 5.4 10.1 8.3 4 12 4Z" fill="currentColor" stroke="none" opacity="0.07" />
      <path d="M12 4c3.7 0 6.6 2.3 6.6 6.1 0 4.7-3.1 11.3-6.6 11.3S5.4 14.8 5.4 10.1 8.3 4 12 4Z" />
      <path d="M8.8 10.4c.9 1.6 1.9 2.4 3.2 2.4s2.3-.8 3.2-2.4" opacity="0.55" />
    </>
  ),
  // Interoception — the heart's interior signal
  interoception: (
    <>
      <path d="M12 20.5S4.4 15.7 4.4 9.9A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.6 2.8c0 5.8-7.6 10.6-7.6 10.6Z" fill="currentColor" stroke="none" opacity="0.08" />
      <path d="M12 20.5S4.4 15.7 4.4 9.9A4.3 4.3 0 0 1 12 7.1a4.3 4.3 0 0 1 7.6 2.8c0 5.8-7.6 10.6-7.6 10.6Z" />
      <path d="M7 12h2.2l1.3-2.4 1.7 3.7 1.2-1.8H17" opacity="0.6" />
    </>
  ),

  // ── Approach principles ──────────────────────
  home: (
    <>
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  partner: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 20c0-3 2.5-5 5-5s5 2 5 5" />
      <path d="M14 20c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4" opacity="0.6" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" opacity="0.6" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 20v-8" />
      <path d="M12 12c-4 0-6-2-6-6 4 0 6 2 6 6Z" />
      <path d="M12 14c4 0 6-2 6-5-4 0-6 2-6 5Z" opacity="0.7" />
    </>
  ),
  science: (
    <>
      <path d="M9 3v6l-4.5 8a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 9V3" />
      <path d="M8 3h8" />
      <path d="M7 15h10" opacity="0.6" />
    </>
  ),

  // ── Contact ──────────────────────────────────
  location: (
    <>
      <path d="M12 21c4-4 7-7.5 7-11a7 7 0 0 0-14 0c0 3.5 3 7 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4 6a2 2 0 0 1 1-2Z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
      <path d="M8 13h2M14 13h2M8 16h2M14 16h2" opacity="0.6" />
    </>
  ),

  // ── Programme stats ──────────────────────────
  house: (
    <>
      <path d="M4 11l8-6 8 6" />
      <path d="M6 10v9h12v-9" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="6" r="3" />
      <path d="M12 9v7M7 13l5-1 5 1M9 21l3-5 3 5" />
    </>
  ),
  star: (
    <path d="M12 4l2 5 5 .5-4 3.5 1.5 5L12 15l-4.5 3 1.5-5-4-3.5 5-.5Z" />
  ),

  // ── Benefits ──────────────────────────────────
  // Confidence — a shield that holds
  confidence: (
    <>
      <path d="M12 3.2 5 6v5.1c0 5 3.4 8.5 7 10.7 3.6-2.2 7-5.7 7-10.7V6l-7-2.8Z" fill="currentColor" stroke="none" opacity="0.07" />
      <path d="M12 3.2 5 6v5.1c0 5 3.4 8.5 7 10.7 3.6-2.2 7-5.7 7-10.7V6l-7-2.8Z" />
      <path d="M8.8 12 11 14.2 15.2 10" opacity="0.7" />
    </>
  ),
  // Self-esteem — a medal of intrinsic worth
  esteem: (
    <>
      <path d="M9.2 13.6 8 21l4-2.2 4 2.2-1.2-7.4" fill="currentColor" stroke="none" opacity="0.08" />
      <path d="M9.2 13.6 8 21l4-2.2 4 2.2-1.2-7.4" opacity="0.55" />
      <circle cx="12" cy="9" r="5.3" fill="currentColor" stroke="none" opacity="0.08" />
      <circle cx="12" cy="9" r="5.3" />
      <path d="M12 6.4l.9 1.85 2.05.3-1.48 1.44.35 2.04L12 11.1l-1.82.93.35-2.04L9.05 8.55l2.05-.3Z" opacity="0.7" />
    </>
  ),
  // Participation — two who engage together
  participation: (
    <>
      <circle cx="8.5" cy="8" r="2.4" fill="currentColor" stroke="none" opacity="0.09" />
      <circle cx="8.5" cy="8" r="2.4" />
      <circle cx="15.5" cy="8.2" r="2.2" opacity="0.6" />
      <path d="M4.5 19c0-2.7 1.8-4.6 4-4.6s4 1.9 4 4.6" />
      <path d="M12.3 19c.1-2.6 1.8-4.4 3.8-4.4s3.7 1.8 3.8 4.4" opacity="0.55" />
    </>
  ),
  // Performance — a rising line of capacity
  performance: (
    <>
      <path d="M4 16.5 8.5 12l3 2.8L17 8.5V20H4Z" fill="currentColor" stroke="none" opacity="0.07" />
      <path d="M4 16.5 8.5 12l3 2.8L17 8.5" />
      <path d="M14.3 8.5H17v2.6" opacity="0.6" />
      <path d="M19 4.4l.5 1.45 1.45.5-1.45.5L19 8.3l-.5-1.45L17.05 6.35l1.45-.5Z" fill="currentColor" stroke="none" opacity="0.55" />
    </>
  ),
  // Self-awareness — concentric attention turning inward
  awareness: (
    <>
      <circle cx="12" cy="12" r="8.3" fill="currentColor" stroke="none" opacity="0.05" />
      <circle cx="12" cy="12" r="8.3" opacity="0.4" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  // Potential — a sprout reaching upward
  potential: (
    <>
      <path d="M12 12.5c-4 0-6.2-2.3-6.2-6.2 4 0 6.2 2.3 6.2 6.2Z" fill="currentColor" stroke="none" opacity="0.08" />
      <path d="M12 21v-8.5" />
      <path d="M12 12.5c-4 0-6.2-2.3-6.2-6.2 4 0 6.2 2.3 6.2 6.2Z" />
      <path d="M12 11c4 0 6.2-2.1 6.2-5.4-4 0-6.2 2.1-6.2 5.4Z" opacity="0.7" />
      <path d="M9.3 4.6 12 2.2l2.7 2.4" opacity="0.5" />
    </>
  ),
};
