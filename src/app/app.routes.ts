import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Accueil | ConfTech',
    loadComponent: () => import('./home/home').then((module) => module.Home),
  },
  { path: 'accueil', redirectTo: '', pathMatch: 'full' },
  {
    path: 'conferences',
    loadChildren: () =>
      import('./conference.routes').then((module) => module.CONFERENCE_ROUTES),
  },
  {
    path: 'inscription/confirmation/:id',
    title: 'Confirmation d’inscription | ConfTech',
    loadComponent: () =>
      import('./registration-confirmation-page/registration-confirmation-page').then(
        (module) => module.RegistrationConfirmationPage,
      ),
  },
  {
    path: 'inscription',
    title: 'Inscriptions | ConfTech',
    loadComponent: () =>
      import('./registration-page/registration-page').then((module) => module.RegistrationPage),
  },
  {
    path: 'contact',
    title: 'Contact | ConfTech',
    loadComponent: () =>
      import('./contact-page/contact-page').then((module) => module.ContactPage),
  },
  {
    path: 'profil',
    title: 'Mon profil | ConfTech',
    loadComponent: () => import('./profile-page/profile-page').then((module) => module.ProfilePage),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((module) => module.ADMIN_ROUTES),
  },
  {
    path: '**',
    title: 'Page introuvable | ConfTech',
    loadComponent: () =>
      import('./not-found-page/not-found-page').then((module) => module.NotFoundPage),
  },
];
