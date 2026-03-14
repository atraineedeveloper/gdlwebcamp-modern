import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class DashboardService {
  constructor(private readonly db: DbService) {}

  async metrics() {
    const [total, pagados, pendientes, ganancias] = await Promise.all([
      this.db.query<{ value: string }>('SELECT COUNT(*)::text AS value FROM registrados'),
      this.db.query<{ value: string }>('SELECT COUNT(*)::text AS value FROM registrados WHERE pagado = 1'),
      this.db.query<{ value: string }>('SELECT COUNT(*)::text AS value FROM registrados WHERE pagado = 0'),
      this.db.query<{ value: string }>('SELECT COALESCE(SUM(total_pagado),0)::text AS value FROM registrados WHERE pagado = 1')
    ]);

    return {
      registros: Number(total.rows[0]?.value ?? 0),
      pagados: Number(pagados.rows[0]?.value ?? 0),
      pendientes: Number(pendientes.rows[0]?.value ?? 0),
      ganancias: Number(ganancias.rows[0]?.value ?? 0)
    };
  }

  async registrationSeries() {
    const result = await this.db.query<{
      dia: string;
      total: string;
    }>(
      `SELECT DATE(fecha_registro)::text AS dia, COUNT(*)::text AS total
       FROM registrados
       GROUP BY DATE(fecha_registro)
       ORDER BY DATE(fecha_registro)`
    );
    return result.rows;
  }
}
