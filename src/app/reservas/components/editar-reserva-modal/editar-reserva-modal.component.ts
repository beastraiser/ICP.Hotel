import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Servicio } from '../../interfaces/servicios.interface';
import { NgModel } from '@angular/forms';
import { Rhs } from '../../interfaces/rhs.interface';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'dashboard-editar-reserva-modal',
  templateUrl: './editar-reserva-modal.component.html',
  styleUrl: './editar-reserva-modal.component.css',
})
export class EditarReservaModalComponent {
  reservationForm: FormGroup;
  servicios: Servicio[] = [];
  extras: Servicio[] = [];
  public rhsPost: Rhs[] = [];

  constructor(
    private fb: FormBuilder,
    private dashboardService: ReservasService,
    private validatorsService: ValidatorsService,
    public dialogRef: MatDialogRef<EditarReservaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe
  ) {
    this.reservationForm = this.fb.group(
      {
        fechaInicio: [
          data.reserva.fechaInicio,
          [Validators.required, this.validatorsService.isValidDate],
        ],
        fechaFin: [
          data.reserva.fechaFin,
          [Validators.required, this.validatorsService.isValidDate],
        ],
      },
      {
        validators: [
          this.validatorsService.isValidInterval('fechaInicio', 'fechaFin'),
        ],
      }
    );
  }

  guardarCambios() {
    const fechaInicio = this.reservationForm.get('fechaInicio')!.value
      ? this.reservationForm.get('fechaInicio')!.value
      : this.data.reserva.fechaInicio;
    const fechaFin = this.reservationForm.get('fechaFin')!.value
      ? this.reservationForm.get('fechaFin')!.value
      : this.data.reserva.fechaFin;

    this.dialogRef.close({
      id: this.data.reserva.id,
      idCliente: this.data.reserva.idCliente,
      idUsuario: this.data.reserva.idUsuario,
      reservaHabitacionServicios: this.data.reserva.reservaHabitacionServicios,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    });
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
