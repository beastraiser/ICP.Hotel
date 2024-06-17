import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { VerCategoriasComponent } from './pages/ver-categorias/ver-categorias.component';
import { EditarCategoriasComponent } from './pages/editar-categorias/editar-categorias.component';
import { CrearCategoriasComponent } from './pages/crear-categorias/crear-categorias.component';
import { AdminModule } from '../admin.module';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriasLayoutComponent } from './pages/layout/categorias-layout.component';
import { TipoCamasToStringPipe } from './pipes/tipo-camas-to-string.pipe';

@NgModule({
  declarations: [
    VerCategoriasComponent,
    EditarCategoriasComponent,
    CrearCategoriasComponent,
    CategoriasLayoutComponent,
    TipoCamasToStringPipe,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    AdminModule,
    AdminSharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CategoriasModule {}
