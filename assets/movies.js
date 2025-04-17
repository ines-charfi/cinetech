// movies.js
import { fetchMovies, addToFavorites } from './api.js';

const moviesContainer = document.getElementById('movies-container');
let currentPage = 1;

async function loadMovies(page) {
    try {
        const data = await fetchMovies(page);
        displayMovies(data.results);
        setupPagination(data.total_pages);
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
            <i class="far fa-heart" onclick="toggleFavorite(this, ${movie.id})" style="cursor: pointer; font-size: 24px;"></i>
            <a href="detail.html?id=${movie.id}" class="btn btn-danger">Détails</a>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

window.toggleFavorite = function(heartIcon, movieId) {
    heartIcon.classList.toggle('fas');
    heartIcon.classList.toggle('far');
    heartIcon.style.color = heartIcon.classList.contains('fas') ? 'red' : '';
    addToFavorites(movieId, 'movie');
};

async function setupPagination(totalPages) {
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    pageInfo.innerText = `Page ${currentPage} sur ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            loadMovies(currentPage);
        }
    };

    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadMovies(currentPage);
        }
    };
}

// Charger les films lors du chargement de la page
loadMovies(currentPage);



