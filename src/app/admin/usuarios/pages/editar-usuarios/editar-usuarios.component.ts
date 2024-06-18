import { Component, inject } from '@angular/core';
import { UsuarioDatos } from '../../../../shared/interfaces/usuario-datos.interface';
import { UserService } from '../../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservasService } from '../../../../reservas/services/reservas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';

@Component({
  selector: 'usuarios-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrl: './editar-usuarios.component.css',
})
export class EditarUsuariosComponent {
  private userService = inject(UserService);
  private reservasService = inject(ReservasService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  public usuario: UsuarioDatos | null = null;

  constructor() {}

  ngOnInit(): void {}

  public emailForm: FormGroup = this.fb.group({
    email: [
      'alexandru11@example.com',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
  });

  public userForm: FormGroup = this.fb.group({
    idPerfil: [this.usuario?.idPerfil, [Validators.required]],
    email: [
      this.usuario?.email,
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
    contrasenya: [
      '',
      [Validators.pattern(this.validatorsService.passwordPattern)],
    ],
    dni: ['', [Validators.pattern(this.validatorsService.dniPattern)]],
  });

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  buscarUsuario(): void {
    this.reservasService
      .obtenerUsuarioPorEmail(this.emailForm.get('email')!.value)
      .subscribe({
        next: (data) => {
          this.usuario = data;
          this.userForm.patchValue({
            idPerfil: this.usuario.idPerfil,
            email: this.usuario.email,
          });
        },
        error: (error) => {
          this.snackbar.open('Usuario no encontrado', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambios(): void {
    if (!this.usuario) return;

    const idPerfil = this.userForm.get('idPerfil')?.value;
    const email = this.userForm.get('email')?.value;
    const contrasenya =
      this.userForm.get('contrasenya')?.value !== ''
        ? this.userForm.get('contrasenya')?.value
        : this.usuario.contrasenya;
    const fechaRegistro = this.usuario.fechaRegistro;

    this.userService
      .actualizarUsuario(
        this.usuario.id,
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
          this.usuario = null;
        },
        error: (error) => {
          this.snackbar.open('Error al actualizar usuario', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  bajaUsuario(): void {
    if (!this.usuario) return;
    if (this.usuario.id === parseInt(localStorage.getItem('idUsuario')!)) {
      this.snackbar.open('No te puedes dar de baja a ti mismo', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
    this.userService.bajaUsuario(this.usuario.id).subscribe({
      next: () => {
        this.snackbar.open('Usuario dado de baja', 'Cerrar', {
          duration: 3000,
        });
        this.usuario = null;
      },
      error: (error) => {
        this.snackbar.open('Usuario no encontrado', 'Cerrar', {
          duration: 3000,
        });
        console.log(error);
      },
    });
  }

  altaUsuario(): void {
    if (!this.usuario) return;
    if (this.userForm.get('dni')?.value === '') {
      this.snackbar.open('El DNI es obligatorio', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
    if (this.usuario.id === parseInt(localStorage.getItem('idUsuario')!)) {
      this.snackbar.open('No te puedes dar de alta a ti mismo', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
    const dni = this.userForm.get('dni')?.value;

    this.userService.altaUsuario(this.usuario.id, dni).subscribe({
      next: () => {
        this.snackbar.open('Usuario dado de alta', 'Cerrar', {
          duration: 3000,
        });
        this.usuario = null;
      },
      error: (error) => {
        this.snackbar.open('Usuario no encontrado', 'Cerrar', {
          duration: 3000,
        });
        console.log(error);
      },
    });
  }

  altaTrabajador(): void {
    if (!this.usuario) return;

    this.userService.altaTrabajador(this.usuario.id).subscribe({
      next: () => {
        this.snackbar.open('Usuario dado de alta', 'Cerrar', {
          duration: 3000,
        });
        this.usuario = null;
      },
      error: (error) => {
        this.snackbar.open('Usuario no encontrado', 'Cerrar', {
          duration: 3000,
        });
        console.log(error);
      },
    });
  }
}
