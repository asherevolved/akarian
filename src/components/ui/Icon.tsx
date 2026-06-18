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
  | "star";

/**
 * Hand-tuned line-icon set, replaces all emoji to keep the
 * refined editorial-wellness aesthetic of the brand kit.
 * Single 1.5px stroke, 24×24 grid, currentColor.
 */
export default function Icon({ name, className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
  tactile: (
    <>
      <path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12" />
      <path d="M11 11.5V5a1.5 1.5 0 0 1 3 0v6.5" />
      <path d="M14 7a1.5 1.5 0 0 1 3 0v6c0 3.5-2.5 6-6 6s-5-2-6-4l-1.5-3a1.5 1.5 0 0 1 2.6-1.5L8 14" />
    </>
  ),
  vestibular: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 0 0 16M4 12a8 8 0 0 0 16 0" opacity="0.5" />
    </>
  ),
  proprioceptive: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v6M8 21l4-8 4 8M7 11l5 2 5-2" />
    </>
  ),
  visual: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  auditory: (
    <>
      <path d="M4 14a8 8 0 0 1 16 0" />
      <path d="M4 14v2a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 1Z" />
      <path d="M20 14v2a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 1Z" />
    </>
  ),
  olfactory: (
    <>
      <path d="M8 21c-2-2-2-5 0-7 1.5-1.5 1.5-3 0-4.5" />
      <path d="M12 21c-2-2-2-5 0-7 1.5-1.5 1.5-3 0-4.5" />
      <path d="M16 21c-2-2-2-5 0-7 1.5-1.5 1.5-3 0-4.5" />
    </>
  ),
  gustatory: (
    <>
      <path d="M12 3c4 0 7 2 7 6 0 5-3 12-7 12s-7-7-7-12c0-4 3-6 7-6Z" />
      <path d="M12 9v9" opacity="0.5" />
    </>
  ),
  interoception: (
    <>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
      <path d="M9 11h2l1-2 1.5 3 1-1.5h1.5" opacity="0.6" />
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
};
