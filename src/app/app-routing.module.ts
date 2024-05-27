import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'reservas',
    // canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./reservas/reservas.module').then((m) => m.ReservasModule),
  },
  {
    path: '**',
    redirectTo: 'reservas',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
