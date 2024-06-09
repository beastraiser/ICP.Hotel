import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';

@Component({
  selector: 'usuarios-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.css',
})
export class CrearUsuariosComponent {
  private userService = inject(UserService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  constructor() {}

  ngOnInit(): void {}

  public createUserForm: FormGroup = this.fb.group({
    idPerfil: ['', [Validators.required]],
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

  crearUsuario(): void {
    const idPerfil = this.createUserForm.get('idPerfil')?.value;
    const email = this.createUserForm.get('email')?.value;
    const contrasenya = this.createUserForm.get('contrasenya')?.value;
    const fechaRegistro = new Date();

    this.userService
      .crearUsuario(idPerfil, email, contrasenya, fechaRegistro)
      .subscribe({
        next: () => {
          this.snackbar.open('Usuario creado', 'Cerrar', {
            duration: 3000,
          });
          this.createUserForm.reset();
        },
        error: (error) => {
          this.snackbar.open('Error al crear usuario', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
