import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { ClientesService } from '../../services/clientes-service.service';

@Component({
  selector: 'clientes-crear-clientes',
  templateUrl: './crear-clientes.component.html',
  styleUrl: './crear-clientes.component.css',
})
export class CrearClientesComponent {
  private clientesService = inject(ClientesService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  constructor() {}

  ngOnInit(): void {}

  public createClientForm: FormGroup = this.fb.group({
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

  crearCliente(): void {
    const dni = this.createClientForm.get('dni')?.value;
    const telefono = this.createClientForm.get('telefono')?.value;
    const nombre = this.createClientForm.get('nombre')?.value;
    const apellidos = this.createClientForm.get('apellidos')?.value;

    this.clientesService
      .crearCliente(dni, telefono, nombre, apellidos)
      .subscribe({
        next: () => {
          this.snackbar.open('Cliente creado', 'Cerrar', {
            duration: 3000,
          });
          this.createClientForm.reset();
        },
        error: (error) => {
          this.snackbar.open('Error al crear cliente', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }
}
