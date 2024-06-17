import { Component } from '@angular/core';

@Component({
  templateUrl: './clientes-layout.component.html',
})
export class ClientesLayoutComponent {
  rutas = [
    { path: '/admin/clientes/ver', label: 'Ver' },
    { path: '/admin/clientes/crear', label: 'Crear' },
    { path: '/admin/clientes/editar', label: 'Editar' },
  ];
  modulo = 'Clientes';
}
