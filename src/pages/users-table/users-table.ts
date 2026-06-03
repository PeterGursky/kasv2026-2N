import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../entities/user';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
})
export class UsersTable implements OnInit{
  usersService = inject(UsersService);
  users = signal<User[]>([]);
//  columns = signal<string[]>(['id','name','email','active','lastLogin']);
  columns = computed(() => this.usersService.loggedIn()
                            ? ['id','name','email','active','lastLogin','groups']
                            : ['id','name','email']);

  ngOnInit() {
    this.usersService.getUsers().subscribe(u => {
      console.log('Received users in users-table:', u);
      this.users.set(u);
    });
  }
}
