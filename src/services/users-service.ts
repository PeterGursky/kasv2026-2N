import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private users: User[] = [
    new User('AdamService', 'adam@adam.sk'),
    new User('EvaService', 'eva@eden.sk',2)
  ];

  getUsersSynch(): User[] {
    return this.users;
  }
  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/users').pipe(
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser)))
    );
  }
}
