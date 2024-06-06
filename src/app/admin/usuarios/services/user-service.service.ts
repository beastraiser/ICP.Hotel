import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { UsuarioDatos } from '../../../shared/interfaces/usuario-datos.interface';
import { UsuarioCreacion } from '../../interfaces/usuario-creacion.interface';

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
    constrasenya: string,
    fechaRegistro: Date
  ): Observable<UsuarioDatos> {
    const url = `${this.baseUrl}/usuarios/${id}`;
    const body = { idPerfil, email, constrasenya, fechaRegistro };
    return this.http.post<UsuarioDatos>(url, body);
  }

  borrarUsuario(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/usuarios/${id}`);
  }
}
