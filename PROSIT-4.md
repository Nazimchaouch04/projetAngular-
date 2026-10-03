# Prosit 4 — Communication entre composants

## Objectif

Permettre à l’utilisateur de choisir une conférence dans `ListeConference` et d’afficher immédiatement cette conférence dans `DetailsConference`, tout en gardant les composants indépendants.

## Flux de communication

Les deux composants sont des composants frères, intégrés dans le parent `Home`. `Home` sert de médiateur :

```text
ListeConference -- output(conferenceSelected) --> Home
Home -- input(conf) --> DetailsConference
```

1. Dans `liste-conference.html`, le bouton « Voir les détails » appelle `selectConference(conference)`.
2. Dans `liste-conference.ts`, `conferenceSelected = output<ConferenceListing>()` définit l’événement typé, puis `.emit(conference)` transmet l’objet choisi.
3. Dans `home.html`, `(conferenceSelected)="selectConference($event)"` écoute l’événement. `$event` est l’objet conférence émis par la liste.
4. Dans `home.ts`, le signal `selectedConference` mémorise la conférence. La méthode `selectConference()` met ce signal à jour.
5. Dans `home.html`, `[conf]="selectedConference()"` envoie la valeur au composant de détail.
6. Dans `details-conference.ts`, `conf = input<ConferenceListing | null>(null)` reçoit la valeur. Le template du détail se met à jour automatiquement lorsque l’entrée change.

Le type partagé `ConferenceListing` est déclaré dans `src/app/conference.ts`. Une seule structure est ainsi utilisée par la liste, le parent et le détail.

## Pourquoi utiliser input et output ?

- **`output()` (enfant → parent)** : transmettre un événement ou une action utilisateur. La liste annonce quelle conférence a été sélectionnée.
- **`input()` (parent → enfant)** : fournir au détail les données à afficher.
- **`model()` (parent ⇄ enfant)** : utile lorsqu’un composant enfant doit aussi modifier directement une valeur liée au parent, comme un contrôle réutilisable. Ce n’est pas nécessaire ici : la sélection est un événement, puis le parent distribue la donnée.

La liste ne connaît donc pas le détail, et le détail ne connaît pas la liste. Cette séparation facilite leur réutilisation et leur évolution.

## Vérification

Les tests vérifient l’émission de la conférence sélectionnée, la réception et l’affichage par le détail, ainsi que le changement de détail lorsque l’utilisateur choisit une autre conférence.
