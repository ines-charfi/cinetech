// series.js
import { fetchSeries, addToFavorites } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const seriesContainer = document.getElementById('series-container');
    let currentPage = 1;

    async function loadSeries(page) {
        try {
            const data = await fetchSeries(page);
            displaySeries(data.results);
            setupPagination(data.total_pages);
        } catch (error) {
            console.error('Erreur lors du chargement des séries:', error);
        }
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

    function setupPagination(totalPages) {
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        const pageInfo = document.getElementById('page-info');

        pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadSeries(currentPage);
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                loadSeries(currentPage);
            }
        });
    }

    async function searchContent() {
        const query = document.getElementById('search').value;
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = ''; // Réinitialiser les résultats
    
        if (query.length < 3) {
            return; // Ne pas effectuer la recherche si moins de 3 caractères
        }
    
        try {
            const [moviesData, seriesData] = await Promise.all([fetchMovies(1), fetchSeries(1)]);
    
            const filteredResults = [
                ...moviesData.results.map(movie => ({ title: movie.title, id: movie.id, type: 'movie' })),
                ...seriesData.results.map(serie => ({ title: serie.name, id: serie.id, type: 'tv' }))
            ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    
            filteredResults.forEach(item => {
                const resultElement = document.createElement('div');
                resultElement.textContent = item.title;
                resultElement.onclick = () => {
                    window.location.href = 'detail.html?id=${item.id}&type=${item.type}';
                };
                resultsContainer.appendChild(resultElement);
            });
    
            if (filteredResults.length === 0) {
                const noResultsElement = document.createElement('div');
                noResultsElement.textContent = 'Aucun résultat trouvé';
                resultsContainer.appendChild(noResultsElement);
            }
    
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
        }
    }
    
    // Assurez-vous que la fonction est accessible globalement
    window.searchContent = searchContent;

    loadSeries(currentPage);
});