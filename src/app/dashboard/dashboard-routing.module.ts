import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/layout/dahsboard-layout.component';
import { ReservasPageComponent } from './pages/reservas-page/reservas-page.component';
import { PanelPersonalPageComponent } from './pages/panel-personal-page/panel-personal-page.component';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'reservas', component: ReservasPageComponent },
      { path: 'panel', component: PanelPersonalPageComponent },
      { path: '404', component: Error404PageComponent },
      { path: '', redirectTo: 'reservas', pathMatch: 'full' },
      // { path: '**', redirectTo: '404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
