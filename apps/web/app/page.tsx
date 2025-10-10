"use client";

import { useState } from 'react';
import { apiLogin } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('secret123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { accessToken } = await apiLogin({ email, password });
      localStorage.setItem('token', accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-6">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Senha</label>
          <input
            className="w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          className="w-full rounded bg-blue-600 hover:bg-blue-500 px-3 py-2 font-medium disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
