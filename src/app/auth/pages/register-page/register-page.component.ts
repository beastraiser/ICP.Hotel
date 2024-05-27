import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ValidatorsService } from '../../services/validators.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);

  public myRegisterForm: FormGroup = this.fb.group(
    {
      DNI: [
        'x3456123f',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.dniPattern),
        ],
      ],
      telefono: [
        '34655897425',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.tlfPattern),
        ],
      ],
      nombre: [
        'Marius',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.nombresPattern),
        ],
      ],
      apellidos: [
        'Bulc Bulc',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.apellidosPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.emailPattern),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorsService.passwordPattern),
        ],
      ],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2'),
      ],
    }
  );

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myRegisterForm, field);
  }

  onSubmit() {
    this.myRegisterForm.markAllAsTouched();
  }

  registro() {
    const { DNI, telefono, nombre, apellidos, email, password } =
      this.myRegisterForm.value;

    this.authService
      .registro(DNI, telefono, nombre, apellidos, email, password)
      .subscribe({
        next: () => {
          Swal.fire(
            'Registro exitoso',
            '¡El resgistro ha sido exitoso!',
            'success'
          );
          // this.router.navigateByUrl('/auth/login');
          this.authService.login(email, password).subscribe({
            next: () => this.router.navigateByUrl('/reservas'),
          });
        },
        error: (message) => {
          Swal.fire('Registro fallido', message, 'error');
        },
      });
  }
}
