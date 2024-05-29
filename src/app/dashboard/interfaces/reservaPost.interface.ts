export interface ReservaPost {
  reservaHabitacionServicios: ReservaHabitacionServicio[];
  idCliente: number;
  idUsuario: number;
  fechaInicio: string;
  fechaFin: string;
}

export interface ReservaHabitacionServicio {
  idHabitacion: number;
  idServicio: number;
}
