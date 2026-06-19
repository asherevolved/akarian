import { NextResponse, type NextRequest } from "next/server";
import { adminClient, BLOG_BUCKET } from "@/lib/supabase";
import { isAuthed } from "@/lib/auth";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image must be 10MB or smaller" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const sb = adminClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await sb.storage.from(BLOG_BUCKET).upload(key, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = sb.storage.from(BLOG_BUCKET).getPublicUrl(key);
  return NextResponse.json({ url: data.publicUrl });
}
