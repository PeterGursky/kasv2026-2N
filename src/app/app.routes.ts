import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { PageNotFound } from '../pages/page-not-found/page-not-found';
import { Register } from '../pages/register/register';
import { UserEdit } from '../pages/user-edit/user-edit';

export const routes: Routes = [
  {path: 'users', 
    loadComponent: () => import('../pages/users-table/users-table').then(c => c.UsersTable)
  },
  {path: 'login', component: Login},
  {path: 'groups', 
    loadChildren: () => import('../modules/groups/groups-module')
  },
  {path: 'register', component: Register},
  {path: 'users/new', component: UserEdit},
  {path: 'users/edit/:userId', component: UserEdit, data: {
    isEditing: true
  }},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '**', component: PageNotFound}
];
