import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../admin/usuarios/services/user-service.service';
import { ReservasService } from '../../services/reservas.service';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { UsuarioDatos } from '../../../shared/interfaces/usuario-datos.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces';
import { Router } from '@angular/router';
import { ClienteDatos } from '../../../shared/interfaces/cliente.interface';
import { ClientesService } from '../../../admin/clientes/services/clientes-service.service';
import { ClienteUsuario } from '../../interfaces/cliente-usuario.interface';

@Component({
  selector: 'app-cuenta-page',
  templateUrl: './cuenta-page.component.html',
  styleUrl: './cuenta-page.component.css',
})
export class CuentaPageComponent {
  private userService = inject(UserService);
  private clientesService = inject(ClientesService);
  private reservasService = inject(ReservasService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private authService = inject(AuthService);

  public clienteUsuario: ClienteUsuario | null = null;
  public isLoggedIn!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.checkUserLoggedIn();
  }

  public usuarioEditForm: FormGroup = this.fb.group(
    {
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      contrasenya: [
        '',
        [Validators.pattern(this.validatorsService.passwordPattern)],
      ],
      contrasenya2: [
        '',
        Validators.pattern(this.validatorsService.passwordPattern),
      ],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo(
          'contrasenya',
          'contrasenya2'
        ),
      ],
    }
  );

  public clienteEditForm: FormGroup = this.fb.group({
    dni: [
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
  });

  checkUserLoggedIn() {
    if (
      this.authService.authStatus() === AuthStatus.authenticated &&
      this.authService.currentUser()?.rol === 'CLIENTE'
    )
      this.isLoggedIn =
        this.authService.authStatus() === AuthStatus.authenticated;
    if (this.isLoggedIn) {
      this.buscarClienteUsuario();
    }
  }

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  buscarClienteUsuario() {
    this.reservasService
      .obtenerClienteConUsuario(this.authService.currentUser()!.id)
      .subscribe({
        next: (data) => {
          this.clienteUsuario = data;
          this.clienteEditForm.patchValue({
            dni: this.clienteUsuario.dni,
            telefono: this.clienteUsuario.telefono,
            nombre: this.clienteUsuario.nombre,
            apellidos: this.clienteUsuario.apellidos,
          });
          this.usuarioEditForm.patchValue({
            email: this.clienteUsuario.email,
          });
        },
        error: (error) => {
          this.snackbar.open('Usuario no encontrado', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambiosCliente(): void {
    if (!this.clienteUsuario) return;

    const id = this.clienteUsuario.idCliente;
    const dni = this.clienteEditForm.get('dni')?.value;
    const telefono = this.clienteEditForm.get('telefono')?.value;
    const nombre = this.clienteEditForm.get('nombre')?.value;
    const apellidos = this.clienteEditForm.get('apellidos')?.value;

    this.clientesService
      .actualizarCliente(id, dni, telefono, nombre, apellidos)
      .subscribe({
        next: () => {
          this.snackbar.open('Cliente actualizado', 'Cerrar', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackbar.open('Error al actualizar cliente', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambiosUsuario(): void {
    if (!this.clienteUsuario) return;

    const idPerfil = this.clienteUsuario.idPerfil;
    const email = this.usuarioEditForm.get('email')?.value;
    const contrasenya =
      this.usuarioEditForm.get('contrasenya')?.value !== ''
        ? this.usuarioEditForm.get('contrasenya')?.value
        : this.clienteUsuario.contrasenya;
    const fechaRegistro = this.clienteUsuario.fechaRegistro;

    this.userService
      .actualizarUsuario(
        this.authService.currentUser()!.id,
        idPerfil,
        email,
        contrasenya,
        fechaRegistro
      )
      .subscribe({
        next: () => {
          this.snackbar.open('Usuario actualizado', 'Cerrar', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackbar.open('Error al actualizar usuario', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  borrarUsuario(): void {
    if (!this.clienteUsuario) return;

    this.userService
      .borrarUsuario(this.authService.currentUser()!.id)
      .subscribe({
        next: () => {
          this.snackbar.open('Usuario eliminado', 'Cerrar', {
            duration: 3000,
          });
          this.authService.logout();
        },
        error: (error) => {
          this.snackbar.open('Usuario no encontrado', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
