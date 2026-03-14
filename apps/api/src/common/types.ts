export type EntityName = 'invitados' | 'categorias_evento' | 'eventos' | 'registrados';

export interface JwtPayload {
  sub: number;
  usuario: string;
}
