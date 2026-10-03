import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DetailsConference } from '../details-conference/details-conference';
import { FriendsList } from '../friends-list/friends-list';
import { ListeConference } from '../liste-conference/liste-conference';
import { Navigation } from '../navigation/navigation';
import { Notifications } from '../notifications/notifications';
import { UserProfile } from '../user-profile/user-profile';

@Component({
  selector: 'app-home',
  imports: [
    Navigation,
    UserProfile,
    FriendsList,
    Notifications,
    ListeConference,
    DetailsConference,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
