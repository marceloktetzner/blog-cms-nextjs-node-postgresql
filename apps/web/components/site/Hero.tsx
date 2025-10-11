import { TechCarousel } from "./TechCarousel";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Blog + CMS full‑stack com Next.js, Node e PostgreSQL
        </h1>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Projeto de portfólio que combina um blog público com um painel de gestão (CMS).
          Front‑end em Next.js, API em Node/Express e persistência em PostgreSQL via Prisma.
          O front se comunica com a API via HTTP (fetch) e a API com o banco via Prisma.
          O tema Light/Dark é global e persistido no navegador.
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
        </div>

        <TechCarousel />
      </div>
    </section>
  );
}
