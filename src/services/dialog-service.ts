import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  confirm(title: string, message: string):Observable<boolean> {
    const ref = this.dialog.open(ConfirmDialog, {data: {title, message}});
    
  }
}
