# Prosit 3 — Directives, contrôle de flux natif et pipes

## Objectif

La page conserve les sections des Prosits 1 et 2 et ajoute une liste de conférences à venir. Le composant `ListeConference` utilise les mécanismes Angular de contrôle de flux et de formatage pour afficher les conférences et leur disponibilité.

## Données des conférences

Chaque `ConferenceListing` comprend les propriétés demandées : `title`, `description`, `date`, `place`, `maxParticipants` et `nbParticipants`. La liste est un Signal afin que l’inscription puisse mettre à jour le nombre de places.

## Contrôle de flux natif

- `@if` affiche les cartes lorsqu’il y a des conférences à venir ; sinon, il affiche un message d’état vide.
- `@for` crée une carte par conférence à venir. `track conference.title` donne à Angular une clé stable pour suivre les éléments.
- Un autre `@if` adapte le texte du bouton (« S’inscrire » ou « Complet ») selon le nombre de places.
- Les liaisons de classe `[class.seats-green]`, `[class.seats-orange]` et `[class.seats-red]` appliquent l’état visuel correspondant. La propriété `[disabled]` désactive le bouton complet.

Ces blocs `@if` et `@for` sont la syntaxe de contrôle de flux native d’Angular 21 ; aucune directive structurelle `*ngIf` ou `*ngFor` n’est nécessaire.

Le filtrage est réalisé dans `upcomingConferences` : seules les conférences dont la date est aujourd’hui ou dans le futur sont présentées.

## Pipes

- `uppercase` met le titre en majuscules **dans l’affichage**, sans modifier la valeur stockée.
- `date: 'dd/MM/yyyy'` présente une date ISO sous un format lisible en jour/mois/année.

## Disponibilité et couleur du bouton

Les places restantes sont calculées ainsi : `maxParticipants - nbParticipants`.

Pour éviter le chevauchement entre les consignes « disponible » et « moins de 10 places », le projet applique ces seuils :

- 10 places ou plus : bouton vert ;
- de 1 à 9 places : bouton orange ;
- 0 place : bouton rouge, désactivé et affiché comme « Complet ».

Une inscription augmente `nbParticipants` et met automatiquement à jour le nombre de places et la couleur du bouton. Les données restent locales au composant et ne sont pas envoyées à un serveur.
