import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStatus } from '../../auth/interfaces';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const rol = authService.currentUser()?.rol;

  if (
    authService.authStatus() === AuthStatus.authenticated &&
    rol === 'ADMIN'
  ) {
    // router.navigateByUrl('/admin');
    console.log(`rol:${rol}`);
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
