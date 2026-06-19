import Link from "next/link";
import PostForm from "@/components/dashboard/PostForm";

export default function NewPostPage() {
  return (
    <>
      <Link
        href="/dashboard"
        className="font-sans text-xs uppercase tracking-[0.14em] text-deep-olive/60 hover:text-terracotta transition-colors"
      >
        ← All posts
      </Link>
      <h1 className="display t-h2 mt-4 mb-8 text-forest-green">New post</h1>
      <PostForm />
    </>
  );
}
