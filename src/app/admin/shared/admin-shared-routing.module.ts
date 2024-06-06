import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404PageComponent } from '../../shared/pages/error404-page/error404-page.component';
import { VerUsuariosComponent } from '../usuarios/pages/ver-usuarios/ver-usuarios.component';
import { CrearUsuariosComponent } from '../usuarios/pages/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from '../usuarios/pages/editar-usuarios/editar-usuarios.component';
import { EliminarUsuariosComponent } from '../usuarios/pages/eliminar-usuarios/eliminar-usuarios.component';
import { UsuariosLayoutComponent } from '../usuarios/pages/layout/usuarios-layout.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosLayoutComponent,
    children: [
      { path: 'ver', component: VerUsuariosComponent },
      { path: 'crear', component: CrearUsuariosComponent },
      { path: 'editar', component: EditarUsuariosComponent },
      { path: 'eliminar', component: EliminarUsuariosComponent },
      { path: '404', component: Error404PageComponent },
      { path: '', redirectTo: 'ver', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSharedRoutingModule {}
