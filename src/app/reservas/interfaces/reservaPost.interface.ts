export interface Reserva {
  id: number;
  reservaHabitacionServicios: ReservaHabitacionServicio[];
  nombreCliente: string;
  apellidosCliente: string;
  idCliente: number;
  idUsuario: number;
  fechaInicio: Date;
  fechaFin: Date;
  cancelada: boolean;
  costeTotal: number;
  pagado: boolean;
}

export interface ReservaHabitacionServicio {
  idHabitacion: number;
  nombreServicio: string;
  tipoHabitacion: string;
  idServicio: number;
}
