"use client";

import Link from "next/link";

export interface Post {
  id: string;
  title: string;
  excerpt?: string;
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
}

interface PostTableProps {
  posts: Post[];
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
  canDelete?: boolean;
}

export default function PostTable({ posts, page, pageSize, onPageChange, onDelete, deletingId, canDelete = true }: PostTableProps) {
  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const start = (clampedPage - 1) * pageSize;
  const slice = posts.slice(start, start + pageSize);

  return (
    <div className="rounded border border-border/40 bg-card/50">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b border-border/40">
            <tr>
              <th className="px-4 py-3 w-[40%]">Título</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhum post encontrado.
                </td>
              </tr>
            ) : (
              slice.map((post) => (
                <tr key={post.id} className="border-t border-border/40">
                  <td className="px-4 py-3">
                    <div className="font-medium">{post.title}</div>
                    {post.excerpt && <div className="text-xs text-muted-foreground mt-1 line-clamp-1">{post.excerpt}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        post.status === "published"
                          ? "bg-green-400/10 text-green-300"
                          : "bg-yellow-400/10 text-yellow-300"
                      }`}
                    >
                      {post.status === "published" ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {post.publishedAt
                      ? `Publicado em ${new Date(post.publishedAt).toLocaleDateString("pt-BR")}`
                      : `Criado em ${new Date(post.createdAt).toLocaleDateString("pt-BR")}`}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {/* Se houver rota por slug, ajuste o href */}
                      <Link
                        href={"/posts/" + post.id}
                        className="rounded border border-border/50 px-2 py-1 text-xs hover:bg-foreground/5"
                      >
                        Ver
                      </Link>
                      {canDelete ? (
                        <button
                          onClick={() => onDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="rounded border border-destructive/50 px-2 py-1 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={deletingId === post.id ? 'Excluindo...' : 'Excluir'}
                        >
                          {deletingId === post.id ? 'Excluindo...' : 'Excluir'}
                        </button>
                      ) : (
                        <button
                          disabled
                          title="Apenas ADMIN pode excluir"
                          className="rounded border border-border/50 px-2 py-1 text-xs text-muted-foreground opacity-60 cursor-not-allowed"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 text-xs text-muted-foreground">
        <div>
          {total === 0 ? "0 resultados" : `${start + 1}-${Math.min(total, start + pageSize)} de ${total}`}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, clampedPage - 1))}
            disabled={clampedPage === 1}
            className="rounded border border-border/50 px-2 py-1 disabled:opacity-50 hover:bg-foreground/5"
          >
            Anterior
          </button>
          <div>
            Página {clampedPage} de {totalPages}
          </div>
          <button
            onClick={() => onPageChange(Math.min(totalPages, clampedPage + 1))}
            disabled={clampedPage === totalPages}
            className="rounded border border-border/50 px-2 py-1 disabled:opacity-50 hover:bg-foreground/5"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
