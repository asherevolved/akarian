import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in | Akarian Journal",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthed()) redirect("/dashboard");
  const { error } = await searchParams;

  return (
    <main className="grain relative flex min-h-screen items-center justify-center bg-deep-olive px-5">
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl tracking-[0.2em] text-ivory">
            AKARIAN
            <span className="align-super text-[0.6rem] text-terracotta">®</span>
          </span>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.22em] text-ivory/50">
            Journal Dashboard
          </p>
        </div>

        <form
          action="/api/admin/login"
          method="POST"
          className="rounded-card border border-sage/25 bg-ivory/5 p-7 backdrop-blur-sm"
        >
          {error && (
            <p className="mb-5 rounded-lg border border-terracotta/40 bg-terracotta/10 px-4 py-3 text-sm text-yellow-amber">
              Incorrect email or password.
            </p>
          )}

          <label className="block font-sans text-xs uppercase tracking-[0.16em] text-ivory/60">
            Email
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              className="mt-2 w-full rounded-lg border border-ivory/20 bg-deep-olive/40 px-4 py-3 font-sans text-sm text-ivory outline-none transition-colors focus:border-yellow-amber"
            />
          </label>

          <label className="mt-5 block font-sans text-xs uppercase tracking-[0.16em] text-ivory/60">
            Password
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-ivory/20 bg-deep-olive/40 px-4 py-3 font-sans text-sm text-ivory outline-none transition-colors focus:border-yellow-amber"
            />
          </label>

          <button
            type="submit"
            className="mt-7 w-full rounded-full bg-terracotta px-7 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-ivory transition-colors duration-300 hover:bg-yellow-amber hover:text-forest-green"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
