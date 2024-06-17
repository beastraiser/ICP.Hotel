import { Component } from '@angular/core';

@Component({
  templateUrl: './perfiles-layout.component.html',
})
export class PerfilesLayoutComponent {
  rutas = [
    { path: '/admin/perfiles/ver', label: 'Ver' },
    { path: '/admin/perfiles/crear', label: 'Crear' },
    { path: '/admin/perfiles/editar', label: 'Editar' },
  ];
  modulo = 'Perfiles';
}
