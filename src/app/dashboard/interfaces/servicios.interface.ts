export interface Servicio {
  id: number;
  tipo: Tipo;
  nombre: string;
  descripcion: string;
  coste: number;
}

export enum Tipo {
  Extra = 'EXTRA',
  Servicio = 'SERVICIO',
}
