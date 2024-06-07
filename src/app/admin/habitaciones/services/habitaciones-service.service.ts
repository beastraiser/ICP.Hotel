import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { HabitacionesDatos } from '../interfaces/habitaciones-datos.interface';

@Injectable({
  providedIn: 'root',
})
export class HabitacionesService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  obtenerHabitaciones(): Observable<HabitacionesDatos[]> {
    const url = `${this.baseUrl}/habitaciones`;
    return this.http.get<HabitacionesDatos[]>(url);
  }

  obtenerHabitacionPorId(id: number): Observable<HabitacionesDatos> {
    const url = `${this.baseUrl}/habitaciones/${id}`;
    return this.http.get<HabitacionesDatos>(url);
  }

  actualizarHabitacion(id: number, idCategoria: number): Observable<boolean> {
    const url = `${this.baseUrl}/habitaciones/${id}`;
    const body = { idCategoria };

    return this.http.put<boolean>(url, body).pipe(
      map(() => true),
      tap(() => console.log('Habitacion actualizada')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  borrarHabitacion(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/habitaciones/${id}`;

    return this.http.delete<boolean>(url).pipe(
      map(() => true),
      tap(() => console.log('Habitacion borrada')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  crearHabitacion(
    id: number,
    idCategoria: number
  ): Observable<HabitacionesDatos> {
    const url = `${this.baseUrl}/habitaciones/${id}`;
    const body = { idCategoria };

    return this.http.post<HabitacionesDatos>(url, body).pipe(
      tap(() => console.log('Habitacion creada')),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
