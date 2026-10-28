# JustStreamIt

Interface web (front-end) affichant un classement de films à partir de l'API
locale **OCMovies-API**. Projet réalisé en **HTML / CSS / JavaScript vanilla**,
sans framework, requêtes via `fetch`.

## Structure

```
index.html          Structure de la page (sémantique HTML5)
css/style.css        Styles, mobile first, 3 tailles d'écran
js/api.js            Accès à l'API OCMovies (fetch)
js/ui.js             Construction du DOM, fenêtre modale, bouton « Voir plus »
js/script.js         Point d'entrée : enchaîne API + affichage
assets/              Logo et affiche de secours (SVG)
```

## Lancer le projet

### 1. L'API OCMovies

```bash
cd OCMovies-API-EN-FR
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py create_db      # première fois uniquement
python manage.py runserver      # sert http://localhost:8000/api/v1/
```

### 2. Le front-end

Servir le dossier avec un petit serveur statique (évite les soucis CORS/`file://`) :

```bash
python3 -m http.server 5500
```

Puis ouvrir http://localhost:5500

## Fonctionnalités

- Meilleur film (plus haut score IMDB, toutes catégories)
- Films les mieux notés + 2 catégories fixes (Mystery, Sci-Fi)
- Catégorie au choix via un menu déroulant alimenté par l'API
- Bouton « Voir plus / Voir moins » (mobile : 2 films, tablette : 4, desktop : 6)
- Fenêtre modale avec le détail complet d'un film
