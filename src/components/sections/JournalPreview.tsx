import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import PostGrid from "@/components/blog/PostGrid";
import { getPublishedPosts, type Post } from "@/lib/posts";

// Server component. Failures here must never crash the homepage (unlike /blog),
// so the fetch is guarded and the whole section simply hides if it can't load.
export default async function JournalPreview() {
  let posts: Post[] = [];
  try {
    posts = (await getPublishedPosts()).slice(0, 3);
  } catch {
    posts = [];
  }

  // Nothing to show — render nothing rather than an empty band.
  if (!posts.length) return null;

  return (
    <section id="journal" className="section-padding bg-ivory">
      <div className="container-wide">
        <SectionHeading
          label="Blog"
          heading="Notes from the Sensory Haven"
          subheading="Writing on early childhood, the science of the senses, and the small moments that shape a growing mind."
          align="center"
        />

        <PostGrid posts={posts} />

        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 rounded-full bg-forest-green py-3 pl-7 pr-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-ivory transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-terracotta"
          >
            <span>View more</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
