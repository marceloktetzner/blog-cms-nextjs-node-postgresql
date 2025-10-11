"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../components/dashboard/Sidebar';
import Header from '../../components/dashboard/Header';
import PostTable, { Post } from '../../components/dashboard/PostTable';

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'ADMIN' | 'EDITOR' | 'USER' | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Filtros/Busca/Paginação
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const tab = searchParams.get('tab');
    // Mantém compatibilidade com link "Meus Posts" da sidebar
    if (tab === 'posts') {
      // nada a fazer além de garantir layout padrão (posts)
    }
  }, [searchParams]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }
    // Carrega posts e papel do usuário em paralelo
    loadPosts(token);
    loadMe(token);
  }, [router]);

  const loadPosts = async (token: string) => {
    try {
      setLoading(true);
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${api}/posts?page=1&pageSize=200`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data.items || []);
      } else if (res.status === 401) {
        setError('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        router.replace('/login');
      }
    } catch (err) {
      setError('Erro ao carregar posts. Verifique a API.');
    } finally {
      setLoading(false);
    }
  };

  const loadMe = async (token: string) => {
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${api}/me`, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
      if (res.ok) {
        const me = await res.json();
        if (me?.role) setUserRole(me.role);
      }
    } catch {}
  };

  const deletePost = async (postId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Sessão expirada. Faça login novamente.');
      router.replace('/login');
      return;
    }

    const confirmed = typeof window !== 'undefined' ? window.confirm('Excluir este post? Esta ação não pode ser desfeita.') : true;
    if (!confirmed) return;

    setError(null);
    setSuccess(null);
    setDeletingId(postId);

    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        setSuccess('Post excluído com sucesso.');
        await loadPosts(token);
      } else if (res.status === 401) {
        setError('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        router.replace('/login');
      } else if (res.status === 403) {
        const roleMsg = userRole ? ` Seu papel atual: ${userRole}.` : '';
        setError(`Você não tem permissão para excluir posts. Apenas ADMIN pode excluir.${roleMsg}`);
      } else if (res.status === 404) {
        setError('Post não encontrado (pode ter sido removido).');
      } else {
        let message = 'Falha ao excluir o post.';
        try {
          const data = await res.json();
          message = data?.error || data?.message || message;
        } catch {}
        setError(message);
      }
    } catch (err) {
      setError('Erro de conexão ao excluir o post.');
    } finally {
      setDeletingId(null);
    }
  };

  // Derivados: contagens e filtro
  const counts = useMemo(() => {
    const published = posts.filter(p => p.status === 'published').length;
    const draft = posts.filter(p => p.status === 'draft').length;
    return { total: posts.length, published, draft };
  }, [posts]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return posts.filter(p => {
      const matchTitle = !s || p.title.toLowerCase().includes(s);
      const matchStatus = status === 'all' || p.status === status;
      return matchTitle && matchStatus;
    });
  }, [posts, search, status]);

  // Reset página ao mudar filtros
  useEffect(() => { setPage(1); }, [search, status]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="md:pl-64 pl-0">
        <Header
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus as any}
          counts={counts}
          onOpenMenu={() => setMenuOpen(true)}
        />

        <main className="p-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
              <p className="text-sm text-destructive-foreground">{error}</p>
            </div>
          )}
          {userRole && userRole !== 'ADMIN' && (
            <div className="rounded-lg border border-border/40 bg-card/50 p-4">
              <p className="text-sm text-muted-foreground">
                Você está logado como <span className="font-medium">{userRole}</span>. Apenas usuários com papel <span className="font-medium">ADMIN</span> podem excluir posts.
              </p>
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-green-400/20 bg-green-400/10 p-4">
              <p className="text-sm text-green-300">{success}</p>
            </div>
          )}

          {loading ? (
            <div className="rounded border border-border/40 bg-card/50 p-6">Carregando...</div>
          ) : (
            <PostTable
              posts={filtered}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onDelete={deletePost}
              deletingId={deletingId}
              canDelete={userRole === 'ADMIN'}
            />
          )}
        </main>
      </div>
    </div>
  );
}
