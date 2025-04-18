// series.js
import { fetchSeries, addToFavorites} from './api.js';


const seriesContainer = document.getElementById('series-container');
let currentPage = 1;

async function loadSeries(page) {
    try {
        const data = await fetchSeries(page);
        displaySeries(data.results);
        setupPagination(data.total_pages);
    } catch (error) {
        console.error(error);
    }
}

async function displaySeries(series) {
    seriesContainer.innerHTML = '';
    series.forEach(serie => {
        const seriesElement = document.createElement('div');
        seriesElement.classList.add('col-md-3', 'series');
        seriesElement.innerHTML = `
            <h5><b>${serie.name}</b></h5><br>

            <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" alt="${serie.name}" class="img-fluid">
            <i class="far fa-heart" onclick="toggleFavorite(this, ${serie.id})" style="cursor: pointer; font-size: 24px;"></i>
            <span class="badge badge-secondary">${serie.first_air_date}</span><br>
            <a href="detail.html?id=${serie.id}&type=tv" class="btn btn-danger">Détails</a>
        `;
        seriesContainer.appendChild(seriesElement);
    });
}
// Définir toggleFavorite comme une fonction globale
window.toggleFavorite = function(heartIcon, serieId) {
    heartIcon.classList.toggle('fas'); // Change l'icône de cœur vide à plein
    heartIcon.classList.toggle('far'); // Change l'icône de cœur plein à vide
    heartIcon.style.color = heartIcon.classList.contains('fas') ? 'red' : ''; // Change la couleur en rouge si plein
    addToFavorites(serieId, 'serie'); // Appel de la fonction pour ajouter aux favoris
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
            loadSeries(currentPage);
        }
    };

    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadSeries(currentPage);
        }
    };
}

// Load series on page load
loadSeries(currentPage);