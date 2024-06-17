import { Component } from '@angular/core';

@Component({
  templateUrl: './servicios-layout.component.html',
})
export class ServiciosLayoutComponent {
  rutas = [
    { path: '/admin/servicios/ver', label: 'Ver' },
    { path: '/admin/servicios/crear', label: 'Crear' },
    { path: '/admin/servicios/editar', label: 'Editar' },
  ];
  modulo = 'Servicios';
}
