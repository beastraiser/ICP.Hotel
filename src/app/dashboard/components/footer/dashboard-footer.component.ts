import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces';

@Component({
  selector: 'dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrl: './dashboard-footer.component.css',
})
export class DashboardFooterComponent {
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
