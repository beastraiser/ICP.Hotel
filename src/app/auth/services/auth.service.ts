import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  userDataFromToken(token: string) {
    const user: any = jwtDecode(token);
    const currentUser: User = {
      id: user.id,
      email: user.email,
      rol: user.rol,
    };
    return currentUser;
  }

  login(email: string, contrasenya: string): Observable<boolean> {
    const url = `${this.baseUrl}/usuarios/login`;
    const body = { email, contrasenya };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(({ token, expire }) => {
        let currUser = this.userDataFromToken(token);
        this._currentUser.set(currUser);
        this._authStatus.set(AuthStatus.authenticated);

        localStorage.setItem('token', token);
        localStorage.setItem('exp', expire);
        localStorage.setItem('idUsuario', currUser.id.toString());
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

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/validate`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers }).pipe(
      map(() => {
        this._currentUser.set(this.userDataFromToken(token));
        this._authStatus.set(AuthStatus.authenticated);
        return true;
      }),
      catchError((error) => {
        console.error('Error during token validation', error);
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('idCliente');
    localStorage.removeItem('ruta');
    localStorage.removeItem('exp');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    // this.router
    //   .navigateByUrl('/auth')
    //   .then((success) => {
    //     if (!success) {
    //       console.error('Redirección a /auth fallida');
    //     }
    //   })
    //   .catch((err) => {
    //     console.error('Error al intentar redirigir a /auth:', err);
    //   });
  }
}
