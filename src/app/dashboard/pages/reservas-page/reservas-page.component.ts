import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DatePipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { tap } from 'rxjs';
import { HabitacionDisponible } from '../../interfaces/habitaciones-disponibles.interface';
import { MatStepper } from '@angular/material/stepper';
import { Servicio } from '../../interfaces/servicios.interface';
import { ReservaPost } from '../../interfaces/reservaPost.interface';
import { Rhs } from '../../interfaces/rhs.interface';

@Component({
  selector: 'app-reservas-page',
  templateUrl: './reservas-page.component.html',
  styleUrl: './reservas-page.component.css',
})
export class ReservasPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  private validatorsService = inject(ValidatorsService);
  private datePipe = inject(DatePipe);

  public habitacionesDisponibles: HabitacionDisponible[] = [];

  public paginatedHabitaciones: HabitacionDisponible[] = [];
  public pageSize = 5;

  public servicios: Servicio[] = [];
  public extras: Servicio[] = [];
  public selectedServicios: { [habitacionId: number]: number[] } = {};
  public selectedExtras: { [habitacionId: number]: number[] } = {};

  public reservaHabitacionServicios: Rhs[] = [];

  public isLoggedIn = false;
  public askForAccount = true;
  public hasAccountForm = false;
  public userId: number | null = null;
  public clientId: number | null = null;

  public myDisponiblilidadForm: FormGroup = this.fb.group({
    fechaInicio: [
      '',
      [Validators.required, this.validatorsService.isValidDate],
    ],
    fechaFin: ['', [Validators.required, this.validatorsService.isValidDate]],
    maximoPersonas: ['', [Validators.required, Validators.min(1)]],
  });

  public myHabitacionesServiciosForm: FormGroup = this.fb.group({
    habitacionSeleccionada: ['', Validators.required],
  });

  public myDatosPersonalesForm: FormGroup = this.fb.group({
    DNI: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.dniPattern),
      ],
    ],
    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.tlfPattern),
      ],
    ],
    nombre: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.nombresPattern),
      ],
    ],
    apellidos: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.apellidosPattern),
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

  get formattedFechaInicio(): string | null {
    const date = this.myDisponiblilidadForm.get('fechaInicio')?.value;
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') : '';
  }

  get formattedFechaFin(): string | null {
    const date = this.myDisponiblilidadForm.get('fechaFin')?.value;
    return date ? this.datePipe.transform(date, 'yyyy-MM-dd') : '';
  }

  isValidFieldDisponibilidad(field: string) {
    return this.validatorsService.isValidField(
      this.myDisponiblilidadForm,
      field
    );
  }

  mostrarHabitaciones(stepper: MatStepper) {
    let { fechaInicio, fechaFin, maximoPersonas } =
      this.myDisponiblilidadForm.value;

    fechaInicio = this.formattedFechaInicio;
    fechaFin = this.formattedFechaFin;

    this.cargarServicios();

    this.dashboardService
      .mostrarHabitaciones(fechaInicio, fechaFin, maximoPersonas)
      .subscribe({
        next: (habitaciones) => {
          this.habitacionesDisponibles = habitaciones;
          this.paginatedHabitaciones = this.habitacionesDisponibles.slice(
            0,
            this.pageSize
          );
          this.myDisponiblilidadForm.markAllAsTouched();
          this.myHabitacionesServiciosForm.reset();
          stepper.next();
        },
        error: (msg) => {
          console.log(msg);
        },
      });
  }

  cargarServicios() {
    this.dashboardService.mostrarServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios.filter(
          (servicio) => servicio.tipo === 'SERVICIO'
        );
        this.extras = servicios.filter((servicio) => servicio.tipo === 'EXTRA');
      },
    });
  }

  // Método para cambiar de página en el paginador
  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedHabitaciones = this.habitacionesDisponibles.slice(
      startIndex,
      endIndex
    );
  }

  selectHabitacion(habitacion: HabitacionDisponible) {
    this.myHabitacionesServiciosForm
      .get('habitacionSeleccionada')
      ?.setValue(habitacion);
  }

  // Método para agregar o quitar servicios seleccionados
  toggleServiceSelection(habitacionId: number, servicioId: number) {
    if (!this.selectedServicios[habitacionId]) {
      this.selectedServicios[habitacionId] = [];
    }
    const index = this.selectedServicios[habitacionId].indexOf(servicioId);
    if (index >= 0) {
      this.selectedServicios[habitacionId].splice(index, 1);
    } else {
      this.selectedServicios[habitacionId].push(servicioId);
    }
  }

  // Método para agregar o quitar extras seleccionados
  toggleExtraSelection(habitacionId: number, extraId: number) {
    if (!this.selectedExtras[habitacionId]) {
      this.selectedExtras[habitacionId] = [];
    }
    const index = this.selectedExtras[habitacionId].indexOf(extraId);
    if (index >= 0) {
      this.selectedExtras[habitacionId].splice(index, 1);
    } else {
      this.selectedExtras[habitacionId].push(extraId);
    }
  }

  checkUserLoggedIn() {
    // const user = this.authService.getUserFromLocalStorage();
    // if (user) {
    //   this.isLoggedIn = true;
    //   this.userId = user.idUsuario;
    //   this.clientId = user.idCliente;
    //   this.myDatosPersonalesForm.patchValue({
    //     nombre: user.nombre,
    //     apellidos: user.apellidos,
    //     email: user.email,
    //     telefono: user.telefono,
    //   });
    // } else {
    //   this.isLoggedIn = false;
    // }
  }

  hasAccount(hasAccount: boolean) {
    // this.askForAccount = false;
    // this.hasAccountForm = hasAccount;
    // if (!hasAccount) {
    //   this.myDatosPersonalesForm.get('email')?.setValidators(null);
    //   this.myDatosPersonalesForm.get('email')?.updateValueAndValidity();
    // }
  }

  generateFinalJSON() {
    // Recorrer y procesar los servicios seleccionados
    for (const habitacionId in this.selectedServicios) {
      if (this.selectedServicios.hasOwnProperty(habitacionId)) {
        this.selectedServicios[habitacionId].forEach((servicioId) => {
          if (Array.isArray(servicioId)) {
            return;
          } else {
            this.reservaHabitacionServicios.push({
              idHabitacion: parseInt(habitacionId, 10),
              idServicio: servicioId,
            });
          }
        });
      }
    }

    // Recorrer y procesar los extras seleccionados
    for (const habitacionId in this.selectedExtras) {
      if (this.selectedExtras.hasOwnProperty(habitacionId)) {
        this.selectedExtras[habitacionId].forEach((extraId) => {
          if (Array.isArray(extraId)) {
            return;
          } else {
            this.reservaHabitacionServicios.push({
              idHabitacion: parseInt(habitacionId, 10),
              idServicio: extraId,
            });
          }
        });
      }
    }

    const reserva = {
      reservaHabitacionServicios: this.reservaHabitacionServicios,
      fechaInicio: this.formattedFechaInicio,
      fechaFin: this.formattedFechaFin,
      idUsuario: this.userId,
      idCliente: this.clientId,
    };

    console.log(reserva);
    // Aquí puedes enviar el JSON final al servidor
  }
}

// // Método para generar el JSON final
// generateFinalJSON() {
//   const reservaHabitacionServicios = [];
//   for (const habitacionId in this.selectedServicios) {
//     this.selectedServicios[habitacionId].forEach((servicioId) => {
//       reservaHabitacionServicios.push({
//         idHabitacion: habitacionId,
//         idServicio: servicioId,
//       });
//     });
//   }
//   for (const habitacionId in this.selectedExtras) {
//     this.selectedExtras[habitacionId].forEach((extraId) => {
//       reservaHabitacionServicios.push({
//         idHabitacion: habitacionId,
//         idServicio: extraId,
//       });
//     });
//   }

//   const finalJSON<ReservaPost> = {
//     reservaHabitacionServicios,
//     idCliente: this.authService.user.idCliente,
//     idUsuario: this.authService.user.idUsuario,
//     fechaInicio: this.formattedFechaInicio,
//     fechaFin: this.formattedFechaFin,
//   };

//   console.log(finalJSON);
// Aquí puedes enviar el JSON final al servidor
