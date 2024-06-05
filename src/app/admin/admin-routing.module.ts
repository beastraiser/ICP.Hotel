import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './pages/layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'reservas', component: ReservasPageComponent },
      { path: 'panel', component: PanelPersonalPageComponent },
      { path: 'info', component: InformacionPageComponent },
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
