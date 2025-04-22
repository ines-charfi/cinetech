// index.js
import { fetchMovies, fetchSeries, addToFavorites } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies-container');
    const seriesContainer = document.getElementById('series-container');

    async function loadMovies() {
        try {
            const data = await fetchMovies(1);
            displayMovies(data.results);
        } catch (error) {
            console.error('Erreur lors du chargement des films:', error);
        }
    }

    async function loadSeries() {
        try {
            const data = await fetchSeries(1);
            displaySeries(data.results);
        } catch (error) {
            console.error('Erreur lors du chargement des séries:', error);
        }
    }

    function displayMovies(movies) {
        moviesContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('col-md-3', 'movie');
            movieElement.innerHTML = `
                <h5><b>${movie.title}</b></h5>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="img-fluid">
                <i class="far fa-heart favorite-icon" data-id="${movie.id}" data-type="movie"></i>
                <span class="badge badge-secondary">${movie.release_date}</span>
                <a href="detail.html?id=${movie.id}" class="btn btn-danger">Détails</a>
            `;
            moviesContainer.appendChild(movieElement);
        });
        setupFavoriteListeners();
    }

    function displaySeries(series) {
        seriesContainer.innerHTML = '';
        series.forEach(serie => {
            const seriesElement = document.createElement('div');
            seriesElement.classList.add('col-md-3', 'series');
            seriesElement.innerHTML = `
                <h5><b>${serie.name}</b></h5>
                <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}" class="img-fluid">
                <i class="far fa-heart favorite-icon" data-id="${serie.id}" data-type="tv"></i>
                <span class="badge badge-secondary">${serie.first_air_date}</span>
                <a href="detail.html?id=${serie.id}&type=tv" class="btn btn-danger">Détails</a>
            `;
            seriesContainer.appendChild(seriesElement);
        });
        setupFavoriteListeners();
    }

    function setupFavoriteListeners() {
        document.querySelectorAll('.favorite-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const id = this.dataset.id;
                const type = this.dataset.type;
                this.classList.toggle('fas');
                this.classList.toggle('far');
                this.style.color = this.classList.contains('fas') ? 'red' : '';
                addToFavorites(id, type);
            });
        });
    }

    async function searchContent() {
        const query = document.getElementById('search').value;
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';
    
        if (query.length < 3) {
            return;
        }
    
        try {
            const [moviesData, seriesData] = await Promise.all([fetchMovies(1), fetchSeries(1)]);
    
            const filteredResults = [
                ...moviesData.results.map(movie => ({ title: movie.title, id: movie.id, type: 'movie' })),
                ...seriesData.results.map(serie => ({ title: serie.name, id: serie.id, type: 'tv' }))
            ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    
            if (filteredResults.length === 0) {
                const noResultsElement = document.createElement('div');
                noResultsElement.textContent = 'Aucun résultat trouvé';
                noResultsElement.className = 'search-result-item';
                resultsContainer.appendChild(noResultsElement);
            } else {
                filteredResults.forEach(item => {
                    const resultElement = document.createElement('div');
                    resultElement.textContent = item.title;
                    resultElement.className = 'search-result-item';
                    resultElement.onclick = () => {
                        window.location.href = `detail.html?id=${item.id}&type=${item.type}`;
                    };
                    resultsContainer.appendChild(resultElement);
                });
            }
    
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    }

    // Assurez-vous que la fonction est accessible globalement
    window.searchContent = searchContent;

    loadMovies();
    loadSeries();
});