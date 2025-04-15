const apiKey = '8c4b867188ee47a1d4e40854b27391ec'; // Remplacez par notre clé API
const detailContainer = document.getElementById('detail-container');
const commentsContainer = document.getElementById('comments-container');
const commentInput = document.createElement('textarea');
const submitCommentButton = document.createElement('button');

async function loadDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const type = urlParams.get('type') || 'movie'; // Par défaut, on suppose que c'est un film

    const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=fr-FR`);
    const data = await response.json();
    displayDetails(data);
}

function displayDetails(data) {
    detailContainer.innerHTML = `
        <div class="col-md-12">
            <h2>${data.title || data.name}</h2>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title || data.name}" class="img-fluid">
            <p><strong>Résumé:</strong> ${data.overview}</p>
            <p><strong>Genres:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Note:</strong> ${data.vote_average}</p>
            <button class="btn btn-primary" onclick="addToFavorites(${data.id}, '${data.title ? 'movie' : 'tv'}')">Ajouter aux Favoris</button>
        </div>
    `;
    loadComments(data.id);
}

function loadComments(id) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    commentsContainer.innerHTML = '<h3>Commentaires</h3>';
    const commentList = document.createElement('div');

    if (comments[id]) {
        comments[id].forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <strong>${comment.author}</strong>
                <p>${comment.text}</p>
            `;
            commentList.appendChild(commentElement);
        });
    }

    commentsContainer.appendChild(commentList);

    // Ajout de la zone de commentaire
    commentInput.className = 'form-control mt-2';
    commentInput.placeholder = 'Laissez un commentaire...';
    submitCommentButton.className = 'btn btn-primary mt-2';
    submitCommentButton.innerText = 'Envoyer';

    commentsContainer.appendChild(commentInput);
    commentsContainer.appendChild(submitCommentButton);

    submitCommentButton.addEventListener('click', () => {
        const commentText = commentInput.value;
        if (commentText) {
            if (!comments[id]) {
                comments[id] = [];
            }
            comments[id].push({ author: 'Utilisateur', text: commentText });
            localStorage.setItem('comments', JSON.stringify(comments));
            commentInput.value = ''; // Réinitialiser le champ de texte
            loadComments(id); // Recharger les commentaires
        }
    });
}

// Charger les détails lors du chargement de la page
loadDetails();
