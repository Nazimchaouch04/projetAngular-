import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import type { ConferenceListing } from '../conference';

@Component({
  selector: 'app-liste-conference',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './liste-conference.html',
  styleUrl: './liste-conference.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListeConference {
  readonly conferenceSelected = output<ConferenceListing>();
  readonly conferences = signal<ConferenceListing[]>([
    {
      title: 'Angular et les applications réactives',
      description: 'Découvrez les Signals et les nouveautés du framework Angular.',
      date: '2026-11-12',
      place: 'Tunis',
      maxParticipants: 120,
      nbParticipants: 46,
    },
    {
      title: 'Concevoir des interfaces accessibles',
      description: 'Bonnes pratiques pour créer des interfaces inclusives.',
      date: '2026-12-03',
      place: 'Sousse',
      maxParticipants: 80,
      nbParticipants: 73,
    },
    {
      title: 'Rencontre des développeurs web',
      description: 'Une journée d’échanges autour des technologies web.',
      date: '2027-01-22',
      place: 'Sfax',
      maxParticipants: 50,
      nbParticipants: 50,
    },
    {
      title: 'Conférence passée',
      description: 'Cette conférence passée ne doit pas apparaître.',
      date: '2025-05-10',
      place: 'Tunis',
      maxParticipants: 60,
      nbParticipants: 32,
    },
  ]);

  readonly upcomingConferences = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.conferences().filter(
      (conference) => new Date(`${conference.date}T00:00:00`) >= today,
    );
  });

  remainingSeats(conference: ConferenceListing): number {
    return Math.max(0, conference.maxParticipants - conference.nbParticipants);
  }

  selectConference(conference: ConferenceListing): void {
    this.conferenceSelected.emit(conference);
  }

  register(conference: ConferenceListing): void {
    if (this.remainingSeats(conference) === 0) {
      return;
    }

    this.conferences.update((conferences) =>
      conferences.map((item) =>
        item === conference ? { ...item, nbParticipants: item.nbParticipants + 1 } : item,
      ),
    );
  }
}
