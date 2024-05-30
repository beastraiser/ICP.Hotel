import { Component, ViewChild, inject } from '@angular/core';
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
import { HabitacionDisponible } from '../../interfaces/habitaciones-disponibles.interface';
import { MatStepper } from '@angular/material/stepper';
import { Servicio } from '../../interfaces/servicios.interface';
import { Rhs } from '../../interfaces/rhs.interface';
import { AuthStatus } from '../../../auth/interfaces';
import Swal from 'sweetalert2';
import { Reserva } from '../../interfaces/reservaPost.interface';

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

  @ViewChild('stepper') private myStepper!: MatStepper;

  public habitacionesDisponibles: HabitacionDisponible[] = [];

  public paginatedHabitaciones: HabitacionDisponible[] = [];
  public pageSize = 8;

  public servicios: Servicio[] = [];
  public extras: Servicio[] = [];
  public selectedServicios: { [habitacionId: number]: number[] } = {};
  public selectedExtras: { [habitacionId: number]: number[] } = {};
  public selectedHabitaciones: HabitacionDisponible[] = [];

  public reservaHabitacionServicios: Rhs[] = [];
  public reserva: Reserva | null = null;

  public isLoggedIn = false;
  public askForAccount = true;
  public hasAccountForm = false;
  public userId: number = 0;
  public clientId: number = 0;

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

  get formattedFechaInicio(): string {
    const date = this.myDisponiblilidadForm.get('fechaInicio')!.value;
    return this.datePipe.transform(date, 'yyyy-MM-dd')!;
  }

  get formattedFechaFin(): string {
    const date = this.myDisponiblilidadForm.get('fechaFin')?.value;
    return this.datePipe.transform(date, 'yyyy-MM-dd')!;
  }

  isValidFieldDisponibilidad(field: string) {
    return this.validatorsService.isValidField(
      this.myDisponiblilidadForm,
      field
    );
  }

  async mostrarHabitaciones(stepper: MatStepper) {
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

  // selectHabitacion(habitacion: HabitacionDisponible) {
  //   this.myHabitacionesServiciosForm
  //     .get('habitacionSeleccionada')
  //     ?.setValue(habitacion);
  //   this.selectedHabitaciones.push(habitacion);
  // }
  toggleHabitacionSeleccionada(habitacion: HabitacionDisponible) {
    const index = this.selectedHabitaciones.findIndex(
      (h) => h.id === habitacion.id
    );
    if (index >= 0) {
      // Si la habitación ya está seleccionada, la quitamos de la lista
      this.selectedHabitaciones.splice(index, 1);
    } else {
      // Si la habitación no está seleccionada, la añadimos a la lista
      this.selectedHabitaciones.push(habitacion);
    }
  }

  isHabitacionSeleccionada(habitacion: HabitacionDisponible): boolean {
    return this.selectedHabitaciones.some((h) => h.id === habitacion.id);
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
    this.isLoggedIn =
      this.authService.authStatus() === AuthStatus.authenticated;
    if (this.isLoggedIn) {
      const idUsuario = localStorage.getItem('idUsuario');
      if (idUsuario != null) {
        this.usuarioLogeado(parseInt(idUsuario));
      }
    }
  }

  crearCliente() {
    const { dni, telefono, nombre, apellidos } =
      this.myDatosPersonalesForm.value;

    return this.dashboardService
      .crearCliente(dni, telefono, nombre, apellidos)
      .subscribe({
        next: (cliente) => {
          this.clientId = cliente.id;
          this.userId = 1;
        },
        error: (msg) => {
          Swal.fire('Registro fallido', msg, 'error');
        },
      });
  }

  // Anula unos campos u otros dependiendo de la opción que elija
  tieneCuenta(hasAccount: boolean) {
    this.askForAccount = false;
    this.hasAccountForm = hasAccount;
    if (!hasAccount) {
      this.myDatosPersonalesForm.get('email')?.setValidators(null);
      this.myDatosPersonalesForm.get('email')?.updateValueAndValidity();
    } else {
      this.myDatosPersonalesForm.get('DNI')?.setValidators(null);
      this.myDatosPersonalesForm.get('nombre')?.setValidators(null);
      this.myDatosPersonalesForm.get('apellidos')?.setValidators(null);
      this.myDatosPersonalesForm.get('telefono')?.setValidators(null);

      this.myDatosPersonalesForm.get('DNI')?.updateValueAndValidity();
      this.myDatosPersonalesForm.get('nombre')?.updateValueAndValidity();
      this.myDatosPersonalesForm.get('apellidos')?.updateValueAndValidity();
      this.myDatosPersonalesForm.get('telefono')?.updateValueAndValidity();
    }
  }

  // Usuario con cuenta pero no logueado
  usuarioConCuenta() {
    const { email } = this.myDatosPersonalesForm.value;
    return this.dashboardService.obtenerUsuarioPorEmail(email).subscribe({
      next: (usuario) => {
        this.usuarioLogeado(usuario.id);
      },
      error: (msg) => {
        console.log(`usuarioConCuenta(): ${msg}`);
      },
    });
  }

  // Usuario logueado
  usuarioLogeado(idUsuario: number) {
    return this.dashboardService.obtenerClienteConUsuario(idUsuario).subscribe({
      next: (cliente) => {
        this.clientId = cliente.idCliente;
        this.userId = idUsuario;
      },
      error: (msg) => {
        console.log(`usuarioLogeado(): ${msg}`);
      },
    });
  }

  onStepChange(event: any) {
    console.log(this.isLoggedIn);
    const step = event.selectedStep;
    if (step) {
      this.checkUserLoggedIn();
    }
  }

  crearReserva() {
    this.generarDatosReserva();

    console.log(
      `Datos enviados: ${JSON.stringify({
        rhs: this.reservaHabitacionServicios,
        idcli: this.clientId,
        idus: this.userId,
        inicio: this.formattedFechaInicio,
        fin: this.formattedFechaFin,
      })}`
    );

    return this.dashboardService
      .crearReserva(
        this.reservaHabitacionServicios,
        this.clientId,
        this.userId,
        this.formattedFechaInicio,
        this.formattedFechaFin
      )
      .subscribe({
        next: (reserva) => {
          this.reserva = reserva;
          Swal.fire(
            '¡Enhorabuena!',
            'Su reserva ha sido creada con éxito',
            'success'
          );
        },
        error: (msg) => {
          console.log(`crearReserva(): ${msg}`);
          Swal.fire('¡Error!', msg, 'error');
        },
      });
  }

  generarDatosReserva() {
    // Recorre todas las habitaciones seleccionadas
    for (const habitacion of this.selectedHabitaciones) {
      // Obtiene los servicios y extras seleccionados para esta habitación
      const serviciosSeleccionados =
        this.selectedServicios[habitacion.id] || [];
      const extrasSeleccionados = this.selectedExtras[habitacion.id] || [];

      // Crea entradas de ReservaHabitacionServicios para esta habitación y sus servicios y extras seleccionados
      if (serviciosSeleccionados.length !== 0) {
        serviciosSeleccionados.forEach((servicioId) => {
          if (!Array.isArray(servicioId)) {
            this.reservaHabitacionServicios.push({
              idHabitacion: habitacion.id,
              idServicio: servicioId,
            });
          }
        });
      }

      if (extrasSeleccionados.length !== 0) {
        extrasSeleccionados.forEach((extraId) => {
          if (!Array.isArray(extraId)) {
            this.reservaHabitacionServicios.push({
              idHabitacion: habitacion.id,
              idServicio: extraId,
            });
          }
        });
      }

      if (
        extrasSeleccionados.length === 0 &&
        serviciosSeleccionados.length === 0
      ) {
        this.reservaHabitacionServicios.push({
          idHabitacion: habitacion.id,
          idServicio: null,
        });
      }
      // // Recorrer y procesar los servicios seleccionados
      // for (const habitacionId in this.selectedServicios) {
      //   if (this.selectedServicios.hasOwnProperty(habitacionId)) {
      //     this.selectedServicios[habitacionId].forEach((servicioId) => {
      //       if (Array.isArray(servicioId)) {
      //         return;
      //       } else {
      //         this.reservaHabitacionServicios.push({
      //           idHabitacion: parseInt(habitacionId, 10),
      //           idServicio: servicioId,
      //         });
      //       }
      //     });
      //   }
      // }

      // // Recorrer y procesar los extras seleccionados
      // for (const habitacionId in this.selectedExtras) {
      //   if (this.selectedExtras.hasOwnProperty(habitacionId)) {
      //     this.selectedExtras[habitacionId].forEach((extraId) => {
      //       if (Array.isArray(extraId)) {
      //         return;
      //       } else {
      //         this.reservaHabitacionServicios.push({
      //           idHabitacion: parseInt(habitacionId, 10),
      //           idServicio: extraId,
      //         });
      //       }
      //     });
      //   }
      // }
    }
    if (this.reservaHabitacionServicios.length === 0) {
      Swal.fire(
        '¡Error!',
        'Seleccione al menos una habitación antes de continuar',
        'error'
      );
      return;
    }
  }

  resetForm() {
    this.myDatosPersonalesForm.reset();
    this.myDisponiblilidadForm.reset();
    this.myHabitacionesServiciosForm.reset();
    this.isLoggedIn = false;
    this.askForAccount = true;
    this.hasAccountForm = false;
    this.servicios = [];
    this.extras = [];
    this.selectedServicios = {};
    this.selectedExtras = {};
    this.habitacionesDisponibles = [];
    this.paginatedHabitaciones = [];
    this.reservaHabitacionServicios = [];
    this.reserva = null;

    this.myStepper.reset();
  }
}
