import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { HabitacionesService } from '../../services/habitaciones-service.service';
import { HabitacionesDatos } from '../../interfaces/habitaciones-datos.interface';

@Component({
  selector: 'habitaciones-editar-habitaciones',
  templateUrl: './editar-habitaciones.component.html',
  styleUrl: './editar-habitaciones.component.css',
})
export class EditarHabitacionesComponent {
  private habitacionesService = inject(HabitacionesService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  public habitacion: HabitacionesDatos | null = null;

  constructor() {}

  ngOnInit(): void {}

  public idHabitacionForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });

  public habitacionForm: FormGroup = this.fb.group({
    idCategoria: ['', [Validators.required]],
  });

  buscarHabitacion(): void {
    this.habitacionesService
      .obtenerHabitacionPorId(this.idHabitacionForm.get('id')!.value)
      .subscribe({
        next: (data) => {
          this.habitacion = data;
          this.habitacionForm.patchValue({
            idCategoria: this.habitacion.idCategoria,
          });
        },
        error: (error) => {
          this.snackbar.open('Habitacion no encontrada', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambios(): void {
    if (!this.habitacion) return;

    const id = this.habitacion.id;
    const idCategoria = this.habitacionForm.get('idCategoria')?.value;

    this.habitacionesService.actualizarHabitacion(id, idCategoria).subscribe({
      next: () => {
        this.snackbar.open('Habitacion actualizada', 'Cerrar', {
          duration: 3000,
        });
        this.habitacion = null;
      },
      error: (error) => {
        this.snackbar.open('Error al actualizar habitacion', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  borrarHabitacion(): void {
    if (!this.habitacion) return;

    this.habitacionesService.borrarHabitacion(this.habitacion.id).subscribe({
      next: () => {
        this.snackbar.open('Habitacion eliminada', 'Cerrar', {
          duration: 3000,
        });
        this.habitacion = null;
      },
      error: (error) => {
        this.snackbar.open('Habitacion no encontrada', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
