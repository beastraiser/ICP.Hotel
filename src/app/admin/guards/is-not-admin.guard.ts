import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStatus } from '../../auth/interfaces';

export const isNotAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const rol = authService.currentUser()?.rol;

  if (
    authService.authStatus() === AuthStatus.authenticated &&
    rol === 'ADMIN'
  ) {
    // router.navigateByUrl('/admin');
    console.log(`rol:${rol}`);
    return false;
  }

  router.navigateByUrl('/auth/login');
  return true;
};
