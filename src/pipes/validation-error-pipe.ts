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
      return `must have at least ${minerr.requiredLength} chars and has ${minerr.actualLength}`;
    }
    if(value['required']) {
      return `value is required`;
    }
    if(value['weakPassword']) {
      return `Weak password, ${value['weakPassword']}`;
    }
    if(value['email']) {
      return "Please enter correct e-mail address";
    }
    if(value['pattern']) {
      return "Incorrect input";
    }
    if(value['differentPasswords']) {
      return value['differentPasswords'];
    }
    return  'other error: ' + JSON.stringify(value);
  }
}
