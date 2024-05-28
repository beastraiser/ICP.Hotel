import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../../auth/services/validators.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-reservas-page',
  templateUrl: './reservas-page.component.html',
  styleUrl: './reservas-page.component.css',
})
export class ReservasPageComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private validatorsService = inject(ValidatorsService);

  public myDisponiblilidadForm: FormGroup = this.fb.group({
    DNI: [
      'x3456123f',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.dniPattern),
      ],
    ],
  });

  public firstFormGroup: FormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  public secondFormGroup: FormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
}
