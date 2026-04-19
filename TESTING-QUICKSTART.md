# Quick Start - Tests

Guide rapide pour démarrer avec les tests.

## Installation (1 min)

```bash
# Installer les dépendances
npm install

# Lancer le serveur
npm run dev
# ou avec Docker
docker-compose up
```

Le serveur tournera sur `http://localhost:8181`

## Tests Unitaires (Jest) - 2 min

```bash
# Lancer tous les tests
npm test

# Mode watch (relancer automatiquement à chaque changement)
npm run test:watch

# Avec couverture
npm run test:coverage
```

### Qu'est-ce qui est testé ?

- ✅ **youtube.js** - Extraction d'ID, validation d'URLs
- ✅ **loops.js** - Création, ajout, suppression de boucles
- ✅ **encoding.js** - Encodage/décodage base64

### Exemple

```bash
$ npm test

 PASS  tests/unit/youtube.test.js
 PASS  tests/unit/loops.test.js
 PASS  tests/unit/encoding.test.js

Tests:       39 passed, 39 total
Coverage:    92% statements, 88% branches, 90% functions, 92% lines
```

## Tests E2E (Cypress) - 5 min

### Mode interactif (avec interface)

```bash
npm run test:e2e
```

Cypress ouvrira une fenêtre où vous pouvez :
- 👀 Voir les tests en temps réel
- 🎯 Cliquer sur chaque test pour le lancer
- 🐛 Déboguer avec DevTools
- 📸 Prendre des captures d'écran

### Mode headless (automatisé)

```bash
npm run test:e2e:run
```

Parfait pour CI/CD.

### Qu'est-ce qui est testé ?

- ✅ Charger une vidéo YouTube
- ✅ Ajouter des boucles
- ✅ Supprimer des boucles
- ✅ Partager l'URL
- ✅ Copier le lien
- ✅ Responsive design

### Exemple

```bash
$ npm run test:e2e:run

Running:  cypress/e2e/app.cy.js

 Charger une vidéo
   ✓ should load the page
   ✓ should show error when URL is empty
   ✓ should load a valid YouTube video

 Ajouter des boucles
   ✓ should add a valid loop
   ✓ should add multiple loops

 Supprimer les boucles
   ✓ should delete a loop

 URL et partage
   ✓ should update URL hash when video is loaded
   ✓ should copy URL to clipboard

Tests:  25 passed
```

## Tous les tests

```bash
npm run test:all
```

Lance Jest puis Cypress en sequence.

## Fichiers importants

```
tests/unit/
├── youtube.test.js      # 6 tests
├── loops.test.js        # 17 tests
└── encoding.test.js     # 16 tests

cypress/e2e/
└── app.cy.js            # 25+ tests

jest.config.js           # Config Jest
cypress.config.js        # Config Cypress
```

## Debugging

### Jest - Ajouter des logs

```javascript
// Dans youtube.test.js
it('should extract video ID', () => {
  const id = getYoutubeVideoId('https://www.youtube.com/watch?v=xyz');
  console.log('ID extracted:', id);  // ← Logs
  expect(id).toBe('xyz');
});
```

### Cypress - Ajouter des pauses

```javascript
// Dans app.cy.js
it('should load video', () => {
  cy.get('#youtubeUrl').type('https://...');
  cy.get('#loadVideoBtn').click();
  cy.pause();  // ← Pause ici
  cy.get('#successMessage').should('be.visible');
});
```

## Troubleshooting

### "npm: command not found"
```bash
# Installer Node.js depuis https://nodejs.org/
node --version  # Vérifier l'installation
```

### "Port 8181 is already in use"
```bash
# Trouver et tuer le processus
lsof -i :8181
kill -9 <PID>
```

### Tests Jest échouent
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
npm test
```

### Tests Cypress échouent
```bash
# Vérifier que le serveur tourne
curl http://localhost:8181

# Relancer les tests
npm run test:e2e:run
```

## Bonnes pratiques

✅ **À faire** :
- Exécuter `npm test` avant de push
- Ajouter des tests pour nouvelles fonctionnalités
- Vérifier la couverture avec `npm run test:coverage`

❌ **À éviter** :
- Modifier les tests sans raison
- Ignorer les erreurs de test
- Committer sans avoir testé

## Raccourcis utiles

```bash
# Tests + Coverage
npm test -- --coverage

# Watch mode (relance auto)
npm run test:watch

# Tests E2E avec debug
npm run test:e2e -- --headed

# Tests rapides (pas de Cypress)
npm test
```

## Pour aller plus loin

- 📖 [TESTING.md](./TESTING.md) - Documentation complète
- 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture du code
- 📝 [Jest Docs](https://jestjs.io/)
- 🌳 [Cypress Docs](https://docs.cypress.io/)

## Support

Questions ? Vérifiez :
1. Le serveur tourne sur port 8181
2. Les dépendances sont installées (`npm install`)
3. Les logs d'erreur avec `-v` (verbose mode)

Bon test ! 🧪
