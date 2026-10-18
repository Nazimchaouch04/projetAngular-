import { Injectable, computed, signal } from '@angular/core';
import type { ConferenceListing } from '../conference';

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  private readonly conferenceState = signal<ConferenceListing[]>([
    {
      id: 'angular-reactive',
      title: 'Angular et les applications réactives',
      description: 'Découvrez les Signals et les nouveautés du framework Angular.',
      date: '2026-11-12',
      place: 'Tunis',
      maxParticipants: 120,
      nbParticipants: 46,
    },
    {
      id: 'accessible-interfaces',
      title: 'Concevoir des interfaces accessibles',
      description: 'Bonnes pratiques pour créer des interfaces inclusives.',
      date: '2026-12-03',
      place: 'Sousse',
      maxParticipants: 80,
      nbParticipants: 73,
    },
    {
      id: 'web-developers',
      title: 'Rencontre des développeurs web',
      description: 'Une journée d’échanges autour des technologies web.',
      date: '2027-01-22',
      place: 'Sfax',
      maxParticipants: 50,
      nbParticipants: 50,
    },
    {
      id: 'past-conference',
      title: 'Conférence passée',
      description: 'Cette conférence passée ne doit pas apparaître.',
      date: '2025-05-10',
      place: 'Tunis',
      maxParticipants: 60,
      nbParticipants: 32,
    },
  ]);

  readonly conferences = this.conferenceState.asReadonly();
  readonly upcomingConferences = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.conferences().filter(
      (conference) => new Date(`${conference.date}T00:00:00`) >= today,
    );
  });

  remainingSeats(conference: ConferenceListing): number {
    const currentConference = this.conferences().find((item) => item.id === conference.id);
    const current = currentConference ?? conference;
    return Math.max(0, current.maxParticipants - current.nbParticipants);
  }

  reserveSeat(conference: ConferenceListing): boolean {
    if (this.remainingSeats(conference) === 0) {
      return false;
    }

    this.conferenceState.update((conferences) =>
      conferences.map((item) =>
        item.id === conference.id
          ? { ...item, nbParticipants: item.nbParticipants + 1 }
          : item,
      ),
    );

    return true;
  }
}
