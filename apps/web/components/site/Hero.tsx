import { TechCarousel } from "./TechCarousel";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-balance max-w-[22ch] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-r from-blue-600 to-blue-400 dark:from-red-500 dark:to-red-300 bg-clip-text text-transparent">
          Blog + CMS full‑stack com Next.js, Node e PostgreSQL
        </h1>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Aplicação full‑stack com blog público e painel de gestão (CMS). Front‑end em Next.js (App Router, Server Components, Tailwind). API em Node/Express com autenticação JWT e papéis (RBAC). Persistência em PostgreSQL via Prisma (migrations e schema tipado).
          Comunicação: Web → API por HTTP (fetch/REST, cache control) e API → PostgreSQL via Prisma/SQL. Tema Light/Dark global com persistência no navegador.
        </p>

        <div className="mt-12 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Autenticação JWT e papéis (ADMIN/EDITOR/USER)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Dashboard com busca, filtro e paginação</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>UI acessível, responsiva e alto contraste</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Tema Light/Dark com persistência e anti‑FOUC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Validação de dados com Zod</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Prisma Migrate, seed e schema tipado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>REST com cache-control e revalidação</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span>Arquitetura pensada para escalabilidade</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={process.env.NEXT_PUBLIC_REPO_URL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded border border-border/50 px-4 py-2 text-sm transition-all hover:text-blue-600 dark:hover:text-red-400 hover:border-blue-500 dark:hover:border-red-500 hover:-translate-y-0.5"
          >
            Ver código no GitHub
          </a>
        </div>

        <TechCarousel />
      </div>
    </section>
  );
}
