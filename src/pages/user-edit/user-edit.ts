import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, switchMap, tap } from 'rxjs';
import { UsersService } from '../../services/users-service';
import { User } from '../../entities/user';

@Component({
  selector: 'app-user-edit',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit{
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  userId = signal<number>(0); 
  user = signal<User>(new User('',''));
  
  ngOnInit(): void {
    // const id = Number(this.activatedRoute.snapshot.params['userId']);
    // this.userId.set(id);
    this.activatedRoute.paramMap.pipe(
      map((values: ParamMap) => Number(values.get("userId"))),
      filter(id => !!id),
      tap(userId => this.userId.set(userId)),
      switchMap(userId => this.usersService.getUser(userId))
    ).subscribe(user => this.user.set(user))
  }
  
}
