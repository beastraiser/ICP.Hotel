import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public myRegisterForm: FormGroup = this.fb.group({
    DNI: [
      'x3456123f',
      [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      [],
    ],
    telefono: [
      '34655897425',
      [Validators.required, Validators.pattern(/^\d{2}\d{9}$/)],
    ],
    nombre: ['aadsfjdshl', [Validators.required]],
    apellidos: ['gfdadsfg', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registro() {
    const { DNI, telefono, nombre, apellidos, email, password } =
      this.myRegisterForm.value;
    this.authService
      .registro(DNI, telefono, nombre, apellidos, email, password)
      .subscribe({
        next: () => {
          Swal.fire(
            'Registro exitoso',
            'El registro se completó correctamente',
            'success'
          );
        },
        error: (message) => {
          Swal.fire('Registro fallido', message, 'error');
        },
      });
  }
}
