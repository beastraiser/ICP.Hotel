import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelPersonalPageComponent } from './pages/panel-personal-page/panel-personal-page.component';
import { InformacionPageComponent } from './pages/informacion-page/informacion-page.component';
import { CrearPageComponent } from './pages/crear-page/crear-page.component';
import { ReservasLayoutComponent } from './pages/layout-page/layout-page.component';
import { CuentaPageComponent } from './pages/cuenta-page/cuenta-page.component';
import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: ReservasLayoutComponent,
    children: [
      { path: 'crear', component: CrearPageComponent },
      { path: 'panel', component: PanelPersonalPageComponent },
      { path: 'info', component: InformacionPageComponent },
      {
        path: 'cuenta',
        canActivate: [isAuthenticatedGuard],
        component: CuentaPageComponent,
      },
      { path: '', redirectTo: 'crear', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasRoutingModule {}
