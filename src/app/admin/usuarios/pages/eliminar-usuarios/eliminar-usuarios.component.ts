import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { ReservasService } from '../../../../reservas/services/reservas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';

@Component({
  selector: 'usuarios-eliminar-usuarios',
  templateUrl: './eliminar-usuarios.component.html',
  styleUrl: './eliminar-usuarios.component.css',
})
export class EliminarUsuariosComponent implements OnInit {
  id: number = 0;
  private userService = inject(UserService);
  private reservasService = inject(ReservasService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  constructor() {}

  ngOnInit(): void {}

  borrarUsuario(): void {
    this.userService.borrarUsuario(this.id).subscribe((result) => {
      if (result) {
        this.snackbar.open('Usuario eliminado', 'Cerrar', {
          duration: 3000,
        });
      } else {
        this.snackbar.open('Usuario no encontrado', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
