import { Injectable, computed, inject, signal } from '@angular/core';
import type { ConferenceListing } from '../conference';
import { ConferenceService } from './conference.service';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly conferenceService = inject(ConferenceService);
  private readonly bookedConferenceIds = signal<ReadonlySet<string>>(new Set());

  readonly bookedConferences = computed(() =>
    this.conferenceService
      .conferences()
      .filter((conference) => this.bookedConferenceIds().has(conference.id)),
  );
  readonly bookingCount = computed(() => this.bookedConferences().length);

  isBooked(conference: ConferenceListing): boolean {
    return this.bookedConferenceIds().has(conference.id);
  }

  book(conference: ConferenceListing): boolean {
    if (this.isBooked(conference) || !this.conferenceService.reserveSeat(conference)) {
      return false;
    }

    this.bookedConferenceIds.update((ids) => new Set([...ids, conference.id]));
    return true;
  }
}
