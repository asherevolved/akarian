import { publicClient, adminClient } from "@/lib/supabase";

export interface PostImage {
  id: string;
  post_id: string;
  url: string;
  alt: string;
  sort: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  published_at: string | null;
  images?: PostImage[];
}

/** Published posts, newest first — for the public /blog list. */
export async function getPublishedPosts(): Promise<Post[]> {
  const { data, error } = await publicClient()
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

/** One published post (with its images) by slug — public detail page. */
export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const sb = publicClient();
  const { data, error } = await sb
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const post = data as Post;
  const { data: images } = await sb
    .from("post_images")
    .select("*")
    .eq("post_id", post.id)
    .order("sort", { ascending: true });
  post.images = (images ?? []) as PostImage[];
  return post;
}

/** All posts (any status) for the dashboard list. Uses admin client. */
export async function getAllPostsAdmin(): Promise<Post[]> {
  const { data, error } = await adminClient()
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Post[];
}

/** One post by id (with images) for the dashboard editor. */
export async function getPostByIdAdmin(id: string): Promise<Post | null> {
  const sb = adminClient();
  const { data, error } = await sb.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  const post = data as Post;
  const { data: images } = await sb
    .from("post_images")
    .select("*")
    .eq("post_id", post.id)
    .order("sort", { ascending: true });
  post.images = (images ?? []) as PostImage[];
  return post;
}

/** url-safe slug from a title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
