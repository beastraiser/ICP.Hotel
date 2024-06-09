import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { PerfilesService } from '../../services/perfiles-service.service';
import { Perfil } from '../../interfaces/perfil.interface';

@Component({
  selector: 'app-editar-perfiles',
  templateUrl: './editar-perfiles.component.html',
  styleUrl: './editar-perfiles.component.css',
})
export class EditarPerfilesComponent {
  private perfilesService = inject(PerfilesService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  public perfil: Perfil | null = null;

  constructor() {}

  ngOnInit(): void {}

  public idPerfilForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });

  public cambiarPerfilForm: FormGroup = this.fb.group({
    tipo: ['', [Validators.required]],
  });

  buscarPerfil(): void {
    this.perfilesService
      .obtenerPerfilPorId(this.idPerfilForm.get('id')!.value)
      .subscribe({
        next: (data) => {
          this.perfil = data;
          this.cambiarPerfilForm.patchValue({
            tipo: this.perfil.tipo,
          });
        },
        error: (error) => {
          this.snackbar.open('Perfil no encontrado', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambios(): void {
    if (!this.perfil) return;

    const id = this.perfil.id;
    const tipo = this.cambiarPerfilForm.get('tipo')?.value;

    this.perfilesService.actualizarPerfil(id, tipo).subscribe({
      next: () => {
        this.snackbar.open('Perfil actualizado', 'Cerrar', {
          duration: 3000,
        });
        this.perfil = null;
        this.idPerfilForm.reset();
      },
      error: (error) => {
        this.snackbar.open('Error al actualizar perfil', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  borrarPerfil(): void {
    if (!this.perfil) return;

    this.perfilesService.borrarPerfil(this.perfil.id).subscribe({
      next: () => {
        this.snackbar.open('Perfil eliminado', 'Cerrar', {
          duration: 3000,
        });
        this.perfil = null;
        this.idPerfilForm.reset();
      },
      error: (error) => {
        this.snackbar.open('Perfil no encontrado', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
