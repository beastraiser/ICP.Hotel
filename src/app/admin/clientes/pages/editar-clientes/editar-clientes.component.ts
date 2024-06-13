import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../../shared/validators/validators.service';
import { ClientesService } from '../../services/clientes-service.service';
import { ClienteDatos } from '../../../../shared/interfaces/cliente.interface';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrl: './editar-clientes.component.css',
})
export class EditarClientesComponent {
  private clientesService = inject(ClientesService);
  private snackbar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);

  public cliente: ClienteDatos | null = null;

  constructor() {}

  ngOnInit(): void {}

  public clienteIdForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
  });

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

  buscarCliente(): void {
    this.clientesService
      .obtenerClientePorId(this.clienteIdForm.get('id')!.value)
      .subscribe({
        next: (data) => {
          this.cliente = data;
          this.clienteEditForm.patchValue({
            dni: this.cliente.dni,
            telefono: this.cliente.telefono,
            nombre: this.cliente.nombre,
            apellidos: this.cliente.apellidos,
          });
        },
        error: (error) => {
          this.snackbar.open('Cliente no encontrado', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  guardarCambios(): void {
    if (!this.cliente) return;

    const id = this.cliente.id;
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
          this.cliente = null;
          this.clienteIdForm.reset();
        },
        error: (error) => {
          this.snackbar.open('Error al actualizar cliente', 'Cerrar', {
            duration: 3000,
          });
        },
      });
  }

  borrarCliente(): void {
    if (!this.cliente) return;

    this.clientesService.borrarCliente(this.cliente.id).subscribe({
      next: () => {
        this.snackbar.open('Cliente eliminado', 'Cerrar', {
          duration: 3000,
        });
        this.cliente = null;
        this.clienteIdForm.reset();
      },
      error: (error) => {
        this.snackbar.open('Error al borrar cliente', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
