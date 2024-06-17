import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasLayoutComponent } from './pages/layout/categorias-layout.component';
import { VerCategoriasComponent } from './pages/ver-categorias/ver-categorias.component';
import { CrearCategoriasComponent } from './pages/crear-categorias/crear-categorias.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';
import { Error404PageComponent } from '../../shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriasLayoutComponent,
    children: [
      { path: 'ver', component: VerCategoriasComponent },
      { path: 'crear', component: CrearCategoriasComponent },
      { path: 'editar', component: EditarCategoriasComponent },
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
export class CategoriasRoutingModule {}
