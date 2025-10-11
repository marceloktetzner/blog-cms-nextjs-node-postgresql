"use client";

import { useState } from "react";
import { apiLogin } from "../../lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("secret123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { accessToken } = await apiLogin({ email, password });
      localStorage.setItem("token", accessToken);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-[420px] rounded border border-border/50 bg-card/50 shadow-xl">
        <div className="space-y-1 border-b border-border/40 p-6">
          <h1 className="text-3xl font-bold text-center">Bem-vindo</h1>
          <p className="text-center text-sm text-muted-foreground">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm">Senha</label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
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
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive-foreground">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-primary px-3 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center gap-2 border-t border-border/40 p-6 text-sm text-muted-foreground">
          <div>
            Não tem conta? {" "}
            <Link href="/register" className="text-foreground hover:underline font-medium">
              Criar conta
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
