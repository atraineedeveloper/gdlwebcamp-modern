import type { Evento, Invitado } from '../types';

export type HomeSummary = {
  totalEventos: number;
  totalInvitados: number;
  totalRegistros: number;
};

export const demoInvitados: Invitado[] = [
  {
    invitado_id: 1,
    nombre_invitado: 'Juan Pablo',
    apellido_invitado: 'Valdez',
    descripcion: 'Especialista en interfaces accesibles y arquitectura CSS para productos web de alto trafico.',
    url_imagen: 'invitado1.jpg'
  },
  {
    invitado_id: 2,
    nombre_invitado: 'Gregorio',
    apellido_invitado: 'Sanchez',
    descripcion: 'Consultor en estrategia digital y liderazgo tecnico para equipos distribuidos de frontend.',
    url_imagen: 'invitado2.jpg'
  },
  {
    invitado_id: 3,
    nombre_invitado: 'Susan',
    apellido_invitado: 'Sanchez',
    descripcion: 'Ingeniera enfocada en performance web, metricas de experiencia y optimizacion de Core Web Vitals.',
    url_imagen: 'invitado3.jpg'
  },
  {
    invitado_id: 4,
    nombre_invitado: 'Harold',
    apellido_invitado: 'Garcia',
    descripcion: 'Disenador de producto con enfoque en sistemas visuales, prototipado y experiencias moviles.',
    url_imagen: 'invitado4.jpg'
  },
  {
    invitado_id: 5,
    nombre_invitado: 'Ana',
    apellido_invitado: 'Lopez',
    descripcion: 'Desarrolladora full stack con experiencia en APIs escalables y aplicaciones React en produccion.',
    url_imagen: 'invitado5.jpg'
  },
  {
    invitado_id: 6,
    nombre_invitado: 'Mariana',
    apellido_invitado: 'Torres',
    descripcion: 'Lider de UX research y facilitadora de talleres de descubrimiento para equipos de producto.',
    url_imagen: 'invitado6.jpg'
  }
];

export const demoEventos: Evento[] = [
  {
    evento_id: 1,
    nombre_evento: 'HTML5, CSS3 y JavaScript Moderno',
    fecha_evento: '2026-12-10',
    hora_evento: '16:00:00',
    cat_evento: 'talleres',
    nombre_invitado: 'Juan Pablo',
    apellido_invitado: 'Valdez'
  },
  {
    evento_id: 2,
    nombre_evento: 'Responsive Web Design Avanzado',
    fecha_evento: '2026-12-10',
    hora_evento: '19:00:00',
    cat_evento: 'talleres',
    nombre_invitado: 'Harold',
    apellido_invitado: 'Garcia'
  },
  {
    evento_id: 3,
    nombre_evento: 'Arquitectura CSS con Grid y Flexbox',
    fecha_evento: '2026-12-11',
    hora_evento: '10:00:00',
    cat_evento: 'talleres',
    nombre_invitado: 'Susan',
    apellido_invitado: 'Sanchez'
  },
  {
    evento_id: 4,
    nombre_evento: 'Como Ser Freelancer Sin Morir en el Intento',
    fecha_evento: '2026-12-10',
    hora_evento: '10:00:00',
    cat_evento: 'conferencias',
    nombre_invitado: 'Gregorio',
    apellido_invitado: 'Sanchez'
  },
  {
    evento_id: 5,
    nombre_evento: 'Tecnologias del Futuro para la Web',
    fecha_evento: '2026-12-10',
    hora_evento: '17:00:00',
    cat_evento: 'conferencias',
    nombre_invitado: 'Susan',
    apellido_invitado: 'Sanchez'
  },
  {
    evento_id: 6,
    nombre_evento: 'Diseno de Interfaces que Convierten',
    fecha_evento: '2026-12-11',
    hora_evento: '12:00:00',
    cat_evento: 'conferencias',
    nombre_invitado: 'Mariana',
    apellido_invitado: 'Torres'
  },
  {
    evento_id: 7,
    nombre_evento: 'Diseno UI/UX para Apps Moviles',
    fecha_evento: '2026-12-11',
    hora_evento: '09:00:00',
    cat_evento: 'seminario',
    nombre_invitado: 'Harold',
    apellido_invitado: 'Garcia'
  },
  {
    evento_id: 8,
    nombre_evento: 'Aprende a Programar un MVP en una Manana',
    fecha_evento: '2026-12-11',
    hora_evento: '13:00:00',
    cat_evento: 'seminario',
    nombre_invitado: 'Ana',
    apellido_invitado: 'Lopez'
  },
  {
    evento_id: 9,
    nombre_evento: 'Sistemas de Diseno para Equipos Grandes',
    fecha_evento: '2026-12-12',
    hora_evento: '11:00:00',
    cat_evento: 'seminario',
    nombre_invitado: 'Mariana',
    apellido_invitado: 'Torres'
  }
];

export const demoSummary: HomeSummary = {
  totalEventos: demoEventos.length,
  totalInvitados: demoInvitados.length,
  totalRegistros: 3
};
