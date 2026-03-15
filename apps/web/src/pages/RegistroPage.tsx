import { FormEvent, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Evento } from '../types';

type Totals = {
  unDia: number;
  dosDias: number;
  completo: number;
  camisas: number;
  etiquetas: number;
};

function groupByDayAndCategory(eventos: Evento[]) {
  const dayFormatter = new Intl.DateTimeFormat('es-ES', { weekday: 'long' });
  return eventos.reduce<Record<string, Record<string, Evento[]>>>((acc, evento) => {
    const day = dayFormatter.format(new Date(evento.fecha_evento));
    acc[day] = acc[day] ?? {};
    acc[day][evento.cat_evento] = acc[day][evento.cat_evento] ?? [];
    acc[day][evento.cat_evento].push(evento);
    return acc;
  }, {});
}

export function RegistroPage() {
  const { data: eventos = [] } = useQuery({
    queryKey: ['eventos-registro'],
    queryFn: () => api<Evento[]>('/public/eventos')
  });

  const [totals, setTotals] = useState<Totals>({
    unDia: 0,
    dosDias: 0,
    completo: 1,
    camisas: 0,
    etiquetas: 0
  });
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [result, setResult] = useState('');

  const grouped = useMemo(() => groupByDayAndCategory(eventos), [eventos]);

  const total = useMemo(() => {
    return totals.unDia * 30 + totals.dosDias * 45 + totals.completo * 50 + totals.camisas * 10 * 0.93 + totals.etiquetas * 2;
  }, [totals]);

  const totalBoletos = totals.unDia + totals.dosDias + totals.completo;

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
          pases_articulos: {
            un_dia: totals.unDia,
            dos_dias: totals.dosDias,
            completo: totals.completo,
            camisas: totals.camisas,
            etiquetas: totals.etiquetas
          },
          talleres_registrados: seleccionados,
          regalo: Number(form.get('regalo') || 1),
          total_pagado: Number(total.toFixed(2)),
          pagado: 0
        })
      });
      setResult('Registro exitoso');
      e.currentTarget.reset();
      setSeleccionados([]);
    } catch (err) {
      setResult(`Error al registrar: ${String(err)}`);
    }
  }

  return (
    <section className="seccion contenedor registro-page">
      <h2>Registro de Usuarios</h2>
      <p className="registro-intro">
        Completa tus datos, elige tus accesos y arma tu agenda personal para el evento.
      </p>
      <div className="registro-highlights" aria-label="Resumen de seleccion">
        <article className="registro-highlight">
          <span className="registro-highlight-label">Boletos</span>
          <strong>{totalBoletos}</strong>
        </article>
        <article className="registro-highlight">
          <span className="registro-highlight-label">Sesiones</span>
          <strong>{seleccionados.length}</strong>
        </article>
        <article className="registro-highlight">
          <span className="registro-highlight-label">Total actual</span>
          <strong>$ {total.toFixed(2)}</strong>
        </article>
      </div>
      <form id="registro" className="registro registro-form" onSubmit={onSubmit}>
        <div id="datos_usuario" className="registro caja clearfix registro-user-grid">
          <div className="campo">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" name="nombre" id="nombre" placeholder="Tu Nombre" required />
          </div>
          <div className="campo">
            <label htmlFor="apellido">apellido:</label>
            <input type="text" name="apellido" id="apellido" placeholder="Tu apellido" required />
          </div>
          <div className="campo">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="Tu Email" required />
          </div>
        </div>

        <div id="paquetes" className="paquetes registro-section">
          <h3>Elije el numero de Boletos</h3>
          <p className="registro-section-copy">
            Selecciona el tipo de acceso que mejor se ajuste a tu visita.
          </p>
          <ul className="lista-precios clearfix registro-pricing-grid">
            <li>
              <div className={`tabla-precio registro-ticket-card ${totals.unDia > 0 ? 'is-active' : ''}`}>
                <h3>pase por dia (viernes)</h3>
                <p className="numero">$30</p>
                <p className="registro-ticket-copy">Ideal para una visita puntual con acceso a la agenda del dia.</p>
                <div className="orden">
                  <label>Boletos deseados:</label>
                  <input type="number" min="0" value={totals.unDia} onChange={(e) => setTotals((t) => ({ ...t, unDia: Number(e.target.value) }))} />
                </div>
              </div>
            </li>
            <li>
              <div className={`tabla-precio registro-ticket-card ${totals.completo > 0 ? 'is-active featured' : 'featured'}`}>
                <h3>Todos los dias</h3>
                <p className="numero">$50</p>
                <p className="registro-ticket-copy">La opcion mas completa para vivir talleres, charlas y seminarios.</p>
                <div className="orden">
                  <label>Boletos deseados:</label>
                  <input type="number" min="0" value={totals.completo} onChange={(e) => setTotals((t) => ({ ...t, completo: Number(e.target.value) }))} />
                </div>
              </div>
            </li>
            <li>
              <div className={`tabla-precio registro-ticket-card ${totals.dosDias > 0 ? 'is-active' : ''}`}>
                <h3>Pase por 2 dias</h3>
                <p className="numero">$45</p>
                <p className="registro-ticket-copy">Equilibrio perfecto para cubrir lo esencial del evento.</p>
                <div className="orden">
                  <label>Boletos deseados:</label>
                  <input type="number" min="0" value={totals.dosDias} onChange={(e) => setTotals((t) => ({ ...t, dosDias: Number(e.target.value) }))} />
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div id="eventos" className="eventos clearfix registro-section">
          <h3>Elige tus talleres</h3>
          <p className="registro-section-copy">
            Marca las sesiones que quieres apartar. Puedes combinar categorias por dia.
          </p>
          <div className="caja registro-event-picker">
            {Object.entries(grouped).map(([dia, categories]) => (
              <section className="contenido-dia clearfix registro-day" key={dia}>
                <h4>{dia}</h4>
                <div className="contenido-dia-react registro-day-grid">
                  {Object.entries(categories).map(([tipo, evs]) => (
                    <div className="registro-category" key={tipo}>
                      <p className="registro-category-title">{tipo}:</p>
                      {evs.map((evento) => (
                        <label
                          className={`registro-event-option ${seleccionados.includes(evento.evento_id) ? 'is-selected' : ''}`}
                          key={evento.evento_id}
                        >
                          <input
                            type="checkbox"
                            checked={seleccionados.includes(evento.evento_id)}
                            onChange={(e) => {
                              setSeleccionados((prev) =>
                                e.target.checked ? [...prev, evento.evento_id] : prev.filter((id) => id !== evento.evento_id)
                              );
                            }}
                          />
                          <span className="registro-event-copy">
                            <span className="registro-event-headline">
                              <time>{evento.hora_evento}</time>
                              <span>{evento.nombre_evento}</span>
                            </span>
                            <span className="autor">{evento.nombre_invitado} {evento.apellido_invitado}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="resumen registro-section">
          <h3>Pago y Extras</h3>
          <p className="registro-section-copy">
            Agrega complementos y revisa tu total antes de completar el registro.
          </p>
          <div className="caja clearfix registro-summary-grid">
            <div className="extras registro-extras">
              <div className="orden">
                <label>Camisa del evento $10</label>
                <input type="number" min="0" value={totals.camisas} onChange={(e) => setTotals((t) => ({ ...t, camisas: Number(e.target.value) }))} />
              </div>
              <div className="orden">
                <label>Paquete de 10 etiquetas $2</label>
                <input type="number" min="0" value={totals.etiquetas} onChange={(e) => setTotals((t) => ({ ...t, etiquetas: Number(e.target.value) }))} />
              </div>
              <div className="orden">
                <label htmlFor="regalo">Selecciona un Regalo</label><br />
                <select id="regalo" name="regalo" defaultValue="1" required>
                  <option value="2">Etiquetas</option>
                  <option value="1">Pulsera</option>
                  <option value="3">Plumas</option>
                </select>
              </div>
            </div>
            <div className="total registro-total">
              <p className="registro-total-label">Total:</p>
              <div id="suma_total">$ {total.toFixed(2)}</div>
              <input type="submit" className="button" value="Completar Registro" />
              {result && <p className="registro-result">{result}</p>}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
