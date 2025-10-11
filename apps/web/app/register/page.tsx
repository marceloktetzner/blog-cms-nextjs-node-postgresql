"use client";

import { useState } from 'react';
import { apiRegister } from '../../lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('secret123');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await apiRegister({ name, email, password, role });
      setSuccess('Conta criada com sucesso. Faça login.');
      setTimeout(() => router.push('/login'), 800);
    } catch (err: any) {
      setError(err?.message || 'Falha no registro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-[420px] rounded border border-border/50 bg-card/50 shadow-xl">
        <div className="space-y-1 border-b border-border/40 p-6">
          <h1 className="text-3xl font-bold text-center">Criar conta</h1>
          <p className="text-center text-sm text-muted-foreground">
            Preencha os dados abaixo para começar
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm">Nome</label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">Email</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm">Tipo de conta (para teste)</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="USER">Usuário</option>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Administrador</option>
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
              disabled={loading}
              className="w-full rounded bg-primary px-3 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar conta"}
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center gap-2 border-t border-border/40 p-6 text-sm text-muted-foreground">
          <div>
            Já tem conta? {" "}
            <Link href="/login" className="text-foreground hover:underline font-medium">
              Fazer login
            </Link>
          </div>
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  );
}
