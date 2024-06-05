import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }
}
