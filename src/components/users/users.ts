import { Component, signal } from '@angular/core';
import { User } from '../../entities/user';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  users = signal<User[]>([
    new User('Adam', 'adam@adam.sk'),
    new User('Eva', 'eva@eden.sk',2)
  ]);
  selectedUser = signal<User|undefined>(undefined);

  selectUser(user: User) {
    this.selectedUser.set(user);
  }
}
