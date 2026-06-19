import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "akarian_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  const s = process.env.BLOG_SESSION_SECRET;
  if (!s) throw new Error("Missing BLOG_SESSION_SECRET");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

/** Validate a submitted email + password against the configured admin creds. */
export function checkCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.BLOG_ADMIN_EMAIL ?? "";
  const adminPassword = process.env.BLOG_ADMIN_PASSWORD ?? "";
  if (!adminEmail || !adminPassword) return false;
  return (
    safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase()) &&
    safeEqual(password, adminPassword)
  );
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** `${expiry}.${hmac}` — self-contained, no server-side session store needed. */
export function createSessionToken(): string {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(payload);
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && exp > Date.now();
}

/** Read the cookie and tell whether the current request is an authed admin. */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export const SESSION_MAX_AGE = MAX_AGE;
