import { Component, inject } from '@angular/core';
import { ClienteDatos } from '../../../../shared/interfaces/cliente.interface';
import { ClientesService } from '../../services/clientes-service.service';

@Component({
  selector: 'clientes-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrl: './ver-clientes.component.css',
})
export class VerClientesComponent {
  clientes: ClienteDatos[] = [];
  displayedColumns: string[] = ['id', 'dni', 'telefono', 'nombre', 'apellidos'];
  private clienteService = inject(ClientesService);

  constructor() {}

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe((data) => {
      this.clientes = data;
    });
  }
}
