"use client";

import { useEffect, useState } from 'react';
import { apiGetMe } from '../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PageShell from '../../components/dashboard/PageShell';

export default function ProfilePage() {
  const router = useRouter();
  const [me, setMe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login');
      return;
    }
    
    apiGetMe(token)
      .then((data) => {
        setMe(data);
        setEditForm({
          name: data.name || '',
          email: data.email || ''
        });
      })
      .catch(() => {
        setError('Sessão inválida. Faça login novamente.');
        localStorage.removeItem('token');
        router.replace('/login');
      });
  }, [router]);

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${api}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setMe(updatedUser);
        setIsEditing(false);
        setError(null);
      } else {
        setError('Erro ao atualizar perfil');
      }
    } catch (err) {
      setError('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!me) {
    return (
      <PageShell 
        title="Meu Perfil" 
        subtitle="Gerencie suas informações pessoais"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Meu Perfil" }
        ]}
      >
        <div className="flex items-center justify-center p-12">
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell 
      title="Meu Perfil" 
      subtitle="Gerencie suas informações pessoais"
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Meu Perfil" }
      ]}
    >
      <div className="space-y-6">

      {error && (
        <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/10 p-4">
          <p className="text-sm text-destructive-foreground">{error}</p>
        </div>
      )}

        <div className="rounded border border-border/40 bg-card/50 p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Informações Pessoais</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded border border-border/50 px-4 py-2 text-sm font-medium transition-all hover:text-blue-600 dark:hover:text-red-400 hover:border-blue-500 dark:hover:border-red-500 hover:-translate-y-0.5"
              >
                Editar
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="rounded bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditForm({
                      name: me.name || '',
                      email: me.email || ''
                    });
                    setError(null);
                  }}
                  className="rounded border border-border/50 px-4 py-2 text-sm transition-colors hover:border-accent/50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <span className="block text-sm text-muted-foreground mb-1">Nome</span>
                  <p className="text-lg">{me.name || 'Não informado'}</p>
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground mb-1">Email</span>
                  <p className="text-lg">{me.email}</p>
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground mb-1">Função</span>
                  <p className="text-lg capitalize">{me.role?.toLowerCase() || 'User'}</p>
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground mb-1">Membro desde</span>
                  <p className="text-lg">
                    {new Date(me.createdAt).toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="border-t border-border/40 pt-6">
                <span className="block text-sm text-muted-foreground mb-1">ID do usuário</span>
                <p className="font-mono text-sm text-muted-foreground">{me.id}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 rounded border border-border/40 bg-card/50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Ações da Conta</h3>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              → Ir para Dashboard
            </Link>
            <div>
              <button
                onClick={() => {
                  if (confirm('Tem certeza que deseja sair?')) {
                    localStorage.removeItem('token');
                    router.push('/');
                  }
                }}
                className="text-sm text-destructive hover:underline"
              >
                Sair da conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
