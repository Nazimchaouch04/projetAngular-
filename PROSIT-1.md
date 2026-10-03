# Prosit 1 — Découvrir la notion de composant

## Organisation proposée

La page de profil est composée de sections indépendantes, chacune ayant une seule responsabilité :

| Section | Composant Angular |
|---|---|
| En-tête | `Header` — `src/app/header/` |
| Menu de navigation | `Navigation` — `src/app/navigation/` |
| Profil utilisateur | `UserProfile` — `src/app/user-profile/` |
| Liste des amis | `FriendsList` — `src/app/friends-list/` |
| Notifications | `Notifications` — `src/app/notifications/` |
| Pied de page | `Footer` — `src/app/footer/` |

Le composant racine `App` place `Header`, `Home` et `Footer`. Le composant `Home` joue le rôle de conteneur de la page et compose la navigation, le profil, les amis et les notifications.

```text
App
├── Header
├── Home
│   ├── Navigation
│   ├── UserProfile
│   ├── FriendsList
│   └── Notifications
└── Footer
```

## Pourquoi découper en composants ?

- **Modularité :** chaque composant porte une responsabilité claire et limitée.
- **Maintenance :** une section peut évoluer sans réécrire toute la page.
- **Réutilisation :** un composant autonome peut être replacé dans une autre page.
- **Travail en équipe :** plusieurs développeurs peuvent travailler sur des sections distinctes avec moins de conflits.
- **Lisibilité :** le template de `Home` décrit la composition de la page au lieu de contenir tous les détails de chaque section.

Dans Angular, un composant associe une classe TypeScript (comportement et données), un template HTML (structure) et éventuellement une feuille CSS (présentation). Les composants de ce projet sont standalone et sont importés là où ils sont utilisés.

## Limites actuelles

Les informations du profil, des amis et des notifications sont des exemples définis localement. Elles ne proviennent pas encore d’une API ou d’une base de données. Le menu utilise des liens d’ancrage vers les sections de la page.
