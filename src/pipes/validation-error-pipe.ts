import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { ValidationError } from '@angular/forms/signals';

@Pipe({
  name: 'validationError',
})
export class ValidationErrorPipe implements PipeTransform {
  transform(value: ValidationErrors | ValidationError.WithFieldTree[] | null): string {
    if (!value) return "";
    if (value instanceof Array) {
      if (value.length == 0) return "";
      const err = value[0];
      return err.message || "Violation of " + err.kind
    }
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
    if(value['serverConflict']) {
      return value['serverConflict'];
    }
    return  'other error: ' + JSON.stringify(value);
  }
}
