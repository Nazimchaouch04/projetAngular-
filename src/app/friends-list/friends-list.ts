import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.html',
  styleUrl: './friends-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsList {
  readonly friends = [
    { initials: 'SA', name: 'Sarra Amri', status: 'En ligne', online: true },
    { initials: 'MK', name: 'Mehdi Khelifi', status: 'Vu récemment', online: false },
    { initials: 'YA', name: 'Yasmine Ayadi', status: 'En ligne', online: true },
  ];
}
