"use client";

import { useEffect, useState } from 'react';
import { apiGetMe } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/');
      return;
    }
    apiGetMe(token)
      .then((data) => setMe(data))
      .catch(() => {
        setError('Sessão inválida. Faça login novamente.');
        localStorage.removeItem('token');
        router.replace('/');
      });
  }, [router]);

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button
          className="rounded bg-gray-700 hover:bg-gray-600 px-3 py-2"
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/');
          }}
        >
          Sair
        </button>
      </div>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {me ? (
        <div className="rounded border border-gray-700 bg-gray-900 p-4">
          <p><span className="text-gray-400">ID:</span> {me.id}</p>
          <p><span className="text-gray-400">Email:</span> {me.email}</p>
          <p><span className="text-gray-400">Nome:</span> {me.name ?? '-'} </p>
          <p><span className="text-gray-400">Criado em:</span> {new Date(me.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
