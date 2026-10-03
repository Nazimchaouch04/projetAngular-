import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfile {}
