import 'dotenv/config';
import mysql from 'mysql2/promise';
import { Pool } from 'pg';

const mysqlConn = await mysql.createConnection({
  host: process.env.LEGACY_MYSQL_HOST ?? '127.0.0.1',
  user: process.env.LEGACY_MYSQL_USER ?? 'gdlwebcamp_user',
  password: process.env.LEGACY_MYSQL_PASS ?? 'gdlwebcamp_pass',
  database: process.env.LEGACY_MYSQL_DB ?? 'gdlwebcamp'
});

const pg = new Pool({
  connectionString: process.env.DATABASE_URL ?? 'postgres://gdl_user:gdl_pass@localhost:5433/gdlwebcamp'
});

function safeJson(value: unknown, fallback: unknown) {
  if (!value) return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }
  return value;
}

async function run() {
  console.log('Migrating categorias...');
  const [categorias] = await mysqlConn.query<any[]>('SELECT id_categoria, cat_evento, icono FROM categoria_evento');
  for (const c of categorias) {
    await pg.query(
      `INSERT INTO categoria_evento (id_categoria, cat_evento, icono)
       VALUES ($1,$2,$3)
       ON CONFLICT (id_categoria) DO UPDATE SET cat_evento = EXCLUDED.cat_evento, icono = EXCLUDED.icono`,
      [c.id_categoria, c.cat_evento, c.icono]
    );
  }

  console.log('Migrating invitados...');
  const [invitados] = await mysqlConn.query<any[]>('SELECT invitado_id, nombre_invitado, apellido_invitado, descripcion, url_imagen FROM invitados');
  for (const i of invitados) {
    await pg.query(
      `INSERT INTO invitados (invitado_id, nombre_invitado, apellido_invitado, descripcion, url_imagen)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (invitado_id) DO UPDATE
       SET nombre_invitado = EXCLUDED.nombre_invitado,
           apellido_invitado = EXCLUDED.apellido_invitado,
           descripcion = EXCLUDED.descripcion,
           url_imagen = EXCLUDED.url_imagen`,
      [i.invitado_id, i.nombre_invitado, i.apellido_invitado, i.descripcion, i.url_imagen]
    );
  }

  console.log('Migrating eventos...');
  const [eventos] = await mysqlConn.query<any[]>('SELECT evento_id, nombre_evento, fecha_evento, hora_evento, id_cat_evento, id_inv, COALESCE(clave,\'\') AS clave FROM eventos');
  for (const e of eventos) {
    await pg.query(
      `INSERT INTO eventos (evento_id, nombre_evento, fecha_evento, hora_evento, id_cat_evento, id_inv, clave)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (evento_id) DO UPDATE
       SET nombre_evento = EXCLUDED.nombre_evento,
           fecha_evento = EXCLUDED.fecha_evento,
           hora_evento = EXCLUDED.hora_evento,
           id_cat_evento = EXCLUDED.id_cat_evento,
           id_inv = EXCLUDED.id_inv,
           clave = EXCLUDED.clave`,
      [e.evento_id, e.nombre_evento, e.fecha_evento, e.hora_evento, e.id_cat_evento, e.id_inv, e.clave]
    );
  }

  console.log('Migrating registrados...');
  const [registrados] = await mysqlConn.query<any[]>(
    'SELECT ID_Registrado, nombre_registrado, apellido_registrado, email_registrado, fecha_registro, pases_articulos, talleres_registrados, regalo, total_pagado, pagado FROM registrados'
  );

  for (const r of registrados) {
    await pg.query(
      `INSERT INTO registrados
      (id_registrado, nombre_registrado, apellido_registrado, email_registrado, fecha_registro, pases_articulos, talleres_registrados, regalo, total_pagado, pagado)
      VALUES ($1,$2,$3,$4,$5,$6::jsonb,$7::jsonb,$8,$9,$10)
      ON CONFLICT (id_registrado) DO UPDATE
      SET nombre_registrado = EXCLUDED.nombre_registrado,
          apellido_registrado = EXCLUDED.apellido_registrado,
          email_registrado = EXCLUDED.email_registrado,
          fecha_registro = EXCLUDED.fecha_registro,
          pases_articulos = EXCLUDED.pases_articulos,
          talleres_registrados = EXCLUDED.talleres_registrados,
          regalo = EXCLUDED.regalo,
          total_pagado = EXCLUDED.total_pagado,
          pagado = EXCLUDED.pagado`,
      [
        r.ID_Registrado,
        r.nombre_registrado,
        r.apellido_registrado,
        r.email_registrado,
        r.fecha_registro,
        JSON.stringify(safeJson(r.pases_articulos, {})),
        JSON.stringify(safeJson(r.talleres_registrados, [])),
        r.regalo,
        Number(r.total_pagado ?? 0),
        Number(r.pagado ?? 0)
      ]
    );
  }

  console.log('Migration completed.');
  await mysqlConn.end();
  await pg.end();
}

run().catch(async (error) => {
  console.error(error);
  await mysqlConn.end();
  await pg.end();
  process.exit(1);
});
