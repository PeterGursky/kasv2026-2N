import { NgModule } from '@angular/core';
import { GroupsTable } from './groups-table/groups-table';
import { RouterModule } from '@angular/router';
import { routes } from './groups-routes';

@NgModule({
  declarations: [],
  imports: [ 
    GroupsTable, 
    RouterModule.forChild(routes)],
})
export default class GroupsModule {}
