import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservasService } from '../../../../reservas/services/reservas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { HabitacionesService } from '../../services/habitaciones-service.service';

@Component({
  selector: 'habitaciones-crear-habitaciones',
  templateUrl: './crear-habitaciones.component.html',
  styleUrl: './crear-habitaciones.component.css',
})
export class CrearHabitacionesComponent {
  private habitacionesService = inject(HabitacionesService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  constructor() {}

  ngOnInit(): void {}

  public createRoomForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    idCategoria: ['', [Validators.required]],
  });

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  crearHabitacion(): void {
    const id = this.createRoomForm.get('id')?.value;
    const idCategoria = this.createRoomForm.get('idCategoria')?.value;

    this.habitacionesService.crearHabitacion(id, idCategoria).subscribe({
      next: () => {
        this.snackbar.open('Habitacion creada', 'Cerrar', {
          duration: 3000,
        });
        this.createRoomForm.reset();
      },
      error: (error) => {
        this.snackbar.open('Error al crear habitacion', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
