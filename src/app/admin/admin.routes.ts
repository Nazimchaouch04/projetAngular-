import type { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-layout').then((module) => module.AdminLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        title: 'Administration | ConfTech',
        data: {
          title: 'Tableau de bord administrateur',
          description: 'Vue d’ensemble de la plateforme ConfTech.',
        },
        loadComponent: () => import('./admin-section-page').then((module) => module.AdminSectionPage),
      },
      {
        path: 'conferences',
        title: 'Gestion des conférences | ConfTech',
        data: {
          title: 'Gestion des conférences',
          description: 'Administration du catalogue et des sessions.',
        },
        loadComponent: () => import('./admin-section-page').then((module) => module.AdminSectionPage),
      },
      {
        path: 'intervenants',
        title: 'Gestion des intervenants | ConfTech',
        data: {
          title: 'Gestion des intervenants',
          description: 'Organisation des profils et interventions des conférenciers.',
        },
        loadComponent: () => import('./admin-section-page').then((module) => module.AdminSectionPage),
      },
      {
        path: 'paiements',
        title: 'Paiements | ConfTech',
        data: {
          title: 'Paiements',
          description: 'Espace prévu pour le suivi et la gestion des paiements.',
        },
        loadComponent: () => import('./admin-section-page').then((module) => module.AdminSectionPage),
      },
      {
        path: 'statistiques',
        title: 'Statistiques | ConfTech',
        data: {
          title: 'Statistiques',
          description: 'Indicateurs et statistiques de la plateforme.',
        },
        loadComponent: () => import('./admin-section-page').then((module) => module.AdminSectionPage),
      },
      {
        path: 'utilisateurs',
        title: 'Gestion des utilisateurs | ConfTech',
        data: {
          title: 'Gestion des utilisateurs',
          description: 'Administration des comptes utilisateurs.',
        },
        loadComponent: () => import('./admin-section-page').then((module) => module.AdminSectionPage),
      },
      {
        path: '**',
        title: 'Page introuvable | ConfTech',
        loadComponent: () =>
          import('../not-found-page/not-found-page').then((module) => module.NotFoundPage),
      },
    ],
  },
];
