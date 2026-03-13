import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'

export const metadata = {
  title: "Blog | Insights & Updates",
  description: "Read our latest articles on technology and SaaS building.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
    <SiteHeader />
    <div className="max-w-5xl mx-auto py-12 px-4 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
        <p className="text-xl text-muted-foreground mt-2">Latest news and tutorials.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="h-full hover:border-primary transition-all duration-200 group">
              {post.image && (
                <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-[10px] uppercase">Article</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-medium">
                  <span className="text-muted-foreground font-normal">By</span> {post.author}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-24 border-2 border-dashed rounded-2xl bg-muted/20">
          <p className="text-muted-foreground">No posts published yet. Start by adding a .mdx file to content/posts!</p>
        </div>
      )}
    </div>
      <SiteFooter />
    </>
  );
}
