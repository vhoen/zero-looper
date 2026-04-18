# Exemples d'utilisation

## 1. Créer une URL avec des boucles pré-configurées

### Exemple simple
Vidéo YouTube : `https://www.youtube.com/watch?v=I3jWsoQ8W8g`
Avec une boucle "solo" de 10 à 30 secondes.

**Données JSON:**
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

**Encodage en base64:**
```
eyJ1cmwiOiJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUkzandTb1E4VzhnIiwibG9vcHMiOlt7Im5hbWUiOiJzb2xvIiwic3RhcnQiOjEwLCJlbmQiOjMwfV19
```

**URL complète:**
```
http://localhost#eyJ1cmwiOiJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUkzandTb1E4VzhnIiwibG9vcHMiOlt7Im5hbWUiOiJzb2xvIiwic3RhcnQiOjEwLCJlbmQiOjMwfV19
```

## 2. Plusieurs boucles

```json
{
  "url": "https://www.youtube.com/watch?v=I3jWsoQ8W8g",
  "loops": [
    {
      "name": "Intro",
      "start": 0,
      "end": 15
    },
    {
      "name": "Couplet 1",
      "start": 15,
      "end": 45
    },
    {
      "name": "Refrain",
      "start": 45,
      "end": 75
    },
    {
      "name": "Solo guitare",
      "start": 75,
      "end": 105
    }
  ]
}
```

## 3. Utiliser JavaScript pour générer une URL

```javascript
// Dans la console du navigateur
const data = {
  url: "https://www.youtube.com/watch?v=I3jWsoQ8W8g",
  loops: [
    { name: "Solo", start: 10, end: 30 },
    { name: "Refrain", start: 45, end: 75 }
  ]
};

const encoded = btoa(JSON.stringify(data));
const fullUrl = `http://localhost#${encoded}`;
console.log(fullUrl);
// Copier et partager!
```

## 4. Générer une URL à partir d'une page HTML

Vous pouvez créer une page simple pour générer les URLs :

```html
<!DOCTYPE html>
<html>
<head>
  <title>URL Generator - Zero Looper</title>
  <style>
    body { font-family: Arial; max-width: 600px; margin: 50px auto; }
    textarea { width: 100%; height: 200px; font-family: monospace; }
    button { padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; }
    .output { margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px; }
  </style>
</head>
<body>
  <h1>Zero Looper - URL Generator</h1>
  <textarea id="jsonInput" placeholder='{"url": "...", "loops": [...]}'></textarea>
  <button onclick="generate()">Générer l\'URL</button>
  <div class="output">
    <strong>URL complète:</strong>
    <input type="text" id="output" style="width: 100%; padding: 10px;" readonly>
  </div>

  <script>
    function generate() {
      try {
        const json = document.getElementById('jsonInput').value;
        const data = JSON.parse(json);
        const encoded = btoa(JSON.stringify(data));
        const fullUrl = `http://localhost#${encoded}`;
        document.getElementById('output').value = fullUrl;
      } catch (error) {
        alert('Erreur: ' + error.message);
      }
    }
  </script>
</body>
</html>
```

## 5. Format URL complet

La structure complète d'une URL Zero Looper est :

```
http://localhost[#base64_encoded_json]
```

Où `base64_encoded_json` est le résultat de :
```javascript
btoa(JSON.stringify({
  url: "youtube_url",
  loops: [ {name, start, end}, ... ]
}))
```

## 6. Copier/coller un lien

1. Générez une URL comme montré ci-dessus
2. Copiez-la
3. Partagez-la avec d'autres
4. Quand quelqu'un ouvre le lien, toutes les boucles seront disponibles
5. Les utilisateurs peuvent ajouter/supprimer des boucles et générer de nouveaux liens

---

**Astuce**: Une fois dans l'application, utilisez le bouton "Copier le lien" en bas de page pour copier facilement la configuration actuelle dans le presse-papiers.
