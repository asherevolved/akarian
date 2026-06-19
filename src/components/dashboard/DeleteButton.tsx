"use client";

import { deletePost } from "@/app/actions/posts";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="font-sans text-xs uppercase tracking-[0.14em] text-deep-olive/40 hover:text-terracotta transition-colors"
      >
        Delete
      </button>
    </form>
  );
}
