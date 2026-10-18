import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigation } from './navigation';
import { BookingService } from '../services/booking.service';
import { ConferenceService } from '../services/conference.service';

describe('Navigation', () => {
  let fixture: ComponentFixture<Navigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation],
    }).compileComponents();

    fixture = TestBed.createComponent(Navigation);
    await fixture.whenStable();
  });

  it('should show the live booking count from the shared service', () => {
    const bookingService = TestBed.inject(BookingService);
    const conference = TestBed.inject(ConferenceService).upcomingConferences()[0];

    expect(fixture.nativeElement.querySelector('.booking-count').textContent.trim()).toBe('0');

    bookingService.book(conference);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.booking-count').textContent.trim()).toBe('1');
  });
});
