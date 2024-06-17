import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces';

@Component({
  selector: 'admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.css',
})
export class AdminFooterComponent {
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
