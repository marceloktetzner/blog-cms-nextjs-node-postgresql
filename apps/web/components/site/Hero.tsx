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
            <svg
              className="mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Ver código no GitHub
          </a>
        </div>

        <TechCarousel />
      </div>
    </section>
  );
}
