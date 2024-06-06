import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  templateUrl: './usuarios-layout.component.html',
  styleUrl: './usuarios-layout.component.css',
})
export class UsuariosLayoutComponent {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }
}
