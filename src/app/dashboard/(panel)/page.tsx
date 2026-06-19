import Link from "next/link";
import { getAllPostsAdmin, formatDate, type Post } from "@/lib/posts";
import DeleteButton from "@/components/dashboard/DeleteButton";

export const dynamic = "force-dynamic";

export default async function DashboardHome() {
  let posts: Post[] = [];
  let loadError: string | null = null;
  try {
    posts = await getAllPostsAdmin();
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load posts.";
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="display t-h2 text-forest-green">Posts</h1>
          <p className="mt-2 font-sans text-sm text-deep-olive/70">
            {posts.length} {posts.length === 1 ? "post" : "posts"} total
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center justify-center rounded-full bg-forest-green px-7 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-ivory transition-colors duration-300 hover:bg-terracotta"
        >
          + New post
        </Link>
      </div>

      {loadError && (
        <div className="mt-8 rounded-card border border-terracotta/40 bg-terracotta/5 p-5 text-sm text-deep-olive">
          <p className="font-semibold text-terracotta">Can&apos;t reach the database.</p>
          <p className="mt-1">{loadError}</p>
        </div>
      )}

      <div className="mt-10 divide-y divide-golden-sand/20 border-t border-golden-sand/20">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.12em] ${
                    post.status === "published"
                      ? "bg-sage/20 text-deep-olive"
                      : "bg-golden-sand/20 text-golden-sand"
                  }`}
                >
                  {post.status}
                </span>
                <span className="font-serif nums text-xs text-deep-olive/50">
                  {formatDate(post.published_at) || formatDate(post.updated_at)}
                </span>
              </div>
              <h2 className="mt-1.5 truncate font-serif text-lg text-forest-green">
                {post.title}
              </h2>
              <p className="truncate font-sans text-xs text-deep-olive/50">/blog/{post.slug}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              {post.status === "published" && (
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="font-sans text-xs uppercase tracking-[0.14em] text-deep-olive/60 hover:text-terracotta transition-colors"
                >
                  View
                </Link>
              )}
              <Link
                href={`/dashboard/${post.id}/edit`}
                className="font-sans text-xs uppercase tracking-[0.14em] text-forest-green hover:text-terracotta transition-colors"
              >
                Edit
              </Link>
              <DeleteButton id={post.id} title={post.title} />
            </div>
          </div>
        ))}

        {!loadError && posts.length === 0 && (
          <p className="py-10 text-center font-sans text-sm text-deep-olive/60">
            No posts yet. Create your first one.
          </p>
        )}
      </div>
    </>
  );
}
