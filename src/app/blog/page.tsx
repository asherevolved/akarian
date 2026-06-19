import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostGrid from "@/components/blog/PostGrid";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal | Akarian®, The Sensory Haven",
  description:
    "Reflections on early sensory nourishment, child development, and the EISE™ approach — from the Akarian Sensory Haven, Whitefield, Bengaluru.",
};

// Always reflect the latest published posts.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <header className="section-padding pb-0 bg-ivory">
          <div className="container-wide">
            <p className="label mb-4">The Journal</p>
            <h1 className="display t-display text-forest-green max-w-4xl">
              Notes from the Sensory Haven
            </h1>
            <p className="t-lead mt-5 max-w-2xl font-sans text-deep-olive/80">
              Writing on early childhood, the science of the senses, and the small
              moments that shape a growing mind.
            </p>
            <div className="hairline mt-10 sm:mt-14" />
          </div>
        </header>

        <section className="section-padding pt-12 sm:pt-16 bg-ivory">
          <div className="container-wide">
            <PostGrid posts={posts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
