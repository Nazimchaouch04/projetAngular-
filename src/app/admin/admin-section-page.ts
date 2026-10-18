import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

interface AdminSectionData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-admin-section-page',
  template: `
    <p class="eyebrow">Espace de travail</p>
    <h2>{{ section().title }}</h2>
    <p>{{ section().description }}</p>
  `,
  styles: `
    .eyebrow {
      margin: 0 0 0.45rem;
      color: var(--color-primary);
      font-size: 0.75rem;
      font-weight: 750;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    h2 {
      margin: 0;
      color: var(--color-ink);
      font-size: clamp(1.4rem, 3vw, 2rem);
      letter-spacing: -0.04em;
    }

    p:last-child {
      color: var(--color-muted);
      line-height: 1.6;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSectionPage {
  private readonly route = inject(ActivatedRoute);
  private readonly routeData = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data,
  });

  readonly section = computed(
    (): AdminSectionData => {
      const data = this.routeData();
      const title = data['title'];
      const description = data['description'];

      if (typeof title !== 'string' || typeof description !== 'string') {
        throw new Error('Admin child route requires title and description data.');
      }

      return { title, description };
    },
  );
}
