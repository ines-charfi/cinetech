// favoris.js
import { loadFavorites } from './api.js';

const favoritesContainer = document.getElementById('favorites-container');
const clearFavoritesButton = document.getElementById('clear-favorites');

// Fonction pour récupérer les détails d'un film ou d'une série
async function fetchFavoriteDetails(id, type) {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=a1d40f7c02d44bf3a6694ddd7924a331&language=fr-FR`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails');
    }
    return await response.json();
}

async function displayFavorites(favorites) {
    favoritesContainer.innerHTML = '';
    const validFavorites = []; // Array to hold valid favorites

    for (const favorite of favorites) {
        try {
            const details = await fetchFavoriteDetails(favorite.id, favorite.type);
            const favoriteElement = document.createElement('div');
            favoriteElement.classList.add('col-md-3', 'favorite');
            favoriteElement.innerHTML = `
                <h5><b>${favorite.type === 'movie' ? details.title : details.name}</b></h5>
                <img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="${favorite.type === 'movie' ? details.title : details.name}" class="img-fluid">
                <a href="detail.html?id=${favorite.id}&type=${favorite.type}" class="btn btn-danger">Détails</a>
            `;
            favoritesContainer.appendChild(favoriteElement);
            validFavorites.push(favorite); // Add valid favorite to the list
        } catch (error) {
            console.error(error);
            // Afficher un message d'erreur pour les séries non trouvées
            const errorElement = document.createElement('div');
            errorElement.classList.add('col-md-3', 'favorite');
            errorElement.innerHTML = `
                <h5><b>Série non trouvée</b></h5>
                <p>Cette série n'est plus disponible.</p>
            `;
            favoritesContainer.appendChild(errorElement);
        }
    }

    // Update localStorage with valid favorites
    localStorage.setItem('favorites', JSON.stringify(validFavorites));
}

// Load favorites on page load
const favorites = loadFavorites();
displayFavorites(favorites);

// Événement pour le bouton de vider les favoris
clearFavoritesButton.addEventListener('click', clearFavorites);

// Fonction pour vider les favoris
function clearFavorites() {
    localStorage.removeItem('favorites'); // Supprime les favoris du localStorage
    favoritesContainer.innerHTML = ''; // Réinitialise le conteneur
    alert('Tous les favoris ont été vidés !'); // Message de confirmation
}