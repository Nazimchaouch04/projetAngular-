import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Header } from './header';
import { BookingService } from '../services/booking.service';
import { ConferenceService } from '../services/conference.service';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link to the shared personal program and show its booking count', () => {
    const bookingService = TestBed.inject(BookingService);
    const conference = TestBed.inject(ConferenceService).upcomingConferences()[0];
    const count: HTMLElement = fixture.nativeElement.querySelector('.program-link span');

    expect(count.textContent?.trim()).toBe('0');
    expect(fixture.nativeElement.querySelector('.program-link').getAttribute('href')).toBe(
      '/inscription',
    );

    bookingService.book(conference);
    fixture.detectChanges();

    expect(count.textContent?.trim()).toBe('1');
  });
});
