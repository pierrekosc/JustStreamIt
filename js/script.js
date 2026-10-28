// Point d'entrée : charge les données au chargement de la page

const MOVIES_PER_CATEGORY = 6;
const DEFAULT_GENRE = "Comedy";

document.addEventListener("DOMContentLoaded", () => {
  setupModal();
  document.querySelectorAll(".movies").forEach(setupMoreButton);
  document.addEventListener("click", onMovieClick);

  loadBestMovies();
  document.querySelectorAll("[data-genre]").forEach((section) => {
    loadCategory(section, section.dataset.genre);
  });
  loadGenreSelect();
});

// Meilleur film + les 6 films suivants ("Films les mieux notés")
async function loadBestMovies() {
  try {
    const movies = await getTopMovies(MOVIES_PER_CATEGORY + 1);
    // la liste ne contient pas le résumé : on demande le détail du 1er film
    const best = await getMovie(movies[0].id);
    showBestMovie(best);
    showMovies(document.getElementById("top-rated"), movies.slice(1));
  } catch (error) {
    showError(error);
  }
}

// Les 6 meilleurs films d'un genre, affichés dans la section donnée
async function loadCategory(section, genre) {
  try {
    const movies = await getTopMovies(MOVIES_PER_CATEGORY, genre);
    showMovies(section, movies);
  } catch (error) {
    showError(error);
  }
}

// Remplit la liste déroulante "Autres" et recharge les films à chaque choix
async function loadGenreSelect() {
  const select = document.getElementById("genre-select");
  const section = document.getElementById("other");

  try {
    const genres = await getGenres();
    genres.forEach((genre) => {
      const option = document.createElement("option");
      option.value = genre.name;
      option.textContent = genre.name;
      select.append(option);
    });
  } catch (error) {
    showError(error);
    return;
  }

  select.value = DEFAULT_GENRE;
  loadCategory(section, DEFAULT_GENRE);

  select.addEventListener("change", () => {
    loadCategory(section, select.value);
  });
}

// Clic sur une affiche ou un bouton "Détails" : ils portent l'id du film dans data-id
async function onMovieClick(event) {
  const id = event.target.dataset.id;
  if (!id) {
    return;
  }
  try {
    const movie = await getMovie(id);
    openModal(movie);
  } catch (error) {
    showError(error);
  }
}
