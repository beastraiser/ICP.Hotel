import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { ClientesLayoutComponent } from './pages/layout/clientes-layout.component';
import { CrearClientesComponent } from './pages/crear-clientes/crear-clientes.component';
import { VerClientesComponent } from './pages/ver-clientes/ver-clientes.component';
import { EditarClientesComponent } from './pages/editar-clientes/editar-clientes.component';

@NgModule({
  declarations: [ClientesLayoutComponent, CrearClientesComponent, VerClientesComponent, EditarClientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminSharedModule,
  ],
})
export class ClientesModule {}
