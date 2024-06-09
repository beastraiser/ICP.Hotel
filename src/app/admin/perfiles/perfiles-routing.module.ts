import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesLayoutComponent } from './pages/layout/perfiles-layout.component';
import { Error404PageComponent } from '../../shared/pages/error404-page/error404-page.component';
import { VerPerfilesComponent } from './pages/ver-perfiles/ver-perfiles.component';
import { CrearPerfilesComponent } from './pages/crear-perfiles/crear-perfiles.component';
import { EditarPerfilesComponent } from './pages/editar-perfiles/editar-perfiles.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilesLayoutComponent,
    children: [
      { path: 'ver', component: VerPerfilesComponent },
      { path: 'crear', component: CrearPerfilesComponent },
      { path: 'editar', component: EditarPerfilesComponent },
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
export class PerfilesRoutingModule {}
