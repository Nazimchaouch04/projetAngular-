import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import type { ConferenceListing } from '../conference';
import { DetailsConference } from '../details-conference/details-conference';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-conference-detail-page',
  imports: [DetailsConference, RouterLink],
  templateUrl: './conference-detail-page.html',
  styleUrl: './conference-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConferenceDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly conferenceService = inject(ConferenceService);
  private readonly routeParams = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  readonly conference = computed(() => {
    const id = this.routeParams().get('id');
    return this.conferenceService.conferences().find((conference) => conference.id === id) ?? null;
  });

  confirmRegistration(conference: ConferenceListing): Promise<boolean> {
    return this.router.navigate(['/inscription', 'confirmation', conference.id]);
  }
}
