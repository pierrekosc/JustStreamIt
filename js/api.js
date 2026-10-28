// Requêtes vers l'API OCMovies
// L'API doit tourner en local : python manage.py runserver

const API_URL = "http://localhost:8000/api/v1";

// Envoie une requête GET et renvoie la réponse en JSON
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur " + response.status + " pour " + url);
  }
  return response.json();
}

// Renvoie les `count` films les mieux notés (d'un genre si on en donne un)
// page_size permet de tout récupérer en une seule requête
async function getTopMovies(count, genre) {
  let url = API_URL + "/titles/?sort_by=-imdb_score&page_size=" + count;
  if (genre) {
    url += "&genre=" + genre;
  }
  const data = await fetchJson(url);
  return data.results;
}

// Renvoie toutes les infos d'un film (résumé, acteurs, durée...)
function getMovie(id) {
  return fetchJson(API_URL + "/titles/" + id);
}

// Renvoie la liste des genres (il y en a 25, une page de 50 suffit)
async function getGenres() {
  const data = await fetchJson(API_URL + "/genres/?page_size=50");
  return data.results;
}
