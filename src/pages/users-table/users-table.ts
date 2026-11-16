import { AfterViewInit, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { User } from '../../entities/user';
import { UsersService } from '../../services/users-service';
import { DatePipe } from '@angular/common';
import { GroupsPipe } from '../../pipes/groups-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../services/dialog-service';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule, DatePipe, GroupsPipe, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule, MatSortModule],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
})
export class UsersTable implements OnInit,AfterViewInit{
  usersService = inject(UsersService);
  dialogService = inject(DialogService);
  users = signal<User[]>([]);
  usersDataSource = new MatTableDataSource<User>([])
//  columns = signal<string[]>(['id','name','email','active','lastLogin']);
  columns = computed(() => this.usersService.loggedIn()
                            ? ['id','name','email','active','lastLogin','groups','perms','actions']
                            : ['id','name','email']);

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  ngOnInit() {
    this.loadUsers();
  }
  ngAfterViewInit(): void {
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(u => {
      console.log('Received users in users-table:', u);
      this.users.set(u);
      this.usersDataSource.data = u;
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
