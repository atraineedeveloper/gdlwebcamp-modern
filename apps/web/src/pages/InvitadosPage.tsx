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
    <section className="seccion contenedor invitados-modern-page">
      <section className="invitados seccion invitados-page">
        <h2>Nuestros invitados</h2>
        <p className="invitados-page-intro">
          Referentes en diseno, frontend, producto y estrategia digital que comparten experiencia practica y vision de futuro.
        </p>
        <ul className="lista-invitados lista-invitados-react clearfix invitados-modern-grid">
          {data.map((inv) => (
            <li key={inv.invitado_id}>
              <article className="invitado invitado-modern-card">
                <a className="invitado-info invitado-modern-link" href="#">
                  <div className="invitado-media">
                    <img src={getInvitadoImage(inv.url_imagen)} alt={inv.nombre_invitado} />
                  </div>
                  <div className="invitado-copy">
                    <p className="invitado-nombre">{inv.nombre_invitado} {inv.apellido_invitado}</p>
                    <p className="invitado-descripcion">{inv.descripcion}</p>
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
