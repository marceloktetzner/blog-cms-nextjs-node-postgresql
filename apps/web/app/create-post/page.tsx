"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageShell from '../../components/dashboard/PageShell';

export default function CreatePostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    status: 'draft' as 'draft' | 'published'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }

    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const post = await res.json();
        setSuccess(`Post "${post.title}" criado com sucesso!`);
        setFormData({ title: '', excerpt: '', content: '', status: 'draft' });
        setTimeout(() => {
          router.push('/dashboard?tab=posts');
        }, 1500);
      } else {
        const errorData = await res.json();
        if (res.status === 403) {
          setError('Você precisa ter permissão de EDITOR ou ADMIN para criar posts.');
        } else {
          setError(errorData.error || 'Erro ao criar post');
        }
      }
    } catch (err) {
      setError('Erro de conexão. Verifique se a API está rodando.');
    }
  };

  return (
    <PageShell 
      title="Criar Post" 
      subtitle="Compartilhe suas ideias com o mundo" 
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard?tab=posts" },
        { label: "Criar Post" }
      ]}
      fullWidth
    >
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm">Título</label>
            <input
              id="title"
              type="text"
              placeholder="Digite o título do post"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm">Resumo</label>
            <input
              id="excerpt"
              type="text"
              placeholder="Breve descrição do post"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm">Conteúdo</label>
            <textarea
              id="content"
              placeholder="Escreva o conteúdo do seu post aqui..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={12}
              className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500 resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
              className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicar</option>
            </select>
          </div>
          
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive-foreground">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="p-3 rounded-lg border border-green-400/20 bg-green-400/10">
              <p className="text-sm text-green-300">{success}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading || !formData.title.trim() || !formData.content.trim()}
            className="rounded bg-primary px-3 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar Post"}
          </button>
        </form>
        <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
          <Link href="/dashboard" className="text-foreground hover:underline font-medium">Ver meus posts</Link>
          <Link href="/" className="hover:text-foreground transition-colors">← Voltar para Home</Link>
        </div>
      </div>
    </PageShell>
  );
}
