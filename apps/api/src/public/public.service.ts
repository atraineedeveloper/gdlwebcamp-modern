import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class PublicService {
  constructor(private readonly db: DbService) {}

  async homeSummary() {
    const [eventos, invitados, registrados] = await Promise.all([
      this.db.query<{ total: string }>('SELECT COUNT(*)::text AS total FROM eventos'),
      this.db.query<{ total: string }>('SELECT COUNT(*)::text AS total FROM invitados'),
      this.db.query<{ total: string }>('SELECT COUNT(*)::text AS total FROM registrados')
    ]);

    return {
      totalEventos: Number(eventos.rows[0]?.total ?? 0),
      totalInvitados: Number(invitados.rows[0]?.total ?? 0),
      totalRegistros: Number(registrados.rows[0]?.total ?? 0)
    };
  }

  async invitados() {
    const result = await this.db.query('SELECT * FROM invitados ORDER BY invitado_id ASC');
    return result.rows;
  }

  async eventos() {
    const result = await this.db.query(
      `SELECT e.*, c.cat_evento, i.nombre_invitado, i.apellido_invitado
       FROM eventos e
       INNER JOIN categoria_evento c ON e.id_cat_evento = c.id_categoria
       INNER JOIN invitados i ON e.id_inv = i.invitado_id
       ORDER BY e.fecha_evento, e.hora_evento`
    );
    return result.rows;
  }

  async calendario() {
    const result = await this.db.query(
      `SELECT e.evento_id, e.nombre_evento, e.fecha_evento, e.hora_evento,
              c.cat_evento, i.nombre_invitado, i.apellido_invitado
       FROM eventos e
       INNER JOIN categoria_evento c ON e.id_cat_evento = c.id_categoria
       INNER JOIN invitados i ON e.id_inv = i.invitado_id
       ORDER BY e.fecha_evento, e.hora_evento`
    );
    return result.rows;
  }
}
