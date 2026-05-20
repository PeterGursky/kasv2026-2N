import { inject, Injectable } from '@angular/core';
import { User } from '../entities/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../entities/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private users: User[] = [
    new User('AdamService', 'adam@adam.sk'),
    new User('EvaService', 'eva@eden.sk',2)
  ];
  private token = '';

  getUsersSynch(): User[] {
    return this.users;
  }
  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }
  getUsers(): Observable<User[]> {
    const url = this.token ? 'http://localhost:8080/users/' + this.token
                           : 'http://localhost:8080/users';
    return this.http.get<User[]>(url).pipe(
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser)))
    );
  }
  login(auth: Auth):Observable<boolean> {
    return this.http.post('http://localhost:8080/login', auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        return true;
      })
    )
  }
}
