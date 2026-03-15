import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Evento, Invitado } from '../types';

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

const testimonials = [
  {
    quote:
      'Una experiencia intensiva, práctica y muy bien organizada para quienes quieren crecer en diseño y desarrollo web.',
    name: 'Oswaldo Aponte Escobedo',
    role: 'Disenador en @prisma'
  },
  {
    quote:
      'Las charlas y talleres tienen un gran ritmo. Sales con ideas aplicables y una red de contactos mucho más fuerte.',
    name: 'Mariana Torres',
    role: 'Frontend Engineer'
  },
  {
    quote:
      'El ambiente del evento, la agenda y la curaduría de invitados hacen que realmente valga la pena asistir.',
    name: 'Carlos Mendez',
    role: 'UX Lead'
  }
];

export function HomePage() {
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
  const [activeCategory, setActiveCategory] = useState<'talleres' | 'conferencias' | 'seminarios'>('talleres');

  return (
    <>
      <section className="seccion contenedor home-intro">
        <h2>La mejor conferencia de diseño web en español</h2>
        <p className="home-intro-copy">
          Aprende, comparte y conecta con la comunidad de desarrollo web en una experiencia
          idéntica al sitio clásico, ahora sobre React + TypeScript.
        </p>
      </section>

      <section className="programa">
          <div className="contenedor-video">
            <video autoPlay loop muted poster="/legacy/img/bg-talleres.jpg">
              <source src="/legacy/video/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="contenido-programa">
            <div className="contenedor">
              <div className="programa-evento">
                <div className="programa-header">
                  <p className="programa-kicker">Agenda destacada</p>
                  <h2>programa del evento</h2>
                  <p className="programa-copy">
                    Descubre una seleccion de talleres, conferencias y seminarios pensados para inspirar y llevar ideas a produccion.
                  </p>
                </div>
                <nav className="menu-programa">
                  <a
                    href="#talleres"
                    className={activeCategory === 'talleres' ? 'activo' : ''}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveCategory('talleres');
                    }}
                  >
                    <i className="fas fa-code"></i>Talleres
                  </a>
                  <a
                    href="#conferencias"
                    className={activeCategory === 'conferencias' ? 'activo' : ''}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveCategory('conferencias');
                    }}
                  >
                    <i className="far fa-comment"></i>Conferencias
                  </a>
                  <a
                    href="#seminarios"
                    className={activeCategory === 'seminarios' ? 'activo' : ''}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveCategory('seminarios');
                    }}
                  >
                    <i className="fas fa-university"></i>Seminarios
                  </a>
                </nav>

                <div
                  id="talleres"
                  className={`info-curso info-curso-react clearfix ${activeCategory !== 'talleres' ? 'hidden' : ''}`}
                >
                  <div className="programa-grid">
                    {talleres.map((evento) => (
                      <article className="detalle-evento" key={evento.evento_id}>
                        <p className="programa-badge">Taller</p>
                        <h3>{evento.nombre_evento}</h3>
                        <div className="programa-meta">
                          <p><i className="fa fa-clock" aria-hidden="true"></i>{evento.hora_evento}</p>
                          <p><i className="fa fa-calendar" aria-hidden="true"></i>{evento.fecha_evento}</p>
                        </div>
                        <p className="programa-speaker">
                          <i className="fa fa-user" aria-hidden="true"></i>
                          {evento.nombre_invitado} {evento.apellido_invitado}
                        </p>
                      </article>
                    ))}
                  </div>
                  <div className="programa-actions">
                    <a href="/calendario" className="button float-right">Ver todos</a>
                  </div>
                </div>

                <div
                  id="conferencias"
                  className={`info-curso info-curso-react clearfix ${activeCategory !== 'conferencias' ? 'hidden' : ''}`}
                >
                  <div className="programa-grid">
                    {conferencias.map((evento) => (
                      <article className="detalle-evento" key={evento.evento_id}>
                        <p className="programa-badge">Conferencia</p>
                        <h3>{evento.nombre_evento}</h3>
                        <div className="programa-meta">
                          <p><i className="fa fa-clock" aria-hidden="true"></i>{evento.hora_evento}</p>
                          <p><i className="fa fa-calendar" aria-hidden="true"></i>{evento.fecha_evento}</p>
                        </div>
                        <p className="programa-speaker">
                          <i className="fa fa-user" aria-hidden="true"></i>
                          {evento.nombre_invitado} {evento.apellido_invitado}
                        </p>
                      </article>
                    ))}
                  </div>
                  <div className="programa-actions">
                    <a href="/calendario" className="button float-right">Ver todos</a>
                  </div>
                </div>

                <div
                  id="seminarios"
                  className={`info-curso info-curso-react clearfix ${activeCategory !== 'seminarios' ? 'hidden' : ''}`}
                >
                  <div className="programa-grid">
                    {seminarios.map((evento) => (
                      <article className="detalle-evento" key={evento.evento_id}>
                        <p className="programa-badge">Seminario</p>
                        <h3>{evento.nombre_evento}</h3>
                        <div className="programa-meta">
                          <p><i className="fa fa-clock" aria-hidden="true"></i>{evento.hora_evento}</p>
                          <p><i className="fa fa-calendar" aria-hidden="true"></i>{evento.fecha_evento}</p>
                        </div>
                        <p className="programa-speaker">
                          <i className="fa fa-user" aria-hidden="true"></i>
                          {evento.nombre_invitado} {evento.apellido_invitado}
                        </p>
                      </article>
                    ))}
                  </div>
                  <div className="programa-actions">
                    <a href="/calendario" className="button float-right">Ver todos</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="invitados contenedor seccion home-invitados">
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

      <div className="contador parallax home-contador">
        <div className="contenedor">
          <ul className="resumen-evento clearfix">
            <li><p className="numero">{resumen?.totalInvitados ?? 0}</p> Invitados</li>
            <li><p className="numero">{resumen?.totalEventos ?? 0}</p> Talleres</li>
            <li><p className="numero">3</p> Dias</li>
            <li><p className="numero">{resumen?.totalEventos ?? 0}</p> Conferencias</li>
          </ul>
        </div>
      </div>

      <section className="precios seccion home-precios">
        <h2>precios</h2>
        <div className="contenedor">
          <ul className="lista-precios clearfix">
            <li>
              <div className="tabla-precio home-price-card">
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
              <div className="tabla-precio home-price-card featured">
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
              <div className="tabla-precio home-price-card">
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

      <section className="seccion home-testimoniales">
        <h2>Testimoniales</h2>
        <div className="testimoniales contenedor">
          {testimonials.map((item) => (
            <div className="testimonial" key={item.name}>
              <blockquote>
                <p>{item.quote}</p>
                <footer className="info-testimonial">
                  <img src="/legacy/img/testimonial.jpg" alt={item.name} />
                  <cite>
                    {item.name}
                    <span>{item.role}</span>
                  </cite>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      <div className="newsletter parallax home-newsletter">
        <div className="contenido contenedor">
          <p>Registrate al newsletter:</p>
          <h3>gdlwebcamp</h3>
          <a href="/registro" className="button transparente">Registro</a>
        </div>
      </div>

      <section className="seccion home-countdown">
        <h2>Faltan</h2>
        <div className="cuenta-regresiva contenedor">
          <ul className="clearfix">
            <li><p className="numero">80</p>Dias</li>
            <li><p className="numero">15</p>Horas</li>
            <li><p className="numero">5</p>Minutos</li>
            <li><p className="numero">30</p>Segundos</li>
          </ul>
        </div>
      </section>
    </>
  );
}
