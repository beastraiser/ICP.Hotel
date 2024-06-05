import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { HabitacionDisponible } from '../interfaces/habitaciones-disponibles.interface';
import { Servicio } from '../interfaces/servicios.interface';
import { ClienteUsuario } from '../interfaces/cliente-usuario.interface';
import { UsuarioDatos } from '../interfaces/usuario-datos.interface';
import { ClienteDatos } from '../interfaces/cliente.interface';
import {
  Reserva,
  ReservaHabitacionServicio,
} from '../interfaces/reservaPost.interface';
import { Rhs } from '../interfaces/rhs.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  mostrarHabitaciones(
    fechaInicio: Date,
    fechaFin: Date,
    maximoPersonas: number
  ): Observable<HabitacionDisponible[]> {
    const url = `${this.baseUrl}/habitaciones/fechas`;
    const body = { fechaInicio, fechaFin, maximoPersonas };

    return this.http
      .post<HabitacionDisponible[]>(url, body)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  mostrarServicios(): Observable<Servicio[]> {
    const url = `${this.baseUrl}/servicios/lista`;

    return this.http
      .get<Servicio[]>(url)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  obtenerClienteConUsuario(idUsuario: number): Observable<ClienteUsuario> {
    const url = `${this.baseUrl}/registro/usuario/${idUsuario}`;

    return this.http.get<ClienteUsuario>(url).pipe(
      catchError((err) => {
        console.error('Error:', err);
        return throwError(() => new Error('Error al obtener los datos'));
      })
    );
  }

  obtenerUsuarioPorEmail(email: string): Observable<UsuarioDatos> {
    const url = `${this.baseUrl}/usuarios/email`;
    const body = { email };

    return this.http
      .post<UsuarioDatos>(url, body)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  crearCliente(
    dni: string,
    telefono: string,
    nombre: string,
    apellidos: string
  ): Observable<ClienteDatos> {
    const url = `${this.baseUrl}/clientes`;
    const body = { dni, telefono, nombre, apellidos };

    return this.http
      .post<ClienteDatos>(url, body)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  crearReserva(
    reservaHabitacionServicios: Rhs[],
    idCliente: number,
    idUsuario: number,
    fechaInicio: string,
    fechaFin: string
  ): Observable<Reserva> {
    const url = `${this.baseUrl}/reservas`;
    const body = {
      reservaHabitacionServicios,
      idCliente,
      idUsuario,
      fechaInicio,
      fechaFin,
    };

    return this.http
      .post<Reserva>(url, body)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  obtenerReservasPorUsuario(idUsuario: number): Observable<Reserva[]> {
    const url = `${this.baseUrl}/reservas/usuario/${idUsuario}`;

    return this.http.get<Reserva[]>(url).pipe(
      catchError((err) => {
        return throwError(
          () => new Error(err.error.message || 'Error desconocido')
        );
      })
    );
  }

  obtenerReservasPorCliente(idCliente: number): Observable<Reserva[]> {
    const url = `${this.baseUrl}/reservas/cliente/${idCliente}`;

    return this.http
      .get<Reserva[]>(url)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  obtenerClientePorDni(dni: string): Observable<ClienteDatos> {
    const url = `${this.baseUrl}/clientes/dni`;
    const body = { dni };

    return this.http
      .post<ClienteDatos>(url, body)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }

  cancelarReserva(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/reservas/${id}/cancelar`;

    return this.http.put(url, {}).pipe(
      map(() => true),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  actualizarReserva(
    id: number,
    reservaHabitacionServicios: Rhs[],
    idCliente: number,
    idUsuario: number,
    fechaInicio: string,
    fechaFin: string
  ): Observable<boolean> {
    const url = `${this.baseUrl}/reservas/${id}`;
    const body = {
      reservaHabitacionServicios,
      idCliente,
      idUsuario,
      fechaInicio,
      fechaFin,
    };

    return this.http.put(url, body).pipe(
      map(() => true),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  getReservationById(id: number): Observable<Reserva> {
    const url = `${this.baseUrl}/reservas/${id}`;
    return this.http
      .get<Reserva>(url)
      .pipe(catchError((err) => throwError(() => err.error.message)));
  }
}
