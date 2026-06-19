"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import { formatDate, type Post } from "@/lib/posts";

export default function PostGrid({ posts }: { posts: Post[] }) {
  const gridRef = useReveal<HTMLDivElement>({ stagger: 0.07, start: "top 88%" });

  if (!posts.length) {
    return (
      <div className="border-t border-golden-sand/30 pt-10 text-center">
        <p className="font-serif text-2xl text-forest-green">No stories yet.</p>
        <p className="mt-3 font-sans text-sm text-deep-olive/70">
          New writing from the Sensory Haven will appear here soon.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <article key={post.id} data-reveal>
          <Link href={`/blog/${post.slug}`} className="group block">
            <div className="arch overflow-hidden bg-sandstone-beige/40 aspect-[4/3] mb-5">
              {post.cover_image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-serif text-5xl text-golden-sand/40">
                  Ak
                </div>
              )}
            </div>
            <p className="font-serif nums text-xs text-terracotta">
              {formatDate(post.published_at)}
            </p>
            <h2 className="mt-1.5 font-serif text-xl text-forest-green transition-colors duration-300 group-hover:text-terracotta">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="mt-2 font-sans text-sm leading-relaxed text-deep-olive/80 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <span className="mt-3 inline-block font-sans text-[0.72rem] uppercase tracking-[0.16em] text-deep-olive/60 group-hover:text-terracotta transition-colors duration-300">
              Read →
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
