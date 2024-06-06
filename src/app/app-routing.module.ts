import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { isAdminGuard } from './admin/guards/is-admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'reservas',
    loadChildren: () =>
      import('./reservas/reservas.module').then((m) => m.ReservasModule),
  },
  {
    path: 'admin',
    canActivate: [isAdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    redirectTo: 'reservas',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
