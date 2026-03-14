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
    <section className="seccion contenedor">
      <h2>Registro de Usuarios</h2>
      <form id="registro" className="registro" onSubmit={onSubmit}>
        <div id="datos_usuario" className="registro caja clearfix">
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

        <div id="paquetes" className="paquetes">
          <h3>Elije el numero de Boletos</h3>
          <ul className="lista-precios clearfix">
            <li><div className="tabla-precio"><h3>pase por dia (viernes)</h3><p className="numero">$30</p><div className="orden"><label>Boletos deseados:</label><input type="number" min="0" value={totals.unDia} onChange={(e) => setTotals((t) => ({ ...t, unDia: Number(e.target.value) }))} /></div></div></li>
            <li><div className="tabla-precio"><h3>Todos los dias</h3><p className="numero">$50</p><div className="orden"><label>Boletos deseados:</label><input type="number" min="0" value={totals.completo} onChange={(e) => setTotals((t) => ({ ...t, completo: Number(e.target.value) }))} /></div></div></li>
            <li><div className="tabla-precio"><h3>Pase por 2 dias</h3><p className="numero">$45</p><div className="orden"><label>Boletos deseados:</label><input type="number" min="0" value={totals.dosDias} onChange={(e) => setTotals((t) => ({ ...t, dosDias: Number(e.target.value) }))} /></div></div></li>
          </ul>
        </div>

        <div id="eventos" className="eventos clearfix">
          <h3>Elige tus talleres</h3>
          <div className="caja">
            {Object.entries(grouped).map(([dia, categories]) => (
              <div className="contenido-dia clearfix" key={dia}>
                <h4>{dia}</h4>
                <div className="contenido-dia-react">
                  {Object.entries(categories).map(([tipo, evs]) => (
                    <div key={tipo}>
                      <p>{tipo}:</p>
                      {evs.map((evento) => (
                        <label key={evento.evento_id}>
                          <input
                            type="checkbox"
                            checked={seleccionados.includes(evento.evento_id)}
                            onChange={(e) => {
                              setSeleccionados((prev) =>
                                e.target.checked ? [...prev, evento.evento_id] : prev.filter((id) => id !== evento.evento_id)
                              );
                            }}
                          />
                          <time>{evento.hora_evento}</time> {evento.nombre_evento}
                          <br />
                          <span className="autor">{evento.nombre_invitado} {evento.apellido_invitado}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resumen">
          <h3>Pago y Extras</h3>
          <div className="caja clearfix">
            <div className="extras">
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
            <div className="total">
              <p>Total:</p>
              <div id="suma_total">$ {total.toFixed(2)}</div>
              <input type="submit" className="button" value="Completar Registro" />
              {result && <p>{result}</p>}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
