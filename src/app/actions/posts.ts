"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminClient } from "@/lib/supabase";
import { isAuthed } from "@/lib/auth";
import { slugify } from "@/lib/posts";

async function guard() {
  if (!(await isAuthed())) throw new Error("Unauthorized");
}

export type SaveResult = { ok: false; error: string } | { ok: true; id: string };

/**
 * Create or update a post. Called from the dashboard PostForm.
 * `images` arrives as a JSON string: [{ url, alt }, ...].
 */
export async function savePost(formData: FormData): Promise<SaveResult> {
  await guard();
  const sb = adminClient();

  const id = (formData.get("id") as string) || "";
  const title = ((formData.get("title") as string) || "").trim();
  const excerpt = ((formData.get("excerpt") as string) || "").trim();
  const content = ((formData.get("content") as string) || "").trim();
  const coverImage = ((formData.get("coverImage") as string) || "").trim() || null;
  const status = (formData.get("status") as string) === "published" ? "published" : "draft";
  let slug = ((formData.get("slug") as string) || "").trim();

  if (!title) return { ok: false, error: "Title is required." };
  slug = slugify(slug || title);
  if (!slug) return { ok: false, error: "Could not derive a slug from the title." };

  let images: { url: string; alt: string }[] = [];
  try {
    const raw = (formData.get("images") as string) || "[]";
    images = JSON.parse(raw);
  } catch {
    images = [];
  }

  // Ensure slug is unique (ignore the post being edited).
  const { data: clash } = await sb
    .from("posts")
    .select("id")
    .eq("slug", slug)
    .neq("id", id || "00000000-0000-0000-0000-000000000000")
    .maybeSingle();
  if (clash) return { ok: false, error: `Slug "${slug}" is already in use.` };

  const now = new Date().toISOString();

  let postId = id;
  if (id) {
    // Preserve published_at; set it the first time it goes live.
    const { data: existing } = await sb
      .from("posts")
      .select("published_at")
      .eq("id", id)
      .maybeSingle();
    const published_at =
      status === "published"
        ? (existing?.published_at as string | null) ?? now
        : null;
    const { error } = await sb
      .from("posts")
      .update({ title, slug, excerpt, content, cover_image: coverImage, status, published_at })
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { data, error } = await sb
      .from("posts")
      .insert({
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage,
        status,
        published_at: status === "published" ? now : null,
      })
      .select("id")
      .single();
    if (error) return { ok: false, error: error.message };
    postId = data.id as string;
  }

  // Replace the gallery: clear then re-insert in order.
  await sb.from("post_images").delete().eq("post_id", postId);
  if (images.length) {
    const rows = images
      .filter((im) => im.url)
      .map((im, i) => ({ post_id: postId, url: im.url, alt: im.alt || "", sort: i }));
    if (rows.length) {
      const { error } = await sb.from("post_images").insert(rows);
      if (error) return { ok: false, error: error.message };
    }
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/dashboard");
  return { ok: true, id: postId };
}

export async function deletePost(formData: FormData): Promise<void> {
  await guard();
  const id = formData.get("id") as string;
  if (id) {
    await adminClient().from("posts").delete().eq("id", id);
    revalidatePath("/blog");
    revalidatePath("/dashboard");
  }
  redirect("/dashboard");
}
