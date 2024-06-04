import { Component, OnInit, inject } from '@angular/core';
import { Reserva } from '../../interfaces/reservaPost.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { DatePipe } from '@angular/common';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { AuthStatus } from '../../../auth/interfaces';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { EditarReservaModalComponent } from '../../components/editar-reserva-modal/editar-reserva-modal.component';

@Component({
  selector: 'dashboard-panel-personal-page',
  templateUrl: './panel-personal-page.component.html',
  styleUrl: './panel-personal-page.component.css',
})
export class PanelPersonalPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  private validatorsService = inject(ValidatorsService);
  private datePipe = inject(DatePipe);
  private dialog = inject(MatDialog);

  public reservas: Reserva[] = [];

  public isLoggedIn!: boolean;
  public askForAccount = true;
  public hasAccountForm = false;
  public checked = false;
  public userId: number = 0;
  public clientId: number = 0;
  public currentRol = this.authService.currentUser()?.rol;

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  public myReservasCheckForm: FormGroup = this.fb.group({
    DNI: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.dniPattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
  });

  checkUserLoggedIn() {
    this.isLoggedIn =
      this.authService.authStatus() === AuthStatus.authenticated;
    if (this.isLoggedIn && this.currentRol === 'CLIENTE') {
      this.myReservasCheckForm.get('email')?.setValidators(null);
      this.myReservasCheckForm.get('email')?.updateValueAndValidity();
      this.myReservasCheckForm.get('DNI')?.setValidators(null);
      this.myReservasCheckForm.get('DNI')?.updateValueAndValidity();

      this.userId = this.authService.currentUser()!.id;

      this.dashboardService.obtenerClienteConUsuario(this.userId).subscribe({
        next: (cliente) => {
          localStorage.setItem('idCliente', `${cliente.idCliente}`);
          this.clientId = cliente.idCliente;
          this.obtenerReservasPorCliente();
        },
      });
      this.checked = true;
    }
  }

  tieneCuenta(hasAccount: boolean) {
    this.askForAccount = false;
    this.hasAccountForm = hasAccount;
    if (!hasAccount) {
      if (this.currentRol === 'RECEPCION') {
        this.myReservasCheckForm.get('email')?.setValidators(null);
        this.myReservasCheckForm.get('email')?.updateValueAndValidity();
      } else {
        this.router.navigateByUrl('auth/register');
      }
    } else {
      if (this.currentRol === 'RECEPCION') {
        this.myReservasCheckForm.get('DNI')?.setValidators(null);
        this.myReservasCheckForm.get('DNI')?.updateValueAndValidity();
      } else {
        this.router.navigateByUrl('auth/login');
      }
    }
  }

  // Usuario con cuenta pero no logueado
  usuarioConCuenta() {
    const { email } = this.myReservasCheckForm.value;
    return this.dashboardService.obtenerUsuarioPorEmail(email).subscribe({
      next: (usuario) => {
        this.userId = usuario.id;
        localStorage.setItem('idUsuario', `${this.userId}`);
        this.dashboardService.obtenerClienteConUsuario(this.userId).subscribe({
          next: (cliente) => {
            localStorage.setItem('idCliente', `${cliente.idCliente}`);
            this.clientId = cliente.idCliente;
          },
        });
        this.obtenerReservasPorUsuario();
        this.checked = true;
      },
      error: (msg) => {
        console.log(`usuarioConCuenta(): ${msg}`);
      },
    });
  }

  usuarioSinCuenta() {
    const { DNI } = this.myReservasCheckForm.value;
    return this.dashboardService.obtenerClientePorDni(DNI).subscribe({
      next: (cliente) => {
        this.clientId = cliente.id;
        localStorage.setItem('idCliente', `${this.clientId}`);
        localStorage.setItem('idUsuario', '1');
        this.obtenerReservasPorCliente();
        this.checked = true;
      },
      error: (msg) => {
        console.log(`obtenerClientePorDni(): ${msg}`);
      },
    });
  }

  obtenerReservasPorCliente() {
    return this.dashboardService
      .obtenerReservasPorCliente(this.clientId)
      .subscribe({
        next: (reservas) => {
          if (reservas) {
            this.reservas = reservas.filter(
              (reservas) => reservas.cancelada === false
            );
          } else {
            Swal.fire(
              'Error',
              'No se han encontrado reservas a su nombre',
              'error'
            );
          }
        },
        error: (message) => {
          console.log(`obtenerReservasPorCliente(): ${message}`);
        },
      });
  }

  obtenerReservasPorUsuario() {
    return this.dashboardService
      .obtenerReservasPorUsuario(this.userId)
      .subscribe({
        next: (reservas) => {
          this.reservas = reservas.filter(
            (reservas) => reservas.cancelada === false
          );
        },
        error: (message) => {
          console.log(`obtenerReservasPorUsuario(): ${message}`);
        },
      });
  }

  cancelarReserva(id: number) {
    this.dashboardService.cancelarReserva(id).subscribe({
      next: (result) => {
        if (result) {
          Swal.fire(
            'Cancelación exitosa',
            'La reserva ha sido cancelada con éxito',
            'success'
          );
          this.reservas = this.reservas.filter((reserva) => reserva.id !== id);
        } else {
          Swal.fire('Error', 'No se pudo cancelar la reserva', 'error');
        }
      },
      error: (error) => {
        Swal.fire(
          'Error',
          'Ha ocurrido un error al cancelar la reserva',
          'error'
        );
        console.error('Error al cancelar la reserva:', error);
      },
    });
  }
}
