// api.js
export const apiKey = 'a1d40f7c02d44bf3a6694ddd7924a331';

export async function fetchMovies(page = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Erreur fetchMovies:', error);
        throw error;
    }
}

export async function fetchSeries(page = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=fr-FR&page=${page}`);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Erreur fetchSeries:', error);
        throw error;
    }
}

export function addToFavorites(id, type) {
    try {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const exists = favorites.some(fav => fav.id === id && fav.type === type);
        
        if (!exists) {
            favorites.push({ id, type });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Ajouté aux favoris !');
        } else {
            alert('Déjà dans les favoris !');
        }
    } catch (error) {
        console.error('Erreur addToFavorites:', error);
    }
}

export function loadFavorites() {
    try {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch (error) {
        console.error('Erreur loadFavorites:', error);
        return [];
    }
}

export function loadComments(id) {
    try {
        const comments = JSON.parse(localStorage.getItem('comments')) || {};
        return comments[id] || [];
    } catch (error) {
        console.error('Erreur loadComments:', error);
        return [];
    }
}

export function saveComment(id, comment) {
    try {
        const comments = JSON.parse(localStorage.getItem('comments')) || {};
        if (!comments[id]) comments[id] = [];
        comments[id].push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    } catch (error) {
        console.error('Erreur saveComment:', error);
    }
}
