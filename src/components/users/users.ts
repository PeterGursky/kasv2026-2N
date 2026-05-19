import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../entities/user';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  usersService = inject(UsersService);
  users = signal<User[]>([
    new User('Adam', 'adam@adam.sk'),
    new User('Eva', 'eva@eden.sk',2)
  ]);
  selectedUser = signal<User|undefined>(undefined);
  errorText = signal<string>('');

  ngOnInit(): void {
//    this.users.set(this.usersService.getUsers());
    this.usersService.getUsers().subscribe({
      next: u => this.users.set(u),
      error: e => this.errorText.set('Server is not responding'),
      complete: () => console.log("http prud sa zatvoril")
    });
  }

  selectUser(user: User) {
    this.selectedUser.set(user);
  }
}
