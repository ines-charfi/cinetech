// detail.js
import { addToFavorites, loadComments, saveComment, apiKey } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('detail-container');
    const commentsContainer = document.getElementById('comments-container');
    const similarContainer = document.getElementById('similar-titles-container');

    async function loadDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const type = urlParams.get('type') || 'movie';

        try {
            const [details, similar] = await Promise.all([
                fetchDetails(id, type),
                fetchSimilarTitles(id, type)
            ]);
            
            displayDetails(details);
            displaySimilarTitles(similar.results);
            setupCommentsSection(id);
        } catch (error) {
            console.error('Erreur lors du chargement des détails:', error);
        }
    }

    async function fetchDetails(id, type) {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=fr-FR`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des détails');
        return await response.json();
    }

    async function fetchSimilarTitles(id, type) {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${apiKey}&language=fr-FR`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des titres similaires');
        return await response.json();
    }

    function displayDetails(data) {
        detailContainer.innerHTML = `
            <div class="col-md-12">
                <h2>${data.title || data.name}</h2>
                <i class="far fa-heart favorite-icon" data-id="${data.id}" data-type="${data.title ? 'movie' : 'tv'}"></i>
                <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title || data.name}" class="img-fluid">
                <p><strong>Résumé:</strong> ${data.overview}</p>
                <p><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
                <p><strong>Note:</strong> ${data.vote_average}/10</p>
            </div>
        `;
        setupFavoriteListener();
    }

    function displaySimilarTitles(titles) {
        similarContainer.innerHTML = '';
        titles.slice(0, 4).forEach(title => {
            const titleElement = document.createElement('div');
            titleElement.classList.add('similar-title');
            titleElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${title.poster_path}" alt="${title.title || title.name}" class="img-fluid">
                <h5>${title.title || title.name}</h5>
            `;
            titleElement.addEventListener('click', () => {
                window.location.href = `detail.html?id=${title.id}&type=${title.media_type || 'movie'}`;
            });
            similarContainer.appendChild(titleElement);
        });
    }

    function setupFavoriteListener() {
        const favoriteIcon = document.querySelector('.favorite-icon');
        if (favoriteIcon) {
            favoriteIcon.addEventListener('click', function() {
                const id = this.dataset.id;
                const type = this.dataset.type;
                this.classList.toggle('fas');
                this.classList.toggle('far');
                this.style.color = this.classList.contains('fas') ? 'red' : '';
                addToFavorites(id, type);
            });
        }
    }

    function setupCommentsSection(id) {
        const comments = loadComments(id);
        commentsContainer.innerHTML = '<h3>Commentaires</h3>';
        
        const commentList = document.createElement('div');
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <strong>${comment.author}</strong>
                <p>${comment.text}</p>
            `;
            commentList.appendChild(commentElement);
        });
        commentsContainer.appendChild(commentList);

        const commentInput = document.createElement('textarea');
        commentInput.className = 'form-control mt-2';
        commentInput.placeholder = 'Laissez un commentaire...';
        
        const submitButton = document.createElement('button');
        submitButton.className = 'btn btn-dark mt-2';
        submitButton.textContent = 'Envoyer';

        submitButton.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                saveComment(id, { author: 'Utilisateur', text: commentText });
                commentInput.value = '';
                setupCommentsSection(id);
            }
        });

        commentsContainer.appendChild(commentInput);
        commentsContainer.appendChild(submitButton);
    }

    loadDetails();
});