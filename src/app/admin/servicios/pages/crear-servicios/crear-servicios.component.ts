import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { ServiciosService } from '../../services/servicios-service.service';

@Component({
  selector: 'servicios-crear-servicios',
  templateUrl: './crear-servicios.component.html',
  styleUrl: './crear-servicios.component.css',
})
export class CrearServiciosComponent {
  private serviciosService = inject(ServiciosService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  constructor() {}

  ngOnInit(): void {}

  public createServiceForm: FormGroup = this.fb.group({
    tipo: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    coste: ['', [Validators.required]],
  });

  crearServicio(): void {
    const tipo = this.createServiceForm.get('tipo')?.value;
    const nombre = this.createServiceForm.get('nombre')?.value;
    const descripcion = this.createServiceForm.get('descripcion')?.value;
    const coste = this.createServiceForm.get('coste')?.value;

    this.serviciosService
      .crearServicio(tipo, nombre, descripcion, coste)
      .subscribe({
        next: () => {
          this.snackbar.open('Servicio creado', 'Cerrar', {
            duration: 3000,
          });
          this.createServiceForm.reset();
        },
        error: (error) => {
          this.snackbar.open('Error al crear servicio', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
