import { Component, input } from '@angular/core';

@Component({
  selector: 'app-details-conference',
  imports: [],
  templateUrl: './details-conference.html',
  styleUrl: './details-conference.css',
})
export class DetailsConference {
  conf=input<any> ()
}
