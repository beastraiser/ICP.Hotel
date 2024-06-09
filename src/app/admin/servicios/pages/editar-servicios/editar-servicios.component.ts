import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { ServiciosService } from '../../services/servicios-service.service';
import {
  Servicio,
  Tipo,
} from '../../../../shared/interfaces/servicios.interface';

@Component({
  selector: 'servicios-editar-servicios',
  templateUrl: './editar-servicios.component.html',
  styleUrl: './editar-servicios.component.css',
})
export class EditarServiciosComponent {
  private serviciosService = inject(ServiciosService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  public servicio: Servicio | null = null;

  constructor() {}

  ngOnInit(): void {}

  public ServiceIdForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });

  public ServiceEditForm: FormGroup = this.fb.group({
    tipo: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    coste: ['', [Validators.required]],
  });

  buscarServicio(): void {
    this.serviciosService
      .obtenerServicioPorId(this.ServiceIdForm.get('id')!.value)
      .subscribe({
        next: (data) => {
          this.servicio = data;
          this.ServiceEditForm.patchValue({
            tipo: this.servicio.tipo,
            nombre: this.servicio.nombre,
            descripcion: this.servicio.descripcion,
            coste: this.servicio.coste,
          });
          console.log(this.servicio);
        },
        error: (error) => {
          this.snackbar.open('Servicio no encontrado', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambios(): void {
    debugger;
    if (!this.servicio) return;

    const id = this.servicio.id;
    const tipo = this.ServiceEditForm.get('tipo')?.value;
    const nombre = this.ServiceEditForm.get('nombre')?.value;
    const descripcion = this.ServiceEditForm.get('descripcion')?.value;
    const coste = this.ServiceEditForm.get('coste')?.value;

    this.serviciosService
      .actualizarServicio(id, tipo, nombre, descripcion, coste)
      .subscribe({
        next: () => {
          this.snackbar.open('Servicio actualizado', 'Cerrar', {
            duration: 3000,
          });
          this.servicio = null;
        },
        error: (error) => {
          this.snackbar.open('Error al actualizar servicio', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  borrarServicio(): void {
    if (!this.servicio) return;

    this.serviciosService.borrarServicio(this.servicio.id).subscribe({
      next: () => {
        this.snackbar.open('Servicio eliminado', 'Cerrar', {
          duration: 3000,
        });
        this.servicio = null;
      },
      error: (error) => {
        this.snackbar.open('Servicio no encontrado', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
