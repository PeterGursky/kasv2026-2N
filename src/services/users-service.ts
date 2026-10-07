import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../entities/user';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../entities/auth';
import { MessageService } from './message-service';
import { Router } from '@angular/router';
import { Group } from '../entities/group';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);
  private router = inject(Router);
  public loggedUserName = signal<string>(this.userName);
  public loggedIn = computed(() => this.loggedUserName() ? true : false);

  private serverUrl = 'http://localhost:8080/';
  private users: User[] = [
    new User('AdamService', 'adam@adam.sk'),
    new User('EvaService', 'eva@eden.sk',2)
  ];
  // private token = '';
  private get token(): string {
    return localStorage.getItem('filmsToken') || '';
  }

  private set token(value: string) {
    if (value) {
      localStorage.setItem('filmsToken', value);
    } else {
      localStorage.removeItem('filmsToken');
    }
  }

  private get userName(): string {
    return localStorage.getItem('filmsUserName') || '';
  }

  private set userName(value: string) {
    this.loggedUserName.set(value);
    if (value) {
      localStorage.setItem('filmsUserName', value);
    } else {
      localStorage.removeItem('filmsUserName');
    }
  }

  getUsersSynch(): User[] {
    return this.users;
  }
  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }
  getUsers(): Observable<User[]> {
    const url = this.token ? this.serverUrl + 'users/' + this.token
                           : this.serverUrl + 'users';
    return this.http.get<User[]>(url).pipe(
      tap(jsonUsers => console.log('received users', jsonUsers)),
      map(jsonUsers => jsonUsers.map(jsonUser => User.clone(jsonUser))),
      catchError(err => this.processHttpError(err))
    );
  }
  getGroups():Observable<Group[]> {
    return this.http.get<Group[]>(this.serverUrl + 'groups');
  }
  register(user: User): Observable<User> {
    return this.http.post<User>(this.serverUrl + 'register', user).pipe(
      tap(registeredUser => this.messageService.successMessage(`User ${registeredUser.name} was registered successfully. You can log in now.`)),
      catchError(err=>this.processHttpError(err))
    );
  }
  login(auth: Auth):Observable<boolean> {
    return this.http.post(this.serverUrl + 'login', auth, {responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.userName = auth.name;
        this.messageService.successMessage('Login was successful');
        return true;
      }),
      catchError(err => this.processHttpError(err))
    )
  }
  logout():Observable<boolean> {
    return this.http.get(`${this.serverUrl}logout/${this.token}`).pipe(
      map(() => {
        this.token = '';
        this.userName = '';
        return true;
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 0) {
            this.token = '';
            this.userName = '';
            return of(true);
          }
        }
        return this.processHttpError(err);
      })
    )
  }

  private processHttpError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.messageService.errorMessage('Films server is not available');
      }
      if (error.status >= 500) {
        this.messageService.errorMessage('Films server has serious problems. Please, contanct administrator.');
      }
      if (error.status === 401 && error.error.errorMessage === 'unknown token') {
        this.token = '';
        this.userName = '';
        this.messageService.errorMessage('Session was ended, please log in again.');
        this.router.navigateByUrl('/login');
        return EMPTY;
      }
      if (error.status >= 400 && error.status < 500) {
        const body = error.error;
        const message = body.errorMessage 
                          ? body.errorMessage 
                          : JSON.parse(body).errorMessage;
        this.messageService.errorMessage(message);
      }
      return EMPTY;
    }
    console.error('Unexpected error: ', error);
    return EMPTY;
  }
}
