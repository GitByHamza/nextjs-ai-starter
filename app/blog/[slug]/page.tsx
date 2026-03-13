import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Calendar, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

/**
 * MANDATORY FOR NEXT.JS 15:
 * The 'params' object is now a Promise and MUST be awaited.
 */
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  // 1. Await the params to get the slug
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-6 pb-32">
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="mb-10 -ml-3 text-muted-foreground hover:bg-transparent hover:text-primary transition-colors">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to all posts
        </Button>
      </Link>

      <header className="space-y-6 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
          </div>
        </div>

        {post.image && (
          <div className="w-full aspect-video relative overflow-hidden rounded-2xl border shadow-sm bg-muted">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        )}
      </header>

      {/* 'prose' classes come from @tailwindcss/typography.
          If you see an 'acorn' error, it means your .mdx file has a syntax error
          (likely a stray { or } character).
      */}
      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl">
        <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="animate-spin" /></div>}>
          <MDXRemote
            source={post.content}
          />
        </Suspense>
      </div>
    </article>
  );
}
