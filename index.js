// index.js
// index.js
// Vous pouvez ajouter ici des fonctionnalités spécifiques à la page d'accueil
// Par exemple, des animations, des événements, ou des redirections

document.addEventListener('DOMContentLoaded', () => {
    // Code à exécuter lorsque le DOM est complètement chargé
    console.log('Page d\'accueil chargée');
    // Vous pouvez ajouter d'autres fonctionnalités ici
});
import { fetchMovies, fetchSeries } from './api.js';

const moviesContainer = document.getElementById('movies-container');
const seriesContainer = document.getElementById('series-container');

async function loadMovies() {
    try {
        const data = await fetchMovies(1); // Fetch first page of movies
        displayMovies(data.results);
    } catch (error) {
        console.error(error);
    }
}

async function loadSeries() {
    try {
        const data = await fetchSeries(1); // Fetch first page of series
        displaySeries(data.results);
    } catch (error) {
        console.error(error);
    }
}

async function displayMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('col-md-3', 'movie');
        movieElement.innerHTML = `
            <h5><b>${movie.title}</b></h5>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="img-fluid">
            <i class="far fa-heart" onclick="toggleFavorite(this, ${movie.id})" style="cursor: pointer; font-size: 24px;"></i><br>
            <span class="badge badge-secondary">${movie.release_date}</span><br>
            <a href="detail.html?id=${movie.id}" class="btn btn-danger">Détails</a>
        `;
        moviesContainer.appendChild(movieElement);
    });
}
window.toggleFavorite = function(heartIcon, movieId) {
    heartIcon.classList.toggle('fas'); // Change l'icône de cœur vide à plein
    heartIcon.classList.toggle('far'); // Change l'icône de cœur plein à vide
    heartIcon.style.color = heartIcon.classList.contains('fas') ? 'red' : ''; // Change la couleur en rouge si plein
    addToFavorites(movieId, 'movie'); // Appel de la fonction pour ajouter aux favoris
};
export function addToFavorites(id, type) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Vérifiez si l'élément est déjà dans les favoris
    if (!favorites.some(fav => fav.id === id && fav.type === type)) {
        favorites.push({ id, type });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert('Ajouté aux favoris !');
    } else {
        alert('Déjà dans les favoris !');
    }
}
async function displaySeries(series) {
    seriesContainer.innerHTML = '';
    series.forEach(serie => {
        const seriesElement = document.createElement('div');
        seriesElement.classList.add('col-md-3', 'series');
        seriesElement.innerHTML = `
            <h5><b>${serie.name}</b></h5>
            <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}" class="img-fluid"><br>
            <span class="badge badge-secondary">${serie.first_air_date}</span><br>
             <i class="far fa-heart" onclick="toggleFavorite(this, ${serie.id})" style="cursor: pointer; font-size: 24px;"></i><br>
            <a href="detail.html?id=${serie.id}&type=tv" class="btn btn-danger">Détails</a>
        `;
        seriesContainer.appendChild(seriesElement);
    });
}
window.toggleFavorite = function(heartIcon, serieId) {
    heartIcon.classList.toggle('fas'); // Change l'icône de cœur vide à plein
    heartIcon.classList.toggle('far'); // Change l'icône de cœur plein à vide
    heartIcon.style.color = heartIcon.classList.contains('fas') ? 'red' : ''; // Change la couleur en rouge si plein
    addToFavorites(serieId, 'serie'); // Appel de la fonction pour ajouter aux favoris
};
// Load movies and series on page load
loadMovies();
loadSeries();