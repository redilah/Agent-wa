// api/client.js — Semua HTTP call ke FastAPI backend

const BASE_URL = '/api'; // Diproxy Vite ke http://localhost:8000

export async function getSettings() {
  const res = await fetch(`${BASE_URL}/settings`);
  if (!res.ok) throw new Error('Gagal memuat settings');
  return res.json();
}

export async function updateSettings(payload) {
  const res = await fetch(`${BASE_URL}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Gagal menyimpan settings');
  return res.json();
}

export async function simulateChat(message) {
  const res = await fetch(`${BASE_URL}/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Gagal mengirim pesan');
  }
  return res.json();
}
