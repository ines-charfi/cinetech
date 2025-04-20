
README - Cinetech 🎬🍿


Description du Projet 🚀
Cinetech est une application web qui permet aux utilisateurs de découvrir des films 🎥 et des séries TV 📺 en utilisant l'API The Movie Database (TMDB). L'application offre une interface intuitive pour parcourir, rechercher 🔍 et sauvegarder des contenus multimédias favoris ❤️.

Cinetech Logo Logo de l'application Cinetech

Fonctionnalités ✨
Pages Principales 📚
Page d'Accueil 🏠

📌 Affiche une sélection de films et séries populaires

🖼️ Présentation visuelle attrayante avec des posters

🎯 Carrousel de contenus tendances

Page Films 🎬

📃 Liste paginée de tous les films disponibles

⚙️ Filtres possibles par genre, année, etc.

⭐ Système de notation visuelle

Page Séries 📺

📜 Liste paginée de toutes les séries disponibles

🌀 Filtres similaires à la page Films

🕒 Indicateur de nouvelle saison

Page Détail 🔍

ℹ️ Informations complètes :

🎞️ Titre, synopsis

👨‍💼 Réalisateur, acteurs

🏷️ Genres, durée, date

⭐ Note moyenne

🤝 Suggestions de contenus similaires

💬 Section commentaires et notation

Détail Film Exemple de page détail

Fonctionnalités Utilisateur 👤
Favoris ❤️ :

➕/➖ Ajout/retrait de films/séries

📋 Page favoris dédiée pour gérer sa liste

💾 Stockage via localStorage

Commentaires 💬 :

✏️ Possibilité de commenter

↩️ Répondre aux commentaires

🗂️ Affichage des commentaires TMDB

Recherche 🔍 :

🔎 Barre de recherche dans le header

⚡ Autocomplétion asynchrone

🌐 Recherche globale films/séries

Barre de Recherche Barre de recherche avec autocomplétion

Technologies Utilisées 💻
Frontend 🖥️:

 - HTML5, CSS3, JavaScript (ES6+)

🎨 Framework CSS optionnel (Bootstrap)

🔄 API Fetch pour requêtes asynchrones

API 🌐: The Movie Database API (TMDB)

Stockage 💾: localStorage

Installation et Configuration ⚙️

🌐 S'inscrire sur TMDB

🔑 Générer une clé API dans les paramètres

Configurer la clé API :

javascript
// config.js
const API_KEY = 'votre_cle_api_tmdb_ici';
Ouvrir dans un navigateur :

Structure des Fichiers 📂
cinetech/
├── index.html          # 🏠 Accueil
├── films.html          # 🎬 Films
├── series.html         # 📺 Séries
├── detail.html         # 🔍 Détail
├── favoris.html        # ❤️ Favoris
├── css/
│   ├── style.css       # 🎨 Style principal
│  
├── js/
│   ├── api.js       # 🔑 Config API
│   ├── index.js         # 🧠 Script principal
│   ├── movies.js        # 🎬 Logique films
│   ├── series.js       # 📺 Logique séries
│   ├── detail.js       # 🔍 Logique détail
│   └── favoris.js      # ❤️ Gestion favoris
└── assets/
    └── img/            # 🖼️ Images du projet

Responsive Design 📱💻
L'application s'adapte parfaitement à :

- Desktop (≥ 1024px)

- Tablettes (768px - 1023px)

- Mobiles (< 768px)

Responsive Design Aperçu des différentes tailles d'écran

Limitations ⚠️
🔒 Pas de système d'authentification (localStorage seulement)

📊 Données limitées par l'API TMDB

▶️ Pas de lecture vidéo, seulement des informations

⏳ Pas d'historique de navigation

Auteur 👨‍💻
ines-charfi
[Votre nom] <img src="assets/icons/github.png" width="16"> [@votregithub]
