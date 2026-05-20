import { Component, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Auth } from '../../entities/auth';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  hide = signal(true);
  auth = signal<Auth>(new Auth('Peter','sovy'));
  toggleShowPassword() {
    this.hide.update(current => !current);
  }
  updateName(event: any) {
    const newName = event.target.value;
    this.auth.update(old => new Auth(newName, old.password));
  }
  getAuthJSON() {
    return JSON.stringify(this.auth());
  }
}
