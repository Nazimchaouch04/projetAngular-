import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {}
