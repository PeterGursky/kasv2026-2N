import { Component, inject, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Auth } from '../../entities/auth';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  usersService = inject(UsersService);
  router = inject(Router);
  hide = signal(true);
  auth = signal<Auth>(new Auth('Peter','sovy'));
  errorText = signal('');
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
  onSubmit() {
    this.usersService.login(this.auth()).subscribe({
      next: token => {
        console.log("token:", token);
        this.router.navigateByUrl('/users');
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.errorText.set('Wrong name or password');
          }
          if (err.status === 0) {
            this.errorText.set('Server is not available');
          }
          if (err.status >= 500) {
            this.errorText.set('Server error, please contanct server admin');
            console.log('http error:', err);
          }
        }
      }
    });
  }
}
