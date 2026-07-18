const API_ORIGIN = import.meta.env.VITE_API_URL || '';
const BASE_URL = `${API_ORIGIN}/api`;

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

export async function registerSession() {
  const res = await fetch(`${BASE_URL}/sessions/register`, { method: 'POST' });
  if (!res.ok) throw new Error('Gagal meregister session');
  return res.json();
}

export async function getSessions() {
  const res = await fetch(`${BASE_URL}/sessions`);
  if (!res.ok) throw new Error('Gagal memuat sessions');
  return res.json();
}

export async function revokeSession(sessionId) {
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal menghapus session');
  return res.json();
}

