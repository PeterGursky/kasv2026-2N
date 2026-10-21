import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit {
  activatedRoute = inject(ActivatedRoute);
  userId = this.activatedRoute.snapshot.params['userId'];
}
