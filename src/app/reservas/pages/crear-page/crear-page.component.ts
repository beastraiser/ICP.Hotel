import { Component, ViewChild, inject, OnInit, Signal } from '@angular/core';
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
import { ReservasService } from '../../services/reservas.service';
import { HabitacionDisponible } from '../../interfaces/habitaciones-disponibles.interface';
import { MatStepper } from '@angular/material/stepper';
import { Servicio } from '../../../shared/interfaces/servicios.interface';
import { Rhs } from '../../interfaces/rhs.interface';
import { AuthStatus, User } from '../../../auth/interfaces';
import Swal from 'sweetalert2';
import { Reserva } from '../../interfaces/reservaPost.interface';

@Component({
  selector: 'reservas-crear-page',
  templateUrl: './crear-page.component.html',
  styleUrl: './crear-page.component.css',
})
export class CrearPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private dashboardService = inject(ReservasService);
  private validatorsService = inject(ValidatorsService);
  private datePipe = inject(DatePipe);

  @ViewChild('stepper') private myStepper!: MatStepper;

  public habitacionesDisponibles: HabitacionDisponible[] = [];

  public paginatedHabitaciones: HabitacionDisponible[] = [];
  public pageSize = 4;

  public servicios: Servicio[] = [];
  public extras: Servicio[] = [];
  public selectedServicios: { [habitacionId: number]: number[] } = {};
  public selectedExtras: { [habitacionId: number]: number[] } = {};
  public selectedHabitaciones: HabitacionDisponible[] = [];

  public reservaHabitacionServicios: Rhs[] = [];
  public reserva: Reserva | null = null;

  public isLoggedIn = false;
  public askForAccount = true;
  public askForReservation = false;
  public hasAccountForm = false;
  public isFirstReservation = false;
  public userId: number = 0;
  public clientId: number = 0;

  public habitacionesAgrupadas: any[] = [];
  public currentRol = this.authService.currentUser()?.rol;

  public pagado: boolean = false;

  ngOnInit(): void {}

  public myDisponiblilidadForm: FormGroup = this.fb.group(
    {
      fechaInicio: [
        '',
        [Validators.required, this.validatorsService.isValidDate],
      ],
      fechaFin: ['', [Validators.required, this.validatorsService.isValidDate]],
      maximoPersonas: ['', [Validators.required, Validators.min(1)]],
    },
    {
      validators: [
        this.validatorsService.isValidInterval('fechaInicio', 'fechaFin'),
      ],
    }
  );

  public myHabitacionesServiciosForm: FormGroup = this.fb.group({
    habitacionSeleccionada: [''],
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
        Validators.pattern(this.validatorsService.nombresPattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    contrasenya: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.passwordPattern),
      ],
    ],
  });

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

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
          (servicio) => servicio.tipo === 'SERVICIO' && servicio.id !== 1
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
    if (
      this.authService.authStatus() === AuthStatus.authenticated &&
      this.authService.currentUser()?.rol === 'CLIENTE'
    )
      this.isLoggedIn =
        this.authService.authStatus() === AuthStatus.authenticated;
    if (this.isLoggedIn) {
      const idUsuario = this.authService.currentUser()?.id;
      if (idUsuario) {
        this.usuarioLogeado(idUsuario);
        // Anulo los campos para que el formulario pase a valid
        this.myDatosPersonalesForm.get('email')?.setValidators(null);
        this.myDatosPersonalesForm.get('DNI')?.setValidators(null);
        this.myDatosPersonalesForm.get('nombre')?.setValidators(null);
        this.myDatosPersonalesForm.get('apellidos')?.setValidators(null);
        this.myDatosPersonalesForm.get('telefono')?.setValidators(null);
        this.myDatosPersonalesForm.get('contrasenya')?.setValidators(null);

        this.myDatosPersonalesForm.get('email')?.updateValueAndValidity();
        this.myDatosPersonalesForm.get('DNI')?.updateValueAndValidity();
        this.myDatosPersonalesForm.get('nombre')?.updateValueAndValidity();
        this.myDatosPersonalesForm.get('apellidos')?.updateValueAndValidity();
        this.myDatosPersonalesForm.get('telefono')?.updateValueAndValidity();
        this.myDatosPersonalesForm.get('contrasenya')?.updateValueAndValidity();
      }
    }
  }

  crearCliente() {
    const { DNI, telefono, nombre, apellidos } =
      this.myDatosPersonalesForm.value;

    return this.dashboardService
      .crearCliente(DNI, telefono, nombre, apellidos)
      .subscribe({
        next: (cliente) => {
          this.clientId = cliente.id;

          // Ruta para el usuario recepcion
          if (
            this.authService.authStatus() === AuthStatus.authenticated &&
            this.authService.currentUser()!.rol === 'RECEPCION'
          ) {
            this.userId = this.authService.currentUser()!.id;
            // Ruta para el cliente sin cuenta. Se le asigna el usuario invitado
          } else {
            this.userId = 1;
          }
          Swal.fire('Datos enviados con éxito', '', 'success');
          this.myStepper.next();
        },
        error: (msg) => {
          Swal.fire('Registro fallido', msg, 'error');
        },
      });
  }

  obtenerClientePorDNI() {
    const { DNI } = this.myDatosPersonalesForm.value;

    return this.dashboardService.obtenerClientePorDni(DNI).subscribe({
      next: (cliente) => {
        this.clientId = cliente.id;
        // Ruta para el usuario recepcion
        if (
          this.authService.authStatus() === AuthStatus.authenticated &&
          this.authService.currentUser()!.rol === 'RECEPCION'
        ) {
          this.userId = this.authService.currentUser()!.id;
        }
        // Ruta para el cliente sin cuenta. Se le asigna el usuario invitado
        else {
          this.userId = 1;
        }
        Swal.fire('Datos enviados con éxito', '', 'success');
        this.myStepper.next();
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
      this.askForReservation = true;
      this.myDatosPersonalesForm.get('email')?.setValidators(null);
      this.myDatosPersonalesForm.get('contrasenya')?.setValidators(null);
      this.myDatosPersonalesForm.get('email')?.updateValueAndValidity();
      this.myDatosPersonalesForm.get('contrasenya')?.updateValueAndValidity();
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

  esPrimeraReserva(esPrimera: boolean) {
    this.askForReservation = false;
    this.isFirstReservation = esPrimera;
    if (!esPrimera) {
      this.myDatosPersonalesForm.get('nombre')?.setValidators(null);
      this.myDatosPersonalesForm.get('apellidos')?.setValidators(null);
      this.myDatosPersonalesForm.get('telefono')?.setValidators(null);
      this.myDatosPersonalesForm.get('nombre')?.updateValueAndValidity();
      this.myDatosPersonalesForm.get('apellidos')?.updateValueAndValidity();
      this.myDatosPersonalesForm.get('telefono')?.updateValueAndValidity();
    }
  }

  // Usuario con cuenta pero no logueado
  usuarioConCuenta() {
    const { email, contrasenya } = this.myDatosPersonalesForm.value;

    this.dashboardService
      .checkUsuarioCredenciales(email, contrasenya)
      .subscribe({
        next: (user) => {
          if (user.idPerfil !== 4) {
            Swal.fire('Datos erroneos', 'Usuario no autorizado', 'error');
            return;
          }
          this.usuarioLogeado(user.id);
          Swal.fire('Datos enviados con éxito', '', 'success');
          this.myStepper.next();
        },
        error: (message) => {
          Swal.fire('Datos erroneos', message, 'error');
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
    const step = event.selectedStep;
    if (step) {
      this.checkUserLoggedIn();
    }
  }

  crearReserva() {
    this.generarDatosReserva();

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
          this.agruparHabitaciones();
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
    this.reservaHabitacionServicios = [];

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
          idServicio: 1,
        });
      }
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

  agruparHabitaciones() {
    const habitacionesMap = new Map<number, any>();

    this.reservaHabitacionServicios.forEach((servicio) => {
      if (!habitacionesMap.has(servicio.idHabitacion)) {
        const habitacionReserva = this.reserva?.reservaHabitacionServicios.find(
          (h) => h.idHabitacion === servicio.idHabitacion
        );

        habitacionesMap.set(servicio.idHabitacion, {
          idHabitacion: servicio.idHabitacion,
          tipoHabitacion: habitacionReserva!.tipoHabitacion,
          servicios: [],
        });
      }
      const habitacion = habitacionesMap.get(servicio.idHabitacion);
      const servicioNombre =
        this.servicios.find((s) => s.id === servicio.idServicio)?.nombre ||
        'Desconocido';
      const extraNombre =
        this.extras.find((e) => e.id === servicio.idServicio)?.nombre ||
        'Desconocido';

      if (servicioNombre !== 'Desconocido') {
        habitacion.servicios.push(servicioNombre);
      }

      if (extraNombre !== 'Desconocido') {
        habitacion.servicios.push(extraNombre);
      }
    });

    this.habitacionesAgrupadas = Array.from(habitacionesMap.values());
  }

  redirectToPaypal() {
    if (!this.reserva) {
      Swal.fire('¡Error!', 'No se pudo crear la reserva', 'error');
    }
    this.dashboardService.pagarReserva(this.reserva!.id).subscribe({
      next: () => {
        // this.reserva!.pagado = true;
        Swal.fire({
          title: '¡Enhorabuena!',
          text: 'Su reserva ha sido pagada con éxito',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.resetForm();
          }
        });
      },
      error: (msg) => {
        console.log(`crearReserva(): ${msg}`);
        Swal.fire('¡Error!', msg, 'error');
      },
    });
    window.open('https://www.paypal.com', '_blank');
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
    this.selectedHabitaciones = [];
    this.habitacionesAgrupadas = [];
    this.paginatedHabitaciones = [];
    this.reservaHabitacionServicios = [];
    this.reserva = null;
    this.userId = 0;
    this.clientId = 0;
    this.pagado = false;

    this.myStepper.reset();
  }
}
