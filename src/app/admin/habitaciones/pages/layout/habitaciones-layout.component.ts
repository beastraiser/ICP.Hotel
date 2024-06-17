import { Component } from '@angular/core';

@Component({
  templateUrl: './habitaciones-layout.component.html',
})
export class HabitacionesLayoutComponent {
  rutas = [
    { path: '/admin/habitaciones/ver', label: 'Ver' },
    { path: '/admin/habitaciones/crear', label: 'Crear' },
    { path: '/admin/habitaciones/editar', label: 'Editar' },
  ];
  modulo = 'Habitaciones';
}
