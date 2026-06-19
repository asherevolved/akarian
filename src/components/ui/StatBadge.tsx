interface StatBadgeProps {
  value: string;
  label: string;
}

/**
 * A single stat. Reveal is handled by the parent's useReveal (mark with
 * data-reveal where used), so this stays a plain presentational component.
 */
export default function StatBadge({ value, label }: StatBadgeProps) {
  return (
    <div className="text-center">
      <p className="font-serif nums text-3xl sm:text-4xl md:text-5xl font-light text-terracotta leading-none">
        {value}
      </p>
      <span className="mx-auto mt-2 sm:mt-3 mb-2 block h-px w-5 sm:w-6 bg-golden-sand/50" />
      <p className="font-sans text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.2em] text-deep-olive/70">
        {label}
      </p>
    </div>
  );
}
