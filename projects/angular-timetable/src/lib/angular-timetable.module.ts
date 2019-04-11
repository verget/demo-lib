import { NgModule } from '@angular/core';
import { AngularTimetableComponent } from './angular-timetable.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [AngularTimetableComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [AngularTimetableComponent],
  entryComponents: [AngularTimetableComponent]
})
export class AngularTimetableModule { }
