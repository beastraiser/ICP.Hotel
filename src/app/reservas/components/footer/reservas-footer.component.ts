import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces';

@Component({
  selector: 'reservas-footer',
  templateUrl: './reservas-footer.component.html',
  styleUrl: './reservas-footer.component.css',
})
export class ReservasFooterComponent {
  year = new Date().getFullYear();

  private authService = inject(AuthService);

  isAuthenticated() {
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      return true;
    }
    return false;
  }

  logout() {
    return this.authService.logout();
  }
}
