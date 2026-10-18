# ProjectAngular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.24.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Architecture des conférences et des réservations

La logique métier est séparée des composants d’affichage et centralisée dans deux services Angular :

- `ConferenceService` (`src/app/services/conference.service.ts`) détient le catalogue des conférences, expose le catalogue en lecture seule avec un Signal, calcule les conférences à venir et gère les places restantes.
- `BookingService` (`src/app/services/booking.service.ts`) gère les inscriptions, empêche une réservation en double et expose le programme réservé ainsi que son compteur via des Signals calculés.

Les deux services utilisent `@Injectable({ providedIn: 'root' })`. Ils partagent ainsi une instance unique à l’échelle de l’application. C’est le bon périmètre pour le catalogue et les réservations : l’en-tête, la navigation, le profil, la liste et le détail des conférences lisent ou modifient le même état. Une déclaration dans les `providers` d’un composant créerait au contraire une instance limitée à cette branche de l’arbre de composants, et pourrait désynchroniser les affichages.

Les composants injectent les services avec `inject()` :

- `ListeConference` affiche les conférences à venir et délègue les réservations à `BookingService`.
- `Navigation` et `Header` affichent le compteur d’inscriptions partagé.
- `UserProfile` présente le programme personnel réservé.
- `DetailsConference` reflète les places et l’état d’inscription de la conférence choisie.

Le flux de réservation est le suivant : le composant demande à `BookingService` de réserver une conférence identifiée par son `id`; le service vérifie que l’utilisateur ne l’a pas déjà réservée, puis demande à `ConferenceService` de mettre à jour le nombre de participants. Les Signals et les propriétés `computed` propagent automatiquement les changements au catalogue, au programme et aux compteurs, sans instancier manuellement de composant ni dupliquer la logique métier.

Les tests unitaires couvrent notamment la mise à jour des places, la prévention des inscriptions en double et la synchronisation du compteur et du programme entre les composants.

## Navigation avec Angular Router

L’application utilise le routeur Angular plutôt que de simuler un changement de page avec des booléens. `provideRouter(routes)` enregistre la configuration depuis `src/app/app.config.ts`, et `<router-outlet>` dans `App` affiche le composant correspondant à l’URL.

Les routes déclarées dans `src/app/app.routes.ts` sont :

- `/` pour le tableau de bord;
- `/conferences` pour le catalogue;
- `/conferences/:id` pour la fiche d’une conférence identifiée par son identifiant stable;
- `/inscription` pour réserver une place et consulter le programme;
- `/inscription/confirmation/:id` pour la confirmation d’une réservation;
- `/profil` pour le profil utilisateur;
- `/contact` pour la page de contact.

La route vide (`/`) affiche le tableau de bord par défaut; `/accueil` y redirige également. L’en-tête utilise `routerLink` et `routerLinkActive` pour naviguer sans rechargement complet et montrer la route active, y compris la section Conférences lorsqu’une fiche de conférence est ouverte. Depuis le catalogue, le choix d’une conférence navigue vers sa fiche; celle-ci lit le paramètre `id` de la route avec `ActivatedRoute`, `toSignal` et `computed`. Une URL de fiche peut ainsi être actualisée ou partagée. Un identifiant de conférence inconnu affiche un état « conférence introuvable » avec un lien de retour au catalogue, tandis qu’une URL non configurée affiche une page 404. La page Contact est routable; elle indique explicitement que ses coordonnées doivent encore être configurées. La balise `<base href="/">` est déclarée dans `src/index.html` afin que le routeur compose correctement les URL.

Le routage facilite également l’historique Précédent/Suivant et permet d’ajouter de nouvelles pages dans une configuration centralisée, sans conditionner l’affichage par une collection de variables booléennes.

## Navigation dynamique et confirmation d’inscription

Les composants de fiche et de confirmation lisent les paramètres de route en Signals grâce à `toSignal(route.paramMap)` et dérivent la conférence à afficher avec `computed()`. Ils n’utilisent pas de `subscribe()` manuel; le service `Router` reste responsable de la navigation programmée.

Une inscription valide, depuis le détail ou la page Inscription, redirige automatiquement vers `/inscription/confirmation/:id`. La page de confirmation relit l’identifiant de la route et vérifie le statut partagé via `BookingService`. Si l’URL de confirmation est ouverte après une actualisation ou sans réservation active, l’écran ne prétend pas que l’inscription a réussi : il propose de revenir à la fiche de conférence.

## Routes modulaires et chargement différé

La configuration racine reste légère : les écrans autonomes (accueil, profil, contact, inscription et confirmation) sont chargés avec `loadComponent`. Le domaine conférences est regroupé dans `src/app/conference.routes.ts` et chargé avec `loadChildren`; ses routes enfants distinguent le catalogue (`/conferences`) du détail paramétré (`/conferences/:id`).

L’administration constitue un domaine multi-écrans indépendant, défini dans `src/app/admin/admin.routes.ts` et chargé avec `loadChildren` uniquement lors de l’accès à `/admin`. Son composant de layout héberge un `router-outlet` enfant et une navigation locale vers le tableau de bord, la gestion des conférences, des intervenants, des paiements, des statistiques et des utilisateurs. Les pages d’administration individuelles sont chargées à la demande via `loadComponent`. Les écrans d’administration sont des points d’entrée d’architecture; les opérations métier nécessitent encore leurs services et leurs API.

Cette séparation reporte le chargement des fonctionnalités rarement utilisées, limite la taille du bundle initial et permet aux équipes de faire évoluer des configurations de routes par domaine. Aucun système d’authentification/autorisation n’étant présent dans l’application, ces routes d’administration ne constituent pas une protection d’accès : un guard et une validation côté serveur seront nécessaires avant d’y exposer des données ou opérations sensibles.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
