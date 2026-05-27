import { inject, Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private snackBar = inject(MatSnackBar);

  public errorMessage(message: string, duration = 4000) {
    this.snackBar.open(message, 'ERROR', {
      duration,
      panelClass: 'errorMessage'
    });
  }
  public successMessage(message: string, duration = 4000) {
    this.snackBar.open(message, 'SUCCESS', {
      duration,
      panelClass: 'successMessage'
    });
  }
  public infoMessage(message: string, duration = 4000) {
    this.snackBar.open(message, 'INFO', {
      duration
    });
  }
}
