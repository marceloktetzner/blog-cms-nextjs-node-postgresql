"use client";

import Link from "next/link";
import ThemeToggle from "../theme/ThemeToggle";

interface HeaderProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: "all" | "draft" | "published";
  onStatusChange: (v: "all" | "draft" | "published") => void;
  counts: { total: number; published: number; draft: number };
  onOpenMenu?: () => void;
}

export default function Header({ search, onSearchChange, status, onStatusChange, counts, onOpenMenu }: HeaderProps) {
  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden rounded border border-border/50 px-2 py-1 text-sm"
            onClick={onOpenMenu}
            aria-label="Abrir menu"
          >
            ☰
          </button>
          <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/create-post"
            className="rounded bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Novo Post
          </Link>
        </div>
      </div>
      <div className="px-4 md:px-6 py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título..."
            className="w-full md:w-64 rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
          />
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as any)}
            className="rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="all">Todos</option>
            <option value="published">Publicados</option>
            <option value="draft">Rascunhos</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded border border-border/40 bg-card/50 px-3 py-2">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-lg font-semibold">{counts.total}</div>
          </div>
          <div className="rounded border border-border/40 bg-card/50 px-3 py-2">
            <div className="text-xs text-muted-foreground">Publicados</div>
            <div className="text-lg font-semibold">{counts.published}</div>
          </div>
          <div className="rounded border border-border/40 bg-card/50 px-3 py-2">
            <div className="text-xs text-muted-foreground">Rascunhos</div>
            <div className="text-lg font-semibold">{counts.draft}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
