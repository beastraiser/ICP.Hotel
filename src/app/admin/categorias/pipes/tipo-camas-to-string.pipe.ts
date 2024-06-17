import { Pipe, PipeTransform } from '@angular/core';
import { TipoCama } from '../interfaces/categoria.interface';

@Pipe({
  name: 'tipoCamasToString',
})
export class TipoCamasToStringPipe implements PipeTransform {
  transform(tipoCamas: TipoCama[]): string {
    return tipoCamas.map((cama) => cama.tipo).join(', ');
  }
}
