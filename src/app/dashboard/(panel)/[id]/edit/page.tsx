import Link from "next/link";
import { notFound } from "next/navigation";
import PostForm from "@/components/dashboard/PostForm";
import { getPostByIdAdmin } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);
  if (!post) notFound();

  return (
    <>
      <Link
        href="/dashboard"
        className="font-sans text-xs uppercase tracking-[0.14em] text-deep-olive/60 hover:text-terracotta transition-colors"
      >
        ← All posts
      </Link>
      <h1 className="display t-h2 mt-4 mb-8 text-forest-green">Edit post</h1>
      <PostForm post={post} />
    </>
  );
}
