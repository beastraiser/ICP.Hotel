import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UsuarioDatos } from '../../../shared/interfaces/usuario-datos.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() {}

  obtenerUsuarios(): Observable<UsuarioDatos[]> {
    const url = `${this.baseUrl}/usuarios`;
    return this.http.get<UsuarioDatos[]>(url);
  }

  actualizarUsuario(
    id: number,
    idPerfil: number,
    email: string,
    contrasenya: string,
    fechaRegistro: Date
  ): Observable<boolean> {
    const url = `${this.baseUrl}/usuarios/${id}`;
    const body = { idPerfil, email, contrasenya, fechaRegistro };

    return this.http.put<boolean>(url, body).pipe(
      map(() => true),
      tap(() => console.log('Usuario actualizado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  bajaUsuario(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/usuarios/${id}/baja`;

    return this.http.get<boolean>(url).pipe(
      map(() => true),
      tap(() => console.log('Usuario dado de baja')),
      catchError((err) => throwError(() => err.error))
    );
  }

  altaUsuario(id: number, dni: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuarios/${id}/altaC`;
    const body = { dni };

    return this.http.put<boolean>(url, body).pipe(
      map(() => true),
      tap(() => console.log('Usuario dado de alta')),
      catchError((err) => throwError(() => err.error))
    );
  }

  altaTrabajador(id: number): Observable<boolean> {
    const url = `${this.baseUrl}/usuarios/${id}/altaT`;

    return this.http.get<boolean>(url).pipe(
      map(() => true),
      tap(() => console.log('Trabajador dado de alta')),
      catchError((err) => throwError(() => err.error))
    );
  }

  crearUsuario(
    idPerfil: number,
    email: string,
    contrasenya: string,
    fechaRegistro: Date
  ): Observable<UsuarioDatos> {
    const url = `${this.baseUrl}/usuarios`;
    const body = { idPerfil, email, contrasenya, fechaRegistro };

    return this.http.post<UsuarioDatos>(url, body).pipe(
      tap(() => console.log('Usuario actualizado')),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
