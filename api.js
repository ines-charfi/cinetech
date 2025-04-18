// api.js
export const apiKey = '8c4b867188ee47a1d4e40854b27391ec'; // Remplacez par la clé API donnée

export async function fetchMovies(page) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    return await response.json();
}

export async function fetchSeries(page) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR&page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch series');
    }
    return await response.json();
}

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

export function loadFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function loadComments(id) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    return comments[id] || [];
}

export function saveComment(id, comment) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    if (!comments[id]) {
        comments[id] = [];
    }
    comments[id].push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}