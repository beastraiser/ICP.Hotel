import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log({ status: authService.authStatus() });

  if (
    authService.authStatus() === AuthStatus.authenticated &&
    authService.currentUser()?.rol !== 'ADMIN'
  ) {
    router.navigateByUrl('/reservas');
    return false;
  }

  return true;
};
