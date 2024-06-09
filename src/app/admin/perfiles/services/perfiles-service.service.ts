import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Perfil } from '../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root',
})
export class PerfilesService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  obtenerPerfiles(): Observable<Perfil[]> {
    const url = `${this.baseUrl}/perfiles`;
    return this.http.get<Perfil[]>(url);
  }

  obtenerPerfilPorId(id: number): Observable<Perfil> {
    const url = `${this.baseUrl}/perfiles/${id}`;
    return this.http.get<Perfil>(url);
  }

  actualizarPerfil(id: number, tipo: string): Observable<boolean> {
    const url = `${this.baseUrl}/perfiles/${id}`;
    const body = { tipo };

    return this.http.put<boolean>(url, body).pipe(
      map(() => true),
      tap(() => console.log('Perfil actualizado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  borrarPerfil(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/perfiles/${id}`;

    return this.http.delete<boolean>(url).pipe(
      map(() => true),
      tap(() => console.log('Perfil borrado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  crearPerfil(tipo: string): Observable<Perfil> {
    const url = `${this.baseUrl}/perfiles`;
    const body = { tipo };

    return this.http.post<Perfil>(url, body).pipe(
      tap(() => console.log('Perfil creado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
