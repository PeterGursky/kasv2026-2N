import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ValidationErrorPipe } from '../../pipes/validation-error-pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

const imports = [MatButtonModule, 
                 MatFormFieldModule, 
                 MatInputModule, 
                 MatIconModule, 
                 ValidationErrorPipe, 
                 MatSlideToggleModule, 
                 MatCheckboxModule];

@NgModule({
  declarations: [],
  imports: imports,
  exports: imports
})
export class MyFormsModule {}
