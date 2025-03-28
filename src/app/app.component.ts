import { Component, inject, computed, effect } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public authStatusChangedEffect = effect(() => {
    console.log(this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        if (this.authService.currentUser()?.rol === 'ADMIN') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/reservas');
        }
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/reservas');
        return;
    }
  });
}
