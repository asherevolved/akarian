import { NextResponse, type NextRequest } from "next/server";
import {
  checkCredentials,
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = (form.get("email") as string) || "";
  const password = (form.get("password") as string) || "";

  if (!checkCredentials(email, password)) {
    return NextResponse.redirect(new URL("/dashboard/login?error=1", request.url), 303);
  }

  const res = NextResponse.redirect(new URL("/dashboard", request.url), 303);
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
