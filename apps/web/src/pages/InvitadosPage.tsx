import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Invitado } from '../types';

export function InvitadosPage() {
  const { data = [] } = useQuery({
    queryKey: ['invitados'],
    queryFn: () => api<Invitado[]>('/public/invitados')
  });

  return (
    <section className="section">
      <h2 className="section-title">Invitados</h2>
      <div className="cards-grid">
        {data.map((inv) => (
          <article className="card" key={inv.invitado_id}>
            <h3>{inv.nombre_invitado} {inv.apellido_invitado}</h3>
            <p>{inv.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
