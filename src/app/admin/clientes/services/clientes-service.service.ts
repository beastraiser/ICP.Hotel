import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ClienteDatos } from '../../../shared/interfaces/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  obtenerClientes(): Observable<ClienteDatos[]> {
    const url = `${this.baseUrl}/clientes`;
    return this.http.get<ClienteDatos[]>(url);
  }

  obtenerClientePorId(id: number): Observable<ClienteDatos> {
    const url = `${this.baseUrl}/clientes/${id}`;
    return this.http.get<ClienteDatos>(url);
  }

  actualizarCliente(
    id: number,
    dni: string,
    telefono: string,
    nombre: string,
    apellidos: string
  ): Observable<boolean> {
    const url = `${this.baseUrl}/clientes/${id}`;
    const body = { dni, telefono, nombre, apellidos };

    return this.http.put<boolean>(url, body).pipe(
      map(() => true),
      tap(() => console.log('Cliente actualizado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  borrarCliente(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/clientes/${id}`;

    return this.http.delete<boolean>(url).pipe(
      map(() => true),
      tap(() => console.log('Cliente borrado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  crearCliente(
    dni: string,
    telefono: string,
    nombre: string,
    apellidos: string
  ): Observable<ClienteDatos> {
    const url = `${this.baseUrl}/clientes`;
    const body = { dni, telefono, nombre, apellidos };

    return this.http.post<ClienteDatos>(url, body).pipe(
      tap(() => console.log('Cliente actualizado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
