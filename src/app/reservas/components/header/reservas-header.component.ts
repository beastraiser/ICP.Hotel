import { Component, HostListener, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces';

@Component({
  selector: 'reservas-header',
  templateUrl: './reservas-header.component.html',
  styleUrl: './reservas-header.component.css',
})
export class ReservasHeaderComponent {
  private authService = inject(AuthService);

  isAuthenticated() {
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      return true;
    }
    return false;
  }

  isClient() {
    if (this.authService.currentUser()?.rol === 'CLIENTE') {
      return true;
    }
    return false;
  }

  logout() {
    return this.authService.logout();
  }
}
