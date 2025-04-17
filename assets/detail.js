// detail.js
import { fetchMovies, fetchSeries, addToFavorites, loadComments, saveComment, apiKey } from './api.js';

const detailContainer = document.getElementById('detail-container');
const commentsContainer = document.getElementById('comments-container');
const commentInput = document.createElement('textarea');
const submitCommentButton = document.createElement('button');

async function loadDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const type = urlParams.get('type') || 'movie';

    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=fr-FR`);
    const data = await response.json();
    displayDetails(data);
}

function displayDetails(data) {
    detailContainer.innerHTML = `
        <div class="col-md-12">
            <h2>${data.title || data.name}</h2><br>
            <i class="far fa-heart" onclick="toggleFavorite(this, ${data.id})" style="cursor: pointer; font-size: 24px;"></i>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title || data.name}" class="img-fluid">
            <p><strong>Résumé:</strong> ${data.overview}</p>
            <p><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Note:</strong> ${data.vote_average}</p>
        </div>
    `;
    loadCommentsSection(data.id);
}
function toggleFavorite(heartIcon, movieId) {
    heartIcon.classList.toggle('fas'); // Change l'icône de cœur vide à plein
    heartIcon.classList.toggle('far'); // Change l'icône de cœur plein à vide
    heartIcon.style.color = heartIcon.classList.contains('fas') ? 'red' : ''; // Change la couleur en rouge si plein
    addToFavorites(movieId, 'movie'); // Appel de la fonction pour ajouter aux favoris
}
function loadCommentsSection(id) {
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

    // Add comment input
    commentInput.className = 'form-control mt-2';
    commentInput.placeholder = 'Laissez un commentaire...';
    submitCommentButton.className = 'btn btn-dark mt-2';
    submitCommentButton.innerText = 'Envoyer';

    commentsContainer.appendChild(commentInput);
    commentsContainer.appendChild(submitCommentButton);

    submitCommentButton.addEventListener('click', () => {
        const commentText = commentInput.value;
        if (commentText) {
            const newComment = { author: 'Utilisateur', text: commentText };
            saveComment(id, newComment);
            commentInput.value = ''; // Reset input field
            loadCommentsSection(id); // Reload comments
        }
    });
}

// Load details on page load
loadDetails();