import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Reserva } from '../../interfaces/reservaPost.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarReservaModalComponent } from '../editar-reserva-modal/editar-reserva-modal.component';
import Swal from 'sweetalert2';
import { ReservasService } from '../../services/reservas.service';

@Component({
  selector: 'dashboard-reserva-card-component',
  templateUrl: './reserva-card-component.component.html',
  styleUrl: './reserva-card-component.component.css',
})
export class ReservaCardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dashboardService = inject(ReservasService);
  private validatorsService = inject(ValidatorsService);
  private datePipe = inject(DatePipe);
  private dialog = inject(MatDialog);

  @Input()
  public reserva!: Reserva;
  public reservaButtons!: boolean;

  @Output() cancelar = new EventEmitter<number>();

  ngOnInit(): void {
    if (!this.reserva) throw Error('Usted no tiene reservas');
  }

  onCancelarReserva() {
    this.cancelar.emit(this.reserva.id);
  }

  openEditarReservaModal() {
    const dialogRef = this.dialog.open(EditarReservaModalComponent, {
      width: 'auto',
      data: { reserva: this.reserva }, // Pasar la reserva al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El modal se ha cerrado con resultado:', result);
      if (result) {
        this.updateReservation(result);
      }
    });
  }

  updateReservation(updatedData: any) {
    this.dashboardService
      .actualizarReserva(
        updatedData.id,
        updatedData.reservaHabitacionServicios,
        updatedData.idCliente,
        updatedData.idUsuario,
        updatedData.fechaInicio,
        updatedData.fechaFin,
        updatedData.pagado
      )
      .subscribe({
        next: () => {
          Swal.fire(
            '¡Exito!',
            'Actualice la página para ver las modificaciones',
            'success'
          );
        },
        error: (err) => {
          console.error('Error actualizando reserva', err.message);
          Swal.fire('¡Error!', err.message, 'error');
        },
      });
  }

  payReservation(id: number) {
    this.dashboardService.pagarReserva(this.reserva!.id).subscribe({
      next: () => {
        this.reserva!.pagado = true;
        Swal.fire({
          title: '¡Enhorabuena!',
          text: 'Su reserva ha sido pagada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      error: (msg) => {
        console.log(`payReservation(): ${msg}`);
        Swal.fire('¡Error!', msg, 'error');
      },
    });
    window.open('https://www.paypal.com', '_blank');
  }
}
