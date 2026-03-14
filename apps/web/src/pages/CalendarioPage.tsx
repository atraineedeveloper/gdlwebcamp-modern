import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Evento } from '../types';

export function CalendarioPage() {
  const { data = [] } = useQuery({
    queryKey: ['calendario'],
    queryFn: () => api<Evento[]>('/public/calendario')
  });

  return (
    <section className="section">
      <h2 className="section-title">Calendario</h2>
      <div className="agenda-grid">
        {data.map((evento) => (
          <article className="card" key={evento.evento_id}>
            <h3>{evento.nombre_evento}</h3>
            <p>{evento.fecha_evento} {evento.hora_evento}</p>
            <p>{evento.cat_evento}</p>
            <p>{evento.nombre_invitado} {evento.apellido_invitado}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
