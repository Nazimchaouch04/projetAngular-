import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notifications {
  readonly notifications = [
    {
      title: 'Nouvelle conférence disponible',
      message: 'Une nouvelle conférence tech a été ajoutée à la liste.',
      time: 'Il y a 10 min',
      unread: true,
    },
    {
      title: 'Sarra vous a ajouté(e)',
      message: 'Vous êtes maintenant amis sur la plateforme.',
      time: 'Il y a 1 h',
      unread: true,
    },
    {
      title: 'Rappel de conférence',
      message: 'Votre prochain rendez-vous approche.',
      time: 'Hier',
      unread: false,
    },
  ];
}
