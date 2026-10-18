import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-registration-confirmation-page',
  imports: [DatePipe, RouterLink],
  templateUrl: './registration-confirmation-page.html',
  styleUrl: './registration-confirmation-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationConfirmationPage {
  private readonly route = inject(ActivatedRoute);
  private readonly bookingService = inject(BookingService);
  private readonly conferenceService = inject(ConferenceService);
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly conference = computed(() => {
    const id = this.routeParams().get('id');
    return this.conferenceService.conferences().find((conference) => conference.id === id) ?? null;
  });

  readonly isBooked = computed(() => {
    const conference = this.conference();
    return conference ? this.bookingService.isBooked(conference) : false;
  });
}
