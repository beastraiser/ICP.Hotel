import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { PerfilesService } from '../../services/perfiles-service.service';

@Component({
  selector: 'app-crear-perfiles',
  templateUrl: './crear-perfiles.component.html',
  styleUrl: './crear-perfiles.component.css',
})
export class CrearPerfilesComponent {
  private perfilesService = inject(PerfilesService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  constructor() {}

  ngOnInit(): void {}

  public createPerfilForm: FormGroup = this.fb.group({
    tipo: ['', [Validators.required]],
  });

  crearPerfil(): void {
    const tipo = this.createPerfilForm.get('tipo')?.value;

    this.perfilesService.crearPerfil(tipo).subscribe({
      next: () => {
        this.snackbar.open('Perfil creado', 'Cerrar', {
          duration: 3000,
        });
        this.createPerfilForm.reset();
      },
      error: (error) => {
        this.snackbar.open('Error al crear perfil', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
