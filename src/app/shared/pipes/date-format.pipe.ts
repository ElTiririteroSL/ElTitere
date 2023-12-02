// date-format.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | null | undefined): string {
    if (value instanceof Date) {
      return value.toLocaleDateString(); // Puedes ajustar el formato según tus preferencias
    }
    return 'N/A'; // O un valor predeterminado si la fecha no está definida
  }
}
