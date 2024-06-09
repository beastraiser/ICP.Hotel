export interface Categoria {
  tipoCamas: TipoCama[];
  id: number;
  tipo: string;
  numeroCamas: number;
  maximoPersonas: number;
  costeNoche: number;
  foto: string;
}

export interface TipoCama {
  tipo: string;
}
