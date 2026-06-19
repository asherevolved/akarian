import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPublishedPostBySlug, formatDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Not found | Akarian®" };
  return {
    title: `${post.title} | Akarian® Journal`,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const html = marked.parse(post.content || "", { async: false }) as string;
  const gallery = (post.images ?? []).filter((im) => im.url !== post.cover_image);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main">
        <article className="section-padding bg-ivory">
          <div className="container-wide max-w-3xl">
            <Link
              href="/blog"
              className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-deep-olive/60 hover:text-terracotta transition-colors duration-300"
            >
              ← The Journal
            </Link>

            <p className="font-serif nums text-sm text-terracotta mt-8">
              {formatDate(post.published_at)}
            </p>
            <h1 className="display t-h2 text-forest-green mt-2">{post.title}</h1>
            {post.excerpt && (
              <p className="t-lead mt-5 font-sans text-deep-olive/80">{post.excerpt}</p>
            )}

            {post.cover_image && (
              <div className="arch overflow-hidden mt-10 bg-sandstone-beige/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}

            <div
              className="blog-prose mt-10"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {gallery.length > 0 && (
              <div className="mt-14">
                <div className="hairline mb-10" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {gallery.map((im) => (
                    <figure key={im.id} className="arch overflow-hidden bg-sandstone-beige/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={im.url}
                        alt={im.alt || post.title}
                        className="w-full object-cover"
                      />
                      {im.alt && (
                        <figcaption className="px-4 py-3 font-sans text-xs text-deep-olive/60">
                          {im.alt}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
