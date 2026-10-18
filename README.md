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

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
