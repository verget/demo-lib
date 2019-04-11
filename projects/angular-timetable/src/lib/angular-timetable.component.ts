import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/index';
import * as moment_ from 'moment';

const moment = moment_;

interface TimetableConfig {
  data: {
    title: string,
    emptyString: string,
    applyString: string,
    workingHours: {
      start: string,
      end: string
    },
    disabled: string[]
  };
}

@Component({
  selector: 'lib-angular-timetable',
  templateUrl: './angular-timetable.component.html',
  styleUrls: ['./angular-timetable.component.scss']
})
export class AngularTimetableComponent implements OnInit {

  public blocks = [];
  public today = {
    month: '',
    day: ''
  };
  public yesterday = {
    month: '',
    day: ''
  };
  public tomorrow = {
    month: '',
    day: ''
  };
  private currentDayObject = moment();
  public selectedTime;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AngularTimetableComponent>
  ) { }

  static createModalAndGetResult(config: TimetableConfig, dialogService: MatDialog): Observable<boolean> {
    const dialogRef = dialogService.open(AngularTimetableComponent, config);
    return dialogRef.afterClosed();
  }

  ngOnInit() {
    this.parseDays();
    const currentTime = moment().add(30, 'minute').startOf('hour').format('HH:mm');
    this.generateTimeBlocks(currentTime);
  }

  generateTimeBlocks(startTime = this.data.workingHours.start, endTime = this.data.workingHours.end) {
    const disabledArray = this.data.disabled;
    if (moment() > this.currentDayObject.startOf('day')) {
      startTime = moment().add(30, 'minute').startOf('hour').format('HH:mm');
    }
    const startTimeString = `${this.currentDayObject.format('DD-MM-YYYY')} ${startTime}`;
    const endTimeString = `${this.currentDayObject.format('DD-MM-YYYY')} ${endTime}`;
    const startDateObject = moment(startTimeString, 'DD-MM-YYYY HH:mm');
    const endDateObject = moment(endTimeString, 'DD-MM-YYYY HH:mm');
    this.blocks = [];
    while (startDateObject < endDateObject) {
      const dateObject = startDateObject;
      const time = dateObject.format('HH:mm');
      const datetime = dateObject.format('DD-MM-YYYY HH:mm');
      let disabled = false;
      if (disabledArray.length && disabledArray.includes(datetime)) {
        disabled = true;
      }
      startDateObject.add(30, 'minutes');
      this.blocks.push({
        time,
        datetime,
        disabled
      });
    }
  }

  parseDays() {
    this.today = {
      day: this.currentDayObject.format('DD'),
      month: this.capitalizeFirstLetter(this.currentDayObject.locale('ru').format('MMMM'))
    };
    const yesterdayObject = this.currentDayObject.clone().add(-1, 'day');
    this.yesterday = {
      day: yesterdayObject.format('DD'),
      month: this.capitalizeFirstLetter(yesterdayObject.locale('ru').format('MMMM'))
    };
    const tomorrowObject = this.currentDayObject.clone().add(1, 'day');
    this.tomorrow = {
      day: tomorrowObject.format('DD'),
      month: this.capitalizeFirstLetter(tomorrowObject.locale('ru').format('MMMM'))
    };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  changeDay(step) {
    if (step > 0 || moment() < this.currentDayObject.startOf('day')) {
      this.currentDayObject.add(step, 'day');
      this.parseDays();
      this.generateTimeBlocks();
    }
  }

  selectTime(block) {
    if (!block.disabled) {
      this.selectedTime = block.datetime;
    }
  }

  confirmAction() {
    this.dialogRef.close(this.selectedTime);
  }

}
