import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import type { ConferenceListing } from '../conference';
import { BookingService } from '../services/booking.service';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-details-conference',
  imports: [DatePipe],
  templateUrl: './details-conference.html',
  styleUrl: './details-conference.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsConference {
  readonly conf = input<ConferenceListing | null>(null);
  readonly registrationSucceeded = output<ConferenceListing>();
  private readonly conferenceService = inject(ConferenceService);
  private readonly bookingService = inject(BookingService);
  readonly currentConference = computed(() => {
    const selected = this.conf();
    const catalog = this.conferenceService.conferences();
    return selected
      ? (catalog.find((conference) => conference.id === selected.id) ?? selected)
      : (this.conferenceService.upcomingConferences()[0] ?? null);
  });
  readonly title = signal('Angular et les applications réactives');
  readonly speaker = signal('Sarra Amri');
  readonly eventDate = signal('2026-11-12');
  readonly availableSeats = computed(() => {
    const conference = this.currentConference();
    return conference ? this.conferenceService.remainingSeats(conference) : 0;
  });
  readonly registrationMessage = signal('');

  updateTitle(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.title.set(event.target.value);
    }
  }

  register(): void {
    const conference = this.currentConference();
    if (!conference) {
      this.registrationMessage.set('Aucune conférence disponible pour le moment.');
      return;
    }

    if (this.bookingService.book(conference)) {
      this.registrationMessage.set('Votre inscription est prise en compte.');
      this.registrationSucceeded.emit(conference);
    } else if (this.bookingService.isBooked(conference)) {
      this.registrationMessage.set('Vous êtes déjà inscrit à cette conférence.');
    } else {
      this.registrationMessage.set('Toutes les places sont réservées.');
    }
  }

  isBooked(): boolean {
    const conference = this.currentConference();
    return conference ? this.bookingService.isBooked(conference) : false;
  }
}
