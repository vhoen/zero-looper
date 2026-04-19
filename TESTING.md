# Tests - Zero Looper

Documentation complète des tests unitaires et E2E pour Zero Looper.

## Structure des tests

```
tests/
├── unit/                      # Tests unitaires Jest
│   ├── youtube.test.js       # Tests YouTube utils
│   ├── loops.test.js         # Tests Loops utils
│   └── encoding.test.js      # Tests Encoding utils
```

```
cypress/
├── e2e/                       # Tests E2E Cypress
│   └── app.cy.js             # Tests E2E complets
└── support/
    └── e2e.js                # Support et helpers
```

## Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
# ou
docker-compose up
```

Le serveur doit être accessible sur `http://localhost:8181`

## Exécuter les tests

### Tests unitaires (Jest)

#### Lancer tous les tests une seule fois

```bash
npm test
```

#### Mode watch (relancer automatiquement)

```bash
npm run test:watch
```

#### Avec couverture de code

```bash
npm run test:coverage
```

### Tests E2E (Cypress)

#### Mode interactif

```bash
npm run test:e2e
```

Cypress ouvrira une interface graphique où vous pouvez voir et exécuter les tests en direct.

#### Mode headless (CI/CD)

```bash
npm run test:e2e:run
```

### Tous les tests

```bash
npm run test:all
```

Lance Jest puis Cypress en mode headless.

## Structure des tests

### Tests unitaires - src/utils/

#### youtube.js
- Extraction d'ID YouTube depuis différents formats d'URL
- Validation d'URLs YouTube
- Gestion des cas d'erreur

```javascript
import { getYoutubeVideoId } from '../src/utils/youtube.js';

it('should extract video ID', () => {
  const id = getYoutubeVideoId('https://www.youtube.com/watch?v=I3jWsoQ8W8g');
  expect(id).toBe('I3jWsoQ8W8g');
});
```

#### loops.js
- Création de boucles avec validation
- Ajout/suppression de boucles
- Gestion des erreurs

```javascript
import { createLoop } from '../src/utils/loops.js';

it('should create a valid loop', () => {
  const loop = createLoop('Solo', 10, 30);
  expect(loop.name).toBe('Solo');
  expect(loop.start).toBe(10);
  expect(loop.end).toBe(30);
});
```

#### encoding.js
- Encodage/décodage base64
- Génération d'URLs partagées
- Extraction de données du hash

```javascript
import { encodeData, decodeData } from '../src/utils/encoding.js';

it('should encode and decode data', () => {
  const data = { url: '...', loops: [...] };
  const encoded = encodeData(data);
  const decoded = decodeData(encoded);
  expect(decoded).toEqual(data);
});
```

### Tests E2E - cypress/e2e/

#### Charger une vidéo
- Validation du champ d'entrée
- Chargement de vidéos valides
- Gestion des erreurs
- Support du clavier (Entrée)

#### Ajouter des boucles
- Validation du formulaire
- Création de boucles multiples
- Nettoyage du formulaire après ajout

#### Supprimer des boucles
- Suppression de boucles
- Mise à jour de l'interface

#### URL et partage
- Mise à jour du hash URL
- Copie dans le presse-papiers
- Chargement depuis une URL encodée

#### UI et UX
- État vide initial
- Responsive design (mobile)

## Scénarios testés

### Scénario 1: Flux complet d'utilisation

```javascript
// 1. Charger une vidéo
cy.get('#youtubeUrl').type('https://www.youtube.com/watch?v=xyz');
cy.get('#loadVideoBtn').click();

// 2. Ajouter une boucle
cy.get('#loopName').type('Solo');
cy.get('#loopStart').type('10');
cy.get('#loopEnd').type('30');
cy.get('form button').click();

// 3. Jouer la boucle
cy.get('#loopsList button').first().click();

// 4. Copier le lien
cy.get('#copyBtn').click();
```

### Scénario 2: Partage d'une configuration

```javascript
// URL reçue d'un ami
const sharedUrl = 'http://localhost:8181#eyJ1cmwiOiIuLi4iLCJsb29wcyI6W3suLi59XX0=';

cy.visit(sharedUrl);
// La vidéo et les boucles sont déjà chargées
```

## Assertions principales

### YouTube Utils
- ✅ Extraction correcte d'ID YouTube
- ✅ Validation d'URLs YouTube
- ✅ Gestion des cas d'erreur

### Loops Utils
- ✅ Création avec validation
- ✅ Immuabilité des données
- ✅ Erreurs appropriées

### Encoding Utils
- ✅ Encodage/décodage symétrique
- ✅ Gestion des erreurs de format
- ✅ Validation de structure

### E2E
- ✅ Chargement de vidéos
- ✅ Création de boucles
- ✅ Suppression de boucles
- ✅ Partage d'URLs
- ✅ Responsive design

## Couverture de code

La couverture de code minimale est fixée à **70%** pour :
- Branches
- Fonctions
- Lignes
- Déclarations

Pour voir la couverture détaillée :

```bash
npm run test:coverage
```

Un rapport HTML sera généré dans `coverage/index.html`

## Fichiers de test importants

- **jest.config.js** - Configuration Jest
- **cypress.config.js** - Configuration Cypress
- **cypress/support/e2e.js** - Helpers Cypress

## Debugging

### Jest

Ajouter `debugger;` dans le code et exécuter :

```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

### Cypress

Utiliser le sélecteur de commande dans Cypress UI :
- Ouvrir les DevTools (F12)
- Chercher l'élément dans le DOM
- Vérifier les commandes Cypress

## CI/CD

Pour intégrer dans GitHub Actions :

```yaml
- name: Run tests
  run: npm run test:all
```

## Troubleshooting

### Tests Jest échouent
- Vérifier que Node.js >= 14 est installé
- Supprimer `node_modules` et réinstaller

### Tests Cypress échouent
- Vérifier que le serveur tourne sur port 8181
- Vérifier la connexion internet (pour YouTube)
- Utiliser `cy.debug()` pour pause l'exécution

### Problèmes YouTube API
- Cypress ignore les erreurs de cross-origin YouTube
- Les tests acceptent les erreurs CORS depuis YouTube

## Bonnes pratiques

1. **Tests unitaires** - Testez les utils sans dépendances externes
2. **Tests E2E** - Testez les workflows utilisateur complets
3. **Couverture** - Maintenez au minimum 70% de couverture
4. **Isolation** - Chaque test doit être indépendant
5. **Noms clairs** - Utilisez des noms descriptifs pour les tests

## Ressources

- [Jest Documentation](https://jestjs.io/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://testingjavascript.com/)
