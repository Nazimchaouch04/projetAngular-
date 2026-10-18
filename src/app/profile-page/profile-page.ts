import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserProfile } from '../user-profile/user-profile';

@Component({
  selector: 'app-profile-page',
  imports: [UserProfile],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {}
