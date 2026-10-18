import type { Routes } from '@angular/router';

export const CONFERENCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Conférences | ConfTech',
    loadComponent: () =>
      import('./conference-catalog/conference-catalog').then(
        (module) => module.ConferenceCatalogPage,
      ),
  },
  {
    path: ':id',
    title: 'Détail de la conférence | ConfTech',
    loadComponent: () =>
      import('./conference-detail-page/conference-detail-page').then(
        (module) => module.ConferenceDetailPage,
      ),
  },
];
