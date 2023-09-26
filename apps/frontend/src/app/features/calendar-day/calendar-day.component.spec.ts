import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayComponent } from './calendar-day.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarDayRoutingModule } from './calendar-day-routing.module';

describe('CalendarDayComponent', () => {
  let component: CalendarDayComponent;
  let fixture: ComponentFixture<CalendarDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarDayComponent],
      imports: [SharedModule, ReactiveFormsModule, CalendarDayRoutingModule]
    });
    fixture = TestBed.createComponent(CalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
