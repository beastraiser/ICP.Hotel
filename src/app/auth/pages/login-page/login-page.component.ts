import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../shared/validators/validators.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private validatorsService = inject(ValidatorsService);

  public myLoginForm: FormGroup = this.fb.group({
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
  });

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myLoginForm, field);
  }

  onSubmit() {
    this.myLoginForm.markAllAsTouched();
  }

  login() {
    const { email, password } = this.myLoginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/reservas'),
      error: (message) => {
        Swal.fire('Login fallido', message, 'error');
      },
    });
  }
}
