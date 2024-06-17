import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarUsuariosComponent } from './pages/editar-usuarios/editar-usuarios.component';
import { VerUsuariosComponent } from './pages/ver-usuarios/ver-usuarios.component';
import { CrearUsuariosComponent } from './pages/crear-usuarios/crear-usuarios.component';
import { AdminSharedModule } from '../shared/admin-shared.module';
import { UsuariosLayoutComponent } from './pages/layout/usuarios-layout.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditarUsuariosComponent,
    VerUsuariosComponent,
    CrearUsuariosComponent,
    UsuariosLayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminSharedModule,
    UsuariosRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsuariosModule {}
