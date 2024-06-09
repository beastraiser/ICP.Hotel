import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilesRoutingModule } from './perfiles-routing.module';
import { PerfilesLayoutComponent } from './pages/layout/perfiles-layout.component';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerPerfilesComponent } from './pages/ver-perfiles/ver-perfiles.component';
import { CrearPerfilesComponent } from './pages/crear-perfiles/crear-perfiles.component';
import { EditarPerfilesComponent } from './pages/editar-perfiles/editar-perfiles.component';

@NgModule({
  declarations: [
    PerfilesLayoutComponent,
    VerPerfilesComponent,
    CrearPerfilesComponent,
    EditarPerfilesComponent,
  ],
  imports: [
    CommonModule,
    PerfilesRoutingModule,
    AdminSharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PerfilesModule {}
