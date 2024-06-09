import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { CrearServiciosComponent } from './pages/crear-servicios/crear-servicios.component';
import { VerServiciosComponent } from './pages/ver-servicios/ver-servicios.component';
import { EditarServiciosComponent } from './pages/editar-servicios/editar-servicios.component';
import { AdminModule } from '../admin.module';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiciosLayoutComponent } from './pages/layout/servicios-layout.component';

@NgModule({
  declarations: [
    CrearServiciosComponent,
    VerServiciosComponent,
    EditarServiciosComponent,
    ServiciosLayoutComponent,
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    AdminModule,
    AdminSharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ServiciosModule {}
