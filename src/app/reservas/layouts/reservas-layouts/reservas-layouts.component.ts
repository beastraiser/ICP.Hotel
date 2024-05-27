import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './reservas-layouts.component.html',
  styleUrl: './reservas-layouts.component.css',
})
export class ReservasLayoutsComponent {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }
}
