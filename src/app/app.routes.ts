import { Routes } from '@angular/router';
import { UsersTable } from '../pages/users-table/users-table';
import { Login } from '../pages/login/login';
import { PageNotFound } from '../pages/page-not-found/page-not-found';
import { GroupsTable } from '../pages/groups-table/groups-table';
import { Register } from '../pages/register/register';

export const routes: Routes = [
  {path: 'users', component: UsersTable},
  {path: 'login', component: Login},
  {path: 'groups', component: GroupsTable},
  {path: 'register', component: Register},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '**', component: PageNotFound}
];
