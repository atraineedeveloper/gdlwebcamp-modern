export interface Invitado {
  invitado_id: number;
  nombre_invitado: string;
  apellido_invitado: string;
  descripcion: string;
  url_imagen: string;
}

export interface Evento {
  evento_id: number;
  nombre_evento: string;
  fecha_evento: string;
  hora_evento: string;
  cat_evento: string;
  nombre_invitado: string;
  apellido_invitado: string;
}
