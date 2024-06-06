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
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
  });

  public userForm: FormGroup = this.fb.group({
    idPerfil: [[this.usuario?.idPerfil], [Validators.required]],
    email: [
      [this.usuario?.email],
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
    ],
  });

  buscarUsuario(): void {
    this.reservasService
      .obtenerUsuarioPorEmail(this.emailForm.get('email')!.value)
      .subscribe({
        next: (data) => {
          this.usuario = data;
          console.log(this.usuario);
        },
        error: (error) => {
          this.snackbar.open('Usuario no encontrado', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambios(): void {
    this.userService
      .actualizarUsuario(
        this.usuario!.id,
        this.userForm.get('idPerfil')?.value,
        this.userForm.get('email')?.value,
        this.usuario!.contrasenya,
        this.usuario!.fechaRegistro
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
}
