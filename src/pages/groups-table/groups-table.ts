import { Component, inject, OnInit, signal } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Group } from '../../entities/group';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-groups-table',
  imports: [MatTableModule],
  templateUrl: './groups-table.html',
  styleUrl: './groups-table.scss',
})
export class GroupsTable implements OnInit {
  usersService = inject(UsersService);
  groups = signal<Group[]>([]);
  displayedColumns = signal<string[]>(["id","name","perms"]); 
  
  ngOnInit(): void {
    this.usersService.getGroups().subscribe(g => this.groups.set(g));
  }
}
