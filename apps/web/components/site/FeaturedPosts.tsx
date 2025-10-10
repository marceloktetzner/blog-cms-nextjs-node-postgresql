import Link from 'next/link';

async function getPosts() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${api}/posts?page=1&pageSize=6`, { next: { revalidate: 30 } });
    if (!res.ok) return { items: [] };
    return res.json();
  } catch {
    return { items: [] };
  }
}

export async function FeaturedPosts() {
  const { items } = await getPosts();
  return (
    <section className="border-t border-border/40 bg-secondary/20 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lorem ipsum dolor sit amet</h2>
          <p className="mt-3 text-lg text-muted-foreground">Consectetur adipiscing elit, sed do eiusmod tempor.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 && (
            <p className="text-muted-foreground">Nenhuma postagem publicada ainda.</p>
          )}
          {items.map((post: any) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group">
              <div className="h-full rounded border border-border/40 bg-card/50 p-6 transition-all hover:border-accent/50 hover:bg-card">
                <div className="flex h-full flex-col">
                  <h3 className="mb-3 text-balance text-xl font-semibold leading-tight group-hover:text-accent">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mb-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
