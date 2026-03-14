import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

interface Summary {
  totalEventos: number;
  totalInvitados: number;
  totalRegistros: number;
}

export function HomePage() {
  const { data } = useQuery({
    queryKey: ['home-summary'],
    queryFn: () => api<Summary>('/public/home-summary')
  });

  return (
    <>
      <section className="hero">
        <div>
          <h1>GDL WebCamp</h1>
          <p>Misma energia visual, estructura moderna con Grid y Flexbox.</p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Resumen del Evento</h2>
        <div className="cards-grid">
          <article className="card">
            <h3>Eventos</h3>
            <p>{data?.totalEventos ?? 0}</p>
          </article>
          <article className="card">
            <h3>Invitados</h3>
            <p>{data?.totalInvitados ?? 0}</p>
          </article>
          <article className="card">
            <h3>Registros</h3>
            <p>{data?.totalRegistros ?? 0}</p>
          </article>
        </div>
      </section>
    </>
  );
}
