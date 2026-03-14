const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenStore = {
  set(tokens: { accessToken: string; refreshToken: string }) {
    accessToken = tokens.accessToken;
    refreshToken = tokens.refreshToken;
    localStorage.setItem('gdl_tokens', JSON.stringify(tokens));
  },
  load() {
    const raw = localStorage.getItem('gdl_tokens');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      accessToken = parsed.accessToken;
      refreshToken = parsed.refreshToken;
    } catch {
      localStorage.removeItem('gdl_tokens');
    }
  },
  clear() {
    accessToken = null;
    refreshToken = null;
    localStorage.removeItem('gdl_tokens');
  },
  get access() {
    return accessToken;
  },
  get refresh() {
    return refreshToken;
  }
};

tokenStore.load();

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers || {});
  headers.set('Content-Type', 'application/json');
  if (tokenStore.access) headers.set('Authorization', `Bearer ${tokenStore.access}`);

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function apiAuth(path: string, body: unknown) {
  return api<{ accessToken: string; refreshToken: string }>(path, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}
