export interface HabitacionDisponible {
  id: number;
  idCategoria: number;
  categoriaTipo: CategoriaTipo;
  numeroCamas: number;
  maximoPersonas: number;
  costeNoche: number;
}

export enum CategoriaTipo {
  Individual = 'INDIVIDUAL',
  Doble = 'DOBLE',
  Supletoria = 'SUPLETORIA',
}
