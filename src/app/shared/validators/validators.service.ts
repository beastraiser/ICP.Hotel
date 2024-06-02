import { Injectable } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public nombresPattern: string = '[a-zA-Z]+';
  public apellidosPattern: string = '([A-Z][a-z]+(?:\\s[A-Z][a-z]+)*)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public dniPattern: string = '(([X-Zx-z]\\d{7}[A-Za-z])|(\\d{8}[A-Za-z]))';
  public tlfPattern: string = '^\\d{2}\\d{9}$';
  public passwordPattern: string =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$';

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }

  public isValidDate(control: FormControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return inputDate < today
      ? { fechaMenorQueHoy: { value: control.value } }
      : null;
  }

  public isValidInterval(fechaIni: string, fechaFin: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fecha1 = new Date(formGroup.get(fechaIni)?.value);
      const fecha2 = new Date(formGroup.get(fechaFin)?.value);

      if (!fecha1 || !fecha2) {
        return null;
      }

      if (fecha1.getTime() === fecha2.getTime()) {
        formGroup.get(fechaFin)?.setErrors({ notValid: true });
        return { notValid: true };
      }

      formGroup.get(fechaFin)?.setErrors(null);
      return null;
    };
  }
}
