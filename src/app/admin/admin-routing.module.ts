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
    path: 'servicios',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./servicios/servicios.module').then((m) => m.ServiciosModule),
  },
  {
    path: 'categorias',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./categorias/categorias.module').then((m) => m.CategoriasModule),
  },
  {
    path: 'clientes',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./clientes/clientes.module').then((m) => m.ClientesModule),
  },
  {
    path: 'perfiles',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./perfiles/perfiles.module').then((m) => m.PerfilesModule),
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
