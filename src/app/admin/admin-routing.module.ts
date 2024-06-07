import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './pages/layout/admin-layout.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
  {
    path: 'habitaciones',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./habitaciones/habitaciones.module').then(
        (m) => m.HabitacionesModule
      ),
  },
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
