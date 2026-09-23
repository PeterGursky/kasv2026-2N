import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationError',
})
export class ValidationErrorPipe implements PipeTransform {
  transform(value: ValidationErrors | null): string {
    if (!value) return "";
    if(value['minlength']) {
      const minerr = value['minlength'];
      return `musí mať aspoň ${minerr.requiredLength} a má ${minerr.actualLength} znakov`;
    }
    if(value['required']) {
      return `hodnota musí byť vyplnená`;
    }
    return  'iná chyba: ' + JSON.stringify(value);
  }
}
