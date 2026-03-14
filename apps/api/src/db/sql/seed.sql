INSERT INTO regalos (id_regalo, nombre_regalo)
VALUES (1, 'Pulsera'), (2, 'Etiquetas'), (3, 'Plumas')
ON CONFLICT DO NOTHING;

INSERT INTO categoria_evento (id_categoria, cat_evento, icono)
VALUES
  (1, 'seminario', 'fa-university'),
  (2, 'conferencias', 'fa-comment'),
  (3, 'talleres', 'fa-code')
ON CONFLICT DO NOTHING;

INSERT INTO admins (usuario, nombre, password)
VALUES ('admin', 'Administrador', '$2b$10$USw5hPAHsoxk3jRby3B.0utNQnFfzB5dHm0HOBxQeQtjCFf7W9Qqe')
ON CONFLICT (usuario) DO NOTHING;
