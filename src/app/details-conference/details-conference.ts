import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import type { Conference } from '../conference';

@Component({
  selector: 'app-details-conference',
  templateUrl: './details-conference.html',
  styleUrl: './details-conference.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsConference {
  readonly conf = input<Conference | null>(null);
  readonly title = signal('Angular et les applications réactives');
  readonly speaker = signal('Sarra Amri');
  readonly eventDate = signal('2026-11-12');
  readonly availableSeats = signal(18);
  readonly registrationMessage = signal('');

  updateTitle(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.title.set(event.target.value);
    }
  }

  register(): void {
    const seats = this.availableSeats();

    if (seats === 0) {
      return;
    }

    this.availableSeats.set(seats - 1);
    this.registrationMessage.set('Votre inscription est prise en compte.');
  }
}
