import { Component, inject } from '@angular/core';
import { Servicio } from '../../../../shared/interfaces/servicios.interface';
import { ServiciosService } from '../../services/servicios-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'servicios-ver-servicios',
  templateUrl: './ver-servicios.component.html',
  styleUrl: './ver-servicios.component.css',
})
export class VerServiciosComponent {
  servicios: Servicio[] = [];
  displayedColumns: string[] = ['id', 'tipo', 'nombre', 'descripcion', 'coste'];
  private servicioService = inject(ServiciosService);
  private snackbar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (error) => {
        this.snackbar.open('No hay servicios', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
