import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {}

  login(email: string, contrasenya: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuarios/login`;
    const body = { email, contrasenya };
    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ token, expire }) => {
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
        localStorage.setItem('exp', expire);
        console.log({ token, expire });
      }),

      map(() => true),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  registro(
    DNI: string,
    telefono: string,
    nombre: string,
    apellidos: string,
    email: string,
    contrasenya: string
  ): Observable<boolean> {
    const url = `${this.baseUrl}/registro`;
    const body = { DNI, telefono, nombre, apellidos, email, contrasenya };
    return this.http.post(url, body).pipe(
      map(() => true),
      catchError((err) => throwError(() => err.error.message))
    );
  }
}
