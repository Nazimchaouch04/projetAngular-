import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import type { ConferenceListing } from '../conference';
import { BookingService } from '../services/booking.service';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-registration-page',
  imports: [DatePipe, RouterLink],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationPage {
  readonly conferenceService = inject(ConferenceService);
  readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);
  readonly message = signal('');

  isBooked(conference: ConferenceListing): boolean {
    return this.bookingService.isBooked(conference);
  }

  register(conference: ConferenceListing): Promise<boolean> {
    if (this.bookingService.book(conference)) {
      return this.router.navigate(['/inscription', 'confirmation', conference.id]);
    }

    this.message.set(
      this.isBooked(conference)
        ? `Vous êtes déjà inscrit à « ${conference.title} ».`
        : `Il ne reste plus de places pour « ${conference.title} ».`,
    );
    return Promise.resolve(false);
  }
}
