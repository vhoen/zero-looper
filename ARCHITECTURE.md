# Architecture - Zero Looper

Documentation de la refactorisation et structure du projet.

## Refactorisation

Le code a été séparé en **modules réutilisables** pour améliorer la testabilité et la maintenabilité.

### Avant (monolithe)

```
index.html (2000+ lignes)
├── HTML
├── CSS
└── JavaScript tout dans un même fichier
```

### Après (modulaire)

```
src/
├── utils/
│   ├── youtube.js      # Utilitaires YouTube
│   ├── loops.js        # Gestion des boucles
│   └── encoding.js     # Encodage/décodage
index.html (structure HTML)
tests/
├── unit/
│   ├── youtube.test.js
│   ├── loops.test.js
│   └── encoding.test.js
cypress/
└── e2e/
    └── app.cy.js
```

## Modules créés

### 1. src/utils/youtube.js

Gère tout ce qui concerne YouTube.

```javascript
// Extraire l'ID d'une URL
getYoutubeVideoId('https://youtube.com/watch?v=xyz')
// → 'xyz'

// Valider une URL
isValidYoutubeUrl(url: string): boolean
```

**Responsabilités** :
- Extraction d'ID YouTube
- Validation d'URLs YouTube
- Support de tous les formats YouTube

**Tests** : 6 cas de test

### 2. src/utils/loops.js

Gère la création et manipulation des boucles.

```javascript
// Créer une boucle
createLoop('Solo', 10, 30)
// → { name: 'Solo', start: 10, end: 30 }

// Ajouter une boucle (immutable)
addLoop(loopData, loop)

// Supprimer une boucle
removeLoop(loopData, index)

// Initialiser
initializeLoopData(url)
```

**Responsabilités** :
- Validation des données de boucle
- Création de boucles sûres
- Opérations immutables sur les listes

**Tests** : 17 cas de test

**Avantages** :
- Validation stricte dès la création
- Erreurs explicites
- Données immuables (pas d'effets de bord)

### 3. src/utils/encoding.js

Gère l'encodage/décodage base64 et URLs.

```javascript
// Encoder les données
encodeData({ url: '...', loops: [...] })
// → 'eyJ1cmwiOiI...'

// Décoder les données
decodeData(encoded: string)
// → { url: '...', loops: [...] }

// Générer une URL partageable
generateUrl(data, 'http://localhost:8181')
// → 'http://localhost:8181#eyJ1cmwiOiI...'

// Extraire depuis hash
extractDataFromHash(hash)
```

**Responsabilités** :
- Encodage/décodage base64
- Génération d'URLs
- Validation de structure

**Tests** : 16 cas de test

## Intégration dans index.html

Les modules sont importés et utilisés dans `index.html` :

```html
<script type="module">
  import { getYoutubeVideoId } from './src/utils/youtube.js';
  import { createLoop, addLoop } from './src/utils/loops.js';
  import { encodeData, decodeData } from './src/utils/encoding.js';
  
  // Utilisation...
</script>
```

## Avantages de cette architecture

### ✅ Testabilité
- Modules isolés et testables
- Dépendances explicites
- Pas d'état global

### ✅ Maintenabilité
- Code organisé et clair
- Responsabilité unique
- Facile à modifier/étendre

### ✅ Réutilisabilité
- Modules utilisables ailleurs
- Pas de couplage au DOM

### ✅ Robustesse
- Validation stricte
- Gestion d'erreur explicite
- Tests exhaustifs

## Flux de données

```
┌─────────────────────────┐
│    Utilisateur          │
│  (Interface HTML)       │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Event Handlers        │
│  (Clics, formulaires)   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   Modules Utilitaires   │
│  - youtube.js           │
│  - loops.js             │
│  - encoding.js          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│   YouTube IFrame API    │
│   Hash URL              │
│   localStorage (optionnel)
└─────────────────────────┘
```

## Dépendances

- **YouTube IFrame API** - Pour le lecteur vidéo
- **ES6 Modules** - Pour les imports/exports
- **Jest** - Pour tests unitaires (dev)
- **Cypress** - Pour tests E2E (dev)

## Performance

### Module Sizes (minifiés)

- `youtube.js` - ~500 bytes
- `loops.js` - ~800 bytes
- `encoding.js` - ~600 bytes
- **Total** - ~1.9 KB

### Lazy loading

Les modules sont chargés avec le document HTML (`type="module"`).

## Extensibilité

Pour ajouter une nouvelle fonctionnalité :

1. Créer un nouveau module en `src/utils/`
2. Implémenter la logique métier
3. Écrire les tests dans `tests/unit/`
4. Importer et utiliser dans `index.html`

Exemple - Ajouter la persistance localStorage :

```javascript
// src/utils/storage.js
export function saveLoopData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadLoopData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
```

## Conventions

### Nommage
- `camelCase` pour les fonctions
- `UPPER_CASE` pour les constantes
- Noms explicites et descriptifs

### Documentation
- JSDoc pour chaque fonction
- Commentaires pour logique complexe
- README pour modules importants

### Erreurs
- Messages d'erreur explicites
- Validation stricte aux frontières
- Try-catch pour API externes

### Tests
- 1 fichier test = 1 fichier source
- Naming: `{nom}.test.js`
- Une describe par fonction

## Prochaines étapes

1. **Intégration Continue** - GitHub Actions pour tester automatiquement
2. **E2E CI** - Exécuter Cypress dans le CI
3. **Couverture** - Maintenir 80%+ de couverture
4. **Documentation** - Ajouter JSDoc complet
5. **Performance** - Minifier les modules
6. **Accessibilité** - WCAG 2.1 AA

## Migration de l'ancien code

Si vous aviez une version précédente sans tests, voici comment migrer :

1. Copier la logique dans les modules
2. Ajouter la validation
3. Écrire les tests
4. Mettre à jour HTML pour importer les modules
5. Vérifier que tous les tests passent

Exemple migration de `playLoop()` :

```javascript
// Avant - dans index.html
function playLoop(loop, loopName) {
  if (!player) return;
  // ... logique mélangée
}

// Après - dans modules + index.html
import { createLoop } from './src/utils/loops.js';

function playLoop(loop, loopName) {
  const validLoop = createLoop(loop.name, loop.start, loop.end);
  // ... logique séparée
}
```

## Ressources

- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Jest Best Practices](https://jestjs.io/docs/getting-started)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Clean Code in JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
