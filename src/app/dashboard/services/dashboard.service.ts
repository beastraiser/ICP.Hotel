import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HabitacionDisponible } from '../interfaces/habitaciones-disponibles.interface';
import { Servicio } from '../interfaces/servicios.interface';

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

    return this.http.post<HabitacionDisponible[]>(url, body).pipe(
      tap((x) => console.log(x)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  mostrarServicios(): Observable<Servicio[]> {
    const url = `${this.baseUrl}/servicios/lista`;

    return this.http.get<Servicio[]>(url).pipe(
      tap((x) => console.log(x)),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
