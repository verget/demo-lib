import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTimetableComponent } from './angular-timetable.component';

describe('AngularTimetableComponent', () => {
  let component: AngularTimetableComponent;
  let fixture: ComponentFixture<AngularTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
