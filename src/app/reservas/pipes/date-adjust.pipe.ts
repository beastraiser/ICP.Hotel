import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAdjust',
})
export class DateAdjustPipe implements PipeTransform {
  transform(value: Date): Date {
    let adjustedDate = new Date(value);
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
    );
    return adjustedDate;
  }
}
