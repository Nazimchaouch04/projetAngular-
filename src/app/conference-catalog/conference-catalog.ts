import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import type { ConferenceListing } from '../conference';
import { ListeConference } from '../liste-conference/liste-conference';

@Component({
  selector: 'app-conference-catalog-page',
  imports: [ListeConference],
  templateUrl: './conference-catalog.html',
  styleUrl: './conference-catalog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceCatalogPage {
  private readonly router = inject(Router);

  openConference(conference: ConferenceListing): Promise<boolean> {
    return this.router.navigate(['/conferences', conference.id]);
  }
}
