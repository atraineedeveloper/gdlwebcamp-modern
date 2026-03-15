INSERT INTO regalos (id_regalo, nombre_regalo)
VALUES (1, 'Pulsera'), (2, 'Etiquetas'), (3, 'Plumas')
ON CONFLICT (id_regalo) DO UPDATE
SET nombre_regalo = EXCLUDED.nombre_regalo;

INSERT INTO categoria_evento (id_categoria, cat_evento, icono)
VALUES
  (1, 'seminario', 'fa-university'),
  (2, 'conferencias', 'fa-comment'),
  (3, 'talleres', 'fa-code')
ON CONFLICT (id_categoria) DO UPDATE
SET cat_evento = EXCLUDED.cat_evento,
    icono = EXCLUDED.icono;

INSERT INTO admins (usuario, nombre, password)
VALUES ('admin', 'Administrador', '$2b$10$USw5hPAHsoxk3jRby3B.0utNQnFfzB5dHm0HOBxQeQtjCFf7W9Qqe')
ON CONFLICT (usuario) DO UPDATE
SET nombre = EXCLUDED.nombre,
    password = EXCLUDED.password;

INSERT INTO invitados (
  invitado_id,
  nombre_invitado,
  apellido_invitado,
  descripcion,
  url_imagen
)
VALUES
  (
    1,
    'Juan Pablo',
    'Valdez',
    'Especialista en interfaces accesibles y arquitectura CSS para productos web de alto trafico.',
    'invitado1.jpg'
  ),
  (
    2,
    'Gregorio',
    'Sanchez',
    'Consultor en estrategia digital y liderazgo tecnico para equipos distribuidos de frontend.',
    'invitado2.jpg'
  ),
  (
    3,
    'Susan',
    'Sanchez',
    'Ingeniera enfocada en performance web, metricas de experiencia y optimizacion de Core Web Vitals.',
    'invitado3.jpg'
  ),
  (
    4,
    'Harold',
    'Garcia',
    'Disenador de producto con enfoque en sistemas visuales, prototipado y experiencias moviles.',
    'invitado4.jpg'
  ),
  (
    5,
    'Ana',
    'Lopez',
    'Desarrolladora full stack con experiencia en APIs escalables y aplicaciones React en produccion.',
    'invitado5.jpg'
  ),
  (
    6,
    'Mariana',
    'Torres',
    'Lider de UX research y facilitadora de talleres de descubrimiento para equipos de producto.',
    'invitado6.jpg'
  )
ON CONFLICT (invitado_id) DO UPDATE
SET nombre_invitado = EXCLUDED.nombre_invitado,
    apellido_invitado = EXCLUDED.apellido_invitado,
    descripcion = EXCLUDED.descripcion,
    url_imagen = EXCLUDED.url_imagen;

INSERT INTO eventos (
  evento_id,
  nombre_evento,
  fecha_evento,
  hora_evento,
  id_cat_evento,
  id_inv,
  clave
)
VALUES
  (1, 'HTML5, CSS3 y JavaScript Moderno', '2026-12-10', '16:00:00', 3, 1, 'tall_01'),
  (2, 'Responsive Web Design Avanzado', '2026-12-10', '19:00:00', 3, 4, 'tall_02'),
  (3, 'Arquitectura CSS con Grid y Flexbox', '2026-12-11', '10:00:00', 3, 3, 'tall_03'),
  (4, 'Como Ser Freelancer Sin Morir en el Intento', '2026-12-10', '10:00:00', 2, 2, 'conf_01'),
  (5, 'Tecnologias del Futuro para la Web', '2026-12-10', '17:00:00', 2, 3, 'conf_02'),
  (6, 'Diseno de Interfaces que Convierten', '2026-12-11', '12:00:00', 2, 6, 'conf_03'),
  (7, 'Diseno UI/UX para Apps Moviles', '2026-12-11', '09:00:00', 1, 4, 'semi_01'),
  (8, 'Aprende a Programar un MVP en una Manana', '2026-12-11', '13:00:00', 1, 5, 'semi_02'),
  (9, 'Sistemas de Diseno para Equipos Grandes', '2026-12-12', '11:00:00', 1, 6, 'semi_03')
ON CONFLICT (evento_id) DO UPDATE
SET nombre_evento = EXCLUDED.nombre_evento,
    fecha_evento = EXCLUDED.fecha_evento,
    hora_evento = EXCLUDED.hora_evento,
    id_cat_evento = EXCLUDED.id_cat_evento,
    id_inv = EXCLUDED.id_inv,
    clave = EXCLUDED.clave;

INSERT INTO registrados (
  id_registrado,
  nombre_registrado,
  apellido_registrado,
  email_registrado,
  fecha_registro,
  pases_articulos,
  talleres_registrados,
  regalo,
  total_pagado,
  pagado
)
VALUES
  (
    1,
    'Carlos',
    'Mendez',
    'carlos@example.com',
    '2026-10-05 10:30:00',
    '{"un_dia": 1, "pase_completo": 0, "dos_dias": 0, "camisas": 1, "etiquetas": 2}'::jsonb,
    '["tall_01", "conf_01"]'::jsonb,
    1,
    30.00,
    0
  ),
  (
    2,
    'Lucia',
    'Fernandez',
    'lucia@example.com',
    '2026-10-06 14:15:00',
    '{"un_dia": 0, "pase_completo": 1, "dos_dias": 0, "camisas": 0, "etiquetas": 1}'::jsonb,
    '["conf_02", "semi_02", "tall_03"]'::jsonb,
    2,
    50.00,
    0
  ),
  (
    3,
    'Diego',
    'Ramirez',
    'diego@example.com',
    '2026-10-07 09:00:00',
    '{"un_dia": 0, "pase_completo": 0, "dos_dias": 1, "camisas": 1, "etiquetas": 0}'::jsonb,
    '["semi_01", "conf_03"]'::jsonb,
    3,
    45.00,
    0
  )
ON CONFLICT (id_registrado) DO UPDATE
SET nombre_registrado = EXCLUDED.nombre_registrado,
    apellido_registrado = EXCLUDED.apellido_registrado,
    email_registrado = EXCLUDED.email_registrado,
    fecha_registro = EXCLUDED.fecha_registro,
    pases_articulos = EXCLUDED.pases_articulos,
    talleres_registrados = EXCLUDED.talleres_registrados,
    regalo = EXCLUDED.regalo,
    total_pagado = EXCLUDED.total_pagado,
    pagado = EXCLUDED.pagado;
