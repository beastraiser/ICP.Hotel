import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiciosLayoutComponent } from './pages/layout/servicios-layout.component';
import { VerServiciosComponent } from './pages/ver-servicios/ver-servicios.component';
import { CrearServiciosComponent } from './pages/crear-servicios/crear-servicios.component';
import { EditarServiciosComponent } from './pages/editar-servicios/editar-servicios.component';
import { Error404PageComponent } from '../../shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosLayoutComponent,
    children: [
      { path: 'ver', component: VerServiciosComponent },
      { path: 'crear', component: CrearServiciosComponent },
      { path: 'editar', component: EditarServiciosComponent },
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
export class ServiciosRoutingModule {}
