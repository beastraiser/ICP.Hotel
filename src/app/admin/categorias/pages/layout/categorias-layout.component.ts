import { Component } from '@angular/core';

@Component({
  templateUrl: './categorias-layout.component.html',
})
export class CategoriasLayoutComponent {
  rutas = [
    { path: '/admin/categorias/ver', label: 'Ver' },
    { path: '/admin/categorias/crear', label: 'Crear' },
    { path: '/admin/categorias/editar', label: 'Editar' },
  ];
  modulo = 'Categorias';
}
