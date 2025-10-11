import Link from "next/link"

interface PostItem {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt: string;
  content?: string;
  category?: string;
}

// Posts mock como fallback
const mockPosts = [
  {
    id: "1",
    slug: "poder-dos-detalhes",
    title: "O poder dos detalhes em interfaces",
    excerpt: "Como pequenos ajustes podem transformar completamente a experiência do usuário.",
    publishedAt: "2024-03-15T10:00:00Z",
    content: "Lorem ipsum dolor sit amet...",
    category: "Design"
  },
  {
    id: "2", 
    slug: "server-components",
    title: "Server Components no Next.js 15",
    excerpt: "Explorando os novos padrões de renderização e como eles melhoram a performance.",
    publishedAt: "2024-03-10T10:00:00Z",
    content: "Lorem ipsum dolor sit amet...",
    category: "Desenvolvimento"
  },
  {
    id: "3",
    slug: "animacoes-framer-motion", 
    title: "Criando animações fluidas com Framer Motion",
    excerpt: "Um guia prático para adicionar micro-interações que encantam.",
    publishedAt: "2024-03-05T10:00:00Z",
    content: "Lorem ipsum dolor sit amet...",
    category: "Tutorial"
  }
];

async function getPosts() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${api}/posts?page=1&pageSize=6`, { 
      next: { revalidate: 30 },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      console.log('API não disponível, usando posts mock');
      return { items: mockPosts };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Erro ao buscar posts da API, usando posts mock:', error);
    return { items: mockPosts };
  }
}

export async function FeaturedPosts() {
  const { items: posts } = await getPosts();
  return (
    <section className="border-t border-border/40 bg-secondary/20 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Artigos Recentes</h2>
          <p className="mt-4 text-lg text-muted-foreground">Explorando ideias sobre design, código e produto.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Nenhum post publicado ainda.</p>
            </div>
          ) : (
            posts.map((post: PostItem) => (
              <Link key={post.id} href={`/posts/${post.slug}`} className="group">
                <div className="h-full rounded-lg border border-border/40 bg-card/50 p-6 transition-all duration-300 will-change-transform hover:border-blue-500 dark:hover:border-red-500 hover:-translate-y-0.5">
                  <div className="flex h-full flex-col">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-primary/70 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-red-400 group-hover:font-semibold">
                        {post.category || 'Artigo'}
                      </span>
                    </div>

                    <h3 className="mb-3 text-balance text-xl font-semibold leading-tight transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-red-400">
                      {post.title}
                    </h3>

                    <p className="mb-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt || 'Sem descrição disponível.'}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                      </span>
                      <span>•</span>
                      <span>
                        {Math.ceil((post.content?.length || 500) / 1000)} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
