import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Invitado } from '../types';

function getInvitadoImage(name: string) {
  return `/legacy/img/invitados/${name}`;
}

export function InvitadosPage() {
  const { data = [] } = useQuery({
    queryKey: ['invitados'],
    queryFn: () => api<Invitado[]>('/public/invitados')
  });

  return (
    <section className="seccion contenedor">
      <div className="calendario">
        <section className="invitados contenedor seccion">
          <h2>Nuestros invitados</h2>
          <ul className="lista-invitados lista-invitados-react clearfix">
            {data.map((inv) => (
              <li key={inv.invitado_id}>
                <div className="invitado">
                  <a className="invitado-info" href="#">
                    <img src={getInvitadoImage(inv.url_imagen)} alt={inv.nombre_invitado} />
                    <p>{inv.nombre_invitado} {inv.apellido_invitado}</p>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
