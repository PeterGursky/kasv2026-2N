import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../entities/user';
import { UsersService } from '../../services/users-service';
import { DatePipe } from '@angular/common';
import { GroupsPipe } from '../../pipes/groups-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../services/dialog-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule, DatePipe, GroupsPipe, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
})
export class UsersTable implements OnInit{
  usersService = inject(UsersService);
  dialogService = inject(DialogService);
  users = signal<User[]>([]);
//  columns = signal<string[]>(['id','name','email','active','lastLogin']);
  columns = computed(() => this.usersService.loggedIn()
                            ? ['id','name','email','active','lastLogin','groups','perms','actions']
                            : ['id','name','email']);

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.usersService.getUsers().subscribe(u => {
      console.log('Received users in users-table:', u);
      this.users.set(u);
    });
  }
  deleteUser(user: User) {
    this.dialogService.confirm("Deleting user", "Do you really want to delete user " + user.name + "?"
    ).subscribe(decision => { 
        if (decision) {
          this.usersService.deleteUser(user.id || 0).subscribe(deleted =>{
            if (deleted) {
              this.loadUsers();
            }
          });
        }
      }
    );

  }
}
