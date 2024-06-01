import { Component, OnInit, inject } from '@angular/core';
import { Reserva } from '../../interfaces/reservaPost.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { DatePipe } from '@angular/common';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { AuthStatus } from '../../../auth/interfaces';

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

  public reservas: Reserva[] = [];

  public isLoggedIn!: boolean;
  public askForAccount = true;
  public hasAccountForm = false;
  public checked = false;
  public userId: number = 0;
  public clientId: number = 0;

  ngOnInit(): void {
    this.checkUserLoggedIn();
    localStorage.setItem('ruta', '/reservas/panel');
    // this.router.navigateByUrl('/reservas/panel');
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
    if (this.isLoggedIn) {
      this.userId = parseInt(localStorage.getItem('idUsuario')!);
      this.obtenerReservasPorUsuario();
    }
    return;
  }

  tieneCuenta(hasAccount: boolean) {
    this.askForAccount = false;
    this.hasAccountForm = hasAccount;
    if (!hasAccount) {
      this.myReservasCheckForm.get('email')?.setValidators(null);
      this.myReservasCheckForm.get('email')?.updateValueAndValidity();
    } else {
      this.myReservasCheckForm.get('DNI')?.setValidators(null);
      this.myReservasCheckForm.get('DNI')?.updateValueAndValidity();
    }
  }

  // Usuario con cuenta pero no logueado
  usuarioConCuenta() {
    const { email } = this.myReservasCheckForm.value;
    return this.dashboardService.obtenerUsuarioPorEmail(email).subscribe({
      next: (usuario) => {
        this.userId = usuario.id;
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
          this.reservas = reservas;
        },
        error: (msg) => {
          console.log(`obtenerReservasPorCliente(): ${msg}`);
        },
      });
  }

  obtenerReservasPorUsuario() {
    return this.dashboardService
      .obtenerReservasPorUsuario(this.userId)
      .subscribe({
        next: (reservas) => {
          this.reservas = reservas;
        },
        error: (msg) => {
          console.log(`obtenerReservasPorUsuario(): ${msg}`);
        },
      });
  }
}
