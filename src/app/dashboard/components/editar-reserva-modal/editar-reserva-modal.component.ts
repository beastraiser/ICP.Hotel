import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'dashboard-editar-reserva-modal',
  templateUrl: './editar-reserva-modal.component.html',
  styleUrl: './editar-reserva-modal.component.css',
})
export class EditarReservaModalComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);
  private datePipe = inject(DatePipe);
  editReservaForm: FormGroup;

  public clientId: number = parseInt(localStorage.getItem('idCliente')!);
  public userId: number = parseInt(localStorage.getItem('idUsuario')!);

  constructor(
    public dialogRef: MatDialogRef<EditarReservaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {
    this.editReservaForm = this.fb.group({
      fechaInicio: [
        data.reserva.fechaInicio,
        Validators.required,
        this.validatorsService.isValidDate,
      ],
      fechaFin: [
        data.reserva.fechaFin,
        Validators.required,
        this.validatorsService.isValidDate,
      ],
      reservaHabitacionServicios: this.fb.array(
        data.reserva.reservaHabitacionServicios.map((servicio: any) =>
          this.fb.group({
            idHabitacion: [servicio.idHabitacion, Validators.required],
            idServicio: [servicio.idServicio, Validators.required],
          })
        )
      ),
    });
  }

  get formattedFechaInicio(): string {
    const date = this.editReservaForm.get('fechaInicio')!.value;
    return this.datePipe.transform(date, 'yyyy-MM-dd')!;
  }

  get formattedFechaFin(): string {
    const date = this.editReservaForm.get('fechaFin')!.value;
    return this.datePipe.transform(date, 'yyyy-MM-dd')!;
  }

  onSave() {
    if (this.editReservaForm.valid) {
      let { fechaInicio, fechaFin, reservaHabitacionServicios } =
        this.editReservaForm.value;

      fechaInicio = this.formattedFechaInicio;
      fechaFin = this.formattedFechaFin;

      this.dashboardService
        .actualizarReserva(
          this.data.reserva.id,
          reservaHabitacionServicios,
          this.clientId,
          this.userId,
          fechaInicio,
          fechaFin
        )
        .subscribe({
          next: () => {
            Swal.fire(
              'Actualización exitosa',
              'La reserva ha sido actualizada con éxito',
              'success'
            );
            this.dialogRef.close(true);
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Ha ocurrido un error al actualizar la reserva',
              'error'
            );
            console.error('Error al actualizar la reserva:', error);
          },
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
