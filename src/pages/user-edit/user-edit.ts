import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter, map, switchMap, tap } from 'rxjs';
import { UsersService } from '../../services/users-service';
import { User } from '../../entities/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ValidationErrorPipe } from '../../pipes/validation-error-pipe';
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { Group } from '../../entities/group';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-user-edit',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, ValidationErrorPipe, MatSlideToggleModule, MatCheckboxModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit{
  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);
  userId = signal<number>(0); 
  user = signal<User>(new User('',''));
  hide = signal(true);
  allGroups = signal<Group[]>([]);

  ngOnInit(): void {
    // const id = Number(this.activatedRoute.snapshot.params['userId']);
    // this.userId.set(id);
    this.activatedRoute.paramMap.pipe(
      map((values: ParamMap) => Number(values.get("userId"))),
      filter(id => !!id),
      tap(userId => this.userId.set(userId)),
      switchMap(userId => this.usersService.getUser(userId))
    ).subscribe(user => this.user.set(user))

    this.usersService.getGroups()
      .subscribe(groups => this.allGroups.set(groups));
  }

  toggleShowPassword() {
    this.hide.update(value => !value);
  }
}
