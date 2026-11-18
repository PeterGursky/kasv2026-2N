import { Routes } from "@angular/router";
import { GroupsTable } from "./groups-table/groups-table";

export const routes: Routes = [
  {path: 'list', component: GroupsTable},
  {path: '', redirectTo: 'list', pathMatch : 'full'}
]