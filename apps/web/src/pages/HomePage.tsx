import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Evento, Invitado } from '../types';

type Categoria = { id_categoria: number; cat_evento: string; icono: string };

type Summary = {
  totalEventos: number;
  totalInvitados: number;
  totalRegistros: number;
};

function byCategory(eventos: Evento[], cat: string) {
  return eventos.filter((e) => e.cat_evento.toLowerCase() === cat.toLowerCase()).slice(0, 2);
}

function getInvitadoImage(name: string) {
  return `/legacy/img/invitados/${name}`;
}

export function HomePage() {
  const { data: categorias = [] } = useQuery({
    queryKey: ['admin-categorias-public'],
    queryFn: () => api<Categoria[]>('/admin/categorias')
  });

  const { data: eventos = [] } = useQuery({
    queryKey: ['eventos-home'],
    queryFn: () => api<Evento[]>('/public/eventos')
  });

  const { data: invitados = [] } = useQuery({
    queryKey: ['invitados-home'],
    queryFn: () => api<Invitado[]>('/public/invitados')
  });

  const { data: resumen } = useQuery({
    queryKey: ['home-summary'],
    queryFn: () => api<Summary>('/public/home-summary')
  });

  const talleres = useMemo(() => byCategory(eventos, 'talleres'), [eventos]);
  const conferencias = useMemo(() => byCategory(eventos, 'conferencias'), [eventos]);
  const seminarios = useMemo(() => byCategory(eventos, 'seminario'), [eventos]);

  return (
    <>
      <section className="seccion contenedor">
        <h2>La mejor conferencia de diseño web en español</h2>
        <p>
          Aprende, comparte y conecta con la comunidad de desarrollo web en una experiencia
          idéntica al sitio clásico, ahora sobre React + TypeScript.
        </p>

        <section className="programa">
          <div className="contenedor-video">
            <video autoPlay loop muted poster="/legacy/img/bg-talleres.jpg">
              <source src="/legacy/video/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="contenido-programa">
            <div className="contenedor">
              <div className="programa-evento">
                <h2>programa del evento</h2>
                <nav className="menu-programa">
                  {categorias.map((cat) => (
                    <a key={cat.id_categoria} href={`#${cat.cat_evento.toLowerCase()}`}>
                      <i className={`fa ${cat.icono}`}></i>
                      {cat.cat_evento}
                    </a>
                  ))}
                </nav>

                <div id="talleres" className="info-curso clearfix">
                  <div className="programa-grid">
                    {talleres.map((evento) => (
                      <div className="detalle-evento" key={evento.evento_id}>
                        <h3>{evento.nombre_evento}</h3>
                        <p><i className="fa fa-clock" aria-hidden="true"></i>{evento.hora_evento}</p>
                        <p><i className="fa fa-calendar" aria-hidden="true"></i>{evento.fecha_evento}</p>
                        <p><i className="fa fa-user" aria-hidden="true"></i>{evento.nombre_invitado} {evento.apellido_invitado}</p>
                      </div>
                    ))}
                  </div>
                  <a href="/calendario" className="button float-right">Ver todos</a>
                </div>

                <div id="conferencias" className="info-curso clearfix" style={{ marginTop: '16px' }}>
                  <div className="programa-grid">
                    {conferencias.map((evento) => (
                      <div className="detalle-evento" key={evento.evento_id}>
                        <h3>{evento.nombre_evento}</h3>
                        <p><i className="fa fa-clock" aria-hidden="true"></i>{evento.hora_evento}</p>
                        <p><i className="fa fa-calendar" aria-hidden="true"></i>{evento.fecha_evento}</p>
                        <p><i className="fa fa-user" aria-hidden="true"></i>{evento.nombre_invitado} {evento.apellido_invitado}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="seminario" className="info-curso clearfix" style={{ marginTop: '16px' }}>
                  <div className="programa-grid">
                    {seminarios.map((evento) => (
                      <div className="detalle-evento" key={evento.evento_id}>
                        <h3>{evento.nombre_evento}</h3>
                        <p><i className="fa fa-clock" aria-hidden="true"></i>{evento.hora_evento}</p>
                        <p><i className="fa fa-calendar" aria-hidden="true"></i>{evento.fecha_evento}</p>
                        <p><i className="fa fa-user" aria-hidden="true"></i>{evento.nombre_invitado} {evento.apellido_invitado}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="invitados contenedor seccion">
        <h2>Nuestros invitados</h2>
        <ul className="lista-invitados lista-invitados-react clearfix">
          {invitados.slice(0, 6).map((inv) => (
            <li key={inv.invitado_id}>
              <div className="invitado">
                <a className="invitado-info" href="/invitados">
                  <img src={getInvitadoImage(inv.url_imagen)} alt={inv.nombre_invitado} />
                  <p>{inv.nombre_invitado} {inv.apellido_invitado}</p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="contador parallax">
        <div className="contenedor">
          <ul className="resumen-evento clearfix">
            <li><p className="numero">{resumen?.totalInvitados ?? 0}</p> Invitados</li>
            <li><p className="numero">{resumen?.totalEventos ?? 0}</p> Talleres</li>
            <li><p className="numero">3</p> Dias</li>
            <li><p className="numero">{resumen?.totalEventos ?? 0}</p> Conferencias</li>
          </ul>
        </div>
      </div>

      <section className="precios seccion">
        <h2>precios</h2>
        <div className="contenedor">
          <ul className="lista-precios clearfix">
            <li>
              <div className="tabla-precio">
                <h3>pase por dia</h3>
                <p className="numero">$30</p>
                <ul>
                  <li>Bocadillos gratis</li>
                  <li>todas las conferencias</li>
                  <li>Todos los talleres</li>
                </ul>
                <a href="/registro" className="button hollow">Comprar</a>
              </div>
            </li>
            <li>
              <div className="tabla-precio">
                <h3>Todos los dias</h3>
                <p className="numero">$50</p>
                <ul>
                  <li>Bocadillos gratis</li>
                  <li>todas las conferencias</li>
                  <li>Todos los talleres</li>
                </ul>
                <a href="/registro" className="button">Comprar</a>
              </div>
            </li>
            <li>
              <div className="tabla-precio">
                <h3>Pase por 2 dias</h3>
                <p className="numero">$45</p>
                <ul>
                  <li>Bocadillos gratis</li>
                  <li>todas las conferencias</li>
                  <li>Todos los talleres</li>
                </ul>
                <a href="/registro" className="button hollow">Comprar</a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div id="mapa" className="mapa"></div>
    </>
  );
}
