import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getPost(slug: string) {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${api}/posts/${slug}`, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl font-bold tracking-tight">Lorem ipsum</div>
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Voltar
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-invert max-w-none">
          <header className="mb-8 border-b border-border/40 pb-8">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            )}
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span>Por {post.author?.name || 'Autor'}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{Math.ceil(post.content.length / 1000)} min de leitura</span>
            </div>
          </header>

          <div className="prose-lg text-foreground">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <footer className="mt-12 border-t border-border/40 pt-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              ← Voltar para Home
            </Link>
            <div className="text-sm text-muted-foreground">
              Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
