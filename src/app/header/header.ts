import { Component, inject } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly bookingService = inject(BookingService);}
