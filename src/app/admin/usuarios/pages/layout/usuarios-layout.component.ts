import { Component, computed, inject } from '@angular/core';

@Component({
  templateUrl: './usuarios-layout.component.html',
})
export class UsuariosLayoutComponent {
  rutas = [
    { path: '/admin/usuarios/ver', label: 'Ver' },
    { path: '/admin/usuarios/crear', label: 'Crear' },
    { path: '/admin/usuarios/editar', label: 'Editar' },
  ];
  modulo = 'Usuarios';
}
