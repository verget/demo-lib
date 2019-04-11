import { TestBed } from '@angular/core/testing';

import { AngularTimetableService } from './angular-timetable.service';

describe('AngularTimetableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularTimetableService = TestBed.get(AngularTimetableService);
    expect(service).toBeTruthy();
  });
});
