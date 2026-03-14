import { FormEvent, useState } from 'react';
import { api } from '../lib/api';

export function RegistroPage() {
  const [message, setMessage] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    try {
      await api('/public/registro', {
        method: 'POST',
        body: JSON.stringify({
          nombre_registrado: form.get('nombre'),
          apellido_registrado: form.get('apellido'),
          email_registrado: form.get('email'),
          pases_articulos: { completo: Number(form.get('pase') || 0) },
          talleres_registrados: [],
          regalo: 1,
          total_pagado: Number(form.get('total') || 0),
          pagado: 0
        })
      });
      setMessage('Registro exitoso');
      e.currentTarget.reset();
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    }
  }

  return (
    <section className="section">
      <h2 className="section-title">Registro</h2>
      <form className="card" onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
        <input name="nombre" placeholder="Nombre" required />
        <input name="apellido" placeholder="Apellido" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="pase" type="number" min="0" placeholder="Pases" defaultValue={1} />
        <input name="total" type="number" min="0" step="0.01" placeholder="Total" defaultValue={50} />
        <button type="submit" style={{ background: 'var(--color-primary)', color: '#fff', border: 0, padding: '0.75rem', borderRadius: 8 }}>
          Enviar Registro
        </button>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
}
