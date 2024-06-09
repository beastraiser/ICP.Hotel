import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesLayoutComponent } from './pages/layout/clientes-layout.component';
import { CrearClientesComponent } from './pages/crear-clientes/crear-clientes.component';
import { VerClientesComponent } from './pages/ver-clientes/ver-clientes.component';
import { EditarClientesComponent } from './pages/editar-clientes/editar-clientes.component';
import { Error404PageComponent } from '../../shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesLayoutComponent,
    children: [
      { path: 'ver', component: VerClientesComponent },
      { path: 'crear', component: CrearClientesComponent },
      { path: 'editar', component: EditarClientesComponent },
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
export class ClientesRoutingModule {}
