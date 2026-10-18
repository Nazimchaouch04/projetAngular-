import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FriendsList } from '../friends-list/friends-list';
import { Navigation } from '../navigation/navigation';
import { Notifications } from '../notifications/notifications';
import { UserProfile } from '../user-profile/user-profile';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Navigation, UserProfile, FriendsList, Notifications, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
