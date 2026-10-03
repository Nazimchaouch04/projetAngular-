# Prosit 2 — Découvrir le data-binding et les Signals

## Objectif

La section « Détail d’une conférence » de la page du Prosit 1 montre comment faire circuler les données entre la classe TypeScript d’un composant et son template HTML, et comment réagir aux actions de l’utilisateur sans recharger la page. Les sections profil, amis et notifications du Prosit 1 restent présentes.

## Données réactives

Dans `src/app/details-conference/details-conference.ts`, le titre, l’intervenante, la date, le nombre de places disponibles et le message d’inscription sont stockés dans des Signals (`signal(...)`). Le composant conserve aussi son entrée `conf` pour afficher les données lorsqu’il est utilisé par la liste de conférences.

Un Signal se lit en l’appelant, par exemple `title()`, et se met à jour avec `.set(...)`. Quand un Signal utilisé par le template change, Angular met à jour automatiquement les parties de l’interface qui en dépendent.

## Types de data-binding utilisés

| Type | Syntaxe | Exemple dans le projet | Rôle |
|---|---|---|---|
| Interpolation | `{{ expression }}` | `{{ speaker() }}` | Afficher une valeur du composant dans le HTML. |
| Liaison de propriété | `[value]="title()"` | Valeur initiale du champ titre | Envoyer une valeur du composant vers une propriété HTML. |
| Liaison d’événement | `(input)="updateTitle($event)"` | Champ titre | Recevoir une action du navigateur, puis mettre à jour le Signal. |
| Liaison bidirectionnelle | `[(ngModel)]="..."` ou `[(property)]="..."` | Non utilisée ici | Synchroniser une valeur dans les deux sens ; adaptée, par exemple, aux formulaires avec `FormsModule`. |
| Événement de clic | `(click)="register()"` | Bouton d’inscription | Déclencher une méthode du composant. |

Pour le champ titre, la propriété `[value]` affiche le Signal et l’événement `(input)` transmet la nouvelle saisie à `updateTitle`. La méthode appelle `title.set(...)` : le titre de la carte se met alors à jour immédiatement.

## Contrôle de flux natif Angular

Le template utilise `@if` / `@else` :

- tant qu’il reste des places, le bouton « S’inscrire » est affiché ;
- lorsque le nombre de places atteint zéro, le bouton est remplacé par un message « complet » ;
- après une inscription, un message de confirmation est affiché.

La méthode `register()` diminue le Signal `availableSeats`. Le template qui lit ce Signal réagit automatiquement au changement.

## Vérification manuelle

1. Lancer `npm start` et ouvrir la page d’accueil.
2. Saisir un nouveau titre : le titre de la carte change pendant la saisie.
3. Cliquer sur « S’inscrire » : le nombre de places diminue et un message de confirmation apparaît.
4. Pour observer l’état complet, régler temporairement le Signal des places à `1`, cliquer une fois, puis vérifier que le bouton est remplacé par l’état complet.

Les données et l’inscription sont locales au composant pour l’exercice ; elles ne sont pas enregistrées dans un serveur.
