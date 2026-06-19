"use client";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  id?: string;
}

/**
 * One button system. Press feedback is a simple CSS scale (no elastic bounce).
 */
export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  className = "",
  id,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-sans text-[0.75rem] sm:text-[0.8rem] font-medium uppercase tracking-[0.12em] cursor-pointer select-none transition-[transform,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] active:duration-100";

  const variants = {
    primary: "bg-forest-green text-ivory hover:bg-terracotta",
    secondary:
      "bg-transparent border border-golden-sand text-forest-green hover:border-terracotta hover:text-terracotta",
    ghost: "bg-transparent text-deep-olive hover:text-terracotta px-0",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} id={id} onClick={onClick}>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} id={id}>
      <span>{children}</span>
    </button>
  );
}
