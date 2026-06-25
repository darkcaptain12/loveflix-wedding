'use client';

import { useState, useEffect, useCallback } from 'react';

const ADMIN_PASS = 'emir2026';

interface RsvpEntry {
  name: string;
  count: number;
  side: string;
  timestamp: string;
}

interface RsvpData {
  total: number;
  count: number;
  entries: RsvpEntry[];
}

const SIDE_LABELS: Record<string, string> = {
  bride: 'Gelin Tarafı',
  groom: 'Damat Tarafı',
  family: 'Aile',
  friends: 'Dostlar',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<RsvpData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rsvp');
      const json = await res.json();
      setData(json);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

  const handleLogin = () => {
    if (password === ADMIN_PASS) {
      setAuthed(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a0a0a' }}>
        <div className="w-full max-w-xs">
          <h1 className="font-heading text-accent text-2xl tracking-wider text-center mb-6">LOVEFLIX ADMIN</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Şifre"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/50 mb-3"
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg bg-accent text-white font-bold text-sm"
          >
            Giriş
          </button>
        </div>
      </div>
    );
  }

  const sideCounts = data?.entries.reduce((acc, e) => {
    acc[e.side] = (acc[e.side] || 0) + e.count;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: '#0a0a0a', color: '#fff' }}>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-heading text-accent text-xl tracking-wider">LOVEFLIX ADMIN</h1>
          <button onClick={fetchData} className="text-xs text-dim border border-white/10 px-3 py-1 rounded">
            {loading ? '...' : 'Yenile'}
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl p-4" style={{ background: '#1a1a1a' }}>
            <p className="text-[0.6rem] text-muted uppercase tracking-wider mb-1">Toplam Kişi</p>
            <p className="font-heading text-4xl text-accent">{data?.total || 0}</p>
          </div>
          <div className="rounded-xl p-4" style={{ background: '#1a1a1a' }}>
            <p className="text-[0.6rem] text-muted uppercase tracking-wider mb-1">Kayıt Sayısı</p>
            <p className="font-heading text-4xl text-white">{data?.count || 0}</p>
          </div>
        </div>

        {/* Side breakdown */}
        <div className="rounded-xl p-4 mb-6" style={{ background: '#1a1a1a' }}>
          <p className="text-[0.7rem] text-muted uppercase tracking-wider mb-3">Taraflara Göre</p>
          <div className="space-y-2">
            {Object.entries(sideCounts).map(([side, count]) => (
              <div key={side} className="flex items-center justify-between">
                <span className="text-sm text-dim">{SIDE_LABELS[side] || side}</span>
                <span className="font-heading text-lg text-accent">{count}</span>
              </div>
            ))}
            {Object.keys(sideCounts).length === 0 && (
              <p className="text-sm text-muted">Henüz kayıt yok</p>
            )}
          </div>
        </div>

        {/* Entries list */}
        <div className="rounded-xl overflow-hidden" style={{ background: '#1a1a1a' }}>
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-[0.7rem] text-muted uppercase tracking-wider">Tüm Kayıtlar</p>
          </div>
          {data?.entries.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted text-center">Henüz katılım onayı yok</p>
          )}
          {data?.entries.map((entry, i) => (
            <div key={i} className="px-4 py-3 border-b border-white/5 last:border-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white font-medium">{entry.name}</span>
                <span className="text-accent font-heading text-lg">{entry.count} kişi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] text-muted">{SIDE_LABELS[entry.side] || entry.side}</span>
                <span className="text-[0.6rem] text-muted">
                  {new Date(entry.timestamp).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
