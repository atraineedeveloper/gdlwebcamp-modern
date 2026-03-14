import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateRegistrationDto } from './dto';

@Injectable()
export class RegistrationsService {
  constructor(private readonly db: DbService) {}

  async create(dto: CreateRegistrationDto) {
    const result = await this.db.query(
      `INSERT INTO registrados
      (nombre_registrado, apellido_registrado, email_registrado, pases_articulos, talleres_registrados, regalo, total_pagado, pagado)
      VALUES ($1,$2,$3,$4::jsonb,$5::jsonb,$6,$7,$8)
      RETURNING *`,
      [
        dto.nombre_registrado,
        dto.apellido_registrado,
        dto.email_registrado,
        JSON.stringify(dto.pases_articulos),
        JSON.stringify(dto.talleres_registrados),
        dto.regalo,
        dto.total_pagado,
        dto.pagado ?? 0
      ]
    );

    return result.rows[0];
  }
}
