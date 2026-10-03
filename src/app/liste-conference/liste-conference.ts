import { Component } from '@angular/core';
import { DetailsConference } from '../details-conference/details-conference';
@Component({
  selector: 'app-liste-conference',
  imports: [DetailsConference],
  templateUrl: './liste-conference.html',
  styleUrl: './liste-conference.css',
})
export class ListeConference {
  conferences: any[] = [

    {
      name: 'Conference 1',
      date: '2023-01-15',
      location: 'New York'
    },

    {
      name: 'Conference 2',
      date: '2023-02-20',
      location: 'Los Angeles'
    },

    {
      name: 'Conference 3',
      date: '2023-03-10',
      location: 'Chicago'
    }

  ];
}
