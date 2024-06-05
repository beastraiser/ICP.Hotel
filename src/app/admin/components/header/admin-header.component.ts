import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {
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
