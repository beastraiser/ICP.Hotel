import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Servicio, Tipo } from '../../../shared/interfaces/servicios.interface';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  obtenerServicios(): Observable<Servicio[]> {
    const url = `${this.baseUrl}/servicios/lista`;
    return this.http.get<Servicio[]>(url);
  }

  obtenerServicioPorId(id: number): Observable<Servicio> {
    const url = `${this.baseUrl}/servicios/${id}`;
    return this.http.get<Servicio>(url);
  }

  actualizarServicio(
    id: number,
    tipo: string,
    nombre: string,
    descripcion: string,
    coste: number
  ): Observable<boolean> {
    const url = `${this.baseUrl}/servicios/${id}`;
    const body = { tipo, nombre, descripcion, coste };

    return this.http.put<boolean>(url, body).pipe(
      map(() => true),
      tap(() => console.log('Servicio actualizado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  borrarServicio(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/servicios/${id}`;

    return this.http.delete<boolean>(url).pipe(
      map(() => true),
      tap(() => console.log('Servicio borrado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  crearServicio(
    tipo: Tipo,
    nombre: string,
    descripcion: string,
    coste: number
  ): Observable<Servicio> {
    const url = `${this.baseUrl}/servicios`;
    const body = { tipo, nombre, descripcion, coste };

    return this.http.post<Servicio>(url, body).pipe(
      tap(() => console.log('Servicio creado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
