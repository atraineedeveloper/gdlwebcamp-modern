import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Evento } from '../types';

function toSpanishDate(date: string) {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
}

export function CalendarioPage() {
  const { data = [] } = useQuery({
    queryKey: ['calendario'],
    queryFn: () => api<Evento[]>('/public/calendario')
  });

  const grouped = useMemo(() => {
    return data.reduce<Record<string, Evento[]>>((acc, evento) => {
      acc[evento.fecha_evento] = acc[evento.fecha_evento] ?? [];
      acc[evento.fecha_evento].push(evento);
      return acc;
    }, {});
  }, [data]);

  return (
    <section className="seccion contenedor">
      <h2>calendario de eventos</h2>
      <div className="calendario">
        {Object.entries(grouped).map(([dia, eventos]) => (
          <div key={dia}>
            <h3>
              <i className="fa fa-calendar"></i> {toSpanishDate(dia)}
            </h3>
            <div className="calendario-grid-react">
              {eventos.map((evento) => (
                <div className="dia" key={evento.evento_id}>
                  <p className="titulo">{evento.nombre_evento}</p>
                  <p className="hora">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    {evento.fecha_evento} {evento.hora_evento}
                  </p>
                  <p>
                    <i className="fa fa-tag" aria-hidden="true"></i>
                    {evento.cat_evento}
                  </p>
                  <p>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    {evento.nombre_invitado} {evento.apellido_invitado}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
