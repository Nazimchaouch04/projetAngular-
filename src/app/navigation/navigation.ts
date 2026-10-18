import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {
  readonly bookingService = inject(BookingService);
}
