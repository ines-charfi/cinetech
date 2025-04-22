// favoris.js
import { loadFavorites } from './api.js';

<<<<<<< HEAD
const favoritesContainer = document.getElementById('favorites-container');
const clearFavoritesButton = document.getElementById('clear-favorites');

// Fonction pour récupérer les détails d'un film ou d'une série
async function fetchFavoriteDetails(id, type) {
    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=8c4b867188ee47a1d4e40854b27391ec&language=fr-FR`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des détails');
    }
    return await response.json();
}

async function displayFavorites(favorites) {
    favoritesContainer.innerHTML = '';
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
        } catch (error) {
            console.error(error);
        }
    }
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







=======
document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const clearButton = document.getElementById('clear-favorites');

    async function displayFavorites() {
        const favorites = loadFavorites();
        favoritesContainer.innerHTML = '';

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = '<p class="text-muted">Aucun favori pour le moment</p>';
            return;
        }

        for (const favorite of favorites) {
            try {
                const details = await fetchFavoriteDetails(favorite.id, favorite.type);
                const favoriteElement = document.createElement('div');
                favoriteElement.classList.add('col-md-3', 'favorite');
                favoriteElement.innerHTML = `
                    <h5><b>${favorite.type === 'movie' ? details.title : details.name}</b></h5>
                    <img src="https://image.tmdb.org/t/p/w500${details.poster_path}" 
                         alt="${favorite.type === 'movie' ? details.title : details.name}" 
                         class="img-fluid">
                    <a href="detail.html?id=${favorite.id}&type=${favorite.type}" 
                       class="btn btn-danger">Détails</a>
                `;
                favoritesContainer.appendChild(favoriteElement);
            } catch (error) {
                console.error('Erreur lors du chargement des favoris:', error);
            }
        }
    }

    async function fetchFavoriteDetails(id, type) {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=8c4b867188ee47a1d4e40854b27391ec&language=fr-FR`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des détails');
        return await response.json();
    }

    function clearFavorites() {
        if (confirm('Voulez-vous vraiment vider tous vos favoris ?')) {
            localStorage.removeItem('favorites');
            displayFavorites();
        }
    }

    clearButton.addEventListener('click', clearFavorites);
    displayFavorites();
});
>>>>>>> fb448fd791337ca5b946569e00b94a5ba846b552
