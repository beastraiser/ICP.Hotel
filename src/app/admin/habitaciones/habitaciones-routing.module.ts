import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitacionesLayoutComponent } from './pages/layout/habitaciones-layout.component';
import { VerHabitacionesComponent } from './pages/ver-habitaciones/ver-habitaciones.component';
import { CrearHabitacionesComponent } from './pages/crear-habitaciones/crear-habitaciones.component';
import { EditarHabitacionesComponent } from './pages/editar-habitaciones/editar-habitaciones.component';
import { Error404PageComponent } from '../../shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    component: HabitacionesLayoutComponent,
    children: [
      { path: 'ver', component: VerHabitacionesComponent },
      { path: 'crear', component: CrearHabitacionesComponent },
      { path: 'editar', component: EditarHabitacionesComponent },
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
export class HabitacionesRoutingModule {}
