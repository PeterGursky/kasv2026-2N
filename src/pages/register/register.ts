import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  hide = signal(true);
  regModel = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  });

  toggleShowPassword() {
    this.hide.update(current => !current);
  }
  onSubmit() {
    console.log('data: ' + JSON.stringify(this.regModel.value));
    console.log('username:' + this.regModel.value['userName']);
    console.log('username:' + this.regModel.get('userName')?.value);
    console.log('username:' + this.userName.value);
  }

  get userName():FormControl<string | null> {
    return this.regModel.get('userName') as FormControl<string | null>;
  }
}
