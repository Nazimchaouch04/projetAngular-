import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import type { ConferenceListing } from '../conference';
import { BookingService } from '../services/booking.service';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-liste-conference',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './liste-conference.html',
  styleUrl: './liste-conference.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeConference {
  readonly conferenceSelected = output<ConferenceListing>();
  private readonly conferenceService = inject(ConferenceService);
  private readonly bookingService = inject(BookingService);
  readonly upcomingConferences = this.conferenceService.upcomingConferences;

  remainingSeats(conference: ConferenceListing): number {
    return this.conferenceService.remainingSeats(conference);
  }

  isBooked(conference: ConferenceListing): boolean {
    return this.bookingService.isBooked(conference);
  }

  selectConference(conference: ConferenceListing): void {
    this.conferenceSelected.emit(conference);
  }

  register(conference: ConferenceListing): void {
    this.bookingService.book(conference);
  }
}
