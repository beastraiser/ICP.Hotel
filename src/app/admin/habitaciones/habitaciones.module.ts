import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitacionesRoutingModule } from './habitaciones-routing.module';
import { CrearHabitacionesComponent } from './pages/crear-habitaciones/crear-habitaciones.component';
import { VerHabitacionesComponent } from './pages/ver-habitaciones/ver-habitaciones.component';
import { EditarHabitacionesComponent } from './pages/editar-habitaciones/editar-habitaciones.component';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HabitacionesLayoutComponent } from './pages/layout/habitaciones-layout.component';
import { AdminModule } from '../admin.module';

@NgModule({
  declarations: [
    CrearHabitacionesComponent,
    VerHabitacionesComponent,
    EditarHabitacionesComponent,
    HabitacionesLayoutComponent,
  ],
  imports: [
    CommonModule,
    HabitacionesRoutingModule,
    AdminModule,
    AdminSharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HabitacionesModule {}
