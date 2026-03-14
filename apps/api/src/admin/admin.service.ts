import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

type EntityMap = {
  invitados: { table: 'invitados'; id: 'invitado_id' };
  categorias: { table: 'categoria_evento'; id: 'id_categoria' };
  eventos: { table: 'eventos'; id: 'evento_id' };
  registrados: { table: 'registrados'; id: 'id_registrado' };
};

const entityMap: EntityMap = {
  invitados: { table: 'invitados', id: 'invitado_id' },
  categorias: { table: 'categoria_evento', id: 'id_categoria' },
  eventos: { table: 'eventos', id: 'evento_id' },
  registrados: { table: 'registrados', id: 'id_registrado' }
};

@Injectable()
export class AdminService {
  constructor(private readonly db: DbService) {}

  private resolve(entity: keyof EntityMap) {
    const resolved = entityMap[entity];
    if (!resolved) throw new BadRequestException('Entidad no soportada');
    return resolved;
  }

  async list(entity: keyof EntityMap) {
    const { table, id } = this.resolve(entity);
    const result = await this.db.query(`SELECT * FROM ${table} ORDER BY ${id} DESC`);
    return result.rows;
  }

  async get(entity: keyof EntityMap, itemId: number) {
    const { table, id } = this.resolve(entity);
    const result = await this.db.query(`SELECT * FROM ${table} WHERE ${id} = $1 LIMIT 1`, [itemId]);
    return result.rows[0] ?? null;
  }

  async create(entity: keyof EntityMap, data: Record<string, unknown>) {
    const { table } = this.resolve(entity);
    const columns = Object.keys(data);
    if (!columns.length) throw new BadRequestException('Payload sin campos');

    const values = Object.values(data);
    const placeholders = values.map((_, idx) => `$${idx + 1}`).join(',');
    const sql = `INSERT INTO ${table} (${columns.join(',')}) VALUES (${placeholders}) RETURNING *`;
    const result = await this.db.query(sql, values);
    return result.rows[0];
  }

  async update(entity: keyof EntityMap, itemId: number, data: Record<string, unknown>) {
    const { table, id } = this.resolve(entity);
    const columns = Object.keys(data);
    if (!columns.length) throw new BadRequestException('Payload sin campos');

    const values = Object.values(data);
    const setClause = columns.map((col, idx) => `${col} = $${idx + 1}`).join(', ');
    const sql = `UPDATE ${table} SET ${setClause} WHERE ${id} = $${columns.length + 1} RETURNING *`;
    const result = await this.db.query(sql, [...values, itemId]);
    return result.rows[0] ?? null;
  }

  async remove(entity: keyof EntityMap, itemId: number) {
    const { table, id } = this.resolve(entity);
    await this.db.query(`DELETE FROM ${table} WHERE ${id} = $1`, [itemId]);
    return { deleted: true };
  }
}
