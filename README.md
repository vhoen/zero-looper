# 🔄 Zero Looper

Une application web pour créer des boucles personnalisées dans vos vidéos YouTube.

## Fonctionnalités

- 📺 **Lecteur YouTube intégré** - Lisez n'importe quelle vidéo YouTube
- 🎵 **Créer des boucles** - Définissez le début et la fin d'une boucle (en secondes)
- ➕ **Ajouter des boucles** - Ajoutez autant de boucles que vous le souhaitez avec un nom personnalisé
- 🔄 **Lecture en boucle** - Lisez une boucle en continu en cliquant sur son bouton
- 🔗 **Partager** - Partage vos configurations de boucles via un lien encodé en base64
- 📋 **Copier le lien** - Un bouton pour copier facilement le lien à partager
- 🗑️ **Supprimer les boucles** - Supprimez une boucle indésirable

## Structure des données

L'application utilise une ancre (hash) contenant un objet JSON encodé en base64 :

```json
{
  "url": "https://www.youtube.com/watch?v=I3jWsoQ8W8g",
  "loops": [
    {
      "name": "solo",
      "start": 10,
      "end": 30
    }
  ]
}
```

## Installation et lancement

### Avec Docker (recommandé)

1. **Prérequis** : Avoir Docker et Docker Compose installés

2. **Lancer l'application** :
```bash
docker-compose up -d
```

3. **Accéder à l'application** :
   - Ouvrez votre navigateur sur `http://localhost`

4. **Arrêter l'application** :
```bash
docker-compose down
```

### Sans Docker (développement local)

1. Ouvrez simplement `index.html` dans votre navigateur
2. L'application fonctionnera en local sans serveur web

### Générer un fichier HTML unique (prêt à déployer)

```bash
npm run build:single
```

Le fichier généré est : `dist/index.html`. C'est un fichier HTML autonome et complet, prêt à être hébergé ou déployé.

## Utilisation

1. **Charger une vidéo** : Utilisez un lien avec une ancre contenant les données encodées
   - Exemple : `http://localhost#eyJ1cmwiOiJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUkzandTb1E4VzhnIiwibG9vcHMiOlt7Im5hbWUiOiJzb2xvIiwic3RhcnQiOjEwLCJlbmQiOjMwfV19`

2. **Créer une boucle** :
   - Entrez le nom de la boucle
   - Entrez le début (en secondes)
   - Entrez la fin (en secondes)
   - Cliquez sur "Ajouter la boucle"

3. **Lire une boucle** :
   - Cliquez sur le bouton de la boucle
   - La vidéo va se mettre en boucle entre les deux points spécifiés

4. **Supprimer une boucle** :
   - Cliquez sur le "✕" à côté du nom de la boucle

5. **Partager vos configurations** :
   - Cliquez sur "Copier le lien" en bas
   - Partagez ce lien avec d'autres personnes

## Technologies utilisées

- **HTML5** - Structure
- **CSS3** - Styles et responsive design
- **JavaScript** - Logique et interaction
- **YouTube IFrame API** - Intégration vidéo
- **Docker & Nginx** - Containerization et serveur web

## Encodage/Décodage des données

Les données sont stockées dans l'ancre URL (hash) en base64 pour permettre le partage simple :

```javascript
// Encodage
const data = { url: "...", loops: [...] };
const encoded = btoa(JSON.stringify(data));
// URL devient : http://localhost#<encoded>

// Décodage
const hash = window.location.hash.substring(1);
const decoded = atob(hash);
const data = JSON.parse(decoded);
```

## Notes de sécurité

- Les données sont stockées uniquement dans l'URL
- Aucune donnée n'est envoyée à un serveur externe
- Les liens partagés contiennent toutes les informations nécessaires

## Support des navigateurs

- Chrome/Chromium (recommandé)
- Firefox
- Safari
- Edge

## Licence

MIT
