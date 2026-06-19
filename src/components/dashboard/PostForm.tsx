"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { savePost } from "@/app/actions/posts";
import type { Post } from "@/lib/posts";

interface GalleryImage {
  url: string;
  alt: string;
}

function localSlugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const fieldCls =
  "mt-2 w-full rounded-lg border border-golden-sand/30 bg-ivory px-4 py-3 font-sans text-sm text-forest-green outline-none transition-colors focus:border-terracotta";
const labelCls =
  "block font-sans text-xs font-semibold uppercase tracking-[0.14em] text-deep-olive/70";

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");
  const [images, setImages] = useState<GalleryImage[]>(
    (post?.images ?? [])
      .filter((im) => im.url !== post?.cover_image)
      .map((im) => ({ url: im.url, alt: im.alt }))
  );

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveSlug = slugTouched ? slug : localSlugify(title);

  async function uploadFile(file: File): Promise<string> {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
    return data.url as string;
  }

  async function handleCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      setCoverImage(await uploadFile(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setError(null);
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      setImages((prev) => [...prev, ...urls.map((url) => ({ url, alt: "" }))]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function submit(nextStatus?: "draft" | "published") {
    setError(null);
    const finalStatus = nextStatus ?? status;
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    const fd = new FormData();
    if (post?.id) fd.append("id", post.id);
    fd.append("title", title);
    fd.append("slug", effectiveSlug);
    fd.append("excerpt", excerpt);
    fd.append("content", content);
    fd.append("status", finalStatus);
    fd.append("coverImage", coverImage);
    fd.append("images", JSON.stringify(images));

    startTransition(async () => {
      const result = await savePost(fd);
      if (result.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  }

  const busy = pending || uploading;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="max-w-3xl"
    >
      {error && (
        <div className="mb-6 rounded-lg border border-terracotta/40 bg-terracotta/5 px-4 py-3 font-sans text-sm text-terracotta">
          {error}
        </div>
      )}

      <label className={labelCls}>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${fieldCls} font-serif text-lg`}
          placeholder="A title for your story"
        />
      </label>

      <div className="mt-6">
        <label className={labelCls}>
          Slug (URL)
          <input
            value={effectiveSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(localSlugify(e.target.value));
            }}
            className={`${fieldCls} font-mono`}
            placeholder="auto-generated-from-title"
          />
        </label>
        <p className="mt-1.5 font-sans text-xs text-deep-olive/50">
          /blog/{effectiveSlug || "…"}
        </p>
      </div>

      <label className={`${labelCls} mt-6`}>
        Excerpt
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={fieldCls}
          placeholder="A one or two sentence summary shown in the blog list."
        />
      </label>

      {/* Cover image */}
      <div className="mt-8">
        <p className={labelCls}>Cover image</p>
        <div className="mt-3 flex items-center gap-5">
          <div className="arch h-28 w-40 shrink-0 overflow-hidden bg-sandstone-beige/40">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverImage} alt="" className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-serif text-2xl text-golden-sand/40">
                Ak
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer rounded-full border border-golden-sand/40 px-5 py-2 font-sans text-xs uppercase tracking-[0.12em] text-forest-green transition-colors hover:border-terracotta hover:text-terracotta">
              {coverImage ? "Replace" : "Upload"}
              <input type="file" accept="image/*" onChange={handleCover} className="hidden" />
            </label>
            {coverImage && (
              <button
                type="button"
                onClick={() => setCoverImage("")}
                className="font-sans text-xs uppercase tracking-[0.12em] text-deep-olive/40 hover:text-terracotta"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <label className={`${labelCls} mt-8`}>
        Body
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          className={`${fieldCls} font-mono leading-relaxed`}
          placeholder={"Write in Markdown.\n\n## A heading\n\nA paragraph with **bold** and a [link](https://example.com).\n\n![image alt](paste-an-image-url-here)"}
        />
      </label>
      <p className="mt-1.5 font-sans text-xs text-deep-olive/50">
        Markdown supported: ## headings, **bold**, _italic_, lists, &gt; quotes, and
        ![alt](url) images. Tip: upload to the gallery below, then paste an image&apos;s
        URL inline.
      </p>

      {/* Gallery */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className={labelCls}>Gallery images</p>
          <label className="cursor-pointer rounded-full border border-golden-sand/40 px-5 py-2 font-sans text-xs uppercase tracking-[0.12em] text-forest-green transition-colors hover:border-terracotta hover:text-terracotta">
            + Add images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGallery}
              className="hidden"
            />
          </label>
        </div>
        {images.length === 0 ? (
          <p className="mt-3 font-sans text-xs text-deep-olive/50">
            No gallery images. These appear at the foot of the post.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((im, i) => (
              <div key={`${im.url}-${i}`} className="rounded-card border border-golden-sand/20 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.url} alt="" className="h-28 w-full rounded-lg object-cover" />
                <input
                  value={im.alt}
                  onChange={(e) =>
                    setImages((prev) =>
                      prev.map((p, j) => (j === i ? { ...p, alt: e.target.value } : p))
                    )
                  }
                  placeholder="Alt text"
                  className="mt-2 w-full rounded-md border border-golden-sand/30 bg-ivory px-2 py-1 font-sans text-xs text-forest-green outline-none focus:border-terracotta"
                />
                <div className="mt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => navigator.clipboard?.writeText(im.url)}
                    className="font-sans text-[0.65rem] uppercase tracking-[0.1em] text-deep-olive/40 hover:text-terracotta"
                  >
                    Copy URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, j) => j !== i))}
                    className="font-sans text-[0.65rem] uppercase tracking-[0.1em] text-deep-olive/40 hover:text-terracotta"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-golden-sand/20 pt-6">
        <button
          type="button"
          disabled={busy}
          onClick={() => submit("published")}
          className="rounded-full bg-forest-green px-7 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-ivory transition-colors duration-300 hover:bg-terracotta disabled:opacity-50"
        >
          {status === "published" ? "Update & publish" : "Publish"}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => submit("draft")}
          className="rounded-full border border-golden-sand/40 px-7 py-3 font-sans text-[0.8rem] font-medium uppercase tracking-[0.12em] text-forest-green transition-colors duration-300 hover:border-terracotta hover:text-terracotta disabled:opacity-50"
        >
          Save as draft
        </button>
        {uploading && (
          <span className="font-sans text-xs text-deep-olive/60">Uploading…</span>
        )}
        {pending && (
          <span className="font-sans text-xs text-deep-olive/60">Saving…</span>
        )}
      </div>
    </form>
  );
}
