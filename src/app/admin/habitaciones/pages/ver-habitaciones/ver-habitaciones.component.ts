import { Component, inject } from '@angular/core';
import { HabitacionesDatos } from '../../interfaces/habitaciones-datos.interface';
import { HabitacionesService } from '../../services/habitaciones-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'habitaciones-ver-habitaciones',
  templateUrl: './ver-habitaciones.component.html',
  styleUrl: './ver-habitaciones.component.css',
})
export class VerHabitacionesComponent {
  habitaciones: HabitacionesDatos[] = [];
  displayedColumns: string[] = ['id', 'idCategoria'];
  private userService = inject(HabitacionesService);
  private snackbar = inject(MatSnackBar);

  constructor() {}

  ngOnInit(): void {
    this.userService.obtenerHabitaciones().subscribe({
      next: (data) => {
        this.habitaciones = data;
      },
      error: (error) => {
        this.snackbar.open('No hay habitaciones', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
