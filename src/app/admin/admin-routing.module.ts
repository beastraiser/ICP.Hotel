import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './pages/layout/admin-layout.component';
import { CategoriasPageComponent } from './pages/categorias-page/categorias-page.component';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'categorias', component: CategoriasPageComponent },
      { path: 'usuarios', component: UsuariosPageComponent },
      { path: '404', component: Error404PageComponent },
      { path: '', redirectTo: 'reservas', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
