import { demoEventos, demoInvitados, demoSummary } from './demo-data';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

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
  if (DEMO_MODE) {
    return demoApi<T>(path, init);
  }

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
  if (DEMO_MODE) {
    throw new Error('El panel admin no esta disponible en el demo de GitHub Pages.');
  }

  return api<{ accessToken: string; refreshToken: string }>(path, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

async function demoApi<T>(path: string, init?: RequestInit): Promise<T> {
  const method = init?.method?.toUpperCase() ?? 'GET';

  if (method === 'GET' && path === '/public/home-summary') {
    return demoSummary as T;
  }

  if (method === 'GET' && path === '/public/invitados') {
    return demoInvitados as T;
  }

  if (method === 'GET' && (path === '/public/eventos' || path === '/public/calendario')) {
    return demoEventos as T;
  }

  if (method === 'POST' && path === '/public/registro') {
    return { ok: true, message: 'Registro demo enviado' } as T;
  }

  throw new Error('Este endpoint no esta disponible en el demo estatico de GitHub Pages.');
}
