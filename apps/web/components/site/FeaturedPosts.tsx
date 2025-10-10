import Link from "next/link"

const posts = [
  {
    category: "Design",
    title: "O poder dos detalhes em interfaces",
    description: "Como pequenos ajustes podem transformar completamente a experiência do usuário.",
    date: "15 Mar 2024",
    readTime: "5 min",
    href: "/posts/poder-dos-detalhes",
  },
  {
    category: "Desenvolvimento",
    title: "Server Components no Next.js 15",
    description: "Explorando os novos padrões de renderização e como eles melhoram a performance.",
    date: "10 Mar 2024",
    readTime: "8 min",
    href: "/posts/server-components",
  },
  {
    category: "Tutorial",
    title: "Criando animações fluidas com Framer Motion",
    description: "Um guia prático para adicionar micro-interações que encantam.",
    date: "5 Mar 2024",
    readTime: "12 min",
    href: "/posts/animacoes-framer-motion",
  },
  {
    category: "Reflexão",
    title: "Minimalismo funcional",
    description: "Por que menos é mais quando se trata de design de interfaces modernas.",
    date: "1 Mar 2024",
    readTime: "6 min",
    href: "/posts/minimalismo-funcional",
  },
  {
    category: "Desenvolvimento",
    title: "TypeScript avançado para React",
    description: "Padrões e técnicas para escrever código type-safe e escalável.",
    date: "25 Fev 2024",
    readTime: "10 min",
    href: "/posts/typescript-avancado",
  },
  {
    category: "Design",
    title: "Sistemas de design que escalam",
    description: "Como construir e manter design systems para produtos em crescimento.",
    date: "20 Fev 2024",
    readTime: "7 min",
    href: "/posts/design-systems",
  },
]

export function FeaturedPosts() {
  return (
    <section className="border-t border-border/40 bg-secondary/20 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Artigos Recentes</h2>
          <p className="mt-4 text-lg text-muted-foreground">Explorando ideias sobre design, código e produto.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.href} href={post.href} className="group">
              <div className="h-full rounded border border-border/40 bg-card/50 p-6 transition-all hover:border-accent/50 hover:bg-card">
                <div className="flex h-full flex-col">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-accent">{post.category}</span>
                  </div>

                  <h3 className="mb-3 text-balance text-xl font-semibold leading-tight group-hover:text-accent">
                    {post.title}
                  </h3>

                  <p className="mb-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
