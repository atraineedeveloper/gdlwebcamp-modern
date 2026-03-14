CREATE TABLE IF NOT EXISTS admins (
  id_admin SERIAL PRIMARY KEY,
  usuario VARCHAR(60) NOT NULL UNIQUE,
  nombre VARCHAR(80) NOT NULL,
  password VARCHAR(255) NOT NULL,
  editado TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categoria_evento (
  id_categoria SMALLSERIAL PRIMARY KEY,
  cat_evento VARCHAR(50) NOT NULL,
  icono VARCHAR(30) NOT NULL,
  editado TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS invitados (
  invitado_id SERIAL PRIMARY KEY,
  nombre_invitado VARCHAR(30) NOT NULL,
  apellido_invitado VARCHAR(30) NOT NULL,
  descripcion TEXT NOT NULL,
  url_imagen VARCHAR(255) NOT NULL,
  editado TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS eventos (
  evento_id SERIAL PRIMARY KEY,
  nombre_evento VARCHAR(80) NOT NULL,
  fecha_evento DATE NOT NULL,
  hora_evento TIME NOT NULL,
  id_cat_evento SMALLINT NOT NULL REFERENCES categoria_evento(id_categoria),
  id_inv INT NOT NULL REFERENCES invitados(invitado_id),
  clave VARCHAR(10) NOT NULL DEFAULT '',
  editado TIMESTAMP NULL
);

CREATE TABLE IF NOT EXISTS regalos (
  id_regalo SMALLSERIAL PRIMARY KEY,
  nombre_regalo VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS registrados (
  id_registrado SERIAL PRIMARY KEY,
  nombre_registrado VARCHAR(60) NOT NULL,
  apellido_registrado VARCHAR(60) NOT NULL,
  email_registrado VARCHAR(120) NOT NULL,
  fecha_registro TIMESTAMP NOT NULL DEFAULT NOW(),
  pases_articulos JSONB NOT NULL,
  talleres_registrados JSONB NOT NULL,
  regalo SMALLINT NOT NULL REFERENCES regalos(id_regalo),
  total_pagado NUMERIC(10, 2) NOT NULL DEFAULT 0,
  pagado SMALLINT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_registrados_fecha ON registrados(fecha_registro);
CREATE INDEX IF NOT EXISTS idx_eventos_fecha ON eventos(fecha_evento);
