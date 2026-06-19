interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "ivory" | "sandstone" | "dark";
  /** Subtle hover lift. */
  hover?: boolean;
  /** Use the brand doorway-arch radius instead of the standard card radius. */
  arch?: boolean;
  id?: string;
}

/**
 * One flat card treatment: background + 1px border, optional gentle hover lift.
 * No bezels, no trays, no bounce. CSS-only interaction.
 */
export default function Card({
  children,
  className = "",
  variant = "ivory",
  hover = true,
  arch = false,
  id,
}: CardProps) {
  const variants = {
    ivory: "bg-ivory border-forest-green/10",
    sandstone: "bg-sandstone-beige/30 border-golden-sand/25",
    dark: "bg-deep-olive border-sage/25 text-ivory",
  };

  const radius = arch ? "arch" : "rounded-card";

  const hoverClasses = hover
    ? "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-[0_14px_36px_-12px_rgba(47,59,46,0.18)]"
    : "";

  return (
    <div
      className={`relative border p-7 md:p-8 ${radius} ${variants[variant]} ${hoverClasses} ${className}`}
      id={id}
    >
      {children}
    </div>
  );
}
