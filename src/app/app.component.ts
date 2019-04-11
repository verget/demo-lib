import { Component } from '@angular/core';
import { AngularTimetableComponent } from 'angular-timetable';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ld-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lib-demo';

  constructor(
    private dialog: MatDialog
  ) {}
  openScheduler() {
    const config = {
      data: {
        title: '11',
        emptyString: '22',
        applyString: '33',
        workingHours: { start: '08:00', end: '18:00' },
        disabled: ['08-04-2019 09:00', '09-04-2019 14:00']
      }
    };
    AngularTimetableComponent.createModalAndGetResult(config, this.dialog).subscribe(result => {
        console.log(result);
    });
  }
}
