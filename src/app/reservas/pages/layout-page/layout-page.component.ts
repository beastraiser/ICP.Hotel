import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export class ReservasLayoutComponent {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }
}
