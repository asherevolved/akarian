import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard | Akarian Journal",
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthed())) redirect("/dashboard/login");

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-40 border-b border-golden-sand/20 bg-ivory/90 backdrop-blur-md">
        <div className="container-wide flex items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/dashboard" className="flex items-baseline gap-2.5">
            <span className="font-serif text-lg tracking-[0.2em] text-forest-green">
              AKARIAN
            </span>
            <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-deep-olive/50">
              Journal
            </span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href="/blog"
              target="_blank"
              className="font-sans text-xs uppercase tracking-[0.14em] text-deep-olive/60 hover:text-terracotta transition-colors"
            >
              View blog ↗
            </Link>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="font-sans text-xs uppercase tracking-[0.14em] text-deep-olive/60 hover:text-terracotta transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-wide px-5 py-10 sm:px-8 sm:py-14">{children}</main>
    </div>
  );
}
