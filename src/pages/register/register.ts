import { Component, inject, signal } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users-service';
import { User } from '../../entities/user';
import { Router } from '@angular/router';
import { ZxcvbnFactory } from '@zxcvbn-ts/core'
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import { ValidationErrorPipe } from '../../pipes/validation-error-pipe';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, ValidationErrorPipe],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  usersService = inject(UsersService);
  router = inject(Router);
  hide = signal(true);
  passwordMessage = signal('');

  private options = {
      translations: zxcvbnEnPackage.translations,
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
    }
  zxcvbn = new ZxcvbnFactory(this.options);
  regModel = new FormGroup({
    userName: new FormControl('', {
                                    validators: Validators.required,
                                    asyncValidators: this.conflictsValidator('name')
                                  }),
    email: new FormControl('', [Validators.minLength(2), 
                                Validators.email,
                                Validators.pattern(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/) // Source - https://stackoverflow.com/a/50330527
                              ],
                            this.conflictsValidator('email')),
    password: new FormControl('', this.passwordValidator()),
    password2: new FormControl('')
  }, this.passwordsEqualValidator());

  toggleShowPassword() {
    this.hide.update(current => !current);
  }
  onSubmit() {
    console.log('data: ' + JSON.stringify(this.regModel.value));
    console.log('username:' + this.regModel.value['userName']);
    console.log('username:' + this.regModel.get('userName')?.value);
    console.log('username:' + this.userName.value);
    const formData = this.regModel.value;
    const user = new User(formData.userName || '',
                          formData.email || '',
                          undefined,
                          undefined,
                          formData.password || '');
    this.usersService.register(user).subscribe(registeredUser => {
      this.router.navigateByUrl('/login');
    });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const result = this.zxcvbn.check(control.value);
      const message = `Stregth: ${result.score}/4. Breakable in ${result.crackTimes.offlineSlowHashingXPerSecond.display}`;
      this.passwordMessage.set(message); 
      if (result.score < 3) {
        return {'weakPassword': message};
      } else {
        return null;
      }
    }
  }

  passwordsEqualValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get('password')?.value;
      const pass2 = control.get('password2')?.value;
      const pass2model = control.get('password2');
      if (pass1 == pass2) {
        pass2model!.setErrors(null);
        return null;
      }
      const error = {'differentPasswords': 'Passwords are different'};    
      pass2model!.setErrors(error);
      return error;
    }
  }

  conflictsValidator(field: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = field == 'name' ? control.value : '';
      const email = field == 'email' ? control.value : '';
      const user = new User(name, email);
      return this.usersService.userConficts(user).pipe(
        map(conflicts => conflicts.length == 0 ? null : {serverConflict: field + " already exists on server"})
      );
    }
  }

  get userName():FormControl<string | null> {
    return this.regModel.get('userName') as FormControl<string | null>;
  }
  get email():FormControl<string | null> {
    return this.regModel.get('email') as FormControl<string | null>;
  }
  get password():FormControl<string | null> {
    return this.regModel.get('password') as FormControl<string | null>;
  }
  get password2():FormControl<string | null> {
    return this.regModel.get('password2') as FormControl<string | null>;
  }
}
