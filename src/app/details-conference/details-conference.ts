import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import type { ConferenceListing } from '../conference';

@Component({
  selector: 'app-details-conference',
  imports: [DatePipe],
  templateUrl: './details-conference.html',
  styleUrl: './details-conference.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsConference {
  readonly conf = input<ConferenceListing | null>(null);
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
